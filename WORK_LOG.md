# MILE 作業ログ

時系列の作業記録。詳細仕様は `README.md`、再開用は `CONTINUE.md`。

---

## 2026-06（GoalView-1 / Todo-1 / World-3 mini / Release-3 / Release-4）

### GoalView-1 Docs（本作業・未コミット）

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
f6f7a0c feat(goal-view): add yearly goal category field
24ee53e feat(goal-view): clarify monthly goals review navigation
07747bb docs: document Todo-1 postpone-to-tomorrow for today todos
8929ed0 feat(todo-1): add postpone-to-tomorrow for today todos
06c8ad5 docs: document World-3 mini badges and badge-earned toast
```

※ `git log` で常に最新を確認すること。
