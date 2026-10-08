import {
  activities,
  augustNewsletter,
  septemberNewsletter,
  type Newsletter,
  contactInfo,
  homeContent,
  navItems,
  pageContent,
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
    heroLabel: "日本の若者が地理・GIS・地理空間情報を学ぶコミュニティ",
    viewActivities: "活動を見る",
    joinActivities: "活動に参加する",
    activitiesPageTitle: "活動の記録",
    activitiesPageDescription:
      "勉強会やイベント、メンバー同士の交流、Podcast・noteの公開情報など、Youth GEO Japanの活動をお届けします。",
    articleList: "記事一覧",
    issueContents: "この号の目次",
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
    { label: "About", href: "/about" },
    { label: "Activities", href: "/activities" },
    { label: "Partners", href: "/partners" },
    { label: "Organization", href: "/organization" },
  ],
  siteMeta: {
    name: "Youth GEO Japan",
    tagline: "Curiosity, straight into the future.",
    description:
      "Youth GEO Japan is a community where young people discover their connections with geography, meet peers and people working in the geospatial field, and turn their interests into learning, careers, and practical experience.",
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
      title: "September 2026 Newsletter",
      date: "2026.09",
      category: "Other",
      description: "Our incorporation, FOSS4G participation, an atomic-bomb-survivor tree map, an upcoming hands-on event, and a meetup in Shibuya.",
      link: "#newsletter-2026-09",
    },
    {
      title: "August 2026 Newsletter",
      date: "2026.08",
      category: "Other",
      description:
        "A recap of our competition meetings, event participation, lightning talks, and community gatherings.",
      link: "#newsletter-2026-08",
    },
  ],
  septemberNewsletter: {
    issue: "2026.09",
    title: "Youth GEO Japan Newsletter — September 2026",
    lead: [
      "Hello from Youth GEO Japan!",
      "We are a community of young people interested in geospatial information, with activities taking place throughout the month.",
      "Here is a look at this month’s activities.",
    ],
    topics: [
      {
        title: "Establishment of our general incorporated association",
        paragraphs: [
          "Youth GEO Japan has officially been established as a general incorporated association. Thank you to everyone who has supported us along the way!",
          "We will continue creating a place where students and young professionals can broaden their interests through geography and connect with people and different fields.",
        ],
        link: { href: "/organization", label: "View corporate information" },
      },
      {
        title: "Participation in FOSS4G 2026 Hiroshima",
        paragraphs: [
          "Members attended FOSS4G 2026 Hiroshima to meet people and gather information on site.",
          "We hope to share their reflections in the future.",
        ],
      },
      {
        title: "Entering a contest with an atomic-bomb-survivor tree map",
        paragraphs: [
          "Our tree conservation project, which began in August, created a map of atomic-bomb-survivor trees and entered the Geo Activity Contest.",
          "The project communicates the trees’ locations, conditions, and publicly available records through a map to support conservation. The website is planned for future publication.",
        ],
      },
      {
        title: "A MapConductor hands-on event is confirmed",
        paragraphs: [
          "Mr. Katsumata from MapConductor, whom we met through FOSS4G, will lead a hands-on event on the evening of Wednesday, November 25.",
          "MapConductor is a development tool that lets developers work with different mapping tools, such as Google Maps and MapLibre, using a common coding approach. The event will offer a practical introduction to map development, including for beginners.",
          "We are also looking for organizing and support members. Please get in touch if you are interested!",
        ],
      },
      {
        title: "A small meetup in Shibuya",
        paragraphs: [
          "On September 10, we held a small meetup in Shibuya with a member visiting from Hiroshima. Alongside online exchanges, we continue to meet in person.",
        ],
      },
    ],
    upcoming: ["MapConductor hands-on event (evening of November 25)", "Podcast release (planned for October)"],
    upcomingNote: "We will announce event details and the website publication schedule as soon as they are confirmed.",
    closing: [
      "Youth GEO Japan welcomes any young person interested in geographic information.",
      "If you are interested, please join our Discord server!",
      "Questions and requests to join are always welcome.",
    ],
  },
  augustNewsletter: {
    issue: "2026.08",
    title: "Youth GEO Japan Newsletter — August 2026",
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
    heroLabel: "Japan’s youth community for geography, GIS, and geospatial learning",
    viewActivities: "View activities",
    joinActivities: "Join our activities",
    activitiesPageTitle: "Activity journal",
    activitiesPageDescription:
      "Follow Youth GEO Japan’s study sessions, events, community gatherings, and podcast and note releases.",
    articleList: "Articles",
    issueContents: "Contents of this issue",
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

const englishPageContent: typeof pageContent = {
  joinLabel: "Join",
  why: {
    title: "A passion for geography can become a hub for the future",
    paragraphs: [
      "Geography connects with many fields, including the natural environment, cities, urban development, disaster prevention, tourism, international cooperation, and defense. We see geography not only as an independent discipline, but also as a perspective for understanding society, places, and the world.",
      "That is why curiosity about geography has the power to transform society and open up the future.",
      "Youth GEO Japan brings together young people interested in geography and related fields, creating an environment where they can discover their connections with geography and develop their interests into learning and careers.",
      "Through geography—a perspective that holds a key to understanding today’s world—we aim to empower young people to exercise leadership and create positive change in society.",
    ],
  },
  activityTitle: "Activity reports",
  activityTags: ["Study sessions", "Lightning talks", "Fieldwork", "Career advice", "In-person meetups", "Business competitions"],
  moreActivities: "View more activities",
  about: {
    title: "About Youth GEO Japan",
    description: "Discover the ideas behind Youth GEO Japan and our approach to turning curiosity about geography into practical work in society and local communities.",
    storyTitle: "Our story",
    approachParagraphs: [
      "We go beyond learning about geography, connecting the perspectives and knowledge we gain with practical work in society and local communities.",
      "By creating a cycle of discovering, thinking, creating, and connecting, we help young people take the first step toward applying their geographic curiosity in society.",
      "We provide a place where members can pursue their curiosity while collaborating with people from diverse backgrounds.",
    ],
    thinkDescription: "Through talks and events with government, industry, and academia, we explore the connections between geographic curiosity and social challenges, offering perspectives that help members consider study and career paths that suit them.",
  },
  join: {
    title: "Join Youth GEO Japan",
    description: "Join the Youth GEO Japan community on Discord, or receive activity updates through our LINE OpenChat if you would like to learn more before joining.",
    lead: ["Your year of study, field, experience, and skills do not matter. Whether you love geography, are interested in GIS, or want to create something with others…", "You are welcome here!"],
    discordTitle: "Join the community",
    discordBody: ["If you would like to meet fellow members or take part in study sessions and projects, join us on Discord.", "We use Discord for everyday conversations, questions, information sharing, and planning activities."],
    discordButton: "Join on Discord",
    lineTitle: "Start with activity updates",
    lineBody: ["If you are interested but would like to consider joining later, or are unfamiliar with Discord, try our LINE OpenChat.", "Receive Youth GEO Japan updates, including announcements about events."],
    lineButton: "Join the LINE OpenChat",
    qrAlt: "QR code for joining the Youth GEO Japan LINE OpenChat",
  },
  partners: {
    title: "To everyone supporting Youth GEO Japan",
    paragraphs: ["Youth GEO Japan connects young people with companies and organizations, creating an environment where geographic curiosity can help shape future paths.", "If you would like to support our work, please get in touch by email."],
  },
  organization: {
    title: "Organization",
    description: "Learn about Youth GEO Japan’s incorporated association, including its establishment, address, representative, activities, and a message from its representative director.",
    profileTitle: "Corporate profile",
    labels: { name: "Legal name", founded: "Established", address: "Address", representative: "Representative", business: "Activities", contact: "Contact" },
    legalName: "一般社団法人　Youth GEO Japan (General Incorporated Association)",
    foundingDate: "September 14, 2026",
    address: "Futaba Building 8b, 1-16-6 Dogenzaka, Shibuya-ku, Tokyo, Japan",
    representative: "Yuka Yano, Representative Director",
    businesses: [
      "Operating a community where students and young professionals interested in geospatial information can learn, connect, and collaborate",
      "Providing grants and support for students’ and young professionals’ learning, research, and activities",
      "Planning and running study sessions, talks, meetups, and other events",
      "Promoting cooperation with related organizations, educational and research institutions, government agencies, and companies in Japan and overseas",
      "Developing initiatives that advance awareness and development of the geospatial field, and other activities needed to fulfill the association’s purpose",
    ],
    messageTitle: "Message from the representative",
    messageHeading: "Connecting an interest in geography with future possibilities",
    messageParagraphs: [
      "I founded Youth GEO Japan after experiencing both the appeal of geography’s breadth and the difficulty of connecting that interest with education and careers.",
      "What research and jobs can studying geography lead to? Which field suits me? What knowledge and skills should I develop? Precisely because geography opens so many possibilities, it can be difficult to decide which direction to take.",
      "People interested in cities, disaster prevention, the environment, transport, tourism, international cooperation, or data analysis also have few opportunities to discover how their interests connect with geography.",
      "These experiences led me to want to create a place where young people can discover their connections with geography, learn about the people and work beyond it, and move toward practical involvement.",
      "Connecting with fellow students. Meeting researchers, engineers, and people working in companies and government. Learning about further study, research, employment, events, and communities. Developing knowledge, skills, and experience through practical projects.",
      "I want Youth GEO Japan to be a place where young people’s curiosity leads to their next step.",
    ],
  },
};

export function getDictionary(locale: Locale) {
  const newsletters: Newsletter[] = locale === "en"
    ? [en.septemberNewsletter, en.augustNewsletter]
    : [septemberNewsletter, augustNewsletter];
  return {
    ...(locale === "en" ? en : ja),
    pages: locale === "en" ? englishPageContent : pageContent,
    newsletters,
  };
}
