# MILE 次にやること

優先度は上から。実装前に `README.md` / `CONTINUE.md` / `CLAUDE.md` を確認。

**方針**: 装飾は最小限・実用性優先・1フェーズ1〜数コミット・既存データを壊さない。

---

## 次アクション（Launch-1 完了後）

### 手動確認（P3）

- [ ] Supabase ログイン後のクラウド保存 / 読み込み（Magic Link → `cloudSaveButton` / `cloudLoadButton`）
- [ ] 「ほかの月の目標」0件時の empty state 表示（任意）

### Launch-2 候補（判断待ち）

- [ ] スローガン編集 UI 復帰（`.slogan-card { display: none !important; }` の見直し — Launch-1 P2）

### Phase Data-2（別フェーズ）

- [ ] version 検証、バックアップ復元 UI、プロフィールクラウド同期、二重構造整理

---

## 完了済み: Phase Launch-1（2026-06-04）

**URL**: https://ideal-island.vercel.app/  
**判定**: 合格（P0/P1なし）

- [x] スマホ 320 / 375 / 390px（横スクロールなし、下部ナビ、今日のToDo、明日へ、今月/年間目標、設定 details）
- [x] World-3 mini / Todo-1 / GoalView-1 の本番反映確認
- [x] タスク CRUD / 目標 CRUD / プロフィール保存・リセット / 振り返りメモ
- [x] 未ログインクラウド UI、`collectLocalAppData()` 4項目維持
- [x] `manifest.json` / `icon-192` / `icon-512` / 初回コンソールエラーなし
- [x] `README.md` / `CONTINUE.md` / `WORK_LOG.md` / `NEXT_TASKS.md` 更新（Docs コミット待ち）

**既知課題（修正見送り）**

- P2: スローガン編集 UI が CSS で非表示
- P3: ログイン後クラウド保存/読み込みは手動QA待ち
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

- [x] Launch-1 本番QA（2026-06-04）— 合格（P0/P1なし）、Docs 反映（未コミット）
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
