# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

不動産アプリ（realestate-app）。現在セットアップ中の新規プロジェクト。

## Git・GitHub 運用ルール

**コードを変更するたびに必ず GitHub へプッシュすること。**

具体的な手順：

```bash
git add <変更ファイル>
git commit -m "変更内容の説明"
git push origin <ブランチ名>
```

- `git add .` や `git add -A` は使わず、変更したファイルを明示的に指定する
- コミットメッセージは変更の意図が分かるように書く
- `main` / `master` への直接プッシュは避け、機能ブランチを使う
- プッシュ前に `git status` と `git diff` で変更内容を確認する

## プロジェクトセットアップ

このリポジトリはまだ初期化されていない。初回セットアップ時に以下を行うこと：

1. `git init` でローカルリポジトリを初期化
2. GitHub にリポジトリを作成し、リモートを登録：
   ```bash
   git remote add origin https://github.com/<username>/realestate-app.git
   ```
3. プロジェクトの技術スタックが決定したら、このファイルにビルド・テスト・リント手順を追記する
