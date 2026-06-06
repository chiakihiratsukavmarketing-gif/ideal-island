# MILE 次回再開メモ

## 現在の状態

- プロダクト名: MILE
- 公開URL: https://ideal-island.vercel.app/
- GitHub `main` ブランチとVercelが連携済み
- `main` にpushすると自動デプロイされる想定
- 最新 Docs コミット: `cfa585e` docs: record Cloud-Login-1 production QA partial pass
- Data-2 Core 実装: `9c11037` feat(data-2): auto-load cloud data on login and sync profile v2（ローカル・未 push）
- Cloud-Login-1 実装: `c75f7de` feat(cloud-login): add Google OAuth login button（push 済み・本番反映済み）
- GoalView-1 実装: `24ee53e`（Monthly-1）/ `f6f7a0c`（Goal-1）、本番反映済み
- Todo-1: `8929ed0`、World-3 mini: `94e70b6`、本番反映済み
- Launch-1 本番QA: 2026-06-04 実施、合格（P0/P1なし）
- Cloud-Login-1 本番QA: 2026-06-05 実施、部分合格（OAuth開始まで OK、ログイン後 E2E は手動未完了）
- Data-2 Core ローカルQA: 実施済み（Playwright + コードレビュー）。本番 Google / Magic Link / A→B 切替 E2E は未実施
- 直近 UI 文言: `56bc682` fix(ui): refine profile cloud and greeting labels
- `index.html` / `outputs/index.html` / `ideal-island/outputs/index.html` は同一内容で同期
- `work/` と `ideal-island/work/` はGit管理対象外

### 動作確認済み

- 端末保存は自動（`localStorage`）
- ログイン中はクラウド自動保存（45秒 debounce）。**ログイン直後は auto-load 完了まで auto-save しない**（Data-2 Core）
- ログイン成功後（Google / Magic Link 共通）、`user.id` のクラウドデータを自動読み込み（Data-2 Core）
- 保存状態表示あり
- スマホ表示OK
- PWAアイコンOK
- 別端末確認OK
- Vercel公開済み
- β版公開前総点検済み（Release-1、2026-06-04）
- Release-3 UI・配色・ナビ・設定折りたたみ（`19e7830`、Vercel反映済み）
- Release-4 文言整理（summary・Hello「さん」、`56bc682`、Vercel反映済み）
- Release-4 Docs（`210d500`）
- Launch-1 本番QA（2026-06-04）
  - https://ideal-island.vercel.app/ で Playwright 自動確認 + 静的アセット確認
  - スマホ 320 / 375 / 390px、直近機能、CRUD、未ログインクラウド UI、PWA
  - P0/P1 なし。P2: スローガン UI 非表示。P3: ログイン後クラウド手動QA待ち、月間 empty 未検証
- Cloud-Login-1 本番QA（2026-06-05）
  - 本番 `c75f7de`：Googleでログイン表示、Magic Link 残存、OAuth→Google 遷移 OK
  - `collectLocalAppData()` 4項目、`applyCloudAppDataToLocal()` プロフィール非対象、コンソール OK
  - 手動未完了: Google ログイン完了後の保存/読み込み E2E
  - **Data-2 Core 以降**: ログイン後 auto-load・プロフィール同期・空クラウド時 backup 後の空画面。本番 E2E は後続 QA

## ローンチ前の方針（2026-06）

- **装飾フェーズは最小限**（バッジ追加以上の大きな演出は入れない）
- **実用性優先**（ToDoの別日移動、目標の見返し導線など）
- **併せられる作業は併せる**（1フェーズ = 1〜数コミットで完結）
- **データ**: 既存 `localStorage` / `collectLocalAppData()` を壊さない最小仕様から入る
- **後回し**: プロフィール画像、年間目標アイコン、バックアップ復元 UI、端末データ取り込み UI、ステージ演出強化

## ここまで完了したフェーズ

- スマホUI安定化
- Phase Dashboard-1
  - 上部ダッシュボードを追加
  - 今日の達成率、残り、完了、今月、年間、次にやることを表示
- Phase UI-1
  - ダッシュボードをコンパクト化
  - 進捗エリアの重複表示を整理
  - 画面内の「年間 / 今月 / 今日」タブ風UIを非表示
- Phase UI-2
  - 今日やることをダッシュボード直下へ移動
  - 今月の目標、年間目標をその下へ移動
- Phase UI-3
  - 今月の目標カードをコンパクト化
  - 年間目標カードをコンパクト化
- Phase Fun-1
  - 今月目標に `icon` プロパティを追加
  - 既存データへの `icon` 補完処理を追加
  - 今月目標追加・編集フォームにアイコン選択を追加
  - 今月目標カード、今日タスク一覧、ダッシュボードにアイコン表示を追加
- Phase Fun-1.5
  - アイコン実機確認チェックリスト作成済み
- Phase Cloud（ログイン / 手動保存・読み込み）
  - SupabaseログインUI
  - 手動クラウド保存 / 読み込み
- Phase Cloud-5
  - クラウド保存UIの文言整理
  - README / CONTINUE を現状に合わせて更新
  - 3つの HTML 同期
- Phase Cloud-6
  - クラウド保存 E2E 確認完了（ログイン → 保存 → 別端末読み込み）
- Phase Cloud-7
  - ログインリンク再送クールダウン（60秒）完了
- Phase Cloud-8
  - クラウド保存忘れ防止UI完了（未保存の変更表示）
- Phase Cloud-9
  - クラウド自動保存完了（45秒 debounce）
- Phase Cloud-10
  - 同期状態・最終保存日時表示完了
  - 保存中編集時の誤同期防止（保存開始スナップショット比較）
- Phase Profile-1
  - プロフィール表示（Hello / アイコン）完了
- Phase Profile-2
  - プロフィール上部ヘッダー化完了
- Phase Profile-3
  - Hello / アイコンを MILE hero カード外へ分離完了
- Phase PWA-1
  - PWAアイコン修正完了（`assets/icons/`）
- Phase Beta-1
  - スマホ実機確認完了
- Phase Docs-1
  - README / CONTINUE を現状に合わせて更新完了
- Phase Release-1（完了日: 2026-06-04）
  - β版公開前の総点検完了
  - git / 公開URL / PWA / クラウド同期 / スマホ表示 / ドキュメント確認済み
  - β版公開を止める致命的問題なし
- Phase UX-1
  - トップ余白・モバイル hero の微調整完了
- Phase Profile-4
  - プロフィール設定 UI（表示名・アイコン）完了
  - ~~`mileUserProfile` はクラウド同期対象外のまま~~ → **Data-2 Core でクラウド同期対象に**
- Phase Data-1（調査完了、コード変更なし）
  - `localStorage` キー・クラウド同期対象・バックアップ・version・プロフィール方針を整理
  - README / CONTINUE に仕様を反映
  - 今すぐ修正すべきブロッカーなし
- Phase Profile-5
  - プロフィールアイコン候補を MILE らしい絵文字セットに更新（🌿 🍀 🌙 🕊️ 等）
- Phase World-1
  - ダッシュボードに MILEポイント表示（今日のMILE / 今週のMILE）
  - 今日タスク達成時の +1 MILE トースト（「今日」タブ・未完了→完了のみ）
  - 新規 `localStorage` キーなし、`completedAt` から算出
  - クラウド同期対象の追加なし
- Phase World-2
  - ダッシュボード直下に MILEステージカード
  - 累計MILEによるステージ表示（アイコン・ステージ名）
  - 次のステージまであと○MILE
  - 条件達成バッジ（はじめの一歩 / コツコツさん / 今週いい感じ / かなり前進）
  - 今日のMILE / 今週のMILE / 累計MILE と連動
  - 新規 `localStorage` キーなし、クラウド同期対象の追加なし
- Phase Release-2
  - 「今日やることを追加」を `#today-add-section` として一覧の下に独立配置
  - 連続達成日数を「詳しい進捗を見る」内へ移動（MILEステージカードから削除）
  - MILEステージカードのコンパクト化、バッジ未獲得時の控えめ表示
  - 下部ナビ「進捗」→「詳しい」（タップで詳しい進捗を開く）
  - 新規 `localStorage` キーなし、クラウド同期対象の追加なし
  - 3 HTML 同期、push 済み（`96fd991` / `6f66f0b` / `8fbc1e1` 含む Release-2 系）
- Phase Release-3
  - 今日の達成率カードを淡い緑系へ調整
  - 「今日のToDo」見出しを追加（`.today-todo-heading`）
  - ToDoタスクカードの視認性を改善（通常 / 期限あり / 完了済み）
  - 今日やること追加カード（`#today-add-section`）を淡い緑系へ調整
  - 下部ナビを inline SVG 線画アイコン化（絵文字廃止、外部ライブラリなし）
  - プロフィール設定を `<details>` で折りたたみ化（初期は閉、開閉状態は保存しない）
  - クラウド保存・同期を `<details>` で折りたたみ化（summary にバッジ・同期状態）
  - 新規 `localStorage` キーなし、`collectLocalAppData()` 変更なし
  - クラウド同期対象の追加なし、Supabase設定変更なし
  - 3 HTML 同期、push 済み（`19e7830`）、Vercel反映済み
- Phase Release-4
  - プロフィール折りたたみ summary を「プロフィール」に
  - クラウド折りたたみ summary を「クラウド保存・同期」に（「開く」「閉じる」表記をやめる）
  - Hello 挨拶に「さん」を付与（`getGreetingDisplayName`、表示のみ。保存データは変更しない）
  - 末尾が「さん」の表示名は二重付与しない
  - 新規 `localStorage` キーなし、`collectLocalAppData()` 変更なし
  - クラウド同期対象の追加なし、Supabase設定変更なし
  - 3 HTML 同期、push 済み（`56bc682`）、Vercel反映済み
- Phase World-3 mini
  - `MILE_BADGE_DEFS` にバッジ3件追加（今週スタート / 今日3歩 / 10MILE）
  - 今日タブ完了時、新規バッジ獲得だけトースト出し分け（`getNewlyEarnedBadgeLabels`）
  - **やっていない**: ステージ演出、未獲得バッジ一覧、装飾・アニメーション強化
  - 新規 `localStorage` キーなし、`collectLocalAppData()`・Supabase 変更なし
  - 3 HTML 同期済み（`94e70b6`）、Docs `06c8ad5`
- Phase Todo-1
  - 今日タブの未完了タスクに「明日へ」ボタン（`rescheduleGoal` / `rescheduleGoalToTomorrow`）
  - 表示: 期限なし / 今日期限 / 期限切れ。非表示: 未来日期限・完了済み
  - `dueDate` を翌日に更新、`updatedAt` のみ。`goalsByTab.today` に残す
  - MILE・バッジ・トースト・ダッシュボード達成率/残件は変更なし
  - 任意日付は既存編集フォーム。スマホ 320 / 375 / 390px 確認済み
  - 新規 `localStorage` キーなし、`collectLocalAppData()`・Supabase 変更なし
  - 3 HTML 同期（`8929ed0`）、Docs `07747bb`
- Phase GoalView-1（Monthly-1 + Goal-1）
  - Monthly-1: 「ほかの月の目標」見出し、過去月0件の空状態、既存 `#monthlyGoalArchive` の月別 details、下部ナビ「目標」→ `monthly-goal-section`
  - Goal-1: 年間目標に `category`（表示「ジャンル」、`CATEGORIES` 流用）。`normalizeYearlyGoal()` で「その他」補完。フォーム・カードバッジ
  - 年間目標アイコンは後回し
  - 新規 `localStorage` キーなし、`collectLocalAppData()`・Supabase 変更なし
  - 3 HTML 同期（`24ee53e` / `f6f7a0c`）。Docs `c20ef74`、本番反映済み
- Phase Launch-1（本番QA）
  - URL: https://ideal-island.vercel.app/、判定: 合格（P0/P1なし）
  - `collectLocalAppData()` 4項目維持。manifest / icon / コンソール OK
  - 既知: P2 スローガン UI 非表示、P3 ログイン後クラウド手動QA、P3 月間0件 empty
  - Docs `c37a177`
- Phase Cloud-Login-1
  - 未ログインパネルに「Googleでログイン」ボタン（`signInWithOAuth`、Magic Link は残す）
  - クラウド保存/読み込み・`collectLocalAppData()`・`applyCloudAppDataToLocal()` は未変更（当時）
  - 新規 `localStorage` キーなし。3 HTML 同期（`c75f7de`）、push 済み・本番反映済み
  - 本番QA（2026-06-05）: 部分合格。OAuth 開始まで OK。ログイン後 E2E は手動未完了
  - Docs `cfa585e`
- Phase Data-2 Core（`9c11037`、ローカル・未 push）
  - `app_data.version: 2`、`collectLocalAppData().data.userProfile` 追加（`mileUserProfile`）
  - プロフィール名・アイコンをクラウド同期対象化。`saveProfileSettings` / `resetProfileSettings` で dirty
  - Google / Magic Link 共通: ログイン後 `user.id` のクラウドデータを自動読み込み（`handleCloudAuthSession` / `autoLoadCloudDataForUser`）
  - ログイン直後の auto-save 抑止（auto-load 完了まで `scheduleCloudAutoSave` 停止）
  - クラウド空の新規アカウント: `backupLocalAppData()` 後に空画面（端末データの自動アップロードなし）
  - v1 クラウドデータ（`userProfile` なし）も読み込み可。手動読み込み時はプロフィール非破壊
  - `backupLocalAppData()` に `mileUserProfile` 追加
  - Supabase テーブル変更なし。3 HTML 同期済み
  - ローカル QA 済み。本番 Google / Magic Link / A→B 切替 E2E は未実施（後続 QA）
  - Docs 反映は本作業（未コミット）

## Phase Data-1 調査メモ（2026-06）

- **コード変更**: なし（Data-1 時点。Data-2 Core で v2 / profile 同期を実装済み）
- **クラウド同期対象（Data-2 Core 以降）**: `goalsByTab`, `goalPlan`, `reflectionNotes`, `slogan`, **`userProfile`**（`appData.version: 2`）
- **同期対象外**: 同期メタ, ログイン再送クールダウン, `mileCloudLoadBackup`
- **バックアップ**: 手動読み込み前 + 空クラウド auto-load 前に退避（5キー + `mileUserProfile`）。復元 UI は未実装 → **Data-2 後続候補**
- **自動保存（Cloud-8〜10）**: dirty / hash / 45秒 debounce / 保存中レース対策は妥当と評価
- **プロフィールアイコン候補**: Profile-5 で更新済み（画像アイコンは別フェーズ）

## 現在の画面順

1. プロフィール（Hello / アイコン）
2. ヘッダー（MILEカード）
3. ダッシュボード（今日の達成率・淡い緑系）
4. MILEステージ（ダッシュボード直下・ステージとバッジ）
5. 今日のToDo（見出し + フィルター + タスク一覧）
6. 今日やることを追加（独立カード・淡い緑系）
7. 今月の目標
8. 年間目標
9. 進捗サマリー / 詳しい進捗（連続達成・週間・達成履歴など）
10. 振り返りメモ
11. プロフィール（折りたたみ・summary「プロフィール」・下部ナビ「設定」で開いてスクロール）
12. クラウド保存・同期（折りたたみ・summary「クラウド保存・同期」＋状態表示）
13. スローガン

## 直近の変更内容

- Phase Cloud-Login-1: Google OAuth ボタン（`c75f7de`）、本番QA 部分合格、Docs `cfa585e`
- Phase Data-2 Core: ログイン auto-load・profile v2（`9c11037`）、Docs 反映（本作業・未コミット）
- Phase Launch-1: 本番QA合格（2026-06-04）、Docs `c37a177`
- Phase GoalView-1: 月間見返し導線（`24ee53e`）+ 年間ジャンル（`f6f7a0c`）、Docs `c20ef74`
- Phase Todo-1: 「明日へ」で `dueDate` を翌日に、3 HTML + Docs（`8929ed0` / `07747bb`）
- Phase World-3 mini: バッジ3件・バッジ獲得トースト、3 HTML + Docs（`94e70b6` / `06c8ad5`）
- Phase Release-4: summary「プロフィール」「クラウド保存・同期」、Hello「さん」、3 HTML 同期、push 済み（`56bc682`）
- Phase Release-3 Docs: README / CONTINUE に Release-3 反映（`b00c35d`）
- Phase Release-3: 配色・「今日のToDo」見出し・タスクカード視認性・下部ナビ SVG・プロフィール/クラウド折りたたみ、3 HTML 同期、push 済み（`19e7830`）
- Phase Release-2: 今日追加フォーム分離・連続達成を詳しい進捗へ、3 HTML 同期、push 済み（`96fd991`）
- Phase World-2: MILEステージ・バッジ（`3eb179b`）
- Phase World-1: MILEポイント表示・達成時トースト（`be9c25f`）
- Phase Profile-5: プロフィールアイコン候補更新
- Phase Data-1: データ仕様の調査・ドキュメント化（README / CONTINUE）
- Phase Profile-4: プロフィール設定 UI
- Phase UX-1: トップ余白・モバイル hero 調整

## 実装済み機能

- 年間目標の追加 / 編集 / 削除
- 年間目標のジャンル（`category`、表示「ジャンル」）
- 年間目標のメモ保存
- 年間進捗表示
- 今月目標の追加 / 編集 / 削除
- 今月目標のカテゴリ・メモ保存
- 今月目標ごとの進捗表示
- 今月目標のアイコン選択
- ほかの月の月間目標の見返し（`#monthlyGoalArchive`）
- 今日タスク一覧で紐づく今月目標アイコン表示
- ダッシュボードの次にやることへのアイコン表示
- 今日タスクの追加 / 編集 / 削除
- 今日タスクの「明日へ」（期限なし・今日・期限切れの未完了のみ。`dueDate` 翌日化）
- 今日タスクの完了 / 未完了切り替え
- 今日タスクと今月目標の紐づけ
- ダッシュボード数値表示
- MILEポイント（今日のMILE / 今週のMILE、`completedAt` から算出）
- タスク達成時の +1 MILE トースト
- MILEステージカード（累計MILE・次のステージまであと○MILE）
- 条件達成バッジ（獲得済みのみ表示。7件: はじめの一歩 / 今週スタート / 今日3歩 / コツコツさん / 今週いい感じ / 10MILE / かなり前進）
- バッジ獲得時トースト（新規獲得時のみ「バッジ獲得」+ ラベル。それ以外は +1 MILE）
- 今日やること一覧と追加フォームの分離（`#today-add-section`）
- Release-3 UI整理
  - 今日の達成率カード・今日追加カードの淡い緑系配色
  - 「今日のToDo」見出し、ToDoカード視認性の改善
  - 下部ナビ inline SVG 線画アイコン（今日 / 目標 / 詳しい / 設定）
  - プロフィール設定・クラウド保存・同期の折りたたみ（`<details>`、開閉状態は未保存）
- Release-4 文言整理
  - summary「プロフィール」「クラウド保存・同期」
  - Hello 挨拶 `Hello, ○○さん!`（表示のみ。「さん」二重付与防止あり）
- 連続達成日数（詳しい進捗内、`getStreakProgress`）
- 期限つきタスク
- カテゴリ機能
- 期限フィルター
- カテゴリフィルター
- 完了済みタスクの折りたたみ
- 今週の進捗（詳しい進捗内）
- 達成履歴（詳しい進捗内）
- 振り返りメモ
- localStorage保存（端末への自動保存）
- プロフィール表示・編集（ログイン前後、上部ヘッダー + 設定内の折りたたみプロフィール設定）
- Supabaseログイン（Google OAuth + メールリンク）
- ログイン後クラウド自動読み込み（Google / Magic Link 共通、`user.id` 基準）
- ログイン直後 auto-save ガード（auto-load 完了まで抑止）
- プロフィール（表示名・アイコン）のクラウド同期（Data-2 Core / v2）
- ログインリンク再送クールダウン
- クラウド同期状態表示
- クラウド自動保存（45秒 debounce）
- 手動クラウド保存
- 手動クラウド読み込み
- PWAアイコン / manifest

## ローンチ後の次アクション

- Data-2 Core 本番 QA: Google / Magic Link ログイン後 auto-load、A→B アカウント切替（未実施）
- 実 Google アカウントでログイン完了後、クラウド保存 / 読み込みを手動確認（Cloud-Login-1 残り）
- スローガン UI 復帰は Launch-2 以降に判断（Launch-1 P2）
- Data-2 後続: バックアップ復元 UI、端末データ取り込み UI（`NEXT_TASKS.md` 参照）

## 後回し（ローンチ後・別フェーズ）

- **Profile-6**: プロフィール画像アップロード
- **年間目標アイコン**追加
- **Phase Data-2 後続**: バックアップ復元 UI、端末データ取り込み UI、`idealIslandGoals` / `mileGoalPlan` 整理
- **ステージ演出強化**（旧 World-3 案の装飾系）

完了済み（参考）: UX-1, Profile-4, Profile-5, Data-1（調査・ドキュメント）, World-1, World-2, World-3 mini, Todo-1, GoalView-1, Release-2, Release-3, Release-4, Launch-1（本番QA）, Cloud-Login-1（Google OAuth・本番QA部分合格）, **Data-2 Core**（`9c11037`）

## 注意点

- 3つのHTMLを同期する運用
- `localStorage` 構造は Data-1 時点で文書化済み。Data-2 Core で `app_data` v2 + `userProfile` 同期を追加（Supabase テーブル変更なし）
- プロフィール（`mileUserProfile`）は **Data-2 Core 以降クラウド同期対象**（`collectLocalAppData().data.userProfile`）
- `localStorage` キー名統一（`idealIsland*` → `mile*`）は影響が大きいため後回し
- コミット前にJavaScript構文チェック
- コミット前にスマホ横スクロール確認
- `git add .` は避ける
- `work/` と `ideal-island/work/` はコミットしない
- Vercel公開に使われる想定ファイルはプロジェクト直下の `index.html`
- クラウド保存・読み込みは設定エリアの折りたたみ「クラウド保存・同期」（summary）を展開し、ログイン後は `cloudSignedInPanel` 内ボタンから操作
- 下部ナビは inline SVG 線画アイコン（絵文字ではない）
- ログイン中の変更は自動保存されるが、debounce のため即時同期ではない。**ログイン直後は auto-load 完了まで auto-save しない**

## 次回作業開始時の確認コマンド

```bash
git status
git log --oneline -5
```
