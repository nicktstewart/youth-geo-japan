# Youth GEO Japan Website 仕様書

この文書は、Youth GEO Japan Web サイトの目的、現在の実装、今後の修正方針をまとめたものです。以前の仕様書は最近の実装内容とずれていたため、現在のコードに合わせて整理しています。

## 1. サイトの目的

Youth GEO Japan は、地理・GIS・都市・地域課題に関心を持つ若者のコミュニティです。この Web サイトでは、以下を伝えることを目的とします。

- Youth GEO Japan がどのような団体か
- どのような活動をしているか
- 若者がどう参加できるか
- 企業・団体・社会人がどう協力できるか
- 問い合わせ先

主な読者は、国内外の学生、若手社会人、教育関係者、企業・団体の担当者です。日本語と英語を切り替えられる構成とし、どちらも短くわかりやすい表現を使います。

## 2. 技術構成

現在の実装は以下です。

- Framework: Next.js `16.2.4`
- Router: App Router
- React: `19.2.4`
- Language: TypeScript
- Styling: Tailwind CSS v4 と `app/globals.css`
- Package manager: npm
- 画像: `public/` 配下の静的画像

Next.js はバージョン差分の影響が大きいため、実装前に `node_modules/next/dist/docs/` のローカルドキュメントも確認してください。

## 3. 現在のページ構成

| 日本語Path    | 英語Path         | Page       | 役割                                                             |
| ------------- | ---------------- | ---------- | ---------------------------------------------------------------- |
| `/`           | `/en`            | Home       | 団体の概要、Vision、活動内容、ストーリー、参加案内、メンバー紹介 |
| `/activities` | `/en/activities` | Activities | 活動実績・予定を表示                                             |
| `/partners`   | `/en/partners`   | Partners   | 企業・団体・社会人向けの協力案内                                 |
| `/contact`    | `/en/contact`    | Contact    | 参加・協力・問い合わせ用の連絡先                                 |

保存済みの言語選択がなければ、ブラウザが送る優先言語（通常はOSまたはブラウザの言語設定）を使い、日本語なら日本語、それ以外なら英語を初期表示します。ヘッダーの言語切り替えで選んだ言語は Cookie に1年間保存し、次回以降はブラウザ設定より優先します。言語切り替えは対象言語への通常の Next.js `Link` で行い、APIへのPOSTや `router.refresh()` は使いません。ヘッダーには主要ページへの導線、フッターには主要ページとメールアドレスがあります。

## 4. ディレクトリ構成

```text
app/
  [lang]/
    layout.tsx
    page.tsx
    activities/page.tsx
    partners/page.tsx
    contact/page.tsx
  api/locale/route.ts  # 旧言語保存API。現在のスイッチャーからは未使用
  globals.css

components/
  AnimatedBlob.tsx
  ApproachCards.tsx
  ContactCards.tsx
  HeroSection.tsx
  JoinUsSection.tsx
  MemberCards.tsx
  MobileNavigation.tsx
  PartnerOptionCard.tsx
  SectionHeading.tsx
  SiteFooter.tsx
  SiteHeader.tsx
  LanguageSwitcher.tsx
  StorySection.tsx
  WhatWeDoCards.tsx

lib/
  i18n.ts
  site-content.ts
  site-colors.ts

public/
  YGJ-logo-only.png
  YGJ-transparent.png
```

## 5. コンテンツ管理方針

日本語の基本的な文章、活動データ、連絡先は `lib/site-content.ts`、英訳と言語別の表示ラベルは `lib/i18n.ts` に集約します。内容を変更するときは両方を更新します。

ただし、現在は一部の見出しや説明文が `app/` や `components/` に直接書かれています。文章修正の Pull Request では、次の順番で確認してください。

1. `lib/site-content.ts`
2. 変更したいページの `app/**/page.tsx`
3. 関連する `components/*.tsx`

将来的には、ページ内に直接書かれている文言もできるだけ `lib/site-content.ts` に寄せると保守しやすくなります。

## 6. デザイン方針

サイト全体は、やわらかく親しみやすい印象を保ちつつ、学生・社会人・企業担当者が安心して読めるトーンにします。

基本カラー:

```ts
export const siteColors = {
  background: "#F7F3ED",
  foreground: "#3e3a39",
  primaryBlue: "#a9dbee",
  primaryGreen: "#6bbc70",
  primaryYellow: "#f8d478",
  accentBrown: "#6A5748",
  softWhite: "#e7eef3",
  white: "#FFFFFF",
};
```

実装上の注意:

- 日本語本文は読みやすい行間にする
- ボタンやリンクは押せることがわかる見た目にする
- モバイル幅でも文字が重ならないようにする
- 背景アニメーションは軽くし、本文の読みやすさを優先する
- ロゴ画像は `next/image` を使い、LCP に関わる画像はサイズ指定や `priority` / `fetchPriority` を意識する

## 7. 各ページの仕様

### Home

Home はサイトの最初の入口です。以下のセクションで構成します。

- Hero: 団体名、タグライン、ロゴ、Contact / Activities への導線
- Vision: 団体の目指すもの
- Our Approach: 「知る」「考える」「形にする」「繋がる」の考え方
- What We Do: 主な活動カテゴリ
- Our Story: 団体の背景や問題意識
- Join Us: 参加案内
- Members: メンバー紹介

### Activities

活動実績や今後の活動を、月次ニュースレター形式で表示するページです。最新号は本文と目次、今後の予定を掲載し、過去号はページ下部のアーカイブから参照できる構成にします。

現在のデータ型:

```ts
export type Activity = {
  title: string;
  date?: string;
  category: ActivityCategory;
  description: string;
  image?: string;
  link?: string;
};
```

活動を追加するときは `activities` 配列に 1 件ずつ追加します。月次ニュースレターの本文は同じファイル内のニュースレターデータにまとめ、原稿は `newsletter/` 配下に保管します。画像がまだない場合でも、まずはタイトル・カテゴリ・説明だけで追加できます。

### Partners

企業、団体、社会人、教育関係者に向けて、Youth GEO Japan と協力する方法を説明するページです。

掲載する内容:

- 協力対象者
- 講演・イベント登壇
- 勉強会・ハッカソン協力
- キャリア相談・メンタリング
- 協賛・共同企画
- Contact への導線

### Contact

参加希望者、協力希望者、問い合わせをしたい人に向けたページです。

現在の連絡先は `lib/site-content.ts` の `contactInfo` で管理します。

```ts
export const contactInfo = {
  email: "contact@youthgeojp.com",
  lineQrImage: "/line-qr.png",
  discordInviteUrl: "",
  xUrl: "",
  instagramUrl: "",
  linkedinUrl: "",
};
```

未設定の SNS や Discord URL は、実際に公開できる状態になってから表示する方針です。

## 8. メタデータとアクセシビリティ

- `app/[lang]/layout.tsx` で言語別の `metadata` と `<html lang>` を設定します。
- ページ固有の `metadata` は各 `page.tsx` に設定します。
- 装飾ではない画像には意味のある `alt` を付けます。
- 装飾画像は `alt=""` にします。
- リンクやボタンはキーボード操作でも使える状態にします。
- スマホ用ナビゲーションは、リンクまたは言語の選択、外側のタップ、Escapeで閉じます。Escapeで閉じた場合は開閉ボタンへフォーカスを戻します。
- ナビゲーションの開閉には `button`、`aria-expanded`、`aria-controls` を使い、移動先は通常のリンクとして実装します。
- 色だけで意味を伝えないようにします。

## 9. Pull Request で確認すること

Pull Request を出す前に、できるだけ以下を確認してください。

- `npm run lint` が通る
- 大きめの変更では `npm run build` が通る
- `npm run dev` で表示を確認した
- PC 幅とスマホ幅の両方で見た
- 日本語が文字化けしていない
- 変更した文章が読みやすい
- 仕様が変わった場合、このファイルも更新した

Next.js 16 の開発用生成型は `.next/dev`、本番用生成型は `.next/types` に出力されます。古い開発用ルート型と現在の本番用ルート型が衝突しないよう、`tsconfig.json` では `.next/dev` を検査対象から除外し、本番用の `.next/types` は検査します。`npm run build` は標準の `.next` ディレクトリを使います。

## 10. 今後の改善候補

- 文字化けしている本文を、正しい日本語に直す
- Activities に実際の活動実績を追加する
- Contact に Discord、SNS、LINE QR などを追加する
- 文章データをさらに `lib/site-content.ts` に集約する
- 活動カード用の共通コンポーネントを追加する
- OGP 画像や `robots.txt` / `sitemap` を整備する
- README にスクリーンショットを追加する
