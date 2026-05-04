# Youth GEO Japan Webサイト実装設計書

## 0. 目的

Next.jsリポジトリ直下に本Markdownを配置し、Codexがこの仕様に沿ってWebサイトを実装するための設計書。Wix旧サイト文言を本文の正本として原則そのまま使用し、PDF宣伝資料の情報は補足要素として追加する。

## 1. 実装前提

- Framework: Next.js / App Router / TypeScript
- Styling: Tailwind CSS
- UI: shadcn/ui を基本利用
- Animation: Framer Motion 推奨
- Icons: lucide-react 推奨
- 画像: `/public` 配下に配置。ロゴ・QR・活動写真は差し替え可能なプレースホルダーで実装
- レスポンシブ: Mobile first。PCでは余白を広く取り、カード・グリッド構成にする

## 2. コンテンツ方針

1. Wix旧サイト文言を最優先。見出し・本文は原則一言一句変更しない。
2. PDF宣伝資料の文言は、メンバー募集・活動例・参加方法・メンバー紹介などの補足情報として使う。
3. 「Image by ...」等のWix由来の画像クレジット文言は、実際にその画像を使う場合のみ表示。使わない場合は表示しない。
4. 代表メール、LINE QR、SNS、活動実績、協賛企業等は今後追加・差し替えしやすいように、配列データとして管理する。

## 3. カラースキーム

PDFロゴ・資料の色味を基準にする。正式HEXは後続指定があれば必ず差し替える。

```ts
export const siteColors = {
  background: "#F7F3ED", // PDFの白〜生成り背景
  foreground: "#34302F", // 濃い茶色寄りの本文色
  primaryBlue: "#A9DDEE", // 水色
  primaryGreen: "#73C76F", // 緑
  primaryYellow: "#F2D06B", // 黄〜薄茶
  accentBrown: "#6A5748", // 茶色アクセント
  white: "#FFFFFF",
}
```

UI方針:
- 背景は白〜生成りを基調
- CTA・タグ・カード見出しに水色、緑、黄を使う
- 文字は濃い茶色/黒寄りで読みやすく
- グラデーションは控えめに、水色→緑、黄→生成り程度

## 4. サイト構成

### 4.1 共通レイアウト

- Header
  - 左: Youth GEO Japan ロゴ/テキスト
  - 右: `Home`, `Activities`, `Partners`, `Contact`
  - Mobile: hamburger menu
  - CTA: `Join Us!!`
- Footer
  - Youth GEO Japan
  - `好奇心を、まっすぐ未来へ。`
  - Contact / SNS / Discord導線

### 4.2 ページ一覧

| Path | Page | 目的 |
|---|---|---|
| `/` | Home | 団体の思想・活動軸・参加導線を伝える |
| `/activities` | Activities | 活動実績・今後の活動・勉強会等を掲載 |
| `/partners` | Partners | 協賛企業・外部協力者・社会人向け導線 |
| `/contact` | Contact | 参加・問い合わせ・SNS・代表連絡先 |

## 5. Homeページ仕様

### 5.1 Hero

表示文言:

```text
Youth GEO Japan

好奇心を、まっすぐ未来へ。
```

推奨UI:
- 左にコピー、右にロゴ/地図・紙飛行機風の抽象イラスト
- 背景に丸・線・地図グリッドなどの軽いモーション
- CTAボタン: `Join Us!!` / `活動を見る`

### 5.2 Vision

表示文言:

```text
Vision:
“地理好き”は、未来を拓くハブになる

地理への好奇心は、社会を変え、未来を拓く力になります。

Youth GEO Japanは、“地理”という現代社会の鍵を握る若者が、リーダーシップを発揮し、社会へポジティブな変化をもたらすことを目指しています。
```

推奨UI:
- shadcn/ui `Card`
- 重要語を太字にしすぎない。本文自体は変更しない
- Fade up animation

### 5.3 Our Approach

表示文言:

```text
Our Approach:
地理への好奇心を、社会へ

1. 「知る」「考える」「形にする」「繋がる」 を循環させることで、若者の地理に対する好奇心を社会へ活かす一歩を支えます。

2. 多様なバックグラウンドの仲間と協働しながら、好奇心を追求できる環境を提供します。
```

推奨UI:
- 2つの横並びカード。Mobileでは縦並び
- 「循環」を表す円形/ステップ型の簡易ビジュアルを追加

### 5.4 What We Do

表示文言:

```text
What We Do:
知る／考える／形にする／繋がる
```

4カード構成:

```text
知る
ー「きっかけ」を届ける

中高生を含む若者に、“地理って面白い！”とワクワクできる、地理の世界を知るきっかけを提供します。
```

```text
考える
ー「視点」を広げる

政府機関・企業・アカデミアなどによる講演会やイベントを通して、「旅行や自然、地理が好き」という好奇心をどう追求できるか、そして地理が社会課題や未来にどう役立つかを考え、自分にぴったりの進学やキャリアを考えるための視点を提供します。
```

```text
形にする
ー「体験」を生み出す

ハッカソンや勉強会などを通じて、GISをはじめとする地理のツールを活用し、頭の中のアイデアを可視化する体験を提供します。
```

```text
繋がる
ー「環境」を育む

企業や団体と若者のネットワークを築き、若者が地理への好奇心から将来の道を描ける環境を提供します。
```

推奨UI:
- 4つのカードを2x2グリッド
- Hover時に少し浮く、背景色が淡く変わる
- アイコン例: Sparkles, Telescope, Wrench, Network

### 5.5 Our Story

表示文言:

```text
Our story: 私たちの想い

私たちは、地理の可能性を信じる若者のコミュニティです。

旅先で地形を眺めたり、街の成り立ちを想像したり——それらもすべて「地理」の一部です。

私たちが日常的に使う地図アプリなどにも、地理空間情報が生かされています。

地理は、複雑な問題を分野を超えて空間的に捉える視点です。そのため、地理はあらゆる分野のハブとなり、現場に根ざした視点から社会へアプローチします。

しかしながら、その幅広さゆえ、こうした地理の価値はまだまだ知られていません。日本では高校を境に地理の学びが途切れ、大学以降の体系的な教育や専門職との接点が十分に整っていません。だからこそ、私たちはその「架け橋」となり、若者と地理の可能性を広げていきます。

地理の価値を社会へ浸透させ、新たな道標を生み出し続けたい。

Youth Geo Japanは、そんな想いから生まれた、地理を愛する若者が未来へ挑戦するコミュニティです。
```

推奨UI:
- Long-form section。最大幅を狭めて読みやすく
- 途中に地図グリッド/等高線風の背景パターン
- 最後の一文を強調カードにする。ただし文言は変えない

### 5.6 Our Community / Join Us

表示文言:

```text
Our Community
Join Us!!

Youth Geo Japanは、地理への好奇心を軸に、若者が自由に挑戦し、学び合うコミュニティです。学部や専門、スキルは問いません。

Discord上でツールの勉強会やイベント情報を共有し、仲間と一緒にスキルを高め合っています。

「地理が好き」「何かやってみたい」「仲間と一緒に形にしてみたい」

そんな気持ちがあれば、誰でも大歓迎です。

Youth GEO Japan

​好奇心を、まっすぐ未来へ。
```

PDF補足として追加可能な表示:

```text
これからの活動を一緒につくる
仲間募集中！！

Youth GEO Japanでは現在一緒に活動してくれるメンバーを大募集しています。
関心や得意分野に合わせて、さまざまな企画を提案し、実際に形にしていくことができます！
また、GISを仕事にしている社会人との交流の機会もあります。 地理やGISを学ぶだけでなく、仕事や実践につなげていきたい人、大歓迎です！！
```

活動タグ:

```text
勉強会
ミニプレゼン会
フィールドワーク
就職相談
交流会
ビジネスコンテスト
```

## 6. Activitiesページ仕様

目的: 活動実績・予定・活動カテゴリを掲載する。初期状態ではPDFの活動タグを使い、将来データ追加しやすい形にする。

### 6.1 Activity categories

表示データ:

```ts
const activityCategories = [
  "勉強会",
  "ミニプレゼン会",
  "フィールドワーク",
  "就職相談",
  "交流会",
  "ビジネスコンテスト",
]
```

### 6.2 Activity data model

```ts
type Activity = {
  title: string
  date?: string
  category: "勉強会" | "ミニプレゼン会" | "フィールドワーク" | "就職相談" | "交流会" | "ビジネスコンテスト" | "その他"
  description: string
  image?: string
  link?: string
}
```

初期プレースホルダー:

```ts
const activities: Activity[] = [
  {
    title: "活動実績を追加予定",
    category: "その他",
    description: "今後、勉強会・交流会・フィールドワークなどの活動実績を掲載します。",
  },
]
```

### 6.3 UI

- Filter chips by category
- Activity card grid
- 画像がない場合は地図グリッド風プレースホルダー
- Framer Motionでカードのstagger表示

## 7. Partnersページ仕様

目的: 社会人、企業、団体、教育機関、協賛候補に向けて、Youth GEO Japanとの協力余地を伝える。

### 7.1 Hero copy

Wix本文をベースに、文言を崩さず文脈化する:

```text
企業や団体と若者のネットワークを築き、若者が地理への好奇心から将来の道を描ける環境を提供します。
```

### 7.2 対象者

- GIS・地理空間情報に関わる企業
- 都市、環境、防災、交通、不動産、エネルギー、行政、アカデミア等の関係者
- 若者向けに講演・メンタリング・協賛・共同イベントを実施したい社会人/団体

### 7.3 協力メニュー

```ts
const partnerOptions = [
  { title: "講演・イベント登壇", description: "若者が進学・仕事・社会課題とのつながりを考える機会を提供します。" },
  { title: "勉強会・ハッカソン協力", description: "GISをはじめとする地理のツールを活用し、アイデアを形にする体験を支えます。" },
  { title: "キャリア相談・メンタリング", description: "地理への好奇心から将来の道を描ける環境づくりに協力いただきます。" },
  { title: "協賛・共同企画", description: "Youth GEO Japanの活動継続と拡大を支援いただきます。" },
]
```

### 7.4 UI

- Professional toneのカードレイアウト
- 若者向けページより少し落ち着いた配色
- CTA: `協力について問い合わせる`

## 8. Contactページ仕様

目的: 参加希望者・協力希望者・問い合わせを分けて受ける。

### 8.1 表示文言

PDF補足文言:

```text
参加してみたい方へ

学年や専門、経験、スキルは問いません。地理が好き、GISに興味がある、仲間と一緒に何かやってみたい…
そんな気持ちがあれば大歓迎です！
```

```text
Discordでの交流

日々の会話や相談、情報共有、企画の相談などを、Discordで気軽に行っています。
まずは様子を知りたいという人にも、入りやすい雰囲気を目指しています。
```

```text
詳細・参加方法はこちら

まずは代表メールアドレス、またはLINEにお気軽にご連絡ください！
Mail：yuka.yano417@gmail.com
LINE：下記QRコードからご連絡ください！
```

### 8.2 Contact data model

```ts
const contactInfo = {
  email: "yuka.yano417@gmail.com",
  lineQrImage: "/line-qr.png", // 後で実画像に差し替え
  discordInviteUrl: "", // 後で追加
  xUrl: "", // 後で追加
  instagramUrl: "", // 後で追加
  linkedinUrl: "", // 後で追加
}
```

### 8.3 UI

- `参加したい若者向け` と `協力したい社会人・企業向け` の2カード
- Email button: `メールで問い合わせる`
- LINE QR placeholder
- SNSアイコン欄は未設定なら非表示

## 9. メンバー紹介セクション

PDF補足情報としてHomeまたはContact下部に掲載可能。

```text
こんな人がいます！

❏ 東京都出身、北海道大学→イギリスの大学院でGISを勉強したのにコンサルをしている代表
❏ 千葉県出身、まちづくり政策を学びにスウェーデンに行った人文地理学修士学生
❏ 広島県出身、地方創生に興味があり、イギリスで地理学修士を取得後不動産業で営業マン
❏ その他、3D GIS修士学生・ランドスケープデザイン大学生・エンジニア・都市空間系の会社の社長など10名程在籍！！
```

UI:
- 個人名は出さず、属性カードとして表示
- ポップだが過度にカジュアルになりすぎない

## 10. コンポーネント設計

```text
/components
  SiteHeader.tsx
  SiteFooter.tsx
  HeroSection.tsx
  SectionHeading.tsx
  WhatWeDoCards.tsx
  ApproachCards.tsx
  StorySection.tsx
  JoinUsSection.tsx
  ActivityCard.tsx
  PartnerOptionCard.tsx
  ContactCards.tsx
  AnimatedBlob.tsx
/lib
  site-content.ts
  site-colors.ts
/app
  page.tsx
  activities/page.tsx
  partners/page.tsx
  contact/page.tsx
```

## 11. Animation仕様

- Page load: Heroの見出しをfade up
- Background: 丸・線・地図グリッドをゆっくり動かす
- Cards: hoverで`translateY(-4px)` + shadow
- Section enter: scroll into viewでfade up
- CTA: hoverで少し拡大、色を淡く変化
- Animationは軽量にし、読みやすさを阻害しない

## 12. 実装ルール

1. 本文コピーは`/lib/site-content.ts`に集約する。
2. Wix文言は原則変更しない。改行や句読点も可能な限り維持。
3. PDF補足情報は`pdfSupplementContent`として分ける。
4. 将来の活動実績・SNS・協賛企業は配列に追記するだけで更新できる構造にする。
5. shadcn/uiの`Button`, `Card`, `Badge`, `Accordion`, `Sheet`を優先利用。
6. SEO metadataを各ページに設定する。
7. 日本語サイトとして`lang="ja"`を設定する。
8. アクセシビリティ: コントラスト、alt、キーボード操作を担保する。

## 13. SEO / Metadata案

```ts
export const metadata = {
  title: "Youth GEO Japan | 好奇心を、まっすぐ未来へ。",
  description: "Youth GEO Japanは、地理への好奇心を軸に、若者が自由に挑戦し、学び合うコミュニティです。",
}
```

## 14. 初期実装の完了条件

- `/`, `/activities`, `/partners`, `/contact` の4ページが表示される
- Header/Footerが全ページ共通
- Wix本文がHomeに一通り反映されている
- PDF補足情報がJoin/Contact/Activitiesに反映されている
- カラーはPDF由来の水色・緑・黄/茶・白基調
- Mobile/PCで崩れない
- 活動実績・SNS・協賛情報を後から配列で追加できる
- ビルドが通る
