# MILE 次回再開メモ

## 現在の状態

- プロダクト名: MILE
- 公開URL: https://ideal-island.vercel.app/
- GitHub `main` ブランチとVercelが連携済み
- `main` にpushすると自動デプロイされる想定
- `index.html` / `outputs/index.html` / `ideal-island/outputs/index.html` は同一内容で同期
- `work/` と `ideal-island/work/` はGit管理対象外
- 基本保存は `localStorage`
- Supabaseログインに対応
- 手動クラウド保存 / 手動クラウド読み込みに対応（ログイン後）
- 自動同期はなし

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
  - クラウド保存UIの文言整理（未ログイン / ログイン後の説明を明確化）
  - README / CONTINUE を現状に合わせて更新
  - 3つの HTML 同期

## 現在の画面順

1. ヘッダー
2. ダッシュボード
3. 今日やること
4. 今月の目標
5. 年間目標
6. 進捗詳細
7. 振り返りメモ
8. クラウド保存（下部ナビ「設定」からスクロール）
9. スローガン

## 直近の変更内容（Phase Cloud-5）

- クラウド保存セクションの説明文を更新
  - 未ログイン時: ログイン後にクラウド保存が使えることを明示
  - ログイン後: 保存と読み込みの違い、上書き注意を明示
- README / CONTINUE の古い記載（クラウド未対応など）を修正

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
- localStorage保存
- Supabaseログイン（メールリンク）
- 手動クラウド保存
- 手動クラウド読み込み

## 現在の未コミット変更

- `index.html`
- `outputs/index.html`
- `ideal-island/outputs/index.html`
- `README.md`
- `CONTINUE.md`

## 次にやる候補

- Phase Cloud-6: 実機でのログイン → 保存 → 別端末読み込みの一連確認
- β版として実機スマホで一通り操作確認
- Phase Fun-1.5 実機確認
- Phase Beta-2 公開URL確認
- PWAアイコン同梱（`/assets/icons/`）
- データエクスポート / インポート
- AIによる目標分解
- CSS / JS 分離

## 注意点

- 3つのHTMLを同期する運用
- `localStorage` 構造は現状維持
- コミット前にJavaScript構文チェック
- コミット前にスマホ横スクロール確認
- `git add .` は避ける
- `work/` と `ideal-island/work/` はコミットしない
- Vercel公開に使われる想定ファイルはプロジェクト直下の `index.html`
- クラウド保存・読み込みはログイン後の `cloudSignedInPanel` 内ボタンから操作

## 次回作業開始時の確認コマンド

```bash
git status
git log --oneline -5
```

## コミット候補（Phase Cloud-5 完了後）

```bash
git add index.html outputs/index.html ideal-island/outputs/index.html README.md CONTINUE.md
git commit -m "docs: clarify cloud save UI and update project docs"
git push
```
