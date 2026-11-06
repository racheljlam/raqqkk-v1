/**
 * All the words on the site live here. The page is dressed up as a ticket
 * board, so most things are "tickets": edit this file to change copy, add a
 * project, or update your stack. No component changes needed.
 */

export const site = {
  name: "Rachel Joy Lam",
  firstName: "Rachel",
  initials: "RL",
  /** The pretend project key used in ticket numbers, like RJL-12. */
  key: "RJL",
  role: "Full-stack Software Engineer",
  projectType: "One-person software project",
  url: "https://raqqkk-v1.vercel.app",
  github: "https://github.com/racheljlam",
  /** Leave either of these empty and its link disappears from the contact form. */
  email: "racheljoylam11@gmail.com",
  linkedin: "https://www.linkedin.com/in/racheljoylam",
  /** Flip to false to change the status on the first ticket to "Fully booked". */
  available: true,
  footer: "No tickets were filed in the making of this site.",
  disclaimer: "A résumé wearing a costume. Not affiliated with Jira or Atlassian.",
};

export type Tone = "todo" | "progress" | "done";
export type IssueType = "story" | "task" | "bug" | "epic";

/** The tab strip under the header. `id` must match a section id on the page. */
export const tabs = [
  { id: "summary", label: "Summary" },
  { id: "board", label: "Board" },
  { id: "workflow", label: "Workflow" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "certifications", label: "Certifications" },
];

/** The first ticket: the pitch, written as a user story. */
export const summary = {
  key: 1,
  type: "story" as IssueType,
  status: "Open for work",
  statusWhenBooked: "Fully booked",
  title:
    "As a client, I want my problem turned into software, so that I can stop fighting spreadsheets.",
  description:
    "I'm Rachel, a full-stack software engineer. Bring me the slow, the manual, and the held-together-by-spreadsheets. I'll take it from first conversation to live product, then stick around to keep it running.",
  primaryCta: "Start a project",
  secondaryCta: "View the board",
  criteriaTitle: "Acceptance criteria",
  criteria: [
    "Problem understood",
    "Solution designed",
    "Product built",
    "Deployed and live",
    "Maintained after launch",
  ],
  /** The details panel beside the ticket. `who` shows an avatar next to the value. */
  details: [
    { label: "Assignee", value: "Rachel Joy Lam", who: "me" },
    { label: "Reporter", value: "You", who: "you" },
    { label: "Priority", value: "Highest (yours, obviously)", priority: true },
    { label: "Sprint", value: "Your next project" },
    { label: "Based in", value: "Iloilo, Philippines" },
    { label: "People you deal with", value: "1" },
    { label: "Handoffs between teams", value: "0" },
    { label: "Pointless meetings", value: "0" },
  ] as { label: string; value: string; who?: "me" | "you"; priority?: boolean }[],
  labels: ["web-apps", "mobile-apps", "internal-tools", "iot", "deployment", "maintenance"],
};

export type Ticket = {
  key: number;
  type: IssueType;
  title: string;
  body?: string;
  labels?: string[];
  /** Story points. Purely decorative. */
  points?: number;
  href?: string;
};

/** The kanban board. Each column is a list of tickets. */
export const board = {
  title: "Board",
  intro:
    "Everything I can do, am doing, and have done. Go on, drag a ticket somewhere. I won't tell the project manager.",
  /** Shown under the board before anything has been moved. */
  hint: "Drag a ticket to another column. On a phone, drag it by the dots, or just tap them.",
  reset: "Reset board",
  /** What the board says after a ticket is moved. {id} becomes the ticket number. */
  quips: {
    reorder: "{id} reprioritized. The backlog has been groomed.",
    todoToProgress: "{id} is now in progress. Want to make it official? Create the issue below.",
    todoToDone: "{id} went straight to done. Skipping the part where I build it, I see.",
    progressToDone: "{id} marked done. If only shipping were that easy.",
    progressToTodo: "{id} moved back to to do. Scope creep works both ways.",
    doneToProgress: "{id} reopened. Something about “just one small change”.",
    doneToTodo: "{id} moved back to to do. QA would like a word.",
  },
  columns: [
    {
      name: "To do (for you)",
      tone: "todo" as Tone,
      tickets: [
        {
          key: 101,
          type: "story",
          title: "Web apps and internal tools",
          body: "Dashboards, admin panels, booking, billing, ticketing. Whatever currently lives in a file called final_v3_REAL.xlsx.",
          labels: ["Laravel", "React", "Filament"],
          points: 8,
        },
        {
          key: 102,
          type: "story",
          title: "Mobile apps",
          body: "iOS and Android from a single codebase. One build, two app stores, zero arguing about which phone is better.",
          labels: ["React Native", "Expo", "Flutter"],
          points: 8,
        },
        {
          key: 103,
          type: "task",
          title: "Websites",
          body: "Fast, clean, and easy to update. Looks right on a phone, which is where everyone will open it anyway.",
          labels: ["Next.js", "Tailwind CSS"],
          points: 3,
        },
        {
          key: 104,
          type: "story",
          title: "Kiosks, devices, and IoT",
          body: "Counters, kiosks, display screens, Arduino boards, receipt printers. If it has a plug, I'll try to make it talk.",
          labels: ["Electron", "Node.js", "Arduino"],
          points: 5,
        },
        {
          key: 105,
          type: "task",
          title: "APIs and integrations",
          body: "Getting the systems you already use to talk to each other, so your staff can stop being the integration.",
          labels: ["REST APIs", "Laravel", "Node.js"],
          points: 5,
        },
        {
          key: 106,
          type: "bug",
          title: "Deployment and maintenance",
          body: "Hosting, releases, updates, and fixes. I don't vanish after launch day; software needs feeding.",
          labels: ["Docker", "GitHub Actions", "Vercel"],
          points: 3,
        },
      ] as Ticket[],
    },
    {
      name: "In progress",
      tone: "progress" as Tone,
      tickets: [
        {
          key: 201,
          type: "story",
          title: "Trackr",
          body: "A Gantt planner and a configuration database in one app. Still growing.",
          labels: ["side project", "Laravel", "React"],
          points: 21,
          href: "#projects",
        },
      ] as Ticket[],
      /** The dashed "add a ticket" slot at the bottom of this column. */
      create: { label: "Create issue", text: "Your problem goes here", href: "#create" },
    },
    {
      name: "Done",
      tone: "done" as Tone,
      tickets: [
        {
          key: 42,
          type: "story",
          title: "Halloween Photo Booth",
          body: "A photo booth that prints your face on receipt paper.",
          labels: ["side project", "Node.js", "ESC/POS"],
          points: 13,
          href: "#projects",
        },
        { key: 36, type: "task", title: "Customer mobile apps on iOS and Android", labels: ["day job"] },
        { key: 35, type: "task", title: "Queue management with kiosks, counters, and display screens", labels: ["day job"] },
        { key: 34, type: "task", title: "Billing and scheduling tools", labels: ["day job"] },
        { key: 33, type: "task", title: "Help-desk ticketing", labels: ["day job"] },
        { key: 32, type: "task", title: "Admin panels and internal portals", labels: ["day job"] },
        { key: 31, type: "task", title: "The APIs that connect them", labels: ["day job"] },
      ] as Ticket[],
    },
  ],
};

/** How a project moves, drawn as ticket statuses. */
export const workflow = {
  title: "Workflow",
  intro: "How a ticket moves once you file it. One person from first call to long after launch, so there's nobody to forward your email to.",
  steps: [
    {
      status: "You explain",
      tone: "todo" as Tone,
      body: "Tell me what's broken, slow, or just annoying. No technical words required.",
    },
    {
      status: "I plan",
      tone: "todo" as Tone,
      body: "You get a written scope and timeline before I write any code. Surprises are for birthdays.",
    },
    {
      status: "I build",
      tone: "progress" as Tone,
      body: "In small pieces, with working demos along the way, so you can say “not like that” while it's still cheap.",
    },
    {
      status: "We launch",
      tone: "progress" as Tone,
      body: "Hosting, domains, deployment, and showing everyone which button to press.",
    },
    {
      status: "I stick around",
      tone: "done" as Tone,
      body: "Fixes, updates, and new features. Launch day is the start, not the goodbye.",
    },
  ],
};

export const projects = {
  title: "Projects",
  intro: "Things I built because a problem annoyed me enough. Open the code and judge for yourself.",
};

export const photobooth = {
  key: 42,
  status: "Done",
  name: "Halloween Photo Booth",
  tagline: "A photo booth that prints your face on receipt paper.",
  problem:
    "A company Halloween party needed a photo booth that guests could run themselves, at a venue with no internet.",
  solution:
    "Guests snap photos on an iPad and get a 6-character pickup code, like claiming a very small parcel. Staff at the print counter type the code, preview the strip, and print it on a thermal receipt printer. All of it runs on local Wi-Fi.",
  highlights: [
    "Rawr Mode: guests roar into the mic, the booth snaps mid-roar, and the strip prints a loudness score. Top rating: LEGENDARY",
    "Photos turned into crisp black-and-white dots, because receipt paper has never heard of gray",
    "Works with both Ethernet and Bluetooth printers",
    "Runs fully offline in the iPad's browser, with no app to install",
  ],
  stack: ["Node.js", "Express", "JavaScript", "Canvas API", "ESC/POS", "Python", "Bluetooth LE"],
  repo: "https://github.com/racheljlam/halloween-photobooth",
};

/**
 * Trackr. `link` is empty because the repository is private; add a URL and a
 * "View project" link appears. Keep its ticket on the board above in step.
 */
export const trackr = {
  key: 201,
  status: "In progress",
  name: "Trackr",
  tagline: "A project planner and a systems inventory that finally talk to each other.",
  solution:
    "An operations platform in one app, with two modules sharing one login, one set of roles, and one audit trail. Timeline is a Gantt planner for a whole portfolio of projects: boards, task trees, dependencies, milestones, and plan versus actual. CMDB is a configuration database that records systems, how they relate, and which planned tasks touch them.",
  highlights: [
    "The Gantt chart is hand-built in React. No chart library was used, or harmed",
    "Drag, resize, rename, undo: edits are batched and sent as a diff, checked on the server, and rolled back on screen if rejected",
    "Every change writes a readable activity entry, so \u201cwho moved my deadline?\u201d has an answer",
    "Three roles enforced on the server, plus per-board sharing: everyone, selected people, or only me",
    "Sign-in with Microsoft or Google, built without extra packages",
  ],
  stack: ["Laravel", "Inertia", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "MySQL", "Pest", "PHPStan"],
  note: "Private repository, so no link here. Happy to walk you through it on a call.",
  link: "",
};

/**
 * Work history as sprints, most recent first. `note` is the small line after
 * the company name; `items` is an optional checklist under a role.
 */
export const experience = {
  title: "Experience",
  intro: "Where I've been paid to solve problems so far. Every job is a sprint if you squint.",
  sprints: [
    {
      company: "Current employer",
      note: "Name kept private",
      roles: [
        {
          key: 23,
          title: "Lead Full Stack Developer",
          period: "Feb 2026 – Present",
          current: true,
          body: "I lead software development and deployment across the organization, and standardized how we develop, test, deploy, and release. I also translate between people who say \u201cit should just work\u201d and the code that has to make it so.",
          items: [
            "Customer mobile apps on iOS and Android",
            "Queue management with kiosks, counters, and display screens",
            "Billing and scheduling tools",
            "Help-desk ticketing",
            "Admin panels and internal portals",
            "The APIs that connect them",
          ],
          labels: ["Software architecture", "Team leadership", "AWS"],
        },
        {
          key: 22,
          title: "Frontend Developer",
          period: "Nov 2023 – Jan 2026",
          body: "Hired for the frontend, then quietly kept going: web, mobile, and backend across several production platforms.",
          items: [
            "Full-stack delivery across web, mobile, and backend",
            "Sprint planning and tracking in Jira (yes, the real one)",
            "Requirements gathering with stakeholders",
            "Reports and insights for board presentations",
            "Uptime and performance monitoring",
            "Root-cause troubleshooting on live systems",
            "Mentoring interns and junior developers",
          ],
          labels: ["React Native", "Laravel", "Next.js", "Filament"],
        },
      ],
    },
    {
      company: "Stacktrek Inc.",
      roles: [
        {
          key: 21,
          title: "Software Engineer",
          period: "Feb 2023 – Nov 2023",
          body: "Full-stack work, remote, directly with clients and cross-functional teams: turning \u201chere's what we need\u201d into working software.",
        },
        {
          key: 18,
          title: "Technical Content Creator",
          period: "Nov 2019 – Nov 2021",
          body: "Wrote the programming problems and test cases used in technical assessments. If a coding test ever made you sweat, I apologize.",
          labels: ["JavaScript", "Java", "Python", "PHP", "C#"],
        },
      ],
    },
    {
      company: "Asia Pacific Medical Center",
      roles: [
        {
          key: 20,
          title: "Web Developer",
          period: "Sept 2021 – Jan 2022",
          body: "Looked after regular updates and content for the company website.",
        },
      ],
    },
    {
      company: "Panublix",
      roles: [
        {
          key: 19,
          title: "Software Engineer (Intern)",
          period: "Oct 2020 – May 2021",
          body: "Full-stack work in an Agile/Scrum team, where I learned what a sprint actually feels like.",
          labels: ["React", "Node.js", "TypeScript", "GraphQL", "PostgreSQL", "Material UI"],
        },
      ],
    },
    {
      company: "Central Philippine University",
      note: "Where it started",
      roles: [
        {
          key: 17,
          title: "BS Software Engineering",
          period: "2018 – 2023",
          body: "Where I learned that the hard part of software is rarely the code.",
        },
        {
          key: 16,
          title: "Treasurer, Philippine Society of Software Engineers",
          period: "Jun 2019 – May 2022",
          body: "Managed the student organization's funds for three years. Good practice for respecting a budget.",
        },
        {
          key: 15,
          title: "Core Team, Developer Student Clubs",
          period: "Jul 2019 – Jul 2020",
          body: "Helped run the campus developer community, and took part in the 2020 Solution Challenge.",
        },
      ],
    },
  ] as {
    company: string;
    note?: string;
    roles: {
      key: number;
      title: string;
      period: string;
      current?: boolean;
      body: string;
      items?: string[];
      labels?: string[];
    }[];
  }[],
};

/** `name` is the plain label, `aka` the joke under it, `items` become label chips. */
export const stack = {
  title: "Stack",
  intro: "You shouldn't have to care which framework I use. But if acronyms are your thing, help yourself.",
  groups: [
    { name: "Languages", aka: "I speak", items: ["JavaScript", "TypeScript", "PHP", "Python", "Java", "C#", "SQL", "HTML", "CSS"] },
    { name: "Frontend", aka: "What you see", items: ["React", "Next.js", "Vue.js", "Redux", "Inertia.js", "Tailwind CSS", "Material UI"] },
    {
      name: "Backend",
      aka: "What you don't",
      items: [
        "Laravel",
        "NestJS",
        "Express",
        "Node.js",
        "Filament",
        "REST APIs",
        "GraphQL (Apollo)",
        "WebSockets (Soketi, Pusher)",
        "Queues and background jobs",
      ],
    },
    { name: "Mobile and desktop", aka: "Pocket-sized and otherwise", items: ["React Native", "Expo", "Flutter", "Electron"] },
    {
      name: "Hardware and IoT",
      aka: "Things with wires",
      items: ["IoT", "Arduino", "Thermal receipt printers (ESC/POS)", "Bluetooth LE"],
    },
    { name: "Databases", aka: "Where data sleeps", items: ["MySQL", "PostgreSQL", "MariaDB", "SQLite"] },
    {
      name: "Cloud",
      aka: "Other people's computers",
      items: ["AWS (S3, RDS, CloudWatch, Lightsail)", "Google Cloud (Maps API, Analytics Data API)", "Firebase", "Vercel"],
    },
    {
      name: "Shipping and tools",
      aka: "Out the door",
      items: ["Docker", "GitHub Actions", "Git (GitHub, GitLab, Bitbucket)", "Google Analytics", "Jira", "Trello", "Mailtrap"],
    },
    {
      name: "Practices",
      aka: "How the work gets done",
      items: ["Software architecture", "Agile", "Scrum", "Testing", "Web design"],
    },
    {
      name: "Working with people",
      aka: "No semicolons needed",
      items: [
        "Communication",
        "Team leadership",
        "Problem solving",
        "Critical thinking",
        "Teamwork",
        "Decision making",
        "Adaptability",
      ],
    },
  ],
};

/**
 * `expired: true` shows a gray "Needs renewal" pill in place of the green one,
 * so nothing here claims a certificate that has lapsed.
 */
export const certifications = {
  title: "Certifications",
  intro: "Proof that I occasionally finish online courses.",
  status: "Completed",
  expiredStatus: "Needs renewal",
  items: [
    { key: 73, name: "Google Analytics Certification", issuer: "Google Digital Academy (Skillshop)", date: "Mar 2025", expired: true },
    { key: 72, name: "Use GA4 with Other Tools and Data Sources", issuer: "Google Digital Academy (Skillshop)", date: "Mar 2025", expired: true },
    { key: 71, name: "Dive Deeper into GA4 Data and Reports", issuer: "Google Digital Academy (Skillshop)", date: "Feb 2025", expired: true },
    { key: 70, name: "Manage GA4 Data and Learn to Read Reports", issuer: "Google Digital Academy (Skillshop)", date: "Feb 2025", expired: true },
    { key: 69, name: "Get Started Using Google Analytics", issuer: "Google Digital Academy (Skillshop)", date: "Feb 2025", expired: true },
    { key: 68, name: "Google Analytics for Beginners", issuer: "Google Analytics Academy", date: "Jun 2024" },
    { key: 67, name: "Generative AI Fundamentals", issuer: "Google Cloud Skills Boost", date: "Jun 2023" },
    { key: 66, name: "Introduction to Generative AI", issuer: "Google Cloud Skills Boost", date: "Jun 2023" },
    { key: 65, name: "Introduction to Large Language Models", issuer: "Google Cloud Skills Boost", date: "Jun 2023" },
    { key: 64, name: "Introduction to Image Generation", issuer: "Google Cloud Skills Boost", date: "Jun 2023" },
    { key: 63, name: "Introduction to Responsible AI", issuer: "Google Cloud Skills Boost", date: "Jun 2023" },
    { key: 62, name: "Career Service Sub-Professional Eligibility", issuer: "Civil Service Commission", date: "Jun 2023" },
    { key: 61, name: "AWS Innovate: Data and AI/ML Edition", issuer: "Amazon Web Services", date: "Feb 2023" },
    { key: 60, name: "Solution Challenge 2020, Certificate of Participation", issuer: "Developer Student Clubs", date: "Jul 2020" },
  ] as { key: number; name: string; issuer: string; date: string; expired?: boolean }[],
  awardsTitle: "Honors and awards",
  awardsStatus: "Earned",
  awards: [
    {
      key: 82,
      name: "Award for True Professionalism",
      issuer: "Current employer, given to one employee company-wide",
      date: "Feb 2025",
    },
    {
      key: 81,
      name: "2nd Place, Philippine Startup Challenge 2021 Regional Pitching (Region VI)",
      issuer: "DICT Western Visayas Regional Office",
      date: "Feb 2022",
    },
    {
      key: 80,
      name: "Semi-Finalist, Philippine Startup Challenge 2021 (Student Category)",
      issuer: "DICT",
      date: "Feb 2022",
    },
  ],
};

/** The contact form, dressed as a "Create issue" dialog. It opens the visitor's email app. */
export const createIssue = {
  title: "Create issue",
  intro: "Got a problem? I collect those.",
  issueType: "Problem that needs solving",
  summaryPlaceholder: "Our booking system is three spreadsheets and a prayer",
  descriptionPlaceholder:
    "What's broken, who it bothers, and when you need it fixed. A few sentences is enough.",
  submit: "Create",
  /** Used as the email subject when the Summary field is left empty. */
  fallbackSubject: "Project inquiry",
  hint: "Create opens your email app with this filled in. Nothing is sent from this page.",
  note: "Open to freelance projects and ongoing maintenance. Replies written by me, not a ticketing system.",
};
