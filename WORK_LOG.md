# MILE 作業ログ

時系列の作業記録。詳細仕様は `README.md`、再開用は `CONTINUE.md`。

---

## 2026-06（Monthly-2 Core / Data-2 Core / Cloud-Login-1 / Launch-1 / GoalView-1 / Todo-1 / World-3 mini / Release-3 / Release-4）

### Monthly-2 Core Docs（本作業・未コミット）

- README / CONTINUE / WORK_LOG / NEXT_TASKS に Monthly-2 Core 実装・ローカル QA 結果を反映
- コード変更なし（`index.html` 3本は未変更）

### Monthly-2 Core 実装（`1d8b91c`）

- **コミット**: `1d8b91c` feat(monthly-2): add year-wide month selector for monthly goals（push 前）
- **月チップ**: 当年 1〜12 月（`#monthlyGoalMonthPicker`）。デフォルト選択は今月（`selectedMonthKey`）
- **選択月 CRUD**: 選択月の `monthlyGoals` をメインリストに表示。未来月・過去月も追加・編集・削除可
- **`addMonthlyGoal()`**: 追加先を `getCurrentMonthKey()` 固定から `selectedMonthKey` に変更
- **UI 統合**: 当年の「ほかの月の目標」アーカイブを月チップ UI に統合。カード見出しを「月間目標（YYYY年）」に
- **過去年**: `year < 当年` の `monthlyGoals` がある場合のみ「過去年の目標」を read-only 表示
- **据え置き**: ダッシュボード「今月 %」は今月目標のみ。タスク `monthlyGoalId` select も今月のみ。年間進捗は全月平均
- **データ / 同期**: `monthlyGoals` 構造変更なし。`app_data.version: 2` のまま。`collectLocalAppData()` / Supabase テーブル変更なし
- **新規 `localStorage` キーなし**。3 HTML 同期済み
- **ローカル QA**: Playwright **14/14 合格**

### Data-2 Core 実アカウントE2E QA Docs（`7a667f4`）

- README / CONTINUE / WORK_LOG / NEXT_TASKS に Data-2 Core 実アカウントE2E QA結果を反映
- コード変更なし（`index.html` 3本は未変更）

### Data-2 Core 実アカウントE2E QA（2026-06-06・コード変更なし）

- **URL**: https://ideal-island.vercel.app/
- **本番反映**: `5ffb027`（P2 文言含む）
- **判定**: **未完了 / 保留**（P0/P1なし）
- **理由**: Google / Magic Link の実ログイン認証が必要で、自動QAでは完了不可
- **自動確認 OK**
  - `5ffb027` 本番反映（プロフィール説明文修正済み）
  - 「クラウド同期対象外」文言なし
  - Data-2 Core JS マーカー（`autoLoadCloudDataForUser` 等）
  - `collectLocalAppData().version === 2`
  - 初回ロードの致命的コンソールエラーなし
- **実ログイン E2E 未確認**
  - Google ログイン後 auto-load
  - Magic Link ログイン後 auto-load
  - プロフィール変更 → クラウド保存 → 再ログイン復元
  - A→B アカウント切替
  - A の端末データが B へ自動保存されないこと
  - 空クラウド新規アカウントで空画面
  - ログイン後の手動クラウド保存/読み込み
- **次アクション**: ユーザー本人が Google アカウントで手動 E2E 確認 → Docs 更新 → Monthly-2

### Data-2 Core P2 修正（`5ffb027`）

- **コミット**: `5ffb027` fix(ui): update profile settings copy for Data-2 cloud sync
- プロフィール設定説明文を v2 クラウド同期に合わせて更新（「クラウド同期対象外」→ ログイン中はクラウド同期対象）
- 3 HTML 同期。push 済み・本番反映済み

### Data-2 Core 本番QA Docs（`2acbd70`）

- README / CONTINUE / WORK_LOG / NEXT_TASKS に Data-2 Core 本番QA結果を反映
- コード変更なし（`index.html` 3本は未変更）

### Data-2 Core 本番QA（2026-06-06・コード変更なし）

- **URL**: https://ideal-island.vercel.app/
- **本番反映**: `9c11037` / `9d10a2a` / `5ffb027`（HTML コードマーカーで Data-2 Core 確認）
- **判定**: 部分合格（P0/P1なし）
- **確認済み**
  - `collectLocalAppData().version === 2`
  - `collectLocalAppData().data.userProfile` あり
  - `autoLoadCloudDataForUser` / auto-save guard / 空クラウド backup 分岐が本番 JS に存在
  - Google / Magic Link ボタン表示
  - 初回ロードの致命的コンソールエラーなし
  - **P2（プロフィール説明文）**: `5ffb027` で修正済み
- **既知課題（P3・実ログイン E2E 未実施）**
  - Google / Magic Link ログイン後 auto-load E2E 未実施
  - A→B アカウント切替 E2E 未実施
  - プロフィール同期 E2E 未実施
  - 空クラウド新規アカウントの空画面 E2E 未実施
- **次アクション**: ユーザー本人が Google アカウントで手動 E2E 確認 → Docs 更新 → Monthly-2

### Data-2 Core Docs（`9d10a2a`）

- README / CONTINUE / WORK_LOG / NEXT_TASKS に Data-2 Core 実装・ローカル QA 結果を反映
- コード変更なし（`index.html` 3本は未変更）

### Data-2 Core 実装（`9c11037`）

- **コミット**: `9c11037` feat(data-2): auto-load cloud data on login and sync profile v2
- **`app_data.version: 2`**: `collectLocalAppData().data.userProfile` 追加（`mileUserProfile`）
- **プロフィール同期**: 表示名・アイコンをクラウド同期対象化。`saveProfileSettings` / `resetProfileSettings` で dirty
- **ログイン auto-load**: Google / Magic Link 共通、`handleCloudAuthSession` → `autoLoadCloudDataForUser`（`user.id` 基準）
- **auto-save ガード**: ログイン直後・auto-load 完了前は `scheduleCloudAutoSave` / auto `saveAppDataToCloud` 停止
- **空クラウド**: `backupLocalAppData()` 後に `applyEmptyAppDataToLocal()`（端末データの自動アップロードなし）
- **v1 互換**: `userProfile` なしでも読み込み可。手動読み込み時はプロフィール非破壊
- **backup**: `backupLocalAppData()` に `mileUserProfile` 追加
- **Supabase**: テーブル変更なし（`user_app_data.app_data` JSON のみ）
- **3 HTML**: 同期済み
- **ローカル QA**: Playwright + コードレビュー合格
- **未実施**: 本番 Google / Magic Link / A→B アカウント切替 E2E

### Cloud-Login-1 本番QA Docs（`cfa585e`）

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
9d10a2a docs: record Data-2 Core implementation and local QA results
9c11037 feat(data-2): auto-load cloud data on login and sync profile v2
cfa585e docs: record Cloud-Login-1 production QA partial pass
c75f7de feat(cloud-login): add Google OAuth login button
c37a177 docs: complete Launch-1 production QA and launch readiness
```

※ `git log` で常に最新を確認すること。
