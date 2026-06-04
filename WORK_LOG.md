# MILE 作業ログ

時系列の作業記録。詳細仕様は `README.md`、再開用は `CONTINUE.md`。

---

## 2026-06（Release-3 / Release-4）

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
56bc682 fix(ui): refine profile cloud and greeting labels
b00c35d docs: document Release-3 UI refinements
19e7830 refactor(ui): refine Release-3 colors and settings folds
6f66f0b refactor(ui): soften Release-3 top layout and task styling
96fd991 refactor(ui): split today add form and move streak to details
```

※ `git log` で常に最新を確認すること。
