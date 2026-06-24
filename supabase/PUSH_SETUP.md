# MILE Web Push セットアップ

アプリを閉じていても ToDo のリマインド時刻に OS 通知を届けます。

## 前提

- クラウド保存（Supabase ログイン）を使う
- ToDo にリマインド時刻を入れ、クラウド同期済み
- Google カレンダー予定は端末内のみ → **サーバー通知の対象外**

---

## 方法 A: GitHub Actions（推奨）

### 1. GitHub Secrets を登録

リポジトリ `ideal-island` → Settings → Secrets and variables → Actions

| Secret | 値 |
|--------|-----|
| `SUPABASE_ACCESS_TOKEN` | [Supabase Account Tokens](https://supabase.com/dashboard/account/tokens) で発行 |
| `SUPABASE_DB_PASSWORD` | プロジェクトの Database password |
| `SUPABASE_PROJECT_REF` | `mmmedrkpvrwkszbkahii` |
| `VAPID_PUBLIC_KEY` | `BGIBzpENj4hs1sg-X5rHMTcwKEssF71FokbcBGzOVyhPAwmUkHFi_LPDMuOfwMjgBhMsQel7mjPr9gflk6lbGGQ` |
| `VAPID_PRIVATE_KEY` | `npx web-push generate-vapid-keys` で生成した **秘密鍵** |
| `CRON_SECRET` | ランダムな長い文字列（例: `openssl rand -hex 32`） |
| `VAPID_SUBJECT` | （任意）`mailto:support@ideal-island.vercel.app` |

### 2. ワークフローを実行

Actions → **Deploy Supabase Web Push** → Run workflow

成功すると:

- `push_subscriptions` / `schedule_reminder_sent` テーブル作成
- `send-schedule-reminders` Edge Function デプロイ
- VAPID / CRON secrets 設定
- スモークテスト（`{"sent":0,...}` など）

### 3. Cron を有効化（どちらか）

**Dashboard（簡単）**

1. Supabase Dashboard → Edge Functions → `send-schedule-reminders`
2. Schedules → New schedule → `* * * * *`（毎分）

**SQL（手動）**

`supabase/manual/push_cron_job.sql` の `YOUR_CRON_SECRET` を置き換えて SQL Editor で実行

---

## 方法 B: Supabase CLI（ローカル）

```bash
supabase login
supabase link --project-ref mmmedrkpvrwkszbkahii
supabase db push
supabase functions deploy send-schedule-reminders --no-verify-jwt
supabase secrets set VAPID_PUBLIC_KEY="..." VAPID_PRIVATE_KEY="..." CRON_SECRET="..." VAPID_SUBJECT="mailto:support@ideal-island.vercel.app"
```

Cron は「方法 A」の手順 3 と同じ。

---

## アプリ側の使い方

1. https://ideal-island.vercel.app/ を開く
2. 設定 → **バックグラウンド通知を許可**
3. **クラウドにログイン**
4. ToDo にリマインド時刻 → クラウド同期（最大45秒）
5. アプリを閉じて通知を確認

iPhone はホーム画面に追加した PWA で許可が必要です。

---

## 動作確認

```bash
curl -X POST "https://mmmedrkpvrwkszbkahii.supabase.co/functions/v1/send-schedule-reminders" \
  -H "x-cron-secret: YOUR_CRON_SECRET" \
  -H "Content-Type: application/json" \
  -d "{}"
```

`404` → Function 未デプロイ  
`401` → CRON_SECRET 不一致  
`500` + `VAPID not configured` → secrets 未設定  
`{"sent":0,"skipped":0,"errors":0}` → 正常（該当リマインドなし）

---

## 料金

個人〜小規模なら Supabase Free 枠内（Edge Functions 月50万回）で十分です。
