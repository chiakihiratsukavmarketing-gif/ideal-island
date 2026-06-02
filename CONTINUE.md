# MILE 次回再開メモ

## 1. 現在のプロダクト

- プロダクト名: MILE
- 概要: MILEは、今日やることを整理し、目標までの進捗を見える化するシンプルな目標管理アプリ。
- 公開URL: https://ideal-island.vercel.app/
- VercelはGitHubの `main` ブランチと連携済み
- 今後 `main` に `push` すると自動デプロイされる想定

## 2. 現在の状態

- Git初期化済み
- GitHubバックアップ済み
- Vercel公開済み
- MILEへのブランド名変更済み
- スマホアプリ風UIへ整理済み
- 白から薄グレー基調のミニマルデザインへ変更済み
- クエスト感・ゲーム感を抑えた目標管理アプリUIへ調整済み
- `index.html` / `outputs/index.html` / `ideal-island/outputs/index.html` は同一内容で同期
- `work/` と `ideal-island/work/` はGit管理対象外
- `localStorage` 保存処理は維持

## 3. 実装済み機能

- タスク追加
- タスク完了 / 未完了切り替え
- タスク削除
- 今日の達成率表示
- 進捗バー
- 3STEPの進捗表示
- 次にやることカード
- スローガン編集
- `localStorage` 保存
- 下部ナビゲーション
- スマホアプリ風UI
- 白から薄グレー基調のミニマルデザイン
- 旧スローガンの `localStorage` 移行処理

## 4. UI方針

- シンプルな目標管理アプリ
- クエスト感・ゲーム感は抑える
- 白背景、細線、角丸、淡い影
- アクセントはくすみライム、淡いターコイズ、マスタード
- モバイルファースト
- 文言は短く、説明しすぎない

## 5. 現在の注意点

- `CONTINUE.md` は作業メモとして使用
- `README.md` はまだ旧情報が残っているため、必要になったら次回以降に更新
- `index.html` がVercel公開用のルートファイル
- `outputs/index.html` と `ideal-island/outputs/index.html` は保管・整理用として同期
- `git add .` は避ける
- コミット前後に `git status` を確認する
- コミット対象は必ず確認する
- `work/` と `ideal-island/work/` はコミットしない
- 既存の `localStorage` 保存処理を壊さない
- 変更後はブラウザで動作確認する
- GitHubへ反映する場合は `git push` する

## 6. 次に改善できそうなこと

- 実機スマホでの操作確認
- タスクに期限を追加
- 目標カテゴリ追加
- 週間進捗の表示
- 達成履歴の保存
- PWA対応
- README整備
- 不要ファイル構成の整理

## 7. 次回再開時の確認コマンド

```bash
git status
git log --oneline
git remote -v
```

## 8. 次回コミット候補

HTMLのMILE MVP v1調整をコミットする場合:

```bash
git add index.html outputs/index.html ideal-island/outputs/index.html
git commit -m "style: polish MILE MVP v1 UI"
git push
```

このメモをコミットする場合:

```bash
git add CONTINUE.md
git commit -m "docs: update MILE continuation notes"
git push
```
