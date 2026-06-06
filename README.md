# MILE

## 概要

MILEは、年間目標から今月の目標を決め、今月の目標から今日やることへ落とし込む逆算型の目標管理アプリです。

アプリを開くと、今日の達成率、残りタスク、今月の進捗、年間の進捗、次にやることを上部ダッシュボードで確認できます。日々のタスク管理だけでなく、目標までの進み具合を見える化することを目的にしています。

## 公開URL

https://ideal-island.vercel.app/

## 現在のMILEの状態（2026-06）

- 端末保存は自動（`localStorage`）
- ログイン中はクラウド自動保存（45秒 debounce）
- 保存状態表示あり（端末 / クラウド / 未保存 / 保存中 / 失敗）
- スマホ表示OK（実機確認済み）
- PWAアイコンOK
- 別端末確認OK（ログイン → 保存 → 読み込みの E2E 確認済み）
- Vercel公開済み
- β版公開前総点検済み（Release-1、2026-06-04）
- MILEポイント表示・達成時トースト（World-1）
- MILEステージ・バッジ・連続達成（World-2）
- β版UI整理（Release-2）
- トップ画面UI・配色・ナビ・設定まわりの整理（Release-3、2026-06）
- 設定まわりの文言整理（Release-4）：summary 簡素化、Hello に「さん」
- バッジ追加・バッジ獲得トースト（World-3 mini、2026-06）
- 今日のToDo「明日へ」回し（Todo-1、2026-06）
- 目標の見返し・年間ジャンル（GoalView-1、2026-06）
- Launch-1 本番QA済み（2026-06-04、合格・P0/P1なし）
- Google OAuth ログイン追加（Cloud-Login-1、`c75f7de`、本番反映済み）
- Cloud-Login-1 本番QA済み（2026-06-05、部分合格）
- **Data-2 Core 実装済み**（`9c11037`、push 済み・本番反映済み）: ログイン auto-load、profile v2、auto-save ガード
- **Data-2 Core P2 修正済み**（`5ffb027`、push 済み・本番反映済み）: プロフィール説明文を v2 クラウド同期に合わせて更新
- **Data-2 Core 本番QA済み**（2026-06-06、部分合格・P0/P1なし）
- **Data-2 Core 実アカウントE2E QA**（2026-06-06）: **未完了 / 保留**（Google / Magic Link 実ログイン要。自動QAでは完了不可）
- 最新 Docs コミット: `2acbd70`（Data-2 Core 本番QA docs）。実アカウントE2E QA docs は本作業（未コミット）
- 本番 https://ideal-island.vercel.app/

## 現在の画面構成

1. プロフィール（Hello / アイコン）
2. ヘッダー（MILEカード）
3. ダッシュボード（今日の達成率を淡い緑系で表示）
4. MILEステージ（ダッシュボード直下・ステージとバッジ）
5. 今日のToDo（見出し + フィルター + タスク一覧）
6. 今日やることを追加（独立カード・淡い緑系）
7. 今月の目標
8. 年間目標
9. 進捗サマリー / 詳しい進捗（連続達成・週間・達成履歴など）
10. 振り返りメモ
11. プロフィール（折りたたみ・summary「プロフィール」・下部ナビ「設定」で開く）
12. クラウド保存・同期（折りたたみ・summary「クラウド保存・同期」＋状態バッジ）
13. スローガン

## 主な機能

- プロフィール表示・編集
  - ログイン前: `Hello!`（未設定時）
  - 表示名があるとき: `Hello, ○○さん!`（例: `Hello, maymayさん!`）。末尾がすでに「さん」の名前は二重付与しない
  - ログイン後: メールアドレスから表示名を推定（挨拶表示時に「さん」を付与）
  - 設定エリアの折りたたみ「プロフィール」（summary）から表示名・アイコンを編集可能（端末ローカルのみ保存。保存値に「さん」は含めない）
  - プロフィールアイコン表示（ログイン前は 🌱 など）
  - Hello / アイコンは MILE hero カード外の上部ヘッダーに表示
- 上部ダッシュボード
  - 今日の達成率
  - 今日の残りタスク数
  - 今日完了したタスク数
  - 今月目標の進捗
  - 年間目標の進捗
  - 次にやること
  - MILEポイント表示（今日のMILE / 今週のMILE）
- MILEポイント・達成演出（Phase World-1）
  - 今日タスクを1つ完了するたびに +1 MILE（概念的なポイント）
  - ダッシュボード内に「今日のMILE」「今週のMILE」を表示
  - 「今日」タブで未完了→完了にしたとき、控えめなトースト（例: 「+1 MILE いい一歩！」、約1.8秒）
- バッジ追加・獲得トースト（Phase World-3 mini）
  - `MILE_BADGE_DEFS` にバッジ3件追加（今週スタート / 今日3歩 / 10MILE）
  - 今日タブで完了し、**その操作で新規獲得したバッジ**があるときのみトーストを出し分け（見出し「バッジ獲得」+ バッジ名。複数は最大2件を「、」で表示）
  - 新規バッジがなければ従来どおり「+1 MILE」「いい一歩！」（約1.8秒）
  - **未実装（後回し）**: ステージ演出強化、未獲得バッジ一覧、装飾・アニメーション強化
  - 新規 `localStorage` キーなし、`collectLocalAppData()`・Supabase 変更なし。3 HTML 同期済み（`94e70b6`）
- 今日のToDoを別日に回す（Phase Todo-1）
  - 今日タブの未完了タスクに **「明日へ」** ボタン（編集フォーム不要で `dueDate` を翌日に更新）
  - 表示対象: 期限なし / 今日期限 / 期限切れ。未来日期限・完了済みには非表示
  - 更新は `dueDate` と `updatedAt` のみ。タスクは `goalsByTab.today` に残る
  - `done` / `completedAt` / MILE / バッジ / トーストには影響なし。ダッシュボードの達成率・残り件数は変更なし
  - 任意の日付変更は既存の編集フォーム（期限 `type="date"`）で対応
  - スマホ幅 320 / 375 / 390px でレイアウト・動作確認済み
  - 新規 `localStorage` キーなし、`collectLocalAppData()`・Supabase 変更なし。3 HTML 同期（`8929ed0`）
- 目標の見返し・年間ジャンル（Phase GoalView-1）
  - **Monthly-1**（`24ee53e`）: 既存 `#monthlyGoalArchive` と `renderMonthlyGoals()` の月別 `<details>` を活用。「ほかの月の目標」見出し、過去月0件時の空状態文言。下部ナビ「目標」→ `#monthly-goal-section`（読み取り専用・月選択UIなし）
  - **Goal-1**（`f6f7a0c`）: 年間目標に `category`（画面は「ジャンル」、既存 `CATEGORIES`）。未設定は `normalizeYearlyGoal()` で「その他」。フォーム select とカードのジャンルバッジ
  - **後回し**: 年間目標アイコン
  - 新規 `localStorage` キーなし、`collectLocalAppData()`・Supabase 変更なし
- MILEステージ・バッジ（Phase World-2）
  - ダッシュボード直下の MILEステージカード
  - 累計MILEに応じたステージ表示（アイコン・ステージ名）
  - 「次のステージまであと○MILE」（最高ステージ時は「最高ステージです」）
  - 条件達成バッジ（獲得済みのみ表示、未獲得時は控えめな案内）
  - 今日のMILE / 今週のMILE / 累計MILE と連動（すべて `completedAt` から再計算）
- β版UI整理（Phase Release-2）
  - 「今日やることを追加」を一覧カードの外へ分離（`#today-add-section`）
  - 連続達成日数はトップ常時表示から外し、「詳しい進捗を見る」内に配置
  - MILEステージカードをコンパクト化（連続達成の重複表示を整理）
  - 下部ナビ「進捗」を「詳しい」に変更（タップで詳しい進捗を開いてスクロール）
  - 新規 `localStorage` キーなし、クラウド同期対象の追加なし
- トップ画面UI・配色・ナビ・設定（Phase Release-3）
  - 今日の達成率カードを淡い緑系に調整（背景・枠・進捗バー）
  - 「今日のToDo」見出しをフィルター直上に追加
  - 今日ToDoタスクカードの視認性を改善（枠・背景・完了カードのコントラスト）
  - 今日やること追加カード（`#today-add-section`）を淡い緑系に調整
  - 下部ナビを絵文字から **inline SVG の線画アイコン**に変更（外部ライブラリなし）
  - プロフィール設定を `<details>` で折りたたみ（初期は閉、開閉状態は保存しない）
  - クラウド保存・同期を `<details>` で折りたたみ（summary に `cloudStatusBadge` / `cloudSyncStatus`）
  - 新規 `localStorage` キーなし、`collectLocalAppData()` 変更なし、クラウド同期対象の追加なし、Supabase設定変更なし
- 文言の軽微整理（Phase Release-4）
  - プロフィール折りたたみの summary を「プロフィール」に（「開く」「閉じる」表記をやめる）
  - クラウド折りたたみの summary を「クラウド保存・同期」に
  - Hello 挨拶に「さん」を付与（`getGreetingDisplayName`、表示のみ）
  - 新規 `localStorage` キーなし、データ構造・クラウド同期・Supabase 変更なし
- 年間目標の追加 / 編集 / 削除
- 年間目標のジャンル（`category`、表示名「ジャンル」。Goal-1）
- 年間目標のメモ保存
- 年間進捗表示
- 今月目標の追加 / 編集 / 削除
- 今月目標のカテゴリ・メモ保存
- 今月目標のアイコン選択
- ほかの月の月間目標の見返し（`#monthlyGoalArchive`、Monthly-1）
- 今月目標ごとの進捗表示
- 今日タスクの追加 / 編集 / 削除
- 今日タスクの「明日へ」（`dueDate` を翌日へ。Todo-1）
- 今日タスクの完了 / 未完了切り替え
- 今日タスクと今月目標の紐づけ
- 今日タスク一覧で紐づく今月目標アイコン表示
- ダッシュボードの次にやることへのアイコン表示
- 期限つきタスク
- 期限バッジ
- 期限フィルター
- カテゴリ機能
- カテゴリフィルター
- 期限フィルターとカテゴリフィルターの組み合わせ
- 完了済みタスクの折りたたみ
- カテゴリ別の達成状況
- 今週の進捗
- 達成履歴
- 連続達成日数（詳しい進捗内）
- 振り返りメモ
- 直近3件のメモ表示
- スローガン編集（ロジックは動作。編集 UI は CSS で非表示 — Launch-1 QA P2 既知課題）
- Supabaseログイン（Google OAuth + メールリンク）
- ログインリンク再送クールダウン（60秒）
- クラウド同期状態表示
  - 端末に保存済み
  - クラウド未保存の変更あり
  - 保存中 / 保存失敗
  - 最終保存からの経過時間
- クラウド自動保存（ログイン中、45秒 debounce）
- 手動クラウド保存
- 手動クラウド読み込み
- PWA対応（`manifest.json` / `assets/icons/`）
- 下部ナビゲーション（今日 / 目標 / 詳しい / 設定。inline SVG 線画アイコン）
- スマホアプリ風UI
- 白〜淡緑基調のミニマルデザイン（Release-3 で重要カードの視認性を調整）

## 使い方

1. 年間目標を設定します。
2. 年間目標から逆算して、今月の目標を追加します。
3. 今日やることを追加します。
4. 必要に応じて、今日のタスクを今月の目標に紐づけます。
5. タスクを完了すると、今日・今月・年間の進捗に反映されます。今日タブで完了すると +1 MILE のトースト（または新規バッジ獲得時は「バッジ獲得」トースト）が表示され、ダッシュボードの MILE 数・ステージ・バッジも更新されます。今日のToDoを明日に回す場合は、タスクカードの「明日へ」を使います（「今日」期限フィルターからは消えますが、タスクは今日タブの一覧に残ります）。
6. 連続達成日数や週間進捗は、下部ナビの「詳しい」から「詳しい進捗を見る」を開いて確認します。
7. その日の気づきは、振り返りメモに残せます。
8. 別端末でも使う場合は、下部ナビの「設定」から「プロフィール」を開き、その下の「クラウド保存・同期」を展開してログインします。ログイン成功後（Google / Magic Link 共通）はそのアカウントのクラウドデータが自動読み込みされます。ログイン中は変更が約45秒後に自動でクラウド保存されます（auto-load 完了後）。必要に応じて「クラウドに保存」「クラウドから読み込み」も使えます。

## データ保存仕様

Phase Data-1（2026-06）で整理済み。コード変更は行わず、本節を仕様の参照先としています。

### 保存の二層構造

| 層 | 保存先 | 用途 |
|----|--------|------|
| 端末保存 | ブラウザ `localStorage` | 通常操作はすべて即時反映 |
| クラウド保存 | Supabase `user_app_data.app_data` | ログイン中のバックアップ・別端末復元 |

- ログイン中は、同期対象データの変更が **45秒 debounce** でクラウド自動保存されます。
- **ログイン直後は auto-load 完了まで auto-save しません**（Data-2 Core）。
- クラウド payload には **`version: 2`** を含めます（`appName: "MILE"`, `savedAt`, `data`）。v1 データとの互換読み込みあり。

### localStorage キー一覧

| キー | 用途 | クラウド同期 | 備考 |
|------|------|-------------|------|
| `idealIslandGoals` | 年間 / 今月 / 今日タブのタスク一覧 | 対象（`goalsByTab`） | タスクの期限・カテゴリ・完了状態など |
| `mileGoalPlan` | 年間・今月目標の構造化データ | 対象（`goalPlan`） | 下記スキーマ参照 |
| `mileReflectionNotes` | 振り返りメモ（日付キー） | 対象（`reflectionNotes`） | `{ "YYYY-MM-DD": "text" }` |
| `idealIslandSlogan` | スローガン | 対象（`slogan`） | 文字列 |
| `mileUserProfile` | プロフィール表示名・アイコン | **対象**（`userProfile`） | `{ icon, displayName }`。Data-2 Core 以降 |
| `mileCloudSavedSnapshotHash` | dirty 判定用ハッシュ | 対象外 | 端末メタ |
| `mileCloudLastSavedAt` | 最終クラウド保存時刻 | 対象外 | 端末メタ |
| `mileCloudLoginLastSentAt` | ログインリンク再送クールダウン | 対象外 | 端末メタ |
| `mileCloudLoadBackup` | クラウド読み込み直前の退避 | 対象外 | 下記バックアップ参照 |

キー名に `idealIsland*` と `mile*` が混在しています。統一は影響が大きいため後回し（Data 系後続フェーズで検討）。

### クラウド同期対象（`collectLocalAppData().data`）

Supabase に保存する `data` の中身（**Data-2 Core / version 2**）:

- `goalsByTab` ← `idealIslandGoals`
- `goalPlan` ← `mileGoalPlan`
- `reflectionNotes` ← `mileReflectionNotes`
- `slogan` ← `idealIslandSlogan`
- `userProfile` ← `mileUserProfile`（`{ displayName, icon }`。未設定時は空文字）

**同期対象外**（意図的に含めない）:

- `mileCloudSavedSnapshotHash` / `mileCloudLastSavedAt`（同期メタ）
- `mileCloudLoginLastSentAt`（ログイン再送クールダウン）
- `mileCloudLoadBackup`（読み込み前バックアップ）

dirty 判定は上記 5 フィールドの JSON ハッシュ（`collectLocalAppData().data` 全体）。`version` / `savedAt` の変更では dirty になりません。

**v1 クラウドデータ**: `userProfile` がなくても読み込み可能。手動「クラウドから読み込み」時は既存 `mileUserProfile` を上書きしない。

### 基本保存（localStorage）の内容

データはブラウザの `localStorage` に保存しています。通常の操作はすべて端末内に即時反映されます。

アプリデータとして保持する主な内容:

- タスク一覧（期限・カテゴリ・完了状態・`completedAt`・`monthlyGoalId` など）
- 振り返りメモ
- スローガン
- 年間目標・今月目標（`mileGoalPlan`）
- プロフィール表示用メタ（`mileUserProfile`）
- クラウド同期メタ（hash / 最終保存時刻）

逆算型目標管理用のデータは `mileGoalPlan` に保存しています。

```js
const mileGoalPlan = {
  yearlyGoal: {
    id: "year-2026",
    title: "",
    memo: "",
    category: "その他",
    createdAt: "",
    updatedAt: ""
  },
  monthlyGoals: [
    {
      id: "month-2026-06-xxxx",
      yearGoalId: "year-2026",
      title: "",
      month: "2026-06",
      category: "仕事",
      memo: "",
      createdAt: "",
      updatedAt: ""
    }
  ],
  dailyTasks: []
};
```

現在は、既存タスク側に `monthlyGoalId` を持たせて、今日のタスクと今月目標を紐づけています。

### クラウド保存（Supabase）

- Supabaseログインに対応しています（Google OAuth + メールリンク方式）。
- 保存先テーブル: `user_app_data`（`app_data` に上記 **`version: 2`** 形式の JSON）。**Supabase テーブル変更なし**。
- **ログイン成功後**（Google / Magic Link 共通）: `user.id` のクラウドデータを **自動読み込み**（Data-2 Core）。auto-load 完了まで auto-save しない。
- ログイン中、同期対象の変更は **45秒 debounce** で自動クラウド保存されます（auto-load 完了後）。
- 「クラウドに保存」「クラウドから読み込み」による手動操作も利用できます。
- クラウド保存セクションに同期状態（未保存 / 保存中 / 保存済み / 失敗）を表示します。
- 「クラウドに保存」は、同期対象の `localStorage` 内容を Supabase へ送ります。
- 「クラウドから読み込み」は、Supabase のデータを同期対象キーへ `localStorage` に反映します（confirm あり。v1 データは `userProfile` なしでも可）。
- **クラウドデータが空**の新規アカウント: 端末データを自動アップロードせず、`backupLocalAppData()` 後に空画面を表示します。
- 読み込み前には上書き確認ダイアログが表示されます（手動読み込み時）。
- 保存中にさらに編集された場合は、誤って「クラウド保存済み」と判定しないよう、保存開始時のスナップショットと成功後のローカル状態を比較します。
- ログイン → 保存 → 別端末読み込みの E2E は Cloud-6 時点で確認済み。Data-2 Core 実ログイン E2E（auto-load / A→B 切替等）は未完了 / 保留（手動確認待ち）。

### プロフィール（`mileUserProfile`）の扱い

- **端末**: 設定エリアの折りたたみ「プロフィール」内で編集し、`localStorage` に保存（表示名は保存値のまま。Hello の「さん」は表示時のみ付与）。
- **クラウド同期（Data-2 Core）**: `collectLocalAppData().data.userProfile` として同期対象。`saveProfileSettings` / `resetProfileSettings` で dirty。
- **読み込み**: v2 データは `userProfile` を反映。v1 データ（`userProfile` なし）の手動読み込みでは既存プロフィールを上書きしない。ログイン auto-load 時は v1 でもプロフィールを空にリセット（アカウント混在防止）。

### バックアップ仕様（`mileCloudLoadBackup`）

- **タイミング**:
  - 手動「クラウドから読み込み」確定後、`apply` の直前
  - **空クラウド auto-load** 時、`applyEmptyAppDataToLocal()` の直前（Data-2 Core）
- **退避内容**: 同期対象 5 キーの raw 文字列 + **`mileUserProfile`**（同期メタは含まない）。
- **復元 UI**: 未実装（DevTools 等での手動復元のみ）。
- **今後**: 復元 UI または失敗時ロールバックは **Data-2 後続候補**。

### version 管理

- クラウド payload は **`version: 2`**（Data-2 Core）。従来の v1 データも読み込み可能。
- `userProfile` 追加が v2 の主な差分。読み込み時の厳密な version 検証・マイグレーション UI は **未実装**。
- Supabase テーブル変更は行っていない（`user_app_data.app_data` JSON のみ）。

### MILEポイント（Phase World-1）

- **考え方**: 今日タスクを1つ完了するたびに +1 MILE（別キーでのポイント保存はしない）。
- **今日のMILE**: `goalsByTab.today` のうち、`completedAt` の日付が**今日**のタスク数。
- **今週のMILE**: 同上のうち、`completedAt` が**今週（月曜始まり）**内のタスク数。
- **算出元**: 既存タスクの `completedAt` から再計算（新しい `localStorage` キーは追加していない）。
- **完了取り消し**: `completedAt` が空になるとカウントから外れる。取り消し時はトーストは出さない。
- **クラウド同期**: MILEポイント専用の同期対象は増やしていない（タスク更新に伴う従来の同期のみ）。

### MILEステージ・バッジ（Phase World-2）

- **算出元**: `goalsByTab.today` の `completedAt` のみ（新しい `localStorage` キーは追加していない）。
- **累計MILE**: `completedAt` が有効な今日タスクの総数（ステージ・一部バッジに使用）。
- **バッジ用の連続達成**: 今日タブの `completedAt` から算出（`getMileStreakDays`）。バッジ「コツコツさん」などに使用。
- **バッジ**: 条件を満たしたものだけ表示。獲得履歴は保存せず、毎回 `completedAt` から再判定。
- **表示位置**: ダッシュボード直下の MILEステージカード（`#mile-world-section`）。
- **クラウド同期**: 専用の同期対象は増やしていない。`collectLocalAppData()` は変更していない。

### 連続達成日数の表示（詳しい進捗）

- **算出**: 全タブの `completedAt` から連続日数を再計算（`getStreakProgress`）。Release-2 以降、トップの MILEステージカードには表示しません。
- **表示位置**: 進捗エリアの `<details class="progress-details">` 内（「詳しい進捗を見る」）。直近7日のドット表示あり。
- **下部ナビ**: 「詳しい」タップで `#progress-section` へスクロールし、詳しい進捗を開いた状態にします。

### β版UI整理（Phase Release-2）

- **今日やること一覧**: `#goal-console` 内の `.today-tasks-card`（フィルター + `#goalList` のみ）。
- **今日やることを追加**: `#today-add-section.today-add-card`（`#toggleGoalFormButton` + `#goalForm`）。一覧の直下に独立配置。
- **トップの軽量化**: MILEステージカードから連続達成ブロックを削除。バッジ未獲得時の案内を控えめに表示。
- **データ**: 新規 `localStorage` キーなし。`collectLocalAppData()`・クラウド同期対象は変更なし。

### トップ画面UI・配色・ナビ・設定（Phase Release-3）

- **UI整理のみ**: データ構造・保存キー・クラウド同期・Supabase 設定は変更していません。
- **今日の達成率**: `.dashboard-primary` を淡いミント系（背景 `#f1f8e8`、緑系枠・進捗バー）に調整。
- **今日のToDo**: `.today-todo-heading`（「今日のToDo」）を `.task-filter` の直上に配置。一覧は `.today-tasks-card` で枠・背景を少し強化。
- **タスクカード**: 通常 / 期限あり（クリーム系）/ 完了済みの視認性を改善。`has-due-date` は `dueDate` があるタスクのみ（`renderGoalItem`）。
- **今日やることを追加**: `#today-add-section.today-add-card` を淡い緑系の独立カードに。トグル・フォームの読みやすさを調整。
- **下部ナビ**: 絵文字をやめ、**inline SVG** の線画アイコン（チェックリスト / ターゲット / 棒グラフ / 歯車）。外部アイコンライブラリは使っていません。
- **プロフィール設定**: `#profile-settings-section` を `<details class="settings-fold">` 化。初期は閉。下部ナビ「設定」タップで `open = true` してスクロール。
- **クラウド保存・同期**: `#settings-section` を `<details>` 化。summary 付近で `cloudStatusBadge` / `cloudSyncStatus` を確認可能。開閉状態は `localStorage` に保存しない。
- **データ**: 新規 `localStorage` キーなし。`collectLocalAppData()` 変更なし。クラウド同期対象の追加なし。Supabase URL / ANON_KEY 変更なし。

### 文言の軽微整理（Phase Release-4）

- **UI文言のみ**: データ構造・保存キー・クラウド同期・Supabase 設定は変更していません。
- **プロフィール summary**: `settings-fold-summary-label` で「プロフィール」（開閉とも同じ見出し）。
- **クラウド summary**: 「クラウド保存・同期」。`cloudStatusBadge` / `cloudSyncStatus` は summary 内に維持。
- **Hello 挨拶**: `getGreetingDisplayName()` で表示時に「さん」を付与。末尾が「さん」の名前はそのまま。空のときは `Hello!`。
- **コミット**: `56bc682` fix(ui): refine profile cloud and greeting labels

### バッジ追加・獲得トースト（Phase World-3 mini）

- **追加バッジ**（`getMileStats()` の既存指標のみ。新規 `localStorage` キーなし）:

| バッジ | 条件 |
|--------|------|
| 今週スタート | 今週のMILE 1以上（`weekMile >= 1`） |
| 今日3歩 | 今日のMILE 3以上（`todayMile >= 3`） |
| 10MILE | 累計MILE 10以上（`totalMile >= 10`） |

- **獲得トースト**: 今日タブで未完了→完了時、完了前後の stats を比較（`getNewlyEarnedBadgeLabels`）。新規バッジがあれば「バッジ獲得」+ ラベル、なければ従来の +1 MILE トースト。
- **やっていないこと**: ステージ演出・ステージアップ専用トースト、未獲得バッジ一覧、装飾・アニメーション強化。
- **データ**: `collectLocalAppData()`・Supabase・クラウド同期対象は変更なし。3 HTML 同期（`94e70b6`）。

#### バッジ条件（全件）

| バッジ | 条件 |
|--------|------|
| はじめの一歩 | 累計MILE 1以上 |
| 今週スタート | 今週のMILE 1以上 |
| 今日3歩 | 今日のMILE 3以上 |
| コツコツさん | 連続達成 3日以上 |
| 今週いい感じ | 今週のMILE 5以上 |
| 10MILE | 累計MILE 10以上 |
| かなり前進 | 累計MILE 30以上 |

獲得済みのみステージカードに表示。未獲得バッジ一覧は作っていません。未獲得時は「まだバッジはありません」と控えめに表示します。

#### ステージ条件（累計MILE）

| 累計MILE | ステージ |
|----------|---------|
| 0〜4 | 🌱 はじめの一歩 |
| 5〜14 | 🌿 小さな芽 |
| 15〜29 | 🪴 育ってきた |
| 30〜49 | 🌼 花が咲きそう |
| 50以上 | 🏝️ 自分の道が見えてきた |

### 今後の Data 系候補

- バックアップ復元 UI（Data-2 後続）
- 端末データをクラウドへ取り込む確認 UI（Data-2 後続）
- ゲストデータ復元 UI
- `idealIslandGoals` と `mileGoalPlan` の二重構造整理（影響大・別途設計）
- `localStorage` キー名統一（`idealIsland*` → `mile*` 等、破壊的マイグレーションのため後回し）

## Launch-1 本番QA（2026-06-04）

- **URL**: https://ideal-island.vercel.app/
- **判定**: 合格（P0/P1なし）
- **確認済み**: スマホ 320 / 375 / 390px（横スクロールなし、下部ナビ、今日のToDo、明日へ、今月/年間目標、設定 details）
- **直近機能の本番反映**: World-3 mini（バッジ獲得トースト）、Todo-1（明日へ）、GoalView-1（ほかの月の目標・年間ジャンル）
- **基本操作**: タスク CRUD、目標 CRUD、プロフィール保存/リセット、振り返りメモ
- **クラウド**: 未ログイン UI、`collectLocalAppData()` 4項目維持（`goalsByTab`, `goalPlan`, `reflectionNotes`, `slogan`）
- **PWA / 本番**: `manifest.json`、`icon-192` / `icon-512`、初回ロード時の致命的コンソールエラーなし
- **既知課題（修正見送り）**
  - **P2**: スローガン編集 UI が `.slogan-card { display: none !important; }` により画面上から操作不可（`saveSlogan()` は動作）
  - **P3**: ログイン後のクラウド保存/読み込みは手動QA待ち
  - **P3**: 「ほかの月の目標」0件時の empty state は未検証
- **次アクション**: Supabase ログイン後のクラウド保存/読み込み手動確認。スローガン UI 復帰は Launch-2 以降に判断

## Data-2 Core（`9c11037` / `9d10a2a` / `5ffb027`）

- **実装コミット**: `9c11037` feat(data-2): auto-load cloud data on login and sync profile v2（push 済み・本番反映済み）
- **P2 修正**: `5ffb027` fix(ui): update profile settings copy for Data-2 cloud sync（push 済み・本番反映済み）
- **Docs**: `9d10a2a` docs: record Data-2 Core implementation and local QA results / `2acbd70` docs: record Data-2 Core production QA partial pass
- **ローカル QA**: 実施済み（Playwright + コードレビュー）

**実装内容**

- `app_data.version: 2`、`collectLocalAppData().data.userProfile` 追加
- プロフィール名・アイコンのクラウド同期（`saveProfileSettings` / `resetProfileSettings` で dirty）
- Google / Magic Link 共通: ログイン後 `user.id` のクラウドデータを自動読み込み
- ログイン直後 auto-save 抑止（auto-load 完了まで端末データを別アカウントへ自動保存しない）
- クラウド空の新規アカウント: `backupLocalAppData()` 後に空画面（端末データの自動アップロードなし）
- v1 クラウドデータ（`userProfile` なし）も読み込み可
- `backupLocalAppData()` に `mileUserProfile` 追加
- Supabase テーブル変更なし。3 HTML 同期済み

**未実装（Data-2 後続）**

- 端末データ取り込み UI、バックアップ復元 UI、ゲストデータ復元 UI

## Data-2 Core 本番QA（2026-06-06）

- **URL**: https://ideal-island.vercel.app/
- **本番反映**: `9c11037` / `9d10a2a` / `5ffb027`（HTML コードマーカーで Data-2 Core 確認）
- **判定**: 部分合格（P0/P1なし）
- **確認済み**
  - `collectLocalAppData().version === 2`
  - `collectLocalAppData().data.userProfile` あり
  - `autoLoadCloudDataForUser` / auto-save guard / 空クラウド backup 分岐が本番 JS に存在
  - Google / Magic Link ボタン表示
  - 初回ロードの致命的コンソールエラーなし
  - **P2（プロフィール説明文）**: `5ffb027` で修正済み（「クラウド同期対象外」文言なし）
- **既知課題（P3・実ログイン E2E 未実施）**
  - Google / Magic Link ログイン後 auto-load E2E 未実施
  - A→B アカウント切替 E2E 未実施
  - プロフィール同期 E2E 未実施
  - 空クラウド新規アカウントの空画面 E2E 未実施
- **次アクション**: ユーザー本人が Google アカウントで手動 E2E 確認 → Docs 更新 → Monthly-2

## Data-2 Core 実アカウントE2E QA（2026-06-06）

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
- **次アクション**: ユーザー本人が Google アカウントで手動 E2E 確認 → 確認結果を Docs 更新 → 問題なければ Monthly-2 へ

## Cloud-Login-1 本番QA（2026-06-05）

- **本番反映**: `c75f7de` feat(cloud-login): add Google OAuth login button
- **URL**: https://ideal-island.vercel.app/
- **判定**: 部分合格
- **確認済み**
  - 「Googleでログイン」ボタン表示
  - Magic Link（メール入力 + 「ログインリンクを送る」）残存
  - Google OAuth へ遷移（`accounts.google.com`）
  - `collectLocalAppData()` 4項目維持（`goalsByTab`, `goalPlan`, `reflectionNotes`, `slogan`）
  - `applyCloudAppDataToLocal()` はプロフィール（`mileUserProfile`）非対象
  - 初回ロードの致命的コンソールエラーなし
- **手動未完了**
  - Google ログイン完了後のクラウド保存 / 読み込み E2E
  - 年間目標ジャンル保持（読み込み後）
  - プロフィール非上書き（読み込み後実機）
- **既知仕様（Cloud-Login-1 時点・Data-2 Core で更新）**
  - クラウド保存はログインアカウントごとの `user.id` に保存される（`user_app_data`）
  - **Data-2 Core 以降**: ログイン後 auto-load。空クラウドは backup 後に空画面
  - 手動「クラウドから読み込み」は confirm 後に上書き（従来どおり）
  - プロフィールは **Data-2 Core 以降クラウド同期対象**（v2 `userProfile`）
- **次アクション**: 実アカウント E2E は Data-2 Core 実アカウントE2E QA 参照（手動 Google E2E 待ち）

## 現在の制限

- クラウド機能はログイン後のみ利用可能
- クラウド自動保存は debounce 方式（リアルタイム同期ではない）。ログイン直後は auto-load 完了まで auto-save しない
- 同じブラウザ内で基本保存される
- ブラウザのデータ削除を行うと端末内の保存内容も消える可能性あり
- クラウド読み込み前バックアップの復元 UI はない
- Data-2 Core 実ログイン E2E（Google / Magic Link auto-load / A→B 切替 / プロフィール同期 / 空クラウド空画面 / 手動保存読み込み）は **未完了 / 保留**（手動確認待ち）
- 端末データをクラウドへ取り込む確認 UI は未実装

## ファイル構成メモ

- `index.html`
- `outputs/index.html`
- `ideal-island/outputs/index.html`
- `manifest.json`
- `assets/icons/`（PWAアイコン）

現状は3つの `index.html` を同一内容で同期しています。Vercel公開ではプロジェクト直下の `index.html` が使われている想定です。

## デプロイ情報

- GitHub `main` ブランチとVercelが連携
- `main` にpushすると自動デプロイされる想定
- 公開URL: https://ideal-island.vercel.app/

## 今後の追加予定

1. **ユーザー本人が Google アカウントで Data-2 Core 手動 E2E 確認**（Magic Link は可能なら）
2. **確認結果を Docs 更新**
3. **問題なければ Monthly-2 へ進む**
- Data-2 後続: バックアップ復元 UI、端末データ取り込み UI
- Launch-2 候補: スローガン編集 UI 復帰

後回し: ステージ演出強化、未獲得バッジ一覧、Profile-6 画像、年間目標アイコン

完了済み（参考）: UX-1, Profile-4, Profile-5, Data-1（調査・ドキュメント）, World-1, World-2, World-3 mini, Todo-1, GoalView-1, Release-2, Release-3, Release-4, Launch-1（本番QA・Docs）, Cloud-Login-1（Google OAuth・本番QA部分合格・Docs `cfa585e`）, **Data-2 Core**（`9c11037` / `5ffb027`・本番QA部分合格・P2修正済み・実アカウントE2E保留）

## 作業時の確認コマンド

```bash
git status
git log --oneline -5
```
