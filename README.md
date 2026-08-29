# Youth GEO Japan Website

Youth GEO Japan の公式サイトです。地理・GIS・都市や地域の課題に関心を持つ若者が、学び合い、活動し、企業・団体・社会人とつながるための情報発信サイトとして作られています。

このリポジトリは、Next.js / React / TypeScript で作られた Web サイトです。日本語の文章や活動情報は主に `lib/site-content.ts`、英訳と表示用ラベルは `lib/i18n.ts` にまとめています。

## はじめに

必要なもの:

- Node.js
- npm
- Git
- GitHub アカウント

初回だけ依存パッケージをインストールします。

```bash
npm install
```

開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開くとサイトを確認できます。変更したファイルは自動で反映されます。

## よく使うコマンド

```bash
npm run dev
```

開発用サーバーを起動します。

```bash
npm run lint
```

コードの書き方に問題がないか確認します。Pull Request を出す前に実行してください。

```bash
npm run build
```

本番用にビルドできるか確認します。大きめの変更をした場合は実行してください。

Next.js 16 は開発時の生成型を `.next/dev`、本番ビルドの生成型を `.next/types` に分けます。このプロジェクトでは、古い開発用ルート型が本番ビルドに混ざらないように `.next/dev` を `tsconfig.json` の検査対象から除外し、本番用の `.next/types` は通常どおり検査します。ビルドは標準の `.next` ディレクトリを使用します。

## プロジェクト構成

```text
app/
  [lang]/               日本語・英語のページ
    layout.tsx          全ページ共通のレイアウト、ヘッダー、フッター、メタデータ
    page.tsx            Home ページ
    activities/page.tsx Activities ページ
    partners/page.tsx   Partners ページ
    contact/page.tsx    Contact ページ
  api/locale/route.ts   旧言語保存API（現在のスイッチャーからは未使用）
  globals.css           全体の CSS と Tailwind CSS の設定

components/
  SiteHeader.tsx        ヘッダー
  MobileNavigation.tsx スマホ用ナビゲーション
  LanguageSwitcher.tsx 言語切り替え
  SiteFooter.tsx        フッター
  HeroSection.tsx       Home のヒーロー部分
  ...                   各セクション用コンポーネント

lib/
  i18n.ts               言語設定、英訳、言語別URL
  site-content.ts       サイト上の文章、活動情報、連絡先など
  site-colors.ts        サイトの基本カラー

public/
  YGJ-logo-only.png     ロゴ画像
  YGJ-transparent.png   ヒーローで使うロゴ画像
```

## 初心者におすすめの修正場所

文章を直す場合:

- 日本語はまず `lib/site-content.ts`、英語は `lib/i18n.ts` を見てください。
- 内容を追加・変更するときは、両方の言語を同時に更新してください。
- ページ内に直接書かれている文言も少しあります。その場合は `app/` または `components/` の該当ファイルを修正します。
- コンテンツ変更時は [SEO・AIO 運用ガイド](./docs/seo-aio-guide.md) も確認し、metadata と sitemap の `lastmod` を内容と同時に保守してください。特に Activities の更新では `app/sitemap.ts` の `"/activities"` の日付更新が必須です。

## 表示言語とURL

- 保存済みの選択がなければ、ブラウザが送る優先言語（通常はOSまたはブラウザの言語設定）を使います。日本語なら `/`、`/activities` などで日本語を表示し、それ以外なら `/en`、`/en/activities` などの英語ページへ移動します。
- ヘッダーの `日本語 / English` で手動変更した言語は、端末の Cookie に1年間保存され、次回以降はブラウザ設定より優先されます。サイトデータを消すと自動判定に戻ります。
- 言語切り替えは通常の Next.js `Link` で対象言語の静的ページへ直接移動します。`/api/locale` への POST、`router.refresh()`、ページ全体の再読み込みは行いません。
- Cookie はサーバー側の `proxy.ts` でも読めるため、`localStorage` と違って初回描画後に言語が変わるちらつきを避けられます。この仕組みはデスクトップとモバイルで共通です。

画像を差し替える場合:

- 画像ファイルは `public/` に置きます。
- 例: `public/example.png` は、コード上では `/example.png` として参照できます。

ページの見た目を直す場合:

- 共通スタイルは `app/globals.css` にあります。
- 各パーツの細かい見た目は `components/` の `className` を調整します。

## Pull Request の出し方

基本の流れ:

1. GitHub でこのリポジトリを fork します。
2. 自分の PC に clone します。
3. 作業用ブランチを作ります。

```bash
git checkout -b fix/readme-example
```

4. ファイルを編集します。
5. `npm run lint` を実行します。
6. 変更を commit します。

```bash
git add .
git commit -m "Update contributor docs"
```

7. GitHub に push します。

```bash
git push origin fix/readme-example
```

8. GitHub 上で Pull Request を作ります。

公式ドキュメント:

- GitHub Docs: [フォークから Pull Request を作成する](https://docs.github.com/ja/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)
- GitHub Docs: [Pull Request について](https://docs.github.com/ja/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)

## 開発時の注意

- このプロジェクトは Next.js `16.2.4` を使っています。古い Next.js の記事と違う場合があります。
- このリポジトリには `AGENTS.md` の注意書きがあります。Next.js の仕様を確認するときは、必要に応じて `node_modules/next/dist/docs/` のローカルドキュメントも見てください。
- 日本語本文を修正するときは、文字化けしていないかブラウザで確認してください。
- 画像にはできるだけ `alt` を設定してください。装飾だけの画像は `alt=""` で問題ありません。

Next.js の学習に使える公式リンク:

- [Next.js Docs](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js App Router](https://nextjs.org/docs/app)

## 参考仕様

サイトの目的、ページ構成、実装方針は [youth_geo_japan_website_spec.md](./youth_geo_japan_website_spec.md) にまとめています。大きな変更をする場合は、コードと一緒にこの仕様も更新してください。

検索エンジンと AI 検索向けの実装・更新手順は [SEO・AIO 運用ガイド](./docs/seo-aio-guide.md) にまとめています。
