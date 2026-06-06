# MILE 作業ログ

時系列の作業記録。詳細仕様は `README.md`、再開用は `CONTINUE.md`。

---

## 2026-06（Cloud-Login-1 / Launch-1 / GoalView-1 / Todo-1 / World-3 mini / Release-3 / Release-4）

### Cloud-Login-1 本番QA Docs（本作業・未コミット）

- README / CONTINUE / WORK_LOG / NEXT_TASKS に Cloud-Login-1 本番QA結果を反映
- コード変更なし（`index.html` 3本は未変更）

### Cloud-Login-1 本番QA（2026-06-05・コード変更なし）

- **本番反映**: `c75f7de` feat(cloud-login): add Google OAuth login button
- **URL**: https://ideal-island.vercel.app/
- **判定**: 部分合格
- **確認済み**
  - 「Googleでログイン」ボタン表示、Magic Link 残存
  - Google OAuth へ遷移（`accounts.google.com`）
  - `collectLocalAppData()` 4項目維持
  - `applyCloudAppDataToLocal()` プロフィール非対象
  - 初回ロードの致命的コンソールエラーなし
- **手動未完了**: Google ログイン完了後のクラウド保存/読み込み E2E
- **既知仕様**
  - 同じブラウザで別アカウント切替でも localStorage 端末データは残る
  - クラウド保存は `user.id` ごと。読み込み時のみ同期4キー上書き。プロフィールは同期対象外
- **次アクション**: 実 Google アカウントで保存/読み込み手動確認。別アカウント注意文は検討

### Cloud-Login-1 実装（`c75f7de`）

- 未ログインパネルに「Googleでログイン」ボタン（`signInWithOAuth` provider: google）
- Magic Link は残す。`redirectTo`: `getCloudRedirectUrl()`
- クラウド保存/読み込み・`collectLocalAppData()`・`applyCloudAppDataToLocal()` 未変更
- 新規 `localStorage` キーなし。3 HTML 同期。push 済み

### Launch-1 本番QA Docs（`c37a177`）

- README / CONTINUE / WORK_LOG / NEXT_TASKS に Launch-1 本番QA結果を反映

### Launch-1 本番QA（2026-06-04・コード変更なし）

- **URL**: https://ideal-island.vercel.app/
- **判定**: 合格（P0/P1なし）
- **方法**: Playwright 自動検証（320 / 375 / 390px）+ manifest / icon / 本番 HTML マーカー確認
- **確認済み**
  - 横スクロールなし、下部ナビ、今日のToDo、明日へ、今月/年間目標、設定 details
  - World-3 mini バッジトースト、Todo-1 明日へ、GoalView-1（ほかの月 / 年間ジャンル）の本番反映
  - タスク CRUD、目標 CRUD、プロフィール保存/リセット、振り返りメモ
  - 未ログインクラウド UI、`collectLocalAppData()` 4項目維持
  - `manifest.json`、`icon-192` / `icon-512`、初回コンソールエラーなし
- **既知課題**
  - P2: スローガン編集 UI が CSS で非表示（`saveSlogan()` は動作）
  - P3: ログイン後クラウド保存/読み込みは手動QA待ち
  - P3: 「ほかの月の目標」0件 empty state は未検証
- **次アクション**: Supabase ログイン後のクラウド手動確認。スローガン UI は Launch-2 以降

### GoalView-1 Docs（`c20ef74`）

- README / CONTINUE / WORK_LOG / NEXT_TASKS に GoalView-1（Monthly-1 + Goal-1）を反映

### GoalView Goal-1 実装（`f6f7a0c`）

- 年間目標に `category`（UI「ジャンル」、既存 `CATEGORIES`）
- `normalizeYearlyGoal()` で未設定時「その他」
- 年間フォーム select、カードにジャンルバッジ
- 年間アイコンは未実装
- 新規 `localStorage` キーなし、`collectLocalAppData()`・Supabase 変更なし
- 3 HTML 同期

### GoalView Monthly-1 実装（`24ee53e`）

- 「ほかの月の目標」見出し、過去月0件の空状態文言
- 既存 `#monthlyGoalArchive` の月別 `<details>` を活用（新規一覧UIなし）
- 下部ナビ「目標」→ `monthly-goal-section`
- 読み取り専用、月選択なし
- 新規 `localStorage` キーなし、`collectLocalAppData()`・Supabase 変更なし
- 3 HTML 同期。未 push の場合あり

### Todo-1 Docs（`07747bb`）

- README / CONTINUE / WORK_LOG / NEXT_TASKS に Todo-1 を反映

### Todo-1 実装（`8929ed0`）

- 今日タブの未完了タスクに「明日へ」ボタン（`data-action="reschedule-tomorrow"`）
- 表示: 期限なし / 今日期限 / 期限切れ（`canRescheduleGoalToTomorrow`）。非表示: 未来日・完了済み
- `rescheduleGoal`: `dueDate` を翌日（`addDays(getTodayKey(), 1)`）、`updatedAt` 更新のみ
- タスクは `goalsByTab.today` に残る。MILE・バッジ・トーストは発火しない
- ダッシュボード達成率・残り件数は変更なし。任意日付は既存編集フォーム
- スマホ幅 320 / 375 / 390px で Playwright スモーク確認済み
- 新規 `localStorage` キーなし、`collectLocalAppData()`・Supabase 変更なし
- 3 HTML 同期

### World-3 mini Docs（`06c8ad5`）

- README / CONTINUE / WORK_LOG / NEXT_TASKS に World-3 mini を反映

### World-3 mini 実装（`94e70b6`）

- バッジ3件追加: 今週スタート（`weekMile >= 1`）、今日3歩（`todayMile >= 3`）、10MILE（`totalMile >= 10`）
- 今日タブ完了時、新規バッジ獲得だけトースト出し分け（`getNewlyEarnedBadgeLabels` → `showMileToast({ badgeLabels })`）
- 未実装（後回し）: ステージ演出、未獲得バッジ一覧、装飾・アニメーション強化
- 新規 `localStorage` キーなし、`collectLocalAppData()`・Supabase 変更なし
- 3 HTML 同期（`index.html` / `outputs/index.html` / `ideal-island/outputs/index.html`）
- push 済み想定（`06c8ad5` Docs とセット）

### Release-3 UI（`19e7830`）

- 今日の達成率カードを淡い緑系に調整
- 「今日のToDo」見出し（`.today-todo-heading`）追加
- ToDoタスクカードの視認性改善
- `#today-add-section` を淡い緑系の独立カードに
- 下部ナビを emoji から inline SVG 線画アイコンへ
- プロフィール設定・クラウド保存を `<details>` 折りたたみ化
- 新規 localStorage キーなし、クラウド同期対象追加なし
- 3 HTML 同期、Vercel 反映

### Release-3 Docs（`b00c35d`）

- `README.md` / `CONTINUE.md` に Release-3 を反映
- 実装コミット（`19e7830`）と分離して push

### Release-4 文言（`56bc682`）

- プロフィール summary: 「プロフィール」（「開く」「閉じる」廃止）
- クラウド summary: 「クラウド保存・同期」
- Hello: `getGreetingDisplayName()` で表示時のみ「さん」付与（二重防止あり）
- 保存データ・`collectLocalAppData()`・Supabase 変更なし
- 3 HTML 同期、Vercel 反映

### Release-4 Docs（未コミット・本作業）

- `README.md` / `CONTINUE.md` を Release-4 現状に更新
- `CLAUDE.md` / `WORK_LOG.md` / `NEXT_TASKS.md` を新規作成

---

## 以前の主要マイルストーン（要約）

| フェーズ | 概要 |
|----------|------|
| Cloud-6〜10 | クラウド E2E、自動保存、同期状態表示 |
| World-1 / 2 | MILEポイント、ステージ、バッジ |
| Release-2 | 今日追加フォーム分離、連続達成を詳しい進捗へ |
| Data-1 | 保存仕様の調査・ドキュメント化（コード変更なし） |
| Release-1 | β版公開前総点検 |

---

## コミット履歴（直近）

```
c75f7de feat(cloud-login): add Google OAuth login button
c37a177 docs: complete Launch-1 production QA and launch readiness
c20ef74 docs: document GoalView-1 monthly review and yearly category
f6f7a0c feat(goal-view): add yearly goal category field
24ee53e feat(goal-view): clarify monthly goals review navigation
```

※ `git log` で常に最新を確認すること。
