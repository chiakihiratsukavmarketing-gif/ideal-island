-- Run manually in SQL Editor AFTER deploy + CRON_SECRET is configured.
-- Replace YOUR_CRON_SECRET with the same value as Edge Function secret CRON_SECRET.

create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

do $$
begin
  if exists (select 1 from cron.job where jobname = 'mile-send-schedule-reminders') then
    perform cron.unschedule('mile-send-schedule-reminders');
  end if;
end $$;

select cron.schedule(
  'mile-send-schedule-reminders',
  '* * * * *',
  $$
  select net.http_post(
    url := 'https://mmmedrkpvrwkszbkahii.supabase.co/functions/v1/send-schedule-reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', 'YOUR_CRON_SECRET'
    ),
    body := '{}'::jsonb
  ) as request_id;
  $$
);
