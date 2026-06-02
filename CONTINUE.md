# MILE 次回再開メモ

## 現在の状態

- プロダクト名: MILE
- 公開URL: https://ideal-island.vercel.app/
- GitHub `main` ブランチとVercelが連携済み
- `main` にpushすると自動デプロイされる想定
- `index.html` / `outputs/index.html` / `ideal-island/outputs/index.html` は同一内容で同期
- `work/` と `ideal-island/work/` はGit管理対象外
- `localStorage` 保存処理は維持
- アプリ本体は白〜薄グレー基調のミニマルなスマホアプリ風UI

## 現在のMILEの位置づけ

MILEは、年間目標 → 今月の目標 → 今日やることをつなげて、日々の行動と進捗を見える化する逆算型目標管理アプリ。

単なるタスク管理ではなく、今日のタスクが今月の目標や年間目標にどうつながっているかを確認できる状態まで進んでいます。

## 実装済みの基本機能

- タスク追加
- タスク完了 / 未完了切り替え
- タスク削除
- localStorage保存
- 期限つきタスク
- 期限バッジ
- 期限フィルター
- カテゴリ機能
- カテゴリフィルター
- 期限フィルターとカテゴリフィルターの組み合わせ
- 今日の達成率
- カテゴリ別の達成状況
- 今週の進捗
- 達成履歴
- 連続達成日数
- 振り返りメモ
- 直近3件のメモ表示
- スローガン編集
- 下部ナビゲーション

## 追加済みの逆算型機能

- 年間目標カード
- 年間目標タイトル保存
- 年間目標メモ保存
- 年間進捗表示
- 今月の目標カード
- 今月目標の追加
- 今月目標のカテゴリ・メモ保存
- 今月目標の削除
- 今日のタスクと今月目標の紐づけ
- タスク一覧での紐づき表示
- 次にやることカードでの紐づき表示
- 今月目標ごとの進捗表示
- 年間進捗への反映

## 現在の完成状態

- 年間目標 → 今月目標 → 今日のタスクの紐づけが可能
- 今月目標ごとの進捗を表示
- 今月目標の進捗平均から年間進捗を表示
- 既存の期限・カテゴリ・履歴・振り返り機能も維持

## データ構造

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

既存タスク側には `monthlyGoalId` を持たせています。今はこの `monthlyGoalId` で「今日のタスク」と「今月の目標」を紐づけています。

## データ互換性

- `dueDate` がない場合は空文字
- `category` がない場合は「その他」
- `completedAt` がない場合は空文字
- `monthlyGoalId` がない場合は空文字
- `mileGoalPlan` がない場合は初期化
- 既存のタスク保存形式は維持

## 次に改善できそうなこと

- 実機スマホで逆算型フローの操作確認
- 年間目標カード / 今月目標カードのさらなるコンパクト化
- 今月目標の編集機能
- タスク編集機能
- 完了済みタスクの折りたたみ
- 進捗カード群の折りたたみ
- READMEにスクリーンショット追加
- PWA対応
- CSS / JS 分離

## 注意点

- `git add .` は避ける
- 作業前後に `git status` を確認する
- コミット対象は必ず確認する
- `work/` と `ideal-island/work/` はコミットしない
- アプリ本体を触る場合は、3つのHTMLを同期する
- 既存の `localStorage` 保存処理を壊さない
- 変更後はできるだけブラウザで動作確認する
- GitHubへ反映する場合は `git push` する

## 次回作業開始時の確認コマンド

```bash
git status
git log --oneline -5
```

## コミット候補

```bash
git add README.md CONTINUE.md
git commit -m "docs: document reverse goal flow"
git push
```
