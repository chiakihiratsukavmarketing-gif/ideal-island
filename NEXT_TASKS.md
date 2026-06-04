# MILE 次にやること

優先度は上から。実装に入る前に `README.md` / `CONTINUE.md` / `CLAUDE.md` を確認。

---

## すぐ（Docs）

- [ ] **Release-4 Docs をコミット・push**
  - 対象: `README.md`, `CONTINUE.md`, `CLAUDE.md`, `WORK_LOG.md`, `NEXT_TASKS.md`
  - `index.html` 3ファイルは既に `56bc682` で push 済みのため含めない
  - メッセージ案: `docs: document Release-4 labels and add project management files`

---

## 次の実装候補

### Phase Data-2（優先候補・影響大）

設計を先に文書化してから、スコープを 1 つに絞って実装。

- [ ] クラウド読み込み時の `version` 検証 / マイグレーション
- [ ] `mileCloudLoadBackup` の復元 UI または失敗時ロールバック
- [ ] `mileUserProfile` をクラウド同期対象に含めるか決定・実装
- [ ] `idealIslandGoals` と `mileGoalPlan` の二重構造整理（別途設計必須）

**制約**: `collectLocalAppData()` 変更時は既存 Supabase データとの互換方針を先に決める。

### Phase World-3

- [ ] バッジ追加
- [ ] ステージ演出・達成演出の改善
- [ ] 可能なら `completedAt` 算出のみで完結（新規キー追加なし）

---

## 任意・小さめ

- [ ] `.settings-fold` の未使用 `summary-open` / `summary-close` 用 CSS の整理（見た目に影響なければ後回し可）
- [ ] 実利用フィードバックに基づく文言・導線の追加微調整

---

## 完了済み（直近）

- Release-4 文言（`56bc682`）
- Release-3 Docs（`b00c35d`）
- Release-3 UI（`19e7830`）
- Release-2 / World-1 / World-2 / Data-1 調査 など

---

## 作業ルール（再掲）

- 3 HTML は必ず同期
- `git add .` 禁止
- commit / push はユーザー指示時のみ
- コミット前: `git status`、スマホ幅の目視またはスモーク（大きな UI 変更時）
