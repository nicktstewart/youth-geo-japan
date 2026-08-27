import {
  activities,
  augustNewsletter,
  contactInfo,
  homeContent,
  navItems,
  partnerAudiences,
  partnerHeroCopy,
  partnerOptions,
  pdfSupplementContent,
  siteMeta,
} from "@/lib/site-content";

export const locales = ["ja", "en"] as const;
export type Locale = (typeof locales)[number];

export function hasLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localePath(locale: Locale, href: string) {
  if (locale === "ja" || href.startsWith("#")) return href;
  return href === "/" ? "/en" : `/en${href}`;
}

const ja = {
  navItems,
  siteMeta,
  homeContent,
  activities,
  augustNewsletter,
  pdfSupplementContent,
  partnerHeroCopy,
  partnerAudiences,
  partnerOptions,
  contactInfo,
  ui: {
    headerNavLabel: "メインナビゲーション",
    footerNavLabel: "フッターナビゲーション",
    openNavigation: "ナビゲーションを開く",
    languageLabel: "表示言語",
    viewActivities: "活動を見る",
    joinActivities: "活動に参加する",
    activitiesPageTitle: "活動の記録",
    activitiesPageDescription:
      "勉強会やイベント、メンバー同士の交流など、Youth GEO Japanの歩みを月ごとにお届けします。",
    articleList: "記事一覧",
    issueContents: "8月号の目次",
    upcoming: "今後の予定",
    partnersTitle: "地理への好奇心から、将来の道を描ける環境をともにつくる",
    partnerContact: "協力について問い合わせる",
    audiences: "対象者",
    collaborationMenu: "協力メニュー",
    contactTitle: "参加・協力・問い合わせ",
    contactDescription:
      "メンバーとして参加してみたい方も、外部から協力・取材・共同企画を相談したい方も、まずはお気軽にご連絡ください。",
    contactCards: {
      emailTitle: "参加・協力・問い合わせ",
      emailBody: [
        "Youth GEO Japanで一緒に活動してみたい方、地理やGISに関心がありコミュニティの様子を知りたい方は、メールでお気軽にご連絡ください。",
        "取材・協力・協賛・共同企画など、社会人・企業・団体・教育機関の方からのお問い合わせも同じメールアドレスで受け付けています。",
      ],
      emailButton: "メールで問い合わせる",
      lineTitle: "活動情報を受け取る",
      lineBody: [
        "メンバーとして参加してみたい方や、まずは活動の雰囲気を知りたい方は、LINEオープンチャットから情報を受け取れます。",
        "地理やGISに関連するイベントのお知らせなど、Youth GEO Japanの新しい動きを気軽にチェックできます。",
      ],
      lineButton: "LINEオープンチャットに参加する",
    },
    approachCycleLabel: "知る、考える、形にする、繋がるの循環",
    approachSteps: ["知る", "考える", "形にする", "繋がる"],
  },
};

const en = {
  navItems: [
    { label: "Home", href: "/" },
    { label: "Activities", href: "/activities" },
    { label: "Partners", href: "/partners" },
  ],
  siteMeta: {
    name: "Youth GEO Japan",
    tagline: "Curiosity, straight into the future.",
    description:
      "Youth GEO Japan is a community where young people explore geography, take on new challenges, and learn together.",
  },
  homeContent: {
    vision: {
      eyebrow: "Vision:",
      title: "A passion for geography can become a hub for the future",
      body: [
        "Curiosity about geography has the power to transform society and open up the future.",
        "Youth GEO Japan aims to empower young people who understand geography—a key to today’s world—to exercise leadership and create positive change in society.",
      ],
    },
    approach: {
      eyebrow: "Our Approach:",
      title: "Bringing geographic curiosity into society",
      items: [
        "By creating a cycle of discovering, thinking, creating, and connecting, we help young people take the first step toward applying their geographic curiosity in society.",
        "We provide a place where members can pursue their curiosity while collaborating with people from diverse backgrounds.",
      ],
    },
    whatWeDo: {
      eyebrow: "What We Do:",
      title: "Discover, think, create, and connect",
      cards: [
        {
          title: "Discover",
          subtitle: "Creating a first encounter",
          description:
            "We introduce young people—including junior-high and high-school students—to the excitement and possibilities of geography.",
        },
        {
          title: "Think",
          subtitle: "Broadening perspectives",
          description:
            "Through talks and events with government, industry, and academia, we explore how an interest in travel, nature, and geography can grow into study, a career, or a way to address social challenges.",
        },
        {
          title: "Create",
          subtitle: "Turning ideas into experience",
          description:
            "Through hackathons and study sessions, members use GIS and other geographic tools to visualize ideas and turn them into tangible experiences.",
        },
        {
          title: "Connect",
          subtitle: "Building an environment",
          description:
            "We connect young people with companies and organizations, creating an environment where geographic curiosity can help shape future paths.",
        },
      ],
    },
    story: {
      title: "Our story",
      paragraphs: [
        "We are a community of young people who believe in the possibilities of geography.",
        "Observing landforms while traveling or imagining how a city developed—these are all part of geography.",
        "Geospatial information also powers familiar tools such as the map applications we use every day.",
        "Geography offers a spatial perspective for understanding complex issues across disciplines. It can act as a hub between fields and help us approach society from perspectives grounded in real places.",
        "Yet precisely because geography is so broad, its value is still not widely understood. In Japan, many people stop studying geography after high school, while structured higher education and connections to specialist careers remain limited. We want to serve as a bridge and expand the possibilities available to both young people and geography.",
        "We want to make the value of geography more visible in society and continue creating new signposts for the future.",
        "Youth GEO Japan was born from that ambition: a community where young people who love geography can take on the future together.",
      ],
    },
  },
  activities: [
    {
      title: "August 2026 Newsletter",
      date: "2026.08",
      category: "Other",
      description:
        "A recap of our competition meetings, event participation, lightning talks, and community gatherings.",
      link: "#newsletter-2026-08",
    },
  ],
  augustNewsletter: {
    issue: "2026.08",
    title: "Youth GEO Japan Newsletter",
    lead: [
      "Hello from Youth GEO Japan. We are a community of young people interested in geospatial information who share opportunities to learn and take on new challenges.",
      "In our August issue, we look back at recent meetings, study sessions, events, and exchanges among our members.",
    ],
    topics: [
      {
        title: "Meetings for upcoming competitions",
        paragraphs: [
          "We shared information about geospatial competitions, including the Geo Activity Contest organized by the Geospatial Information Authority of Japan and the Ministry of Land, Infrastructure, Transport and Tourism’s PLATEAU AWARD 2026.",
          "Members joined voluntarily to brainstorm ideas and discuss how to move forward. We will continue developing those ideas step by step.",
        ],
      },
      {
        title: "Events and knowledge sharing",
        paragraphs: [
          "We introduced one another to GIS and geospatial events, and members shared what they learned from attending them.",
          "On August 18, members participated in the GISA Young Researchers Group meeting. Members also visited exhibitions such as G-Spatial EXPO and shared their discoveries and highlights with the community.",
        ],
        items: [
          "Attended | GISA Young Researchers Group meeting (August 18, Tokyo)",
          "Attended | G-Spatial EXPO and other exhibitions",
          "Shared | Cesium Developer Day Japan 2026",
          "Announced | FOSS4G 2026 Hiroshima participation and volunteer opportunities",
        ],
      },
      {
        title: "Study sessions and lightning talks",
        paragraphs: [
          "We held our first and second internal lightning-talk sessions, with presentations and discussions driven by each member’s interests.",
          "Possible themes for future sessions include coordinate systems, network analysis, 3D GIS and GeoAI, sponge cities, relationship populations, and city-building games.",
        ],
      },
      {
        title: "Meetups and community",
        paragraphs: [
          "We held an in-person meetup in May and are planning the next one for September. Members also exchange information and discuss projects on Discord every day.",
        ],
      },
    ],
    upcoming: [
      "Competition meetings and work sessions",
      "Ongoing study sessions and lightning talks",
      "September meetup",
    ],
  },
  pdfSupplementContent: {
    join: {
      title: "Help us shape what comes next",
      subtitle: "New members welcome!",
      body: "Youth GEO Japan is looking for new members. You can propose ideas that match your interests and strengths, then work with others to bring them to life. Members also have opportunities to meet professionals working with GIS. Anyone who wants to connect geography and GIS with practical work is welcome.",
    },
    activityTags: [
      "Study sessions",
      "Lightning talks",
      "Fieldwork",
      "Career advice",
      "Meetups",
      "Business contests",
    ],
    members: {
      title: "Meet our community",
      items: [
        "Our representative, from Tokyo, studied GIS at Hokkaido University and a graduate school in the UK before moving into consulting.",
        "A human-geography master’s student from Chiba who went to Sweden to study urban policy.",
        "A member from Hiroshima who earned a geography master’s degree in the UK and now works in real-estate sales with an interest in regional revitalization.",
        "Around ten members in total, including a 3D GIS graduate student, a landscape-design student, engineers, and the president of an urban-space company.",
      ],
    },
  },
  partnerHeroCopy:
    "We connect young people with companies and organizations, creating an environment where geographic curiosity can help shape future paths.",
  partnerAudiences: [
    "Companies working with GIS and geospatial information",
    "People in urban planning, the environment, disaster prevention, transport, real estate, energy, government, and academia",
    "Professionals and organizations interested in talks, mentoring, sponsorship, or joint events for young people",
  ],
  partnerOptions: [
    {
      title: "Talks and event speakers",
      description:
        "Give young people opportunities to connect geography with further study, careers, and social challenges.",
    },
    {
      title: "Study sessions and hackathons",
      description:
        "Support hands-on experiences where young people use GIS and other geographic tools to turn ideas into reality.",
    },
    {
      title: "Career advice and mentoring",
      description:
        "Help create an environment where young people can build future paths from their curiosity about geography.",
    },
    {
      title: "Sponsorship and joint projects",
      description: "Support the continuity and growth of Youth GEO Japan’s activities.",
    },
  ],
  contactInfo,
  ui: {
    headerNavLabel: "Main navigation",
    footerNavLabel: "Footer navigation",
    openNavigation: "Open navigation",
    languageLabel: "Language",
    viewActivities: "View activities",
    joinActivities: "Join our activities",
    activitiesPageTitle: "Activity journal",
    activitiesPageDescription:
      "Follow Youth GEO Japan’s journey through our study sessions, events, and community gatherings.",
    articleList: "Issues",
    issueContents: "Contents of the August issue",
    upcoming: "What’s next",
    partnersTitle: "Building pathways from geographic curiosity—together",
    partnerContact: "Contact us about collaborating",
    audiences: "Who we work with",
    collaborationMenu: "Ways to collaborate",
    contactTitle: "Join, collaborate, or get in touch",
    contactDescription:
      "Whether you want to join as a member or discuss an interview, partnership, or joint project, we would love to hear from you.",
    contactCards: {
      emailTitle: "Join, collaborate, or contact us",
      emailBody: [
        "If you are interested in joining Youth GEO Japan or simply want to learn more about our geography and GIS community, feel free to email us.",
        "We also welcome inquiries from professionals, companies, organizations, and educational institutions about interviews, collaboration, sponsorship, and joint projects.",
      ],
      emailButton: "Contact us by email",
      lineTitle: "Get activity updates",
      lineBody: [
        "If you are considering joining or would first like to get a feel for the community, you can receive updates through our LINE OpenChat.",
        "It is an easy way to follow Youth GEO Japan’s latest activities and geography- and GIS-related events.",
      ],
      lineButton: "Join the LINE OpenChat",
    },
    approachCycleLabel: "A cycle of discovering, thinking, creating, and connecting",
    approachSteps: ["Discover", "Think", "Create", "Connect"],
  },
};

export function getDictionary(locale: Locale) {
  return locale === "en" ? en : ja;
}
