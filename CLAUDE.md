# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Supabase認証機能付きの不動産管理Webアプリ（realestate-app）。
React + Vite構成。メール＋パスワードでの会員登録・ログイン、ログイン後の物件一覧表示（ダミーデータ）、ログアウト機能を持つ。

## よく使うコマンド

```bash
npm install      # 依存関係のインストール
npm run dev      # 開発サーバー起動（http://localhost:5173）
npm run build    # 本番ビルド
npm run preview  # ビルド結果のプレビュー
npm run lint     # ESLintによる静的解析
```

## アーキテクチャ

- `src/lib/supabaseClient.js` — Supabaseクライアントの初期化（`.env`の`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`を使用）
- `src/contexts/AuthContext.jsx` — ログイン状態をアプリ全体で共有するContext。`signUp` / `signIn` / `signOut`とセッション監視（`onAuthStateChange`）を提供
- `src/components/ProtectedRoute.jsx` — 未ログイン時に`/login`へリダイレクトするラッパー。ログイン必須ページは`App.jsx`でこれを介してルーティングする
- `src/pages/` — `Login.jsx`（ログイン）、`SignUp.jsx`（会員登録）、`Properties.jsx`（ログイン後の物件一覧、カード形式）
- `src/data/dummyProperties.js` — 物件一覧のダミーデータ。将来的にSupabaseのテーブルから取得する場合はこのモジュールを置き換える
- 環境変数（`.env`）はコミットしない。新しい環境変数を追加する場合は`.env.example`にも追記する

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
   git remote add origin https://github.com/hourglassfigure-smartman/samurai-terakoya-realestate-app.git
   ```
3. プロジェクトの技術スタックが決定したら、このファイルにビルド・テスト・リント手順を追記する
