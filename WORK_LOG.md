# MILE 作業ログ

時系列の作業記録。詳細仕様は `README.md`、再開用は `CONTINUE.md`。

---

## 2026-06（World-3 mini / Release-3 / Release-4）

### World-3 mini 実装（`94e70b6`）

- バッジ3件追加: 今週スタート（`weekMile >= 1`）、今日3歩（`todayMile >= 3`）、10MILE（`totalMile >= 10`）
- 今日タブ完了時、新規バッジ獲得だけトースト出し分け（`getNewlyEarnedBadgeLabels` → `showMileToast({ badgeLabels })`）
- 未実装（後回し）: ステージ演出、未獲得バッジ一覧、装飾・アニメーション強化
- 新規 `localStorage` キーなし、`collectLocalAppData()`・Supabase 変更なし
- 3 HTML 同期（`index.html` / `outputs/index.html` / `ideal-island/outputs/index.html`）
- push 前（本作業で Docs 更新予定）

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
94e70b6 feat(world-3): add mile badges and badge-earned toast
31e06d7 docs: plan minimal launch phases in CONTINUE and NEXT_TASKS
210d500 docs: sync Release-4 docs and add CLAUDE, WORK_LOG, NEXT_TASKS
56bc682 fix(ui): refine profile cloud and greeting labels
```

※ `git log` で常に最新を確認すること。
