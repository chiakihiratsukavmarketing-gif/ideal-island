# MILE 次にやること

優先度は上から。実装前に `README.md` / `CONTINUE.md` / `CLAUDE.md` を確認。

**方針**: 装飾は最小限・実用性優先・1フェーズ1〜数コミット・既存データを壊さない。

---

## 次アクション

### Data-2 Core 本番 QA（未実施）

- [ ] Google ログイン後、そのアカウントのクラウドデータが自動表示される
- [ ] Magic Link ログイン後、同様に auto-load
- [ ] A→B アカウント切替で B のデータが表示される（A の端末データが B へ自動保存されない）
- [ ] クラウド空の新規アカウントで空画面（backup 後）
- [ ] プロフィール名・アイコンがクラウド同期される
- [ ] 手動「クラウドに保存」「クラウドから読み込み」が従来どおり動く

### 手動確認（Cloud-Login-1 残り）

- [ ] 実 Google アカウントでログイン完了
- [ ] ログイン後: バッジ「ログイン中」、`cloudSignedInPanel`、保存/読み込みボタン
- [ ] ToDo 追加 →「クラウドに保存」→ 成功表示
- [ ] 「クラウドから読み込み」→ confirm → データ保持（年間ジャンル含む）
- [ ] v1 クラウドデータ読み込みでエラーにならないこと

### その他（任意 / 後回し）

- [ ] 「ほかの月の目標」0件時の empty state 表示（Launch-1 P3）
- [ ] スローガン編集 UI 復帰（Launch-1 P2）
- [ ] Data-2 後続: バックアップ復元 UI、端末データ取り込み UI

---

## 完了済み: Phase Data-2 Core（`9c11037`・ローカル・未 push）

**実装コミット**: `9c11037` feat(data-2): auto-load cloud data on login and sync profile v2  
**ローカル QA**: 実施済み（Playwright + コードレビュー）  
**本番 E2E**: 未実施（上記「Data-2 Core 本番 QA」参照）

- [x] `app_data.version: 2`
- [x] `collectLocalAppData().data.userProfile` 追加（`mileUserProfile`）
- [x] プロフィール名・アイコンのクラウド同期
- [x] Google / Magic Link 共通でログイン後 `user.id` のクラウドデータ auto-load
- [x] ログイン直後 auto-save 抑止（端末データが別アカウントへ自動保存されない）
- [x] クラウド空の新規アカウント: `backupLocalAppData()` 後に空画面
- [x] v1 クラウドデータ（`userProfile` なし）読み込み可
- [x] `backupLocalAppData()` に `mileUserProfile` 追加
- [x] Supabase テーブル変更なし
- [x] 3 HTML 同期済み
- [ ] 本番 Google / Magic Link / A→B 切替 E2E

**未実装（Data-2 後続）**

- 端末データをクラウドへ取り込む確認 UI
- バックアップ復元 UI
- ゲストデータ復元 UI

---

## 完了済み: Cloud-Login-1（2026-06-05）

**本番反映**: `c75f7de`  
**URL**: https://ideal-island.vercel.app/  
**判定**: 部分合格

- [x] 「Googleでログイン」ボタン表示
- [x] Magic Link 残存
- [x] Google OAuth へ遷移
- [x] `collectLocalAppData()` 4項目維持
- [x] `applyCloudAppDataToLocal()` プロフィール非対象
- [x] 初回ロードの致命的コンソールエラーなし
- [ ] Google ログイン完了後の保存/読み込み E2E（手動未完了）

**既知仕様（Cloud-Login-1 時点・Data-2 Core で一部更新）**

- クラウド保存はログインアカウントごとの `user.id` に保存される
- **Data-2 Core 以降**: ログイン後 auto-load。空クラウドは backup 後に空画面。A→B 切替も B を auto-load
- 手動「クラウドから読み込み」は confirm 後に上書き（従来どおり）
- プロフィールは **Data-2 Core 以降クラウド同期対象**（v2 `userProfile`）

---

## 完了済み: Phase Launch-1（2026-06-04）

**URL**: https://ideal-island.vercel.app/  
**判定**: 合格（P0/P1なし）

- [x] スマホ 320 / 375 / 390px（横スクロールなし、下部ナビ、今日のToDo、明日へ、今月/年間目標、設定 details）
- [x] World-3 mini / Todo-1 / GoalView-1 の本番反映確認
- [x] タスク CRUD / 目標 CRUD / プロフィール保存・リセット / 振り返りメモ
- [x] 未ログインクラウド UI、`collectLocalAppData()` 4項目維持
- [x] `manifest.json` / `icon-192` / `icon-512` / 初回コンソールエラーなし
- [x] Docs 更新（`c37a177`）

**既知課題（修正見送り）**

- P2: スローガン編集 UI が CSS で非表示
- P3: 「ほかの月の目標」0件 empty state は未検証

---

## 完了済みフェーズ詳細: GoalView-1

### Monthly-1（`24ee53e`）

- 既存 `#monthlyGoalArchive` と `renderMonthlyGoals()` の月別 `<details>` を活用
- 「ほかの月の目標」見出し、過去月0件時の空状態文言
- 下部ナビ「目標」→ `#monthly-goal-section`
- 読み取り専用、月選択UIなし
- 新規 `localStorage` キーなし。`collectLocalAppData()` / Supabase 変更なし。3 HTML 同期

### Goal-1（`f6f7a0c`）

- 年間目標に `category`（画面表示「ジャンル」、既存 `CATEGORIES`）
- `normalizeYearlyGoal()` で未設定時「その他」
- 年間フォームのジャンル select、カードにジャンルバッジ
- 年間目標アイコンは後回し
- 新規 `localStorage` キーなし。`collectLocalAppData()` / Supabase 変更なし。3 HTML 同期

---

## 完了済みフェーズ詳細: Todo-1（`8929ed0`）

- 「明日へ」ボタン: 今日タブ・未完了・（期限なし / 今日 / 期限切れ）のみ
- 処理: `dueDate` 翌日 + `updatedAt`。`goalsByTab.today` に残す
- 影響なし: `done` / `completedAt` / MILE / バッジ / トースト。ダッシュボード達成率・残件
- 任意日付: 既存編集フォーム。スマホ 320 / 375 / 390px 確認済み
- 新規 `localStorage` キーなし。`collectLocalAppData()` / Supabase 変更なし。3 HTML 同期

---

## 完了済みフェーズ詳細: World-3 mini（`94e70b6`）

- バッジ: 今週スタート（`weekMile >= 1`）、今日3歩（`todayMile >= 3`）、10MILE（`totalMile >= 10`）
- トースト: 新規バッジ獲得時のみ「バッジ獲得」+ ラベル（最大2件）。それ以外は +1 MILE
- 未実装: ステージ演出、未獲得バッジ一覧、装飾・アニメーション強化
- 新規 `localStorage` キーなし。`collectLocalAppData()` / Supabase 変更なし。3 HTML 同期済み

---

## 後回し（ローンチ後）

- [ ] **Profile-6**: プロフィール画像アップロード
- [ ] **年間目標アイコン**追加
- [ ] **ステージ演出強化**（プログレスバー、ステージアップ演出、カード装飾の本格化、未獲得バッジ一覧）
- [ ] `.settings-fold` の未使用 CSS 整理（任意）

---

## 完了済み（直近）

- [x] Data-2 Core 実装（`9c11037`）— ローカル QA 済み、Docs 反映（本作業・未コミット）
- [x] Cloud-Login-1 本番QA Docs（`cfa585e`）
- [x] Cloud-Login-1 本番QA（2026-06-05）— 部分合格
- [x] Cloud-Login-1 実装（`c75f7de`）— Google OAuth ボタン
- [x] Launch-1 本番QA Docs（`c37a177`）
- [x] GoalView-1 Docs（`c20ef74`）
- [x] GoalView-1 Goal-1（`f6f7a0c`）— 年間ジャンル（`category`）
- [x] GoalView-1 Monthly-1（`24ee53e`）— ほかの月の目標見返し導線
- [x] Todo-1 実装（`8929ed0`）+ Docs（`07747bb`）
- [x] World-3 mini Docs（`06c8ad5`）
- [x] World-3 mini 実装（`94e70b6`）
- [x] Release-4 Docs（`210d500`）
- [x] Release-4 文言（`56bc682`）

---

## 作業ルール（再掲）

- 3 HTML は必ず同期（`index.html` 変更時）
- `git add .` 禁止
- commit / push はユーザー指示時のみ
- 実装フェーズと Docs コミットは分離してよい
- コミット前: `git status`、スマホ幅の確認（機能フェーズ時）
