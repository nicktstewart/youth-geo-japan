# SEO・AIO 運用ガイド

この文書は、Youth GEO Japan のコンテンツ更新時に、検索エンジン最適化（SEO）と AI 検索での発見・引用されやすさ（AIO）を内容と同時に保守するための手順です。人が手作業で更新する場合も、Codex などのエージェントが更新する場合も、このガイドに従ってください。

## 基本方針

- 読者にとって正確で具体的なコンテンツを最優先します。
- 日本語と英語を同時に更新し、両言語の意味を揃えます。
- 検索語を不自然に詰め込みません。地理、GIS、地理空間情報、教育、学習、若者、地域、社会、コミュニティと、それらの自然な英語表現を、内容に合う文脈で使います。
- 活動の固有情報、日付、成果、参加者が得た学びなど、Youth GEO Japan にしか書けない一次情報を優先します。
- SEO と AIO は別々の裏技として扱いません。Google の AI 検索機能にも、クロール可能で有用な通常の Web コンテンツと基本的な SEO が使われます。
- `llms.txt`、AI 専用の特別な schema、機械向けに細切れにした文章は必須ではありません。

## 現在の実装場所

| 対象 | ファイル |
| --- | --- |
| 共通 URL、canonical、hreflang、OGP、Twitter metadata | `lib/seo.ts` |
| ページ固有の title と description | 各 `app/[lang]/**/page.tsx` |
| Organization / WebSite JSON-LD | `lib/seo.ts`、`app/[lang]/layout.tsx` |
| 検索対象 URL と `lastmod` | `app/sitemap.ts` |
| クローラー制御と sitemap の場所 | `app/robots.ts` |
| OGP 画像 | `app/[lang]/opengraph-image.tsx` |
| 日本語コンテンツ | `lib/site-content.ts` |
| 英語コンテンツと表示ラベル | `lib/i18n.ts` |

## コンテンツ更新時の必須チェックリスト

### 1. 日本語と英語を揃える

本文、見出し、活動名、日付、説明を日本語と英語の両方で更新します。一方だけを先に公開しないでください。

### 2. ページの検索表示を確認する

ページの主題が変わった場合は、そのページの `createPageMetadata` 呼び出しにある `title` と `description` も更新します。

- title はページ固有で、短く内容を説明できるものにします。
- description は検索結果だけの宣伝文ではなく、ページの実際の内容を正確に要約します。
- metadata に書いた内容は、ページ本文にも人が読める形で存在させます。
- canonical と hreflang は `createPageMetadata` に任せ、ページごとに独自実装しません。

### 3. sitemap の `lastmod` を更新する

公開ページの本文に意味のある変更を加えたときは、`app/sitemap.ts` の `routeLastModified` で該当 route の日付を更新します。

特に、Activities のニュースレター、活動記録、予定を追加・修正した場合は、必ず `"/activities"` の日付を実際の公開日または反映日に変更してください。日本語 URL と英語 URL は同じ route 設定から生成されるため、1か所の更新で両方に反映されます。

```ts
const routeLastModified = {
  "/": "2026-08-29T00:00:00+09:00",
  "/activities": "2026-09-15T00:00:00+09:00",
  "/partners": "2026-08-29T00:00:00+09:00",
  "/contact": "2026-08-29T00:00:00+09:00",
} satisfies Record<IndexableRoute, string>;
```

`lastmod` の注意事項:

- ビルドした日時ではなく、そのページの内容が実際に更新された日時を使います。
- タイムゾーンを含む ISO 8601 形式を使います。このサイトでは原則として `YYYY-MM-DDT00:00:00+09:00` とします。
- CSS、リファクタリング、コメント、依存関係など、表示内容を変えない変更では更新しません。
- 1ページだけを変更した場合、他の route の日付まで一括更新しません。

### 4. 新しいページを追加する場合

次をすべて行います。

1. 日本語・英語ページを用意する。
2. `lib/seo.ts` の `indexableRoutes` に canonical path を追加する。
3. `app/sitemap.ts` の `routeLastModified` に初回公開日を追加する。
4. `createPageMetadata` で title、description、canonical、hreflang、OGP を設定する。
5. Home、ヘッダー、フッター、関連ページのいずれかから、通常の `<Link>` で辿れるようにする。
6. `noindex` や `robots.txt` で誤ってブロックされていないことを確認する。

### 5. 団体情報やブランドを変更する場合

団体名、説明、ロゴ、メールアドレス、対象者、主な活動分野を変更した場合は、表示本文だけでなく `organizationJsonLd`、共通 metadata、OGP 画像も同時に確認します。構造化データにはページ上で確認できない内容を書かないでください。

### 6. 活動記事を AI 検索にも理解しやすくする

活動記事には、内容に応じて次の情報を本文中に明記します。

- 何を行ったか
- 開催日または対象期間
- 場所またはオンライン開催であること
- 主催・協力組織
- 使用した GIS、データ、地理的手法
- 参加者が学んだことや得られた成果
- 関連する公式資料や一次資料へのリンク

質問に直接答えられる簡潔な導入文を置き、その後に詳しい背景や経験を続けます。短さ自体を目的にせず、人が読んで十分に理解できる内容にします。

## 画像の確認

- 内容のある画像には、その画像で何がわかるかを説明する `alt` を付けます。
- 装飾画像には `alt=""` を使います。
- 新しい代表画像を追加した場合は、必要に応じて sitemap の image 情報や OGP 画像の更新を検討します。
- 画像内だけに重要な説明を書かず、本文にもテキストとして掲載します。

## 検証手順

変更後は最低限、次を実行します。

```bash
npm run lint
npm run build
```

ローカルまたはデプロイ後に、次も確認します。

- `/robots.txt` が `200` で表示され、`/sitemap.xml` を参照している。
- `/sitemap.xml` が `200` で表示され、正しい canonical URL、言語 alternate、`lastmod` を含む。
- 変更ページの HTML に title、description、canonical、`ja` / `en` / `x-default` hreflang、OGP がある。
- 日本語ページの `<html lang="ja">` と英語ページの `<html lang="en">` が正しい。
- JSON-LD が表示内容と一致する。

必要に応じて、Google の Rich Results Test、Schema Markup Validator、Search Console の URL 検査を使います。

## Google Search Console と sitemap

このサイトの `robots.txt` は `https://youthgeojp.com/sitemap.xml` を宣言しているため、Google は通常のクロール中に sitemap を自動発見できます。Search Console への手動送信は必須ではありません。

ただし、サイト公開後に Search Console で sitemap を一度送信することを推奨します。送信すると、Google が sitemap を取得できた日時、解析エラー、sitemap 内 URL のインデックス状況を確認できます。送信はクロールや掲載順位を保証するものではなく、通常のコンテンツ更新ごとに再送信する必要もありません。`/sitemap.xml` の内容を更新して公開すれば、Google は同じ URL を再取得します。

参考資料:

- [Google: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Search Console: Sitemaps report](https://support.google.com/webmasters/answer/7451001)
- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

## Search Console で継続的に見る項目

- Page Indexing で sitemap 内の主要ページが index されているか
- Performance で日本語・英語それぞれの query、page、click、impression
- title や description を変えた後の click-through rate
- 新しい Activities コンテンツが Google に再クロールされたか
- Core Web Vitals とモバイル表示の問題

検索順位だけでなく、問い合わせ、活動参加、ニュースレター閲覧など、サイトの目的につながる行動も合わせて評価します。
