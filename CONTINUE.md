# MILE 次回再開メモ

## 現在の状態

- プロダクト名: MILE
- 公開URL: https://ideal-island.vercel.app/
- GitHub `main` ブランチとVercelが連携済み
- `main` にpushすると自動デプロイされる想定
- 最新コミット: `8d07bce` feat: add profile settings UI with local display name and icon
- `index.html` / `outputs/index.html` / `ideal-island/outputs/index.html` は同一内容で同期
- `work/` と `ideal-island/work/` はGit管理対象外

### 動作確認済み

- 端末保存は自動（`localStorage`）
- ログイン中はクラウド自動保存（45秒 debounce）
- 保存状態表示あり
- スマホ表示OK
- PWAアイコンOK
- 別端末確認OK
- Vercel公開済み
- β版公開前総点検済み（Release-1、2026-06-04）

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
  - `mileUserProfile` はクラウド同期対象外のまま
- Phase Data-1（調査完了、コード変更なし）
  - `localStorage` キー・クラウド同期対象・バックアップ・version・プロフィール方針を整理
  - README / CONTINUE に仕様を反映
  - 今すぐ修正すべきブロッカーなし

## Phase Data-1 調査メモ（2026-06）

- **コード変更**: なし（`index.html` は未変更）
- **クラウド同期対象**: `goalsByTab`, `goalPlan`, `reflectionNotes`, `slogan`（`appData.version: 1`）
- **同期対象外**: `mileUserProfile`, 同期メタ, ログイン再送クールダウン, `mileCloudLoadBackup`
- **プロフィール同期**: 今回は対象外のまま → **Data-2 候補**
- **バックアップ**: 読み込み前に同期対象 4 キーのみ退避。復元 UI は未実装 → **Data-2 候補**
- **自動保存（Cloud-8〜10）**: dirty / hash / 45秒 debounce / 保存中レース対策は妥当と評価
- **プロフィールアイコン候補**: 現状維持。見た目整理は **Profile-5 候補**（画像アイコンは別フェーズ）

## 現在の画面順

1. プロフィール（Hello / アイコン）
2. ヘッダー（MILEカード）
3. ダッシュボード
4. 今日やること
5. 今月の目標
6. 年間目標
7. 進捗詳細
8. 振り返りメモ
9. プロフィール設定（下部ナビ「設定」→ 先頭にスクロール）
10. クラウド保存
11. スローガン

## 直近の変更内容

- Phase Data-1: データ仕様の調査・ドキュメント化（README / CONTINUE）
- Phase Profile-4: プロフィール設定 UI、3 HTML 同期、push 済み
- Phase UX-1: トップ余白・モバイル hero 調整
- Phase Release-1: β版公開前総点検完了（2026-06-04）

## 実装済み機能

- 年間目標の追加 / 編集 / 削除
- 年間目標のメモ保存
- 年間進捗表示
- 今月目標の追加 / 編集 / 削除
- 今月目標のカテゴリ・メモ保存
- 今月目標ごとの進捗表示
- 今月目標のアイコン選択
- 今日タスク一覧で紐づく今月目標アイコン表示
- ダッシュボードの次にやることへのアイコン表示
- 今日タスクの追加 / 編集 / 削除
- 今日タスクの完了 / 未完了切り替え
- 今日タスクと今月目標の紐づけ
- ダッシュボード数値表示
- 期限つきタスク
- カテゴリ機能
- 期限フィルター
- カテゴリフィルター
- 完了済みタスクの折りたたみ
- 今週の進捗
- 達成履歴
- 連続達成日数
- 振り返りメモ
- localStorage保存（端末への自動保存）
- プロフィール表示・編集（ログイン前後、上部ヘッダー + 設定タブ）
- Supabaseログイン（メールリンク）
- ログインリンク再送クールダウン
- クラウド同期状態表示
- クラウド自動保存（45秒 debounce）
- 手動クラウド保存
- 手動クラウド読み込み
- PWAアイコン / manifest

## 次にやる候補

- **Phase Data-2**: 同期対象・バックアップ・version 検証の整理（実装）
  - version 読み込み時検証 / マイグレーション
  - `mileCloudLoadBackup` の復元 UI または失敗時ロールバック
  - プロフィール（`mileUserProfile`）のクラウド同期要否の決定と実装
  - `idealIslandGoals` と `mileGoalPlan` の二重構造整理（影響大・設計先行）
- **Phase Profile-5**: プロフィールアイコン候補のアップデート（絵文字の世界観整理。🔥⭐🐾🧭 等）
- **Phase World-1**: ステージ・進捗演出

完了済み（参考）: UX-1, Profile-4, Data-1（調査・ドキュメント）

## 注意点

- 3つのHTMLを同期する運用
- `localStorage` 構造は Data-1 時点で文書化済み。破壊的変更は Data-2 以降で設計してから
- プロフィール（`mileUserProfile`）はクラウド同期対象外。Data-2 まで含めない
- `localStorage` キー名統一（`idealIsland*` → `mile*`）は影響が大きいため後回し
- コミット前にJavaScript構文チェック
- コミット前にスマホ横スクロール確認
- `git add .` は避ける
- `work/` と `ideal-island/work/` はコミットしない
- Vercel公開に使われる想定ファイルはプロジェクト直下の `index.html`
- クラウド保存・読み込みはログイン後の `cloudSignedInPanel` 内ボタンから操作
- ログイン中の変更は自動保存されるが、debounce のため即時同期ではない

## 次回作業開始時の確認コマンド

```bash
git status
git log --oneline -5
```
