# 理想の島 / 目標達成アプリ

## プロジェクト概要

「理想の島」は、目標を設定し、日々の行動を積み重ねながら達成へ進むための目標達成アプリです。

主な機能:

- 目標を追加できる
- 目標の達成 / 未達成を切り替えられる
- 目標を削除できる
- 入力したデータは `localStorage` に保存される
- 年間 / 今月 / 今日 のタブごとに目標を管理できる

現在のデザインは、ダークUI・近未来・クエスト風の雰囲気です。

## 開き方

以下のファイルをブラウザで開きます。

```text
C:\Users\chiak\Documents\Codex\2026-06-01\ai-pro-mvp-localstorage-localstorage-localstorage\outputs\index.html
```

または、プロジェクトフォルダ内から以下を開きます。

```text
outputs/index.html
```

## 主要ファイル

- `outputs/index.html`
- `ideal-island/outputs/index.html`
- `.gitignore`
- `README.md`

## Git運用ルール

- `work/` は作業メモ用なのでコミットしない
- `ideal-island/work/` もコミットしない
- 変更後は `git status` で確認する
- コミット対象を確認してから `git add` する
- 不要ファイルをまとめて `git add .` しない

## 現在の主なコミット

- `8e5d5ed` `feat: redesign ideal island as goal achievement quest UI`
- `18d673d` `chore: ignore local work notes`

## 次にやる候補

- 目標追加フォームの見た目改善
- 達成率の自動計算
- ステージ進捗と実データの連動
- スマホ表示の確認
- GitHubへのバックアップ
