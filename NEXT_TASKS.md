# MILE 次にやること

優先度は上から。実装前に `README.md` / `CONTINUE.md` / `CLAUDE.md` を確認。

**方針**: 装飾は最小限・実用性優先・1フェーズ1〜数コミット・既存データを壊さない。

---

## ローンチまでのフェーズ（実装順）

### Phase GoalView-1（次）

**目的**: 目標の見返しと年間目標の整理。

**スコープ**

- [ ] その他の月間目標を見返す導線（過去月・他月の参照。最小は一覧 or 月選択）
- [ ] 年間目標にジャンル（カテゴリ）フィールド追加 — `goalPlan` 変更のため設計・同期影響を先に確認
- [ ] 年間目標アイコンは **本フェーズに含めなくてよい**

**コミット目安**: 1〜3（見返し導線と年間ジャンルは分割可）

**分割案**

1. `feat(goal-view): add monthly goals review navigation`
2. `feat(goal-view): add yearly goal category field`

---

### Phase Launch-1

**目的**: ローンチ前の総合確認とドキュメント確定。

**スコープ**

- [ ] スマホ幅での操作確認（追加 / 完了 / 削除 / 別日移動 / フィルター / 下部ナビ）
- [ ] プロフィール保存・リセット、Hello「さん」
- [ ] クラウド保存・読み込み・ログイン・同期表示
- [ ] Vercel 本番確認 https://ideal-island.vercel.app/
- [ ] `README.md` / `CONTINUE.md` / `NEXT_TASKS.md` をローンチ時点に更新

**コミット目安**: 1〜2（確認メモは `WORK_LOG.md`、コード変更がなければ Docs のみ）

---

## 完了済みフェーズ詳細: Todo-1（`8929ed0`）

- 「明日へ」ボタン: 今日タブ・未完了・（期限なし / 今日 / 期限切れ）のみ
- 処理: `dueDate` 翌日 + `updatedAt`。`goalsByTab.today` に残す
- 影響なし: `done` / `completedAt` / MILE / バッジ / トースト。ダッシュボード達成率・残件
- 任意日付: 既存編集フォーム。スマホ 320 / 375 / 390px 確認済み
- 新規 `localStorage` キーなし。`collectLocalAppData()` / Supabase 変更なし。3 HTML 同期

---

## 完了済みフェーズ詳細: World-3 mini（`94e70b6`）

- バッジ: 今週スタート（`weekMile >= 1`）、今日3歩（`todayMile >= 3`）、10MILE（`totalMile >= 10`）
- トースト: 新規バッジ獲得時のみ「バッジ獲得」+ ラベル（最大2件）。それ以外は +1 MILE
- 未実装: ステージ演出、未獲得バッジ一覧、装飾・アニメーション強化
- 新規 `localStorage` キーなし。`collectLocalAppData()` / Supabase 変更なし。3 HTML 同期済み

---

## 後回し（ローンチ後）

- [ ] **Profile-6**: プロフィール画像アップロード
- [ ] **年間目標アイコン**追加
- [ ] **Phase Data-2**: version 検証、バックアップ復元、プロフィールクラウド同期、二重構造整理
- [ ] **ステージ演出強化**（プログレスバー、ステージアップ演出、カード装飾の本格化、未獲得バッジ一覧）
- [ ] `.settings-fold` の未使用 CSS 整理（任意）

---

## 完了済み（直近）

- [x] Todo-1 実装（`8929ed0`）— 「明日へ」で dueDate 翌日化。Docs は本作業で更新予定
- [x] World-3 mini Docs（`06c8ad5`）
- [x] World-3 mini 実装（`94e70b6`）— バッジ3件、バッジ獲得トースト。ステージ演出・未獲得一覧・装飾強化は未実装
- [x] Release-4 Docs（`210d500`）
- [x] Release-4 文言（`56bc682`）
- [x] Release-3 Docs（`b00c35d`）
- [x] Release-3 UI（`19e7830`）
- [x] Release-2 / World-1 / World-2 / Data-1 調査 など

---

## 作業ルール（再掲）

- 3 HTML は必ず同期（`index.html` 変更時）
- `git add .` 禁止
- commit / push はユーザー指示時のみ
- 実装フェーズと Docs コミットは分離してよい
- コミット前: `git status`、スマホ幅の確認（機能フェーズ時）
