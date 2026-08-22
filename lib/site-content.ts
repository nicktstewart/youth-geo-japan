export const navItems = [
  { label: "Home", href: "/" },
  { label: "Activities", href: "/activities" },
  { label: "Partners", href: "/partners" },
];

export const siteMeta = {
  name: "Youth GEO Japan",
  tagline: "好奇心を、まっすぐ未来へ。",
  description:
    "Youth GEO Japanは、地理への好奇心を軸に、若者が自由に挑戦し、学び合うコミュニティです。",
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
    title: "2026年8月 ニュースレター",
    date: "2026.08",
    category: "その他",
    description:
      "コンテストに向けたミーティング、イベント参加、LT会、交流の様子をまとめました。",
    link: "#newsletter-2026-08",
  },
];

export const augustNewsletter = {
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
  lineQrImage: "/line-qr.png",
  discordInviteUrl: "",
  xUrl: "",
  instagramUrl: "",
  linkedinUrl: "",
};
