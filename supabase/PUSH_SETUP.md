# MILE Web Push セットアップ

アプリを閉じていても ToDo のリマインド時刻に OS 通知を届けるための手順です。

## 前提

- MILE のクラウド保存（Supabase ログイン）を使う
- ToDo に「リマインド」時刻を設定し、クラウドに同期されている
- Google カレンダー予定は端末内のみのため、**サーバー通知の対象外**（MILE ToDo のみ）

## 1. SQL を実行

Supabase Dashboard → SQL Editor で `supabase/migrations/20260624120000_push_notifications.sql` を実行します。

## 2. Edge Function をデプロイ

```bash
supabase login
supabase link --project-ref mmmedrkpvrwkszbkahii
supabase functions deploy send-schedule-reminders --no-verify-jwt
```

## 3. Secrets を設定

Dashboard → Project Settings → Edge Functions → Secrets、または CLI:

```bash
supabase secrets set \
  VAPID_PUBLIC_KEY="BGIBzpENj4hs1sg-X5rHMTcwKEssF71FokbcBGzOVyhPAwmUkHFi_LPDMuOfwMjgBhMsQel7mjPr9gflk6lbGGQ" \
  VAPID_PRIVATE_KEY="（generate-vapid-keys で生成した秘密鍵）" \
  VAPID_SUBJECT="mailto:support@ideal-island.vercel.app" \
  CRON_SECRET="（ランダムな長い文字列）"
```

`VAPID_PUBLIC_KEY` は `index.html` の `VAPID_PUBLIC_KEY` と同じ値にしてください。

## 4. 1分ごとの Cron を設定

SQL Editor で `pg_cron` と `pg_net` を有効化したうえで、次を実行します（`CRON_SECRET` を置き換え）:

```sql
create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

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
```

## 5. アプリ側

1. 設定 → 「バックグラウンド通知を許可」
2. クラウドにログイン
3. ToDo にリマインド時刻を入れ、クラウド同期を待つ（最大45秒）

## 動作確認

Edge Function を手動実行:

```bash
curl -X POST "https://mmmedrkpvrwkszbkahii.supabase.co/functions/v1/send-schedule-reminders" \
  -H "x-cron-secret: YOUR_CRON_SECRET"
```

レスポンス例: `{"sent":1,"skipped":0,"errors":0}`

## 料金

個人〜小規模利用なら Supabase Free 枠内（Edge Functions 月50万回）で十分です。
