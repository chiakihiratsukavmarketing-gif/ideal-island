# MILE — Claude / Cursor 作業ガイド

## プロジェクト概要

- **名前**: MILE（目標管理アプリ）
- **公開URL**: https://ideal-island.vercel.app/
- **形態**: 単一ページ MVP（`index.html` に HTML / CSS / JS を内包）
- **保存**: ブラウザ `localStorage` + ログイン時 Supabase クラウド同期（45秒 debounce）

## リポジトリ構成

| パス | 役割 |
|------|------|
| `index.html` | 本番想定（Vercel ルート） |
| `outputs/index.html` | 同期コピー |
| `ideal-island/outputs/index.html` | 同期コピー |
| `README.md` | 製品・仕様ドキュメント |
| `CONTINUE.md` | 次回再開用サマリー |
| `WORK_LOG.md` | 作業ログ |
| `NEXT_TASKS.md` | 次タスク一覧 |
| `manifest.json` / `assets/icons/` | PWA |

**重要**: 3つの `index.html` は常に同一内容で同期すること。

## 変更時の制約（デフォルト）

ユーザーが明示しない限り、次を守る:

- **新しい `localStorage` キーを追加しない**
- **`collectLocalAppData()` の同期対象 4 項目を増やさない**（`goalsByTab`, `goalPlan`, `reflectionNotes`, `slogan`）
- **Supabase URL / ANON_KEY / 認証・保存ロジックを不用意に変更しない**
- **ファイル削除しない**
- **`git add .` は避ける**（対象ファイルを明示して add）
- **`work/` / `ideal-island/work/` はコミットしない**

## クラウド同期対象（参照）

`collectLocalAppData().data` のみ Supabase に保存。プロフィール（`mileUserProfile`）は同期対象外。

## 画面の要点（Release-3 / 4 時点）

- トップ: ダッシュボード（淡緑の達成率）、MILEステージ、今日のToDo、今日追加カード
- 下部ナビ: 今日 / 目標 / 詳しい / 設定（inline SVG 線画）
- 設定エリア: `<details>` 折りたたみ
  - summary「プロフィール」→ 表示名・アイコン編集
  - summary「クラウド保存・同期」→ ログイン・手動保存/読み込み
- Hello: 表示名があるとき `Hello, ○○さん!`（`getGreetingDisplayName`、保存値には「さん」なし）

## フェーズ命名の慣例

- **Release-N**: UI / 文言の整理（データ変更を伴わないことが多い）
- **World-N**: MILEポイント・ステージ・バッジ・演出
- **Data-N**: 保存・同期・version・バックアップ
- **Cloud-N / Profile-N**: 過去の機能追加フェーズ

## 作業開始時

```bash
git status
git log --oneline -5
```

詳細は `CONTINUE.md` と `NEXT_TASKS.md` を参照。

## コミット

- ユーザーが明示したときのみ commit / push
- 3 HTML 変更時は 3 ファイルすべてを add
- Docs と実装は分けてコミットする方針が取られていることがある（例: Release-3 Docs と Release-4 HTML）

## 最新の main（ドキュメント更新時点）

| コミット | 内容 |
|----------|------|
| `56bc682` | Release-4: summary 文言・Hello「さん」 |
| `b00c35d` | Release-3 Docs |
| `19e7830` | Release-3 UI |
