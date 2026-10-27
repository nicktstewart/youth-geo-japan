import Link from "next/link";
import { ArticleShare } from "@/components/ArticleShare";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { mapConductorArticle } from "@/lib/activity-articles";

function EventIcon({ kind }: { kind: "calendar" | "pin" | "people" | "map" | "code" | "fee" }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-6 shrink-0">
    {kind === "map" ? <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15" /></> : kind === "code" ? <><rect x="2" y="3" width="20" height="18" rx="3" /><path d="m9 9-3 3 3 3m6-6 3 3-3 3m-1-7-3 8" /></> : kind === "fee" ? <><rect x="2" y="5" width="20" height="15" rx="3" /><path d="M2 10h20m-15 5h3" /></> : kind === "calendar" ? <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M7 3v4m10-4v4M3 11h18m-13 5h2m4 0h2" /></> : kind === "pin" ? <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></> : <><circle cx="9" cy="8" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-16a3 3 0 0 1 0 6m3 10v-3a6 6 0 0 0-2-4" /></>}
  </svg>;
}

function MapConductorOverview({ locale }: { locale: Locale }) {
  const ja = locale === "ja";
  return <aside aria-label={ja ? "イベントのポイント" : "Workshop at a glance"} className="my-8 overflow-hidden rounded-2xl border border-[#6A5748]/10 bg-[#F7F3ED]">
    <div className="grid gap-5 p-5 sm:grid-cols-3 sm:p-7">
      {([
        ["calendar", ja ? "日時" : "When", ja ? "11/25（水）" : "Nov 25 (Wed)", "19:00–21:00"],
        ["pin", ja ? "会場" : "Where", "Eukarya", ja ? "東京・本郷三丁目" : "Hongo, Tokyo"],
        ["fee", ja ? "参加費" : "Fee", ja ? "学生無料" : "Students: free", ja ? "社会人 1,500円" : "Working adults: ¥1,500"],
      ] as const).map(([kind, label, value, detail]) => <div key={kind} className="flex gap-3 text-[#6A5748]">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white"><EventIcon kind={kind} /></span>
        <div><p className="text-xs font-semibold">{label}</p><p className="mt-1 text-lg font-semibold text-[#3e3a39]">{value}</p><p className="mt-1 text-sm">{detail}</p></div>
      </div>)}
    </div>
    <div className="grid gap-4 border-t border-[#6A5748]/10 bg-[#EAF7EC] p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-7">
      <div><p className="text-xs font-semibold tracking-widest text-[#426b45]">WEB MAPPING WORKSHOP</p><p className="mt-2 font-semibold text-[#3e3a39]">{ja ? "ブラウザで体験する、Web地図づくり。" : "Build web maps in your browser."}</p><p className="mt-2 text-sm leading-6 text-[#6A5748]">{ja ? "Web地図・React未経験歓迎 ／ 事前インストール不要" : "No web map or React experience needed. No installation required."}</p></div>
      <a className="btn-primary text-center" href="https://peatix.com/event/5239553">{ja ? "Peatixで申し込む ↗" : "Register on Peatix ↗"}</a>
    </div>
  </aside>;
}

export function MapConductorArticle({ locale: lang, embedded = false }: { locale: Locale; embedded?: boolean }) {
  const article = mapConductorArticle[lang];
  const Title = embedded ? "h2" : "h1";
  const SectionTitle = embedded ? "h3" : "h2";
  const PointTitle = embedded ? "h4" : "h3";
  return <section id="mapconductor-workshop" className="section-pad scroll-mt-24 border-b-8 border-[#e6ded2] bg-white"><article className="page-shell"><div className="mx-auto max-w-3xl">
    {!embedded && <Link className="text-sm font-semibold text-[#6A5748] underline underline-offset-4" href={localePath(lang, "/activities") + "#mapconductor-workshop"}>← {getDictionary(lang).ui.activitiesPageTitle}</Link>}
    <header className="mt-8 border-b border-[#6A5748]/15 pb-8">
      <p className="text-sm text-[#6A5748]"><span className="mr-3 rounded-full bg-[#EAF7EC] px-3 py-1">{article.category}</span><time dateTime={mapConductorArticle.published}>2026.10.28</time></p>
      <Title className="mt-5 text-3xl font-semibold leading-snug sm:text-4xl">{article.heading}</Title>
      <ArticleShare title={article.heading} href={localePath(lang, embedded ? "/activities" : mapConductorArticle.path) + (embedded ? "#mapconductor-workshop" : "")} locale={lang} />
      {embedded && <Link className="mt-3 inline-block text-sm text-[#6A5748] underline underline-offset-4" href={localePath(lang, mapConductorArticle.path)}>{lang === "ja" ? "この記事の個別ページ" : "Article permalink"} ↗</Link>}
    </header>
    <MapConductorOverview locale={lang} />
    <div className="text-base leading-8 text-[#3e3a39]/85">{lang === "ja" ? <>
<p className="mt-5">Youth GEO Japanでは、2026年11月25日（水）に「MapConductorで学ぶWeb地図ハンズオン」を開催します！</p>
<p className="mt-5">今回は、MapConductorの創設者・リード開発者である勝又雅史氏を講師にお迎えし、10名前後の少人数で、実際に手を動かしながらWeb地図づくりを学びます。</p>
<p className="mt-5">Web地図やReactを使ったことがない方も歓迎です！</p>
<SectionTitle className="mt-12 border-b border-[#6A5748]/15 pb-4 text-2xl font-semibold">MapConductorとは？</SectionTitle>
<p className="mt-5"><strong>MapConductorは、Google MapsやMapLibreなど、異なる地図SDKを共通のAPIで扱うためのオープンソースの統一地図SDKです。</strong>Web向けのReactのほか、Android・iOSにも対応しています。</p>
<p className="mt-5">たとえば「地図にピンを置く」「線や図形を描く」「表示位置を動かす」といった操作を共通の考え方で記述できます。地図の提供元を替えるときも、こうした処理を再利用し、書き直す範囲を減らせます。</p>
<p className="mt-7"><a className="btn-primary inline-flex items-center gap-3" href="https://mapconductor.com/ja/">MapConductor公式サイトを見る <span aria-hidden="true">↗</span></a></p>
<SectionTitle className="mt-12 border-b border-[#6A5748]/15 pb-4 text-2xl font-semibold">今回のイベントの3つのポイント</SectionTitle>
<section className="mt-6 rounded-2xl border border-[#6A5748]/10 bg-[#F7F3ED]/60 p-5 sm:p-7"><PointTitle className="flex items-center text-xl font-semibold leading-8"><span className="mr-4 grid size-12 shrink-0 place-items-center rounded-xl bg-[#EAF7EC] text-[#426b45]"><EventIcon kind="map" /></span><span className="sr-only">① </span>地理を活用する新しい技術に触れる</PointTitle>
<p className="mt-5">Web地図は、地理空間情報を可視化し、多くの人が利用できる形で提供するための技術の一つです。</p>
<p className="mt-5">今回のハンズオンでは、事前のソフトウェアインストールを必要とせず、ブラウザ上の環境で実際にWeb地図づくりを体験できます。</p>
<p className="mt-5">これから地理空間分野に関わりたい学生や若手の方にとっては、地理の知識を活かす技術や仕事の可能性を知る機会となります。また、すでにこの分野で活動している方にとっても、MapConductorという新しい開発ツールを知り、技術や活動の選択肢を広げる機会となります。</p>
</section>
<section className="mt-6 rounded-2xl border border-[#6A5748]/10 bg-[#F7F3ED]/60 p-5 sm:p-7"><PointTitle className="flex items-center text-xl font-semibold leading-8"><span className="mr-4 grid size-12 shrink-0 place-items-center rounded-xl bg-[#EAF7EC] text-[#426b45]"><EventIcon kind="code" /></span><span className="sr-only">② </span>Web地図開発に共通する考え方を学べる</PointTitle>
<p className="mt-5">普段私たちが使っているGoogle MapsなどのWeb地図は、地図を動かしたり、場所にピンを立てたり、情報を表示したりする仕組みで作られています。</p>
<p className="mt-5">こうした基本的な機能は多くのWeb地図に共通していますが、地図の種類によってプログラムの書き方は異なります。</p>
<p className="mt-5">MapConductorを使うと、異なる地図でも共通の書き方で基本的な操作を行うことができます。</p>
<p className="mt-5">そのため、特定の地図サービスの使い方だけを覚えるのではなく、<strong>Web地図がどのような仕組みで動いているのか、さまざまなWeb地図に共通する考え方を学ぶことができます。</strong></p>
<p className="mt-5">Web地図開発が初めての方にも、その基本的な仕組みを理解する入口として適した内容です。</p>
</section>
<section className="mt-6 rounded-2xl border border-[#6A5748]/10 bg-[#F7F3ED]/60 p-5 sm:p-7"><PointTitle className="flex items-center text-xl font-semibold leading-8"><span className="mr-4 grid size-12 shrink-0 place-items-center rounded-xl bg-[#EAF7EC] text-[#426b45]"><EventIcon kind="people" /></span><span className="sr-only">③ </span>地理空間分野の人・企業・コミュニティとつながる</PointTitle>
<p className="mt-5">今回のイベントでは、技術を学ぶことに加え、地理空間分野で活動する人や組織を知ることもできます。</p>
<ul className="mt-5 list-disc space-y-3 pl-6"><li><strong>講師：勝又雅史氏</strong><br />  MapConductorの創設者・リード開発者であり、Google Developer Expert（Maps）としても活動されています。今回のハンズオンでは、開発者本人から直接学ぶことができます。</li></ul>
<ul className="mt-5 list-disc space-y-3 pl-6"><li><strong>会場協力：株式会社Eukarya</strong><br />  地理空間情報分野の企業であるEukaryaのオフィスをお借りして開催します。地理やGISに関わる企業や仕事を知るきっかけにもなります。</li></ul>
<ul className="mt-5 list-disc space-y-3 pl-6"><li><strong>後援：OSGeo Japan</strong><br />  地理空間分野の自由・オープンソースソフトウェア（FOSS）の普及・発展に取り組むコミュニティです。地理空間技術を支えるオープンソースの世界に触れる機会にもなります。</li></ul>
<p className="mt-5">技術を学ぶだけでなく、地理空間分野で活動する人や組織との接点を持てることも、今回のイベントの特徴です。</p>
</section>
<SectionTitle className="mt-12 border-b border-[#6A5748]/15 pb-4 text-2xl font-semibold">開催概要</SectionTitle>
<div className="mt-6 overflow-x-auto"><table className="w-full border-collapse text-left text-sm sm:text-base"><thead><tr><th scope="col" className="border-b border-[#6A5748]/20 bg-[#F7F3ED] p-3">項目</th><th scope="col" className="border-b border-[#6A5748]/20 bg-[#F7F3ED] p-3">内容</th></tr></thead><tbody><tr><th scope="row" className="w-28 border-b border-[#6A5748]/15 p-3 align-top sm:w-40">日時</th><td className="border-b border-[#6A5748]/15 p-3">2026年11月25日（水）19:00〜21:00（受付18:45〜）</td></tr><tr><th scope="row" className="w-28 border-b border-[#6A5748]/15 p-3 align-top sm:w-40">住所</th><td className="border-b border-[#6A5748]/15 p-3">東京都文京区本郷3丁目35-2 THE PORTAL 本郷三丁目 9階</td></tr><tr><th scope="row" className="w-28 border-b border-[#6A5748]/15 p-3 align-top sm:w-40">参加費</th><td className="border-b border-[#6A5748]/15 p-3">社会人1,500円／学生無料</td></tr></tbody></table></div>
<p className="mt-5"><strong>主催：</strong> 一般社団法人Youth GEO Japan<br /><strong>会場協力：</strong> 株式会社Eukarya<br /><strong>後援：</strong> OSGeo Japan</p>
<SectionTitle className="mt-12 border-b border-[#6A5748]/15 pb-4 text-2xl font-semibold">お申し込み</SectionTitle>
<p className="mt-5">参加条件・持ち物などの詳細をご確認のうえ、Peatixからお申し込みください。</p>
<p className="mt-5"><strong><a className="btn-primary inline-flex text-center" href="https://peatix.com/event/5239553">イベント詳細・お申し込みはこちら</a></strong></p>
<p className="mt-5">Youth GEO Japanでは、地理をきっかけに若者が興味を広げ、さまざまな分野や人とつながる機会をつくっています。</p>
<p className="mt-5">今回のハンズオンも、地理の新たな可能性に触れる機会として、ぜひご活用ください。 </p>
</> : <>
<p className="mt-5">Youth GEO Japan will host “Hands-on Web Mapping with MapConductor” on Wednesday, November 25, 2026!</p>
<p className="mt-5">We will welcome Masashi Katsumata, founder and lead developer of MapConductor, as our instructor. In a small group of around 10 people, participants will learn to build web maps through hands-on practice.</p>
<p className="mt-5">Beginners who have never used web maps or React are welcome!</p>
<SectionTitle className="mt-12 border-b border-[#6A5748]/15 pb-4 text-2xl font-semibold">What is MapConductor?</SectionTitle>
<p className="mt-5"><strong>MapConductor is an open-source unified map SDK that provides a common API for map SDKs such as Google Maps and MapLibre.</strong> It supports React for the web, as well as Android and iOS.</p>
<p className="mt-5">Common operations include placing markers, drawing lines and shapes, and moving the camera. These operations can be reused when changing map providers, reducing the amount of code that needs to be rewritten.</p>
<p className="mt-7"><a className="btn-primary inline-flex items-center gap-3" href="https://mapconductor.com/">Visit the MapConductor website <span aria-hidden="true">↗</span></a></p>
<SectionTitle className="mt-12 border-b border-[#6A5748]/15 pb-4 text-2xl font-semibold">Three highlights of this event</SectionTitle>
<section className="mt-6 rounded-2xl border border-[#6A5748]/10 bg-[#F7F3ED]/60 p-5 sm:p-7"><PointTitle className="flex items-center text-xl font-semibold leading-8"><span className="mr-4 grid size-12 shrink-0 place-items-center rounded-xl bg-[#EAF7EC] text-[#426b45]"><EventIcon kind="map" /></span><span className="sr-only">① </span>Explore new technology that puts geography to use</PointTitle>
<p className="mt-5">Web mapping is one way to visualize geospatial information and make it accessible to many people.</p>
<p className="mt-5">In this workshop, you can try building web maps in a browser-based environment without installing software beforehand.</p>
<p className="mt-5">For students and young people interested in entering the geospatial field, this is an opportunity to discover technologies and careers that use geographic knowledge. Those already active in the field can also discover MapConductor and broaden their options for technology and activities.</p>
</section>
<section className="mt-6 rounded-2xl border border-[#6A5748]/10 bg-[#F7F3ED]/60 p-5 sm:p-7"><PointTitle className="flex items-center text-xl font-semibold leading-8"><span className="mr-4 grid size-12 shrink-0 place-items-center rounded-xl bg-[#EAF7EC] text-[#426b45]"><EventIcon kind="code" /></span><span className="sr-only">② </span>Learn concepts shared across web map development</PointTitle>
<p className="mt-5">Web maps we use every day, such as Google Maps, have mechanisms for moving maps, placing pins, and displaying information.</p>
<p className="mt-5">These basic features are common to many web maps, although the programming style varies between map services.</p>
<p className="mt-5">MapConductor lets you perform basic operations on different maps using a common programming style.</p>
<p className="mt-5">Rather than learning only how to use a particular map service, <strong>you can learn how web maps work and the concepts shared across different web maps.</strong></p>
<p className="mt-5">The workshop offers a useful introduction to these fundamentals for people new to web map development.</p>
</section>
<section className="mt-6 rounded-2xl border border-[#6A5748]/10 bg-[#F7F3ED]/60 p-5 sm:p-7"><PointTitle className="flex items-center text-xl font-semibold leading-8"><span className="mr-4 grid size-12 shrink-0 place-items-center rounded-xl bg-[#EAF7EC] text-[#426b45]"><EventIcon kind="people" /></span><span className="sr-only">③ </span>Connect with people, companies, and communities in the geospatial field</PointTitle>
<p className="mt-5">Alongside learning technology, you can get to know people and organizations active in the geospatial field.</p>
<ul className="mt-5 list-disc space-y-3 pl-6"><li><strong>Instructor: Masashi Katsumata</strong><br />  Founder and lead developer of MapConductor and a Google Developer Expert (Maps). You can learn directly from the developer himself.</li></ul>
<ul className="mt-5 list-disc space-y-3 pl-6"><li><strong>Venue support: Eukarya Inc.</strong><br />  The workshop will take place at the office of Eukarya, a company in the geospatial field. It is also an opportunity to discover companies and careers related to geography and GIS.</li></ul>
<ul className="mt-5 list-disc space-y-3 pl-6"><li><strong>Supported by: OSGeo Japan</strong><br />  This community promotes and develops free and open-source software (FOSS) in the geospatial field. The event offers a chance to explore the open-source world supporting geospatial technology.</li></ul>
<p className="mt-5">Connecting with people and organizations in the geospatial field, as well as learning technology, is a distinctive part of this event.</p>
</section>
<SectionTitle className="mt-12 border-b border-[#6A5748]/15 pb-4 text-2xl font-semibold">Event details</SectionTitle>
<div className="mt-6 overflow-x-auto"><table className="w-full border-collapse text-left text-sm sm:text-base"><thead><tr><th scope="col" className="border-b border-[#6A5748]/20 bg-[#F7F3ED] p-3">Item</th><th scope="col" className="border-b border-[#6A5748]/20 bg-[#F7F3ED] p-3">Details</th></tr></thead><tbody><tr><th scope="row" className="w-28 border-b border-[#6A5748]/15 p-3 align-top sm:w-40">Date and time</th><td className="border-b border-[#6A5748]/15 p-3">Wednesday, November 25, 2026, 19:00–21:00 JST (reception from 18:45)</td></tr><tr><th scope="row" className="w-28 border-b border-[#6A5748]/15 p-3 align-top sm:w-40">Address</th><td className="border-b border-[#6A5748]/15 p-3">9F, THE PORTAL Hongo Sanchome, 3-35-2 Hongo, Bunkyo-ku, Tokyo</td></tr><tr><th scope="row" className="w-28 border-b border-[#6A5748]/15 p-3 align-top sm:w-40">Participation fee</th><td className="border-b border-[#6A5748]/15 p-3">Working adults: ¥1,500 / Students: free</td></tr></tbody></table></div>
<p className="mt-5"><strong>Organizer:</strong> Youth GEO Japan (General Incorporated Association)<br /><strong>Venue support:</strong> Eukarya Inc.<br /><strong>Supported by:</strong> OSGeo Japan</p>
<SectionTitle className="mt-12 border-b border-[#6A5748]/15 pb-4 text-2xl font-semibold">Registration</SectionTitle>
<p className="mt-5">Please check Peatix for participation requirements, what to bring, and registration.</p>
<p className="mt-5"><strong><a className="btn-primary inline-flex text-center" href="https://peatix.com/event/5239553">Event details and registration</a></strong></p>
<p className="mt-5">Youth GEO Japan creates opportunities for young people to expand their interests through geography and connect with people across different fields.</p>
<p className="mt-5">We hope you will join this workshop to explore new possibilities for geography.</p>
</>}</div>
  </div></article></section>;
}
