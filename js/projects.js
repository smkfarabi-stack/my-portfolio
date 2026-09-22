/* =========================================================
   PROJECT DATABASE
   Add new projects below. The code generator can create this object for you.
   Fields:
   name        = project name
   description = short project description
   link        = live project/demo URL
   code        = GitHub/source-code URL (use "" when private/not available)
   tech        = array of technologies
   icon        = Boxicons class, e.g. "bx bx-flask"
   featured    = true to show on the home page preview
   ========================================================= */

const projects = [
  {
    name: "Humaymud Chats V3",
    description: "A refined P2P communication platform focused on direct browser-to-browser connection, voice links, and a futuristic interface.",
    link: "https://smkfarabi-stack.github.io/humaymud-chats-v3/",
    code: "",
    tech: ["P2P", "PeerJS", "PWA"],
    icon: "bx bx-message-square-dots",
    featured: true
  },
  {
    name: "Crochet Al-Chemi",
    description: "A creative e-commerce storefront combining handmade crochet products with a distinctive digital brand experience.",
    link: "https://crochetal-chemi.crochetalchemi.workers.dev/shop",
    code: "",
    tech: ["E-commerce", "Web", "Branding"],
    icon: "bx bx-store",
    featured: true
  },
  {
    name: "3rd Year Chemistry Syllabus",
    description: "A structured chemistry syllabus platform with course chapters, resources, and an admin-oriented resource workflow.",
    link: "https://smkfarabi-stack.github.io/chemistrysyllabus-/",
    code: "",
    tech: ["JavaScript", "SPA", "Education"],
    icon: "bx bx-book-open",
    featured: true
  },
  {
    name: "Namaz Time BD",
    description: "A Bangladesh-focused prayer time checking application with a simple and accessible interface.",
    link: "https://smkfarabi-stack.github.io/namaz-time-bd/",
    code: "",
    tech: ["JavaScript", "Web App"],
    icon: "bx bx-time-five",
    featured: false
  },
  {
    name: "Humaymud Browser",
    description: "A custom browser project exploring browser automation, web access, and a personalized browsing workflow.",
    link: "https://github.com/smkfarabi-stack/humaymud-browser",
    code: "https://github.com/smkfarabi-stack/humaymud-browser",
    tech: ["Python", "Browser", "AI"],
    icon: "bx bx-globe",
    featured: false
  }
];
