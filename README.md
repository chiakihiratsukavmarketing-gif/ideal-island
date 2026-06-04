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
- Vercel反映済み（最新コード `56bc682`）
- 作業ツリーは clean の想定

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
- 年間目標のメモ保存
- 年間進捗表示
- 今月目標の追加 / 編集 / 削除
- 今月目標のカテゴリ・メモ保存
- 今月目標のアイコン選択
- 今月目標ごとの進捗表示
- 今日タスクの追加 / 編集 / 削除
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
- スローガン編集
- Supabaseログイン（メールリンク）
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
5. タスクを完了すると、今日・今月・年間の進捗に反映されます。今日タブで完了すると +1 MILE のトーストが表示され、ダッシュボードの MILE 数・ステージ・バッジも更新されます。
6. 連続達成日数や週間進捗は、下部ナビの「詳しい」から「詳しい進捗を見る」を開いて確認します。
7. その日の気づきは、振り返りメモに残せます。
8. 別端末でも使う場合は、下部ナビの「設定」から「プロフィール」を開き、その下の「クラウド保存・同期」を展開してログインします。ログイン中は変更が約45秒後に自動でクラウド保存されます。必要に応じて「クラウドに保存」「クラウドから読み込み」も使えます。

## データ保存仕様

Phase Data-1（2026-06）で整理済み。コード変更は行わず、本節を仕様の参照先としています。

### 保存の二層構造

| 層 | 保存先 | 用途 |
|----|--------|------|
| 端末保存 | ブラウザ `localStorage` | 通常操作はすべて即時反映 |
| クラウド保存 | Supabase `user_app_data.app_data` | ログイン中のバックアップ・別端末復元 |

- ログイン中は、同期対象データの変更が **45秒 debounce** でクラウド自動保存されます。
- クラウド payload には **`version: 1`** を含めます（`appName: "MILE"`, `savedAt`, `data`）。

### localStorage キー一覧

| キー | 用途 | クラウド同期 | 備考 |
|------|------|-------------|------|
| `idealIslandGoals` | 年間 / 今月 / 今日タブのタスク一覧 | 対象（`goalsByTab`） | タスクの期限・カテゴリ・完了状態など |
| `mileGoalPlan` | 年間・今月目標の構造化データ | 対象（`goalPlan`） | 下記スキーマ参照 |
| `mileReflectionNotes` | 振り返りメモ（日付キー） | 対象（`reflectionNotes`） | `{ "YYYY-MM-DD": "text" }` |
| `idealIslandSlogan` | スローガン | 対象（`slogan`） | 文字列 |
| `mileUserProfile` | プロフィール表示名・アイコン | **対象外** | `{ icon, displayName }` |
| `mileCloudSavedSnapshotHash` | dirty 判定用ハッシュ | 対象外 | 端末メタ |
| `mileCloudLastSavedAt` | 最終クラウド保存時刻 | 対象外 | 端末メタ |
| `mileCloudLoginLastSentAt` | ログインリンク再送クールダウン | 対象外 | 端末メタ |
| `mileCloudLoadBackup` | クラウド読み込み直前の退避 | 対象外 | 下記バックアップ参照 |

キー名に `idealIsland*` と `mile*` が混在しています。統一は影響が大きいため後回し（Data 系後続フェーズで検討）。

### クラウド同期対象（`collectLocalAppData().data`）

Supabase に保存する `data` の中身:

- `goalsByTab` ← `idealIslandGoals`
- `goalPlan` ← `mileGoalPlan`
- `reflectionNotes` ← `mileReflectionNotes`
- `slogan` ← `idealIslandSlogan`

**同期対象外**（意図的に含めない）:

- `mileUserProfile`（プロフィール）
- `mileCloudSavedSnapshotHash` / `mileCloudLastSavedAt`（同期メタ）
- `mileCloudLoginLastSentAt`（ログイン再送クールダウン）
- `mileCloudLoadBackup`（読み込み前バックアップ）

dirty 判定は上記 4 フィールドの JSON ハッシュのみ。`version` / `savedAt` の変更では dirty になりません。

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

- Supabaseログインに対応しています（メールリンク方式）。
- 保存先テーブル: `user_app_data`（`app_data` に上記 `version: 1` 形式の JSON）。
- ログイン後、同期対象 4 種の変更は **45秒 debounce** で自動クラウド保存されます。
- 「クラウドに保存」「クラウドから読み込み」による手動操作も利用できます。
- クラウド保存セクションに同期状態（未保存 / 保存中 / 保存済み / 失敗）を表示します。
- 「クラウドに保存」は、同期対象の `localStorage` 内容を Supabase へ送ります。
- 「クラウドから読み込み」は、Supabase のデータを同期対象キーのみ `localStorage` へ反映します（プロフィールは上書きしません）。
- 読み込み前には上書き確認ダイアログが表示されます。
- 保存中にさらに編集された場合は、誤って「クラウド保存済み」と判定しないよう、保存開始時のスナップショットと成功後のローカル状態を比較します。
- ログイン → 保存 → 別端末読み込みの E2E は確認済みです。

### プロフィール（`mileUserProfile`）の扱い

- **現在**: 端末ローカルのみ。設定エリアの折りたたみ「プロフィール」内で編集し、`localStorage` に保存します（表示名は保存値のまま。Hello の「さん」は表示時のみ付与）。
- **クラウド同期**: **対象外**（Profile-4 時点の意図どおり）。
- **今後**: Data-2 でクラウド同期対象にするか検討（別端末で同じ表示名・アイコンを使う需要と、既存 `app_data` との互換性を先に設計する）。

### バックアップ仕様（`mileCloudLoadBackup`）

- **タイミング**: 「クラウドから読み込み」確定後、`apply` の直前。
- **退避内容**: 同期対象 4 キーの raw 文字列のみ（プロフィール・同期メタは含まない）。
- **復元 UI**: 未実装（DevTools 等での手動復元のみ）。
- **今後**: 復元 UI または失敗時ロールバックは **Data-2 候補**。

### version 管理

- クラウド payload には既に **`version: 1`** があります。
- 読み込み時の version 検証・マイグレーションは **未実装**（設計メモのみ。実装は Data-2 候補）。
- `version: 2` 以降を導入する場合は、既存 Supabase データとの互換方針を先に文書化してから実装します。

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

#### バッジ条件

| バッジ | 条件 |
|--------|------|
| はじめの一歩 | 累計MILE 1以上 |
| コツコツさん | 連続達成 3日以上 |
| 今週いい感じ | 今週のMILE 5以上 |
| かなり前進 | 累計MILE 30以上 |

未獲得時は「まだバッジはありません」と控えめに表示します。

#### ステージ条件（累計MILE）

| 累計MILE | ステージ |
|----------|---------|
| 0〜4 | 🌱 はじめの一歩 |
| 5〜14 | 🌿 小さな芽 |
| 15〜29 | 🪴 育ってきた |
| 30〜49 | 🌼 花が咲きそう |
| 50以上 | 🏝️ 自分の道が見えてきた |

### 今後の Data 系候補

- version 検証 / マイグレーション（Data-2）
- バックアップ復元 UI（Data-2）
- プロフィールのクラウド同期（Data-2）
- `idealIslandGoals` と `mileGoalPlan` の二重構造整理（影響大・別途設計）
- `localStorage` キー名統一（`idealIsland*` → `mile*` 等、破壊的マイグレーションのため後回し）

## 現在の制限

- クラウド機能はログイン後のみ利用可能
- クラウド自動保存は debounce 方式（リアルタイム同期ではない）
- 同じブラウザ内で基本保存される
- ブラウザのデータ削除を行うと端末内の保存内容も消える可能性あり
- プロフィールは端末ローカルのみ（別端末では自動表示または端末ごとの設定）
- クラウド読み込み前バックアップの復元 UI はない

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

- Phase Data-2: 同期対象・バックアップ・version 検証の整理（実装）
- Phase World-3: バッジ追加、ステージ演出の改善、達成演出の改善

完了済み（参考）: UX-1, Profile-4, Profile-5, Data-1（調査・ドキュメント）, World-1, World-2, Release-2, Release-3, Release-4

## 作業時の確認コマンド

```bash
git status
git log --oneline -5
```
