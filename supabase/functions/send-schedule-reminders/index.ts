import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import webpush from "npm:web-push@3";

const DEFAULT_TIMEZONE = "Asia/Tokyo";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-cron-secret, content-type",
};

type Goal = {
  id?: string;
  title?: string;
  startTime?: string;
  endTime?: string;
  dueDate?: string;
  done?: boolean;
};

function getNowInTimezone(timezone: string) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    hour12: false,
  });
  const parts = formatter.formatToParts(new Date());
  const get = (type: string) => parts.find((part) => part.type === type)?.value || "";
  const hour = get("hour").padStart(2, "0");
  const minute = get("minute").padStart(2, "0");
  return {
    dateKey: `${get("year")}-${get("month")}-${get("day")}`,
    timeKey: `${hour}:${minute}`,
  };
}

function isDashboardTodayTask(goal: Goal, todayKey: string) {
  if (goal.done) return false;
  const dueDate = goal.dueDate || "";
  if (dueDate && dueDate > todayKey) return false;
  return true;
}

function buildReminderKey(dateKey: string, goalId: string, startTime: string) {
  return `${dateKey}:${goalId}:${startTime}`;
}

function isAuthorized(req: Request, serviceRoleKey: string) {
  const cronSecret = Deno.env.get("CRON_SECRET") || "";
  const headerSecret = req.headers.get("x-cron-secret") || "";
  const authHeader = req.headers.get("Authorization") || "";

  if (cronSecret && headerSecret === cronSecret) return true;
  if (serviceRoleKey && authHeader === `Bearer ${serviceRoleKey}`) return true;
  return false;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  if (!isAuthorized(req, serviceRoleKey)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const vapidPublic = Deno.env.get("VAPID_PUBLIC_KEY") || "";
  const vapidPrivate = Deno.env.get("VAPID_PRIVATE_KEY") || "";
  const vapidSubject = Deno.env.get("VAPID_SUBJECT") || "mailto:support@ideal-island.vercel.app";
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";

  if (!vapidPublic || !vapidPrivate || !supabaseUrl || !serviceRoleKey) {
    return new Response(JSON.stringify({ error: "Push is not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  webpush.setVapidDetails(vapidSubject, vapidPublic, vapidPrivate);

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const { data: subscriptions, error: subError } = await supabase
    .from("push_subscriptions")
    .select("user_id, endpoint, p256dh, auth, timezone");

  if (subError) {
    return new Response(JSON.stringify({ error: subError.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let sent = 0;
  let skipped = 0;
  let errors = 0;

  for (const sub of subscriptions || []) {
    const timezone = sub.timezone || DEFAULT_TIMEZONE;
    const { dateKey, timeKey } = getNowInTimezone(timezone);

    const { data: userData } = await supabase
      .from("user_app_data")
      .select("app_data")
      .eq("user_id", sub.user_id)
      .maybeSingle();

    const goals = (userData?.app_data?.data?.goalsByTab?.today || []) as Goal[];
    const dueGoals = goals.filter(
      (goal) => goal.id && goal.startTime === timeKey && isDashboardTodayTask(goal, dateKey)
    );

    for (const goal of dueGoals) {
      const reminderKey = buildReminderKey(dateKey, goal.id!, goal.startTime!);

      const { data: existing } = await supabase
        .from("schedule_reminder_sent")
        .select("id")
        .eq("user_id", sub.user_id)
        .eq("reminder_key", reminderKey)
        .maybeSingle();

      if (existing) {
        skipped += 1;
        continue;
      }

      const timeLabel = goal.endTime ? `${goal.startTime} - ${goal.endTime}` : goal.startTime;
      const payload = JSON.stringify({
        title: `予定: ${goal.title || "ToDo"}`,
        body: `${timeLabel} · 設定した時刻です`,
        tag: reminderKey,
        url: "/",
      });

      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          payload
        );

        await supabase.from("schedule_reminder_sent").insert({
          user_id: sub.user_id,
          reminder_key: reminderKey,
        });
        sent += 1;
      } catch (error) {
        errors += 1;
        const statusCode = (error as { statusCode?: number }).statusCode;
        if (statusCode === 404 || statusCode === 410) {
          await supabase.from("push_subscriptions").delete().eq("endpoint", sub.endpoint);
        }
      }
    }
  }

  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
  await supabase.from("schedule_reminder_sent").delete().lt("sent_at", twoDaysAgo);

  return new Response(JSON.stringify({ sent, skipped, errors }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
