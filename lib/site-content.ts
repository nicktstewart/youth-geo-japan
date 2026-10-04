export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Activities", href: "/activities" },
  { label: "Partners", href: "/partners" },
  { label: "法人情報", href: "/organization" },
];

export const siteMeta = {
  name: "Youth GEO Japan",
  tagline: "好奇心を、まっすぐ未来へ。",
  description:
    "Youth GEO Japanは、若者が自分と地理との接点を見つけ、同じ関心を持つ仲間や地理空間分野で活動する人とつながり、その興味を学びやキャリア、実践へつなげていくためのコミュニティです。",
};

export const homeContent = {
  vision: {
    eyebrow: "Vision:",
    title: "“地理好き”は、未来を拓くハブになる",
    body: [
      "地理への好奇心は、社会を変え、未来を拓く力になります。",
      "Youth GEO Japanは、“地理”という現代社会の鍵を握る若者が、リーダーシップを発揮し、社会へポジティブな変化をもたらすことを目指しています。",
    ],
  },
  approach: {
    eyebrow: "Our Approach:",
    title: "地理への好奇心を、社会へ",
    items: [
      "「知る」「考える」「形にする」「繋がる」 を循環させることで、若者の地理に対する好奇心を社会へ活かす一歩を支えます。",
      "多様なバックグラウンドの仲間と協働しながら、好奇心を追求できる環境を提供します。",
    ],
  },
  whatWeDo: {
    eyebrow: "What We Do:",
    title: "知る、考える、形にする、繋がる",
    cards: [
      {
        title: "知る",
        subtitle: "ー「きっかけ」を届ける",
        description:
          "中高生を含む若者に、“地理って面白い！”とワクワクできる、地理の世界を知るきっかけを提供します。",
      },
      {
        title: "考える",
        subtitle: "ー「視点」を広げる",
        description:
          "政府機関・企業・アカデミアなどによる講演会やイベントを通して、「旅行や自然、地理が好き」という好奇心をどう追求できるか、そして地理が社会課題や未来にどう役立つかを考え、自分にぴったりの進学やキャリアを考えるための視点を提供します。",
      },
      {
        title: "形にする",
        subtitle: "ー「体験」を生み出す",
        description:
          "ハッカソンや勉強会などを通じて、GISをはじめとする地理のツールを活用し、頭の中のアイデアを可視化する体験を提供します。",
      },
      {
        title: "繋がる",
        subtitle: "ー「環境」を育む",
        description:
          "企業や団体と若者のネットワークを築き、若者が地理への好奇心から将来の道を描ける環境を提供します。",
      },
    ],
  },
  story: {
    title: "Our story: 私たちの想い",
    paragraphs: [
      "私たちは、地理の可能性を信じる若者のコミュニティです。",
      "旅先で地形を眺めたり、街の成り立ちを想像したり——それらもすべて「地理」の一部です。",
      "私たちが日常的に使う地図アプリなどにも、地理空間情報が生かされています。",
      "地理は、複雑な問題を分野を超えて空間的に捉える視点です。そのため、地理はあらゆる分野のハブとなり、現場に根ざした視点から社会へアプローチします。",
      "しかしながら、その幅広さゆえ、こうした地理の価値はまだまだ知られていません。日本では高校を境に地理の学びが途切れ、大学以降の体系的な教育や専門職との接点が十分に整っていません。だからこそ、私たちはその「架け橋」となり、若者と地理の可能性を広げていきます。",
      "地理の価値を社会へ浸透させ、新たな道標を生み出し続けたい。",
      "Youth Geo Japanは、そんな想いから生まれた、地理を愛する若者が未来へ挑戦するコミュニティです。",
    ],
  },
  community: {
    eyebrow: "Our Community",
    title: "Join Us!!",
    paragraphs: [
      "Youth Geo Japanは、地理への好奇心を軸に、若者が自由に挑戦し、学び合うコミュニティです。地理やGISに関心があれば、学部や専門、スキルは問いません。",
      "Discord上でツールの勉強会やイベント情報を共有し、仲間と一緒にスキルを高め合っています。",
      "「地理が好き」「GISに興味がある」「仲間と一緒に形にしてみたい」",
      "そんな気持ちがあれば、大歓迎です。",
      "Youth GEO Japan",
      "好奇心を、まっすぐ未来へ。",
    ],
  },
};

export const activityCategories = [
  "勉強会",
  "ミニプレゼン会",
  "フィールドワーク",
  "就職相談",
  "交流会",
  "ビジネスコンテスト",
] as const;

export type ActivityCategory =
  | (typeof activityCategories)[number]
  | "その他";

export type Activity = {
  title: string;
  date?: string;
  category: ActivityCategory;
  description: string;
  image?: string;
  link?: string;
};

export const activities: Activity[] = [
  {
    title: "2026年9月 ニュースレター",
    date: "2026.09",
    category: "その他",
    description: "一般社団法人の設立、FOSS4Gへの参加、被爆樹木マップ、ハンズオンイベントの予定、渋谷での交流をお届けします。",
    link: "#newsletter-2026-09",
  },
  {
    title: "2026年8月 ニュースレター",
    date: "2026.08",
    category: "その他",
    description:
      "コンテストに向けたミーティング、イベント参加、LT会、交流の様子をまとめました。",
    link: "#newsletter-2026-08",
  },
];

export type Newsletter = {
  issue: string;
  title: string;
  lead: string[];
  topics: {
    title: string;
    paragraphs: string[];
    items?: string[];
    link?: { href: string; label: string };
  }[];
  upcoming: string[];
  upcomingNote?: string;
  closing?: string[];
};

export const septemberNewsletter: Newsletter = {
  issue: "2026.09",
  title: "Youth GEO Japan ニュースレター 2026年9月号",
  lead: [
    "こんにちは！Youth GEO Japanです。",
    "地理空間情報に興味のある若者たちが集まるコミュニティとして、日々活動しています。",
    "今月の活動をご紹介します。",
  ],
  topics: [
    {
      title: "一般社団法人の設立",
      paragraphs: [
        "Youth GEO Japanは、一般社団法人として正式に設立しました。ここまでご協力いただいた皆さま、ありがとうございます！",
        "これからも、地理をきっかけに学生や若手が興味を広げ、人や分野とつながれる場をつくっていきます。",
      ],
      link: { href: "/organization", label: "法人情報を見る" },
    },
    {
      title: "FOSS4G 2026 Hiroshimaへの参加",
      paragraphs: [
        "メンバーがFOSS4G 2026 Hiroshimaに参加し、現地での交流や情報収集を行いました。",
        "参加したメンバーの感想も、今後ご紹介できればと思います。",
      ],
    },
    {
      title: "被爆樹木マップでコンテストに応募",
      paragraphs: [
        "8月から進めていた樹木保護プロジェクトでは、被爆樹木マップを作成し、Geoアクティビティコンテストに応募しました。",
        "被爆樹木の位置や状態、公開されている記録を地図で伝え、保全につなげる取り組みです。Webサイトの公開は今後予定しています。",
      ],
    },
    {
      title: "MapConductorハンズオンイベントの開催決定",
      paragraphs: [
        "FOSS4Gでご縁があったMapConductorの勝又さんを講師に迎え、11月25日（水）の夕方にハンズオンイベントを開催することが決まりました。",
        "MapConductorは、Google MapsやMapLibreなど、異なる地図開発ツールを共通の書き方で扱えるようにする開発ツールです。今回のイベントでは、初めての方も実際に手を動かしながら地図開発を体験できる内容を予定しています。",
        "運営・サポートメンバーも募集中です。興味のある方は、ぜひお気軽にご連絡ください！",
      ],
    },
    {
      title: "渋谷での少人数オフ会",
      paragraphs: [
        "9月10日には、広島から参加してくれているメンバーを交えて渋谷で少人数オフ会を開催しました。オンラインだけでなく、対面での交流も継続しています。",
      ],
    },
  ],
  upcoming: ["MapConductorハンズオンイベント（11月25日夕方）", "Podcastの公開（10月予定）"],
  upcomingNote: "イベントの詳細やWebサイトの公開時期は、決まり次第お知らせします。",
  closing: [
    "Youth GEO Japan は、地理情報に興味のある若者ならどなたでも参加できるコミュニティです。",
    "興味のある方は、ぜひDiscordサーバーへお越しください！",
    "ご質問・ご参加希望はお気軽にどうぞ。",
  ],
};

export const augustNewsletter: Newsletter = {
  issue: "2026.08",
  title: "Youth GEO Japan ニュースレター",
  lead: [
    "こんにちは、Youth GEO Japanです。私たちは、地理空間情報に興味のある若者が集まり、学びや挑戦を共有するコミュニティです。",
    "8月号では、最近のミーティングや勉強会、イベント参加、メンバー同士の交流についてお届けします。",
  ],
  topics: [
    {
      title: "コンテストに向けたミーティング",
      paragraphs: [
        "国土地理院のGeoアクティビティコンテストや、国土交通省のPLATEAU AWARD 2026など、地理空間情報を活用したコンテストについて情報を共有しました。",
        "自発的に参加者が集まり、アイデア出しや今後の進め方についてミーティングを行いました。今後は検討を重ね、具体的な内容を少しずつ形にしていきます。",
      ],
    },
    {
      title: "イベント参加・情報共有",
      paragraphs: [
        "GISや地理空間情報に関するイベントを紹介し合い、実際に参加したメンバーが学びを共有しました。",
        "8月18日にはGISA若手分科会研究会に参加しました。このほかにも、メンバーがG空間EXPOなどの展示会へ足を運び、それぞれの発見や面白かった点をコミュニティ内で紹介しています。",
      ],
      items: [
        "参加｜GISA若手分科会研究会（8月18日・東京）",
        "参加｜G空間EXPOなどの展示会",
        "情報共有｜Cesium Developer Day Japan 2026",
        "参加案内｜FOSS4G 2026 Hiroshima・運営スタッフ募集",
      ],
    },
    {
      title: "勉強会・LT会",
      paragraphs: [
        "内部LT会の第1回・第2回を開催し、メンバーそれぞれの関心を起点に発表とディスカッションを行いました。",
        "座標系、ネットワーク分析、3D GIS・GeoAI、スポンジシティ、関係人口、街づくりゲームなどを、今後のテーマ候補として話し合っています。",
      ],
    },
    {
      title: "オフ会・交流",
      paragraphs: [
        "5月には対面のオフ会を開催しました。次回は9月の開催を予定しています。Discordでも日々の情報交換や企画の相談を行っています。",
      ],
    },
  ],
  upcoming: [
    "コンテストに向けたミーティング・作業会",
    "勉強会・LT会の継続開催",
    "9月のオフ会開催",
  ],
};

export const pdfSupplementContent = {
  join: {
    title: "これからの活動を一緒につくる",
    subtitle: "仲間募集中！！",
    body: "Youth GEO Japanでは現在一緒に活動してくれるメンバーを大募集しています。関心や得意分野に合わせて、さまざまな企画を提案し、実際に形にしていくことができます！また、GISを仕事にしている社会人との交流の機会もあります。 地理やGISを学ぶだけでなく、仕事や実践につなげていきたい人、大歓迎です！！",
  },
  activityTags: [...activityCategories],
  members: {
    title: "こんな人がいます！",
    items: [
      "東京都出身、北海道大学→イギリスの大学院でGISを勉強したのにコンサルをしている代表",
      "千葉県出身、まちづくり政策を学びにスウェーデンに行った人文地理学修士学生",
      "広島県出身、地方創生に興味があり、イギリスで地理学修士を取得後不動産業で営業マン",
      "その他、3D GIS修士学生・ランドスケープデザイン大学生・エンジニア・都市空間系の会社の社長など10名程在籍！！",
    ],
  },
  contact: {
    participationTitle: "参加してみたい方へ",
    participationBody:
      "学年や専門、経験、スキルは問いません。地理が好き、GISに興味がある、仲間と一緒に何かやってみたい…\nそんな気持ちがあれば大歓迎です！",
    discordTitle: "Discordでの交流",
    discordBody:
      "日々の会話や相談、情報共有、企画の相談などを、Discordで気軽に行っています。\nまずは様子を知りたいという人にも、入りやすい雰囲気を目指しています。",
    detailsTitle: "詳細・参加方法はこちら",
    detailsBody:
      "まずはメールでお気軽にご連絡ください！\nMail：contact@youthgeojp.com",
  },
};

export const partnerHeroCopy =
  "企業や団体と若者のネットワークを築き、若者が地理への好奇心から将来の道を描ける環境を提供します。";

export const partnerAudiences = [
  "GIS・地理空間情報に関わる企業",
  "都市、環境、防災、交通、不動産、エネルギー、行政、アカデミア等の関係者",
  "若者向けに講演・メンタリング・協賛・共同イベントを実施したい社会人/団体",
];

export const partnerOptions = [
  {
    title: "講演・イベント登壇",
    description:
      "若者が進学・仕事・社会課題とのつながりを考える機会を提供します。",
  },
  {
    title: "勉強会・ハッカソン協力",
    description:
      "GISをはじめとする地理のツールを活用し、アイデアを形にする体験を支えます。",
  },
  {
    title: "キャリア相談・メンタリング",
    description:
      "地理への好奇心から将来の道を描ける環境づくりに協力いただきます。",
  },
  {
    title: "協賛・共同企画",
    description: "Youth GEO Japanの活動継続と拡大を支援いただきます。",
  },
];

export const contactInfo = {
  email: "contact@youthgeojp.com",
  lineOpenChatUrl:
    "https://line.me/ti/g2/mE9lbLlg3tsPsex_QvgZl77WnKGEhQEV9Rvl9w",
  lineQrImage: "/line-openchat-qr.svg",
  discordInviteUrl: "https://discord.gg/yNfSucpfGv",
  xUrl: "",
  instagramUrl: "",
  linkedinUrl: "",
};

export const organizationInfo = {
  legalName: "一般社団法人　Youth GEO Japan",
  foundingDate: "2026-09-14",
  postalCode: "150-0043",
  streetAddress: "東京都渋谷区道玄坂1-16-6 二葉ビル8b",
  representative: "矢野由佳",
};

export const pageContent = {
  joinLabel: "参加",
  why: {
    title: "“地理好き”は、未来を拓くハブになる",
    paragraphs: [
      "地理は、自然環境、都市、まちづくり、防災、観光、国際協力、防衛など、さまざまな分野とつながっています。私たちは、地理を一つの独立した学問としてだけではなく、社会や地域、世界を捉えるための視点の一つだと考えています。",
      "だからこそ、地理への好奇心は、社会を変え、未来を拓く力になります。",
      "Youth GEO Japanは、地理やその周辺分野に関心を持つ若者が集まり、自分と地理との接点を見つけ、その興味を学びやキャリアにつなげていける環境をつくることを目的としています。",
      "そして、“地理”という現代社会の鍵を握る視点を通して、若者がリーダーシップを発揮し、社会へポジティブな変化をもたらすことを目指しています。",
    ],
  },
  activityTitle: "活動報告",
  activityTags: ["勉強会", "LT会", "フィールドワーク", "就職相談", "対面交流会", "ビジネスコンテストへの参加"],
  moreActivities: "活動をもっと見る",
  about: {
    title: "Youth GEO Japanについて",
    description: "Youth GEO Japanの想いと、地理への好奇心を社会や地域での実践につなげる活動の考え方を紹介します。",
    storyTitle: "私たちの想い",
    approachParagraphs: [
      "私たちは、地理を学ぶことにとどまらず、そこで得た視点や知識を、社会や地域での実践につなげていきます。",
      "「知る」「考える」「形にする」「繋がる」を循環させることで、若者の地理に対する好奇心を社会へ活かす一歩を支えます。",
      "多様なバックグラウンドの仲間と協働しながら、好奇心を追求できる環境を提供します。",
    ],
    thinkDescription: "政府機関・企業・アカデミアなどによる講演会やイベントを通して、地理への好奇心と社会課題とのつながりを考え、自分に合った進学やキャリアを考える視点を提供します。",
  },
  join: {
    title: "Youth GEO Japanに参加する",
    description: "DiscordでYouth GEO Japanのコミュニティに参加できます。まずは活動情報を受け取りたい方には、LINEオープンチャットをご案内しています。",
    lead: ["学年や専門、経験、スキルは問いません。地理が好き、GISに興味がある、仲間と一緒に何かやってみたい…", "そんな気持ちがあれば大歓迎です！"],
    discordTitle: "コミュニティに参加する",
    discordBody: ["仲間と交流したり、勉強会やプロジェクトに参加したりしたい方は、Discordへ。", "日々の会話や相談、情報共有、企画の相談などを、Discordで気軽に行っています。"],
    discordButton: "Discordで参加する",
    lineTitle: "まずは活動情報を受け取る",
    lineBody: ["興味はあるけれど、参加はもう少し先に考えたい方や、Discordに馴染みのない方は、LINEオープンチャットへ。", "イベントのお知らせなど、Youth GEO Japanの情報を気軽に受け取れます。"],
    lineButton: "LINEオープンチャットに参加する",
    qrAlt: "LINEオープンチャット参加用QRコード",
  },
  partners: {
    title: "Youth GEO Japanを支援してくださる皆様へ",
    paragraphs: ["Youth GEO Japanでは、企業や団体と若者のネットワークを築き、若者が地理への好奇心から将来の道を描ける環境を提供します。", "ご協力いただける方は、ぜひメールにてお問い合わせください。"],
  },
  organization: {
    title: "法人情報",
    description: "一般社団法人Youth GEO Japanの法人概要、設立年月日、所在地、代表者、事業内容、代表者メッセージをご紹介します。",
    profileTitle: "法人概要",
    labels: { name: "法人名", founded: "設立年月日", address: "所在地", representative: "代表者", business: "事業内容", contact: "連絡先" },
    legalName: organizationInfo.legalName,
    foundingDate: "2026年9月14日",
    address: organizationInfo.streetAddress,
    representative: "代表理事　矢野由佳",
    businesses: [
      "地理空間情報に関心を持つ学生・若手が、学び、交流し、協働できるコミュニティの運営",
      "学生・若手の学習、研究、活動への助成・支援",
      "勉強会、講演会、交流会などの企画・実施",
      "国内外の関連団体、教育・研究機関、行政、企業との連携・協働",
      "地理空間情報分野の普及・発展に関わる事業、および法人の目的達成に必要な事業",
    ],
    messageTitle: "代表者メッセージ",
    messageHeading: "地理への興味を、将来の選択肢につなげたい",
    messageParagraphs: [
      "Youth GEO Japanを立ち上げた背景には、私自身が、地理という分野の広さに魅力を感じる一方で、その興味を進路やキャリアへつなげる難しさを感じてきた経験があります。",
      "地理を学んだ先にどのような研究や仕事があるのか。自分はどの分野に進むのが合っているのか。どのような知識やスキルを身につければよいのか。地理が好きだからこそ選択肢が広く、かえって進む方向に迷うことがあります。",
      "また、都市、防災、環境、交通、観光、国際協力、データ分析などに関心を持っていても、その関心と地理とのつながりに気づく機会は、決して多くありません。",
      "こうした経験から、自分と地理との接点を見つけ、その先にある人や仕事を知り、実際の活動へ進んでいける場所をつくりたいと考えるようになりました。",
      "学生同士がつながること。研究者、技術者、企業、行政などで活動する人たちと出会うこと。進学、研究、就職、イベント、コミュニティについて知ること。そして、実践的なプロジェクトを通して知識やスキル、経験を身につけること。",
      "Youth GEO Japanを、若者の好奇心が次の一歩につながる場所にしていきたいと考えています。",
    ],
  },
};
