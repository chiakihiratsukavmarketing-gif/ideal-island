# MILE 次にやること

優先度は上から。実装前に `README.md` / `CONTINUE.md` / `CLAUDE.md` を確認。

**方針**: 装飾は最小限・実用性優先・1フェーズ1〜数コミット・既存データを壊さない。

---

## 次アクション

1. **Release-Beta-1 / History-1 Docs コミット**（本作業）
2. **`a42db45` を push → 本番QA**
3. **5人程度に限定β共有**
4. **βフィードバック収集**（保存・ログイン・表示崩れ）
5. **正式リリース前の最終確認**（β利用者の報告を確認）

### Release-Beta-1 / History-1 チェック（共有前）

- [x] Data-2 Core 実アカウントE2E — 問題なし
- [x] Todo-2 Core 本番QA — 15/15 合格
- [x] Monthly-2 Core — push 済み
- [x] Release-Beta-1 β案内・クラウド説明・フィードバック依頼（`a42db45`）
- [x] History-1 Core 30日日付ナビ・完了 read-only・振り返り today のみ編集（`a42db45`）
- [x] History-1 Core ローカル QA — 15/15 合格
- [x] 3 HTML 同期済み（`a42db45`）
- [ ] Docs コミット → push → 本番QA
- [ ] 5人に URL 共有
- [ ] フィードバック収集

### その他（任意 / 後回し）

- [ ] **Monthly-3**: 過去年の編集 UI、年切替 UI
- [ ] スローガン編集 UI 復帰（Launch-1 P2）
- [ ] Data-2 後続: バックアップ復元 UI、端末データ取り込み UI

---

## Release-Beta-1 / History-1 Core（`a42db45`）

- **実装コミット**: `a42db45` feat(release): add beta notices and 30-day history view（push 前）
- **Release-Beta-1**: β版案内・クラウド保存説明・不具合報告案内（設定エリア）
- **History-1 Core**: 直近30日の ← / → 日付ナビ。「日付の記録」カード
- 選択日の完了タスク read-only（`goalsByTab.today` × `completedAt` 一致）
- 振り返りメモは今日のみ編集・保存。過去日 readOnly
- 「最近のメモ」は日付ナビに統合
- `completedAt` / `reflectionNotes` 既存構造。`collectLocalAppData()` / v2 / Supabase 変更なし
- MILE / バッジ / streak / ダッシュボード / 達成履歴7日 / 今日タブ一覧は据え置き
- ローカル QA 15/15。3 HTML 同期済み
- Docs 反映は本作業（未コミット）

---

## 完了済み: Todo-2 Core（`985c60a` / Docs `23370b8` / `2f54348`）

- `isDashboardTodayTask` / `getDashboardTodayGoals` で今日の達成率・残り・完了を算出
- 「明日へ」/ 未来期限の未完了を今日ダッシュボード分母から除外
- 今日完了（`completedAt` 今日）のみ完了としてカウント
- ダッシュボード / 詳しい進捗 / stage2 / 「次にやること」を同一定義に統一
- 据え置き: MILE / バッジ / 履歴 / streak、今日タブ一覧、保存構造
- `collectLocalAppData()` / `app_data` v2 / Supabase 変更なし
- ローカル Playwright QA 14/14。3 HTML 同期済み
- Docs `23370b8` / `2f54348` 反映済み
- 本番QA（2026-06-06）: **合格**（15/15 OK・P0/P1/P2/P3 なし）。本番 `985c60a` / `23370b8` 反映確認

---

## 完了済み: Todo-2 Core 本番QA（2026-06-06）

- **URL**: https://ideal-island.vercel.app/
- **判定**: **合格**（15/15 OK）
- **P0/P1/P2/P3**: なし
- 未完了3件 → 残り3 / 0%。1件完了 → 1/3 / 33%
- 2件「明日へ」後 → 1/1 / 100% / 残り0
- all フィルターに明日へタスク残存、今日フィルターでは非表示
- 未来期限未完了は分母外、期限切れ未完了は分母内
- 今日対象0件でもエラーなし
- 「次にやること」が明日以降未完了を拾わない
- MILE / バッジ / 達成履歴 / streak は「明日へ」前後で不変
- ダッシュボードと詳しい進捗の今日 % 一致
- `collectLocalAppData().version === 2` 維持
- 320 / 375 / 390px レイアウト OK
- 初回ロードの致命的コンソールエラーなし
- QA用スクリプト `work/todo-2-prod-qa.mjs` は削除済み

---

## 完了済み: Monthly-2 Core（`1d8b91c` / Docs `3dfd177`）

- 当年 1〜12 月の月チップ（`#monthlyGoalMonthPicker`）。デフォルト選択は今月（`selectedMonthKey`）
- 選択月の月間目標を追加・編集・削除（未来月・過去月も可）
- `addMonthlyGoal()` の追加先を `selectedMonthKey` に変更
- 当年の「ほかの月の目標」アーカイブを月チップ UI に統合
- 過去年の月間目標は存在時のみ read-only 表示
- 据え置き: ダッシュボード「今月 %」・タスク紐づけ select は今月目標のみ
- `monthlyGoals` 構造変更なし。`app_data` v2。`collectLocalAppData()` / Supabase 変更なし
- ローカル Playwright QA 14/14。3 HTML 同期済み
- Docs `3dfd177` 反映済み

---

## 完了済み: Data-2 Core 実アカウントE2E QA（2026-06-06）

**URL**: https://ideal-island.vercel.app/  
**本番反映**: `5ffb027`（P2 文言含む）  
**判定**: **問題なし**（P0/P1なし）

- [x] Google ログイン後 auto-load
- [x] Magic Link ログイン後 auto-load
- [x] プロフィール変更 → クラウド保存 → 再ログイン復元
- [x] A→B アカウント切替
- [x] A の端末データが B へ自動保存されないこと
- [x] 空クラウド新規アカウントで空画面
- [x] ログイン後の手動クラウド保存/読み込み

---

## 完了済み: Data-2 Core P2 修正（`5ffb027`）

- プロフィール設定説明文を v2 クラウド同期に合わせて更新
- push 済み・本番反映済み

---

## 完了済み: Data-2 Core 本番QA（2026-06-06）

**URL**: https://ideal-island.vercel.app/  
**本番反映**: `9c11037` / `9d10a2a` / `5ffb027`  
**判定**: 部分合格（P0/P1なし）

- [x] 本番 HTML に Data-2 Core コードマーカー存在（`version: 2`, `autoLoadCloudDataForUser` 等）
- [x] `collectLocalAppData().version === 2`
- [x] `collectLocalAppData().data.userProfile` あり
- [x] `autoLoadCloudDataForUser` / auto-save guard / 空クラウド backup 分岐が本番 JS に存在
- [x] Google / Magic Link ボタン表示
- [x] 初回ロードの致命的コンソールエラーなし
- [ ] Google ログイン後 auto-load E2E（P3・未実施）
- [ ] Magic Link ログイン後 auto-load E2E（P3・未実施）
- [ ] A→B アカウント切替 E2E（P3・未実施）
- [ ] プロフィール同期 E2E（P3・未実施）
- [ ] 空クラウド新規アカウントの空画面 E2E（P3・未実施）

**既知課題**

- **P2（プロフィール説明文）**: `5ffb027` で修正済み

---

## 完了済み: Phase Data-2 Core（`9c11037`・push 済み）

**実装コミット**: `9c11037` feat(data-2): auto-load cloud data on login and sync profile v2  
**Docs**: `9d10a2a`  
**ローカル QA**: 実施済み  
**本番 QA**: 部分合格（2026-06-06）。ログイン E2E は P3 未実施

- [x] `app_data.version: 2`
- [x] `collectLocalAppData().data.userProfile` 追加（`mileUserProfile`）
- [x] プロフィール名・アイコンのクラウド同期
- [x] Google / Magic Link 共通でログイン後 `user.id` のクラウドデータ auto-load
- [x] ログイン直後 auto-save 抑止（端末データが別アカウントへ自動保存されない）
- [x] クラウド空の新規アカウント: `backupLocalAppData()` 後に空画面
- [x] v1 クラウドデータ（`userProfile` なし）読み込み可
- [x] `backupLocalAppData()` に `mileUserProfile` 追加
- [x] Supabase テーブル変更なし
- [x] 3 HTML 同期済み
- [x] 本番QA（2026-06-06）: 部分合格（P0/P1なし）。静的/Runtime 確認 OK
- [ ] 本番 Google / Magic Link / A→B 切替 E2E（P3）

**未実装（Data-2 後続）**

- 端末データをクラウドへ取り込む確認 UI
- バックアップ復元 UI
- ゲストデータ復元 UI

---

## 完了済み: Cloud-Login-1（2026-06-05）

**本番反映**: `c75f7de`  
**URL**: https://ideal-island.vercel.app/  
**判定**: 部分合格

- [x] 「Googleでログイン」ボタン表示
- [x] Magic Link 残存
- [x] Google OAuth へ遷移
- [x] `collectLocalAppData()` 4項目維持
- [x] `applyCloudAppDataToLocal()` プロフィール非対象
- [x] 初回ロードの致命的コンソールエラーなし
- [ ] Google ログイン完了後の保存/読み込み E2E（手動未完了）

**既知仕様（Cloud-Login-1 時点・Data-2 Core で一部更新）**

- クラウド保存はログインアカウントごとの `user.id` に保存される
- **Data-2 Core 以降**: ログイン後 auto-load。空クラウドは backup 後に空画面。A→B 切替も B を auto-load
- 手動「クラウドから読み込み」は confirm 後に上書き（従来どおり）
- プロフィールは **Data-2 Core 以降クラウド同期対象**（v2 `userProfile`）

---

## 完了済み: Phase Launch-1（2026-06-04）

**URL**: https://ideal-island.vercel.app/  
**判定**: 合格（P0/P1なし）

- [x] スマホ 320 / 375 / 390px（横スクロールなし、下部ナビ、今日のToDo、明日へ、今月/年間目標、設定 details）
- [x] World-3 mini / Todo-1 / GoalView-1 の本番反映確認
- [x] タスク CRUD / 目標 CRUD / プロフィール保存・リセット / 振り返りメモ
- [x] 未ログインクラウド UI、`collectLocalAppData()` 4項目維持
- [x] `manifest.json` / `icon-192` / `icon-512` / 初回コンソールエラーなし
- [x] Docs 更新（`c37a177`）

**既知課題（修正見送り）**

- P2: スローガン編集 UI が CSS で非表示
- P3: 「ほかの月の目標」0件 empty state は未検証

---

## 完了済みフェーズ詳細: GoalView-1

### Monthly-1（`24ee53e`）

- 既存 `#monthlyGoalArchive` と `renderMonthlyGoals()` の月別 `<details>` を活用
- 「ほかの月の目標」見出し、過去月0件時の空状態文言
- 下部ナビ「目標」→ `#monthly-goal-section`
- 当時は読み取り専用、月選択UIなし（**Monthly-2 Core で月チップ CRUD に発展**）
- 新規 `localStorage` キーなし。`collectLocalAppData()` / Supabase 変更なし。3 HTML 同期

### Goal-1（`f6f7a0c`）

- 年間目標に `category`（画面表示「ジャンル」、既存 `CATEGORIES`）
- `normalizeYearlyGoal()` で未設定時「その他」
- 年間フォームのジャンル select、カードにジャンルバッジ
- 年間目標アイコンは後回し
- 新規 `localStorage` キーなし。`collectLocalAppData()` / Supabase 変更なし。3 HTML 同期

---

## 完了済みフェーズ詳細: Todo-2 Core（`985c60a` / Docs `23370b8`）

- `isDashboardTodayTask` / `getDashboardTodayGoals` 追加
- 「明日へ」/ 未来期限の未完了を今日ダッシュボード分母から除外
- 今日完了（`completedAt` 今日）のみ完了カウント
- `renderDashboard` / `renderStats` / `getStageStatus` stage2 / 「次にやること」を統一
- MILE / バッジ / 履歴 / streak / 今日タブ一覧は据え置き
- 保存構造・`collectLocalAppData()` / Supabase 変更なし
- ローカル Playwright QA 14/14。3 HTML 同期済み
- 本番QA（2026-06-06）: **合格**（15/15 OK・P0/P1/P2/P3 なし）

---

## 完了済みフェーズ詳細: Release-Beta-1 / History-1 Core（`a42db45`）

### Release-Beta-1

- 設定エリア（プロフィール/クラウド保存の前）にβ版案内・クラウド保存説明・不具合報告案内
- 5人程度の限定βリリース前整備

### History-1 Core

- `reflection-card` →「日付の記録」。← / → で直近30日（今日〜過去29日）
- 選択日の完了タスク: `goalsByTab.today` × `getDateKeyFromValue(completedAt) === 選択日`、read-only
- 振り返り: `reflectionNotes[選択日]`。今日のみ編集・保存。過去日 readOnly
- 「最近のメモ」削除（日付ナビに統合）
- 据え置き: MILE / バッジ / streak / ダッシュボード / 達成履歴7日 / 今日タブ一覧
- `completedAt` / `reflectionNotes` 既存構造。`collectLocalAppData()` / v2 / Supabase 変更なし
- ローカル QA 15/15。3 HTML 同期済み

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
- [ ] **ステージ演出強化**（プログレスバー、ステージアップ演出、カード装飾の本格化、未獲得バッジ一覧）
- [ ] `.settings-fold` の未使用 CSS 整理（任意）

---

## 完了済み（直近）

- [x] Release-Beta-1 / History-1 Core Docs 反映（本作業・未コミット）
- [x] Release-Beta-1 / History-1 Core 実装（`a42db45`）— β案内 + 30日日付ナビ・QA 15/15
- [x] Todo-2 Core 本番QA（2026-06-06）— 合格（15/15 OK・P0/P1/P2/P3 なし）
- [x] Todo-2 Core 本番QA Docs（`2f54348`）
- [x] Todo-2 Core Docs（`23370b8`）
- [x] Todo-2 Core 実装（`985c60a`）— 今日ダッシュボード対象定義・Playwright QA 14/14
- [x] Monthly-2 Core Docs（`3dfd177`）
- [x] Monthly-2 Core 実装（`1d8b91c`）— 当年 12 ヶ月チップ・選択月 CRUD・Playwright QA 14/14
- [x] Data-2 Core 実アカウントE2E QA Docs（`7a667f4`）
- [x] Data-2 Core 実アカウントE2E QA（2026-06-06）— 問題なし
- [x] Data-2 Core P2 修正（`5ffb027`）— push 済み
- [x] Data-2 Core 本番QA Docs（`2acbd70`）
- [x] Data-2 Core 実装（`9c11037`）+ Docs（`9d10a2a`）— push 済み
- [x] Cloud-Login-1 本番QA Docs（`cfa585e`）
- [x] Cloud-Login-1 本番QA（2026-06-05）— 部分合格
- [x] Cloud-Login-1 実装（`c75f7de`）— Google OAuth ボタン
- [x] Launch-1 本番QA Docs（`c37a177`）
- [x] GoalView-1 Docs（`c20ef74`）
- [x] GoalView-1 Goal-1（`f6f7a0c`）— 年間ジャンル（`category`）
- [x] GoalView-1 Monthly-1（`24ee53e`）— ほかの月の目標見返し導線
- [x] Todo-1 実装（`8929ed0`）+ Docs（`07747bb`）
- [x] World-3 mini Docs（`06c8ad5`）
- [x] World-3 mini 実装（`94e70b6`）
- [x] Release-4 Docs（`210d500`）
- [x] Release-4 文言（`56bc682`）

---

## 作業ルール（再掲）

- 3 HTML は必ず同期（`index.html` 変更時）
- `git add .` 禁止
- commit / push はユーザー指示時のみ
- 実装フェーズと Docs コミットは分離してよい
- コミット前: `git status`、スマホ幅の確認（機能フェーズ時）
