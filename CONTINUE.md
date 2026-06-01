# 次回再開メモ

## 1. 現在の状態

- Git初期化済み
- GitHubバックアップ済み
- ダークUI・近未来・クエスト風デザインへ変更済み
- スマホ表示改善済み
- 達成率の実データ連動済み
- ステージカードと目標データの連動済み
- 「次の一歩」カードを today タブの実データと連動済み
- `README.md` 作成済み
- `.gitignore` 作成済み
- `work/` と `ideal-island/work/` はGit管理対象外
- `localStorage` 保存処理は維持

## 2. 最新コミット履歴

- `8307089` `feat: add data-driven next step card`
- `bab2bbc` `feat: connect stage cards to goal progress`
- `878eb26` `feat: connect progress summary to goal data`
- `e4b3813` `fix: improve mobile layout for ideal island`
- `f049a0c` `docs: add continuation notes`
- `f099c89` `docs: add project readme`
- `18d673d` `chore: ignore local work notes`
- `8e5d5ed` `feat: redesign ideal island as goal achievement quest UI`

## 3. 現在できている機能

- 目標追加
- 達成 / 未達成の切り替え
- 目標削除
- `localStorage` 保存
- 達成率の自動計算
- 目標総数 / 達成済み / 未達成 の自動表示
- ステージカードの状態自動更新
- 今日の未達成目標から「次の一歩」を自動表示
- 今日の目標が全達成なら CLEAR 表示
- 今日の目標が0件なら「今日の一歩を決めましょう」と表示
- スマホ幅 375 / 390 / 430px 対応

## 4. 次にやる候補

- 0件状態の実機確認
- 目標追加フォームのUI改善
- 目標の編集機能
- 目標に期限やカテゴリを追加
- 年間 / 月間 / 今日タブの導線改善
- 達成時の演出追加
- GitHub Pagesで公開
- アプリ名・文言の最終調整

## 5. 注意点

- `git add .` は避ける
- 作業前後に `git status` を確認する
- コミット対象は必ず確認する
- `work/` と `ideal-island/work/` はコミットしない
- `README.md`、`.gitignore` は必要がない限り触らない
- 既存の `localStorage` 保存処理を壊さない
- 変更後は必ずブラウザで動作確認する
- GitHubへ反映する場合は `git push` する

## 6. 次回再開時の確認コマンド

```bash
git status
git log --oneline
git remote -v
```
