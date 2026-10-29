/**
 * Single source of truth for site copy and studio facts.
 * Copy is taken from "Heartbreaker Ink — Website Copy Rewrite (for developer).docx" (Sep 2026).
 * Anything marked TODO is an open question in that doc — don't invent answers.
 */

export const studio = {
  name: "Heartbreaker Ink",
  tagline: "Fine line tattoo studio on the Mornington Peninsula",
  url: "https://heartbreakerink.com",
  founder: { name: "Beth Sikalias", role: "Founder & Lead Artist", instagram: "bethsikalias", instagramUrl: "https://instagram.com/bethsikalias" },
  instagram: "heartbreakerink_",
  instagramUrl: "https://instagram.com/heartbreakerink_",
  linktree: "https://linktr.ee/heartbreakerink",
  address: {
    street: "Shop 5, 53–55 Barkly St",
    locality: "Mornington",
    region: "VIC",
    // Postcode deliberately omitted until confirmed (a wrong one in LocalBusiness markup conflicts with the Google Business Profile)
    country: "AU",
  },
  mapQuery: "53-55 Barkly Street, Mornington, Victoria, Australia",
  // Live tools (from the previous build, heartbreaker-ink/src/data/site.ts)
  bookingUrl: "https://book.heartbreakerink.com/widget/bookings/tattoo-app",
  aftercareShopUrl: "https://checkout.square.site/merchant/ML3TJGCSYJ8N9/checkout/SORHOCSKJYB3V372F7PN6DPS",
  // TODO: phone and email are unconfirmed (business card shows placeholders) — add once Beth confirms
  hours: "By appointment. Later sessions on request.",
  replyTime: "Usually the same day.",
  serviceArea: ["Mornington", "Mount Eliza", "Mount Martha", "Somerville", "Moorooduc", "Tyabb", "Frankston", "Melbourne"],
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studio.mapQuery)}`;

export type NavItem = { label: string; href: string };

/** Full sitemap, in the order supplied by the client (Oct 2026). Every menu reads from this. */
export const siteNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Fine Line", href: "/fine-line-tattoos" },
  { label: "About", href: "/about" },
  { label: "Artists", href: "/artists" },
  { label: "Studio", href: "/studio" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faqs" },
  { label: "Blog", href: "/journal" },
  { label: "Aftercare", href: "/aftercare" },
  { label: "Gift Vouchers", href: "/gift-vouchers" },
  { label: "Book Online", href: "/book" },
  { label: "Group Bookings", href: "/group-bookings" },
  { label: "Collabs & Events", href: "/collabs-events" },
  { label: "Join The Team", href: "/join-the-team" },
];

const pick = (...labels: string[]) => labels.map((l) => siteNav.find((n) => n.label === l)!);

export type MenuGroup = { label: string; href?: string; icon: string; children?: (NavItem & { icon: string; note?: string })[] };

/** Phone / tablet menu: the sitemap folded into short groups, sitemap order kept. */
export const menuGroups: MenuGroup[] = [
  { label: "Home", href: "/", icon: "swallow" },
  {
    label: "Fine Line",
    icon: "rose",
    children: [
      { label: "All fine line", href: "/fine-line-tattoos", icon: "rose" },
      { label: "Small tattoos", href: "/fine-line-tattoos/small-tattoos", icon: "diamond", note: "From $180" },
      { label: "Script & lettering", href: "/fine-line-tattoos/script-lettering", icon: "envelope", note: "From $180" },
      { label: "Custom tattoos", href: "/fine-line-tattoos/custom-tattoos", icon: "panther", note: "From $220" },
      { label: "Matching tattoos", href: "/fine-line-tattoos/couples-matching", icon: "ace", note: "From $300 for two" },
      { label: "Flower tattoos", href: "/fine-line-tattoos/floral-botanical", icon: "rose", note: "From $200" },
      { label: "Minimalist tattoos", href: "/fine-line-tattoos/minimalist", icon: "bolt", note: "From $180" },
      { label: "Cover up tattoos", href: "/fine-line-tattoos/cover-ups", icon: "moth", note: "Quoted per piece" },
    ],
  },
  {
    label: "The Studio",
    icon: "panther",
    children: [
      { label: "About", href: "/about", icon: "swallow" },
      { label: "Artists", href: "/artists", icon: "rocknroll" },
      { label: "Studio", href: "/studio", icon: "horseshoe" },
      { label: "Gallery", href: "/gallery", icon: "moth" },
    ],
  },
  {
    label: "Good to Know",
    icon: "anchor",
    children: [
      { label: "FAQ", href: "/faqs", icon: "envelope" },
      { label: "Blog", href: "/journal", icon: "sun" },
      { label: "Aftercare", href: "/aftercare", icon: "anchor" },
    ],
  },
  {
    label: "Bookings",
    icon: "diamond",
    children: [
      { label: "Book Online", href: "/book", icon: "diamond" },
      { label: "Gift Vouchers", href: "/gift-vouchers", icon: "ace" },
      { label: "Group Bookings", href: "/group-bookings", icon: "dice" },
      { label: "Collabs & Events", href: "/collabs-events", icon: "sun" },
    ],
  },
  { label: "Join The Team", href: "/join-the-team", icon: "rocknroll" },
];

/** Desktop header: inline links (Fine Line opens the services panel), the rest under "More". */
export const headerNav = {
  inline: pick("About", "Artists", "Studio", "Gallery"),
  more: pick("FAQ", "Blog", "Aftercare", "Gift Vouchers", "Book Online", "Group Bookings", "Collabs & Events", "Join The Team"),
};

/** Service hub ("Pick where to start") — guide prices from the copy deck. */
export const serviceList = [
  { title: "Small tattoos", body: "Small, subtle, easy to place.", price: "From $180", href: "/fine-line-tattoos/small-tattoos", icon: "diamond", image: "/images/work/bow-ankle.jpg" },
  { title: "Script & lettering", body: "Hand-drawn or set from a font.", price: "From $180", href: "/fine-line-tattoos/script-lettering", icon: "envelope", image: "/images/work/script-shoulder.jpg" },
  { title: "Custom tattoos", body: "Your idea, drawn with you.", price: "From $220", href: "/fine-line-tattoos/custom-tattoos", icon: "panther", image: "/images/work/lion.jpg" },
  { title: "Matching tattoos", body: "Two pieces made to go together.", price: "From $300 for two", href: "/fine-line-tattoos/couples-matching", icon: "ace", image: "/images/work/matching-hands.jpg" },
  { title: "Flower tattoos", body: "Stems, petals and seed heads.", price: "From $200", href: "/fine-line-tattoos/floral-botanical", icon: "rose", image: "/images/work/floral-ankle.jpg" },
  { title: "Minimalist tattoos", body: "The fewest lines that still work.", price: "From $180", href: "/fine-line-tattoos/minimalist", icon: "bolt", image: "/images/work/stars.jpg" },
  { title: "Cover up tattoos", body: "Some old work can be reworked.", price: "Quoted per piece", href: "/fine-line-tattoos/cover-ups", icon: "moth", image: "/images/work/floral-sleeve-2.jpg" },
] as const;

export const cta = {
  // Straight to the live booking widget, as on the previous build
  book: { label: "Book a tattoo", href: "https://book.heartbreakerink.com/widget/bookings/tattoo-app" },
  voucher: { label: "Gift a voucher", href: "/gift-vouchers" },
};

export const home = {
  hero: {
    eyebrow: "Mornington, Victoria · By appointment",
    title: "Fine line tattoo studio on the Mornington Peninsula",
  },
  marquee: ["Bookings are open", "Fine line", "Script & lettering", "Custom", "Flash", "Drawn by hand"],
  intro: {
    title: "Fine line tattoo studio in Mornington.",
    lede: "Small pieces, big custom work, and everything in between. All drawn by hand.",
    // About page copy
    story: [
      "We started in one room. We're in a bigger space now with more beds and more artists, which mostly means you're not waiting as long to get in.",
      "Thin lines are unforgiving. No shading to cover a wobble, no heavy outline to hide it. That's why the drawing takes as long as it does.",
    ],
    aside: "You don't need a concept or a reason. Plenty of good tattoos are just a shape someone liked.",
    cta: { label: "Book in", href: "https://book.heartbreakerink.com/widget/bookings/tattoo-app" },
    more: { label: "About the studio", href: "/about" },
    promises: [
      { title: "Drawn for you", body: "Everything is drawn for the person wearing it. Small pieces through to sleeves, backs and ribs.", icon: "swallow" },
      { title: "Straight answers", body: "We'll tell you before you book if an idea won't hold at the size you want it.", icon: "diamond" },
      { title: "No stupid questions", body: "Nobody here will make you feel stupid for being nervous, for asking what it costs, or for changing your mind on placement three times.", icon: "envelope" },
      { title: "Shorter wait", body: "More beds, more artists, shorter wait. Small pieces are usually done in one short session.", icon: "bolt" },
    ],
    stats: [
      { label: "Specialism", value: "Fine line" },
      { label: "Needle", value: "Single" },
      { label: "Drawing", value: "By hand" },
      { label: "Studio", value: "Mornington" },
      { label: "Bookings", value: "By appointment" },
    ],
  },
  services: {
    title: "What we do",
    cta: { label: "All services", href: "/fine-line-tattoos" },
    items: [
      { title: "Fine line", body: "Small, large, thin, precise. Anything fine line.", href: "/fine-line-tattoos", icon: "rose", image: "/images/work/floral-sleeve.jpg" },
      { title: "Custom", body: "Your idea, drawn with you, built to last.", href: "/fine-line-tattoos/custom-tattoos", icon: "panther", image: "/images/work/lion.jpg" },
      { title: "Script & lettering", body: "Hand-drawn or set from a font. Words you'll keep.", href: "/fine-line-tattoos/script-lettering", icon: "envelope", image: "/images/work/script-forearm.jpg" },
      { title: "Flash", body: "Our designs, ready to book. Pick one off the sheets.", href: "/flash", icon: "bolt", image: "/images/work/fleur.jpg" },
    ],
  },
  work: {
    title: "Our tattoos",
    subtitle: "Healed, not fresh.",
    cta: { label: "View the portfolio", href: "/gallery" },
  },
  flash: {
    eyebrow: "Flash",
    title: "Our designs, ready to book",
    body: "Nothing gets retired. Old sheets still available.",
    cta: { label: "See the flash", href: "/flash" },
  },
  process: {
    title: "How it works",
    steps: [
      // `meta` facts are from the copy deck (Contact, Custom, FAQs, Studio Policy)
      { n: "01", title: "Send the idea", body: "References and rough placement. We'll tell you if it works.", meta: "Reply usually same day", icon: "envelope" },
      { n: "02", title: "We draw it", body: "You see it before the day. Deposit holds the date.", meta: "Drawing sent before your appointment", icon: "diamond" },
      { n: "03", title: "The session", body: "Chair's yours. Take breaks.", meta: "Small pieces under an hour · custom 2–4 hours", icon: "swallow" },
      { n: "04", title: "Aftercare", body: "Written instructions and a number to text.", meta: "Free touch-ups within 3 months", icon: "anchor" },
    ],
  },
  events: {
    eyebrow: "Collabs & events",
    title: "We come to you",
    body: "We run fine line tattoo activations at events. Corporate days, festivals, weddings and private parties.",
    detail: "Guests pick from a set of flash designs and walk away with a real tattoo, done properly on site.",
    types: [
      { label: "Corporate days", icon: "diamond" },
      { label: "Festivals", icon: "sun" },
      { label: "Weddings", icon: "rose" },
      { label: "Private parties", icon: "dice" },
    ],
    included: "Artists, setup, all equipment and consumables, and travel. Quoted as one package rather than per tattoo.",
    cta: { label: "Enquire about an event", href: "/collabs-events" },
  },
  reviews: {
    title: "Sent by someone",
    cta: { label: "Read more", href: "/reviews" },
  },
};

export const globalCta = {
  eyebrow: "Bookings are open",
  title: "Tell us what you're after",
  body: "Send the idea, rough size and where it's going. We'll tell you if it works and what it costs.",
};

/** Healed work shown on the home page strip. Captions describe what's visible in the photo. */
export const work = [
  { src: "/images/work/floral-sleeve.jpg", alt: "Fine line floral and figurative piece across a forearm", caption: "Floral · Forearm" },
  { src: "/images/work/script-shoulder.jpg", alt: "Fine script lettering across a shoulder blade", caption: "Script · Shoulder" },
  { src: "/images/work/floral-ankle.jpg", alt: "Fine line floral wrapping the top of a foot and ankle", caption: "Floral · Ankle" },
  { src: "/images/work/matching-hands.jpg", alt: "Two people showing matching small fine line tattoos on their wrists", caption: "Matching · Wrist" },
  { src: "/images/work/lion.jpg", alt: "Detailed fine line lion head on an inner forearm", caption: "Custom · Forearm" },
  { src: "/images/work/bow-script.jpg", alt: "Fine line bows and a script name on an inner arm", caption: "Script · Inner arm" },
  { src: "/images/work/orca.jpg", alt: "Small fine line orca and landscape vignette on a calf", caption: "Custom · Calf" },
  { src: "/images/work/script-quote.jpg", alt: "Single line of fine script on a forearm", caption: "Script · Forearm" },
  { src: "/images/work/fleur.jpg", alt: "Small fine line fleur-de-lis on the ribs", caption: "Flash · Ribs" },
] as const;

/** Brand flash motifs (from the identity's illustration suite), numbered like a flash sheet. */
export const flashSheet = [
  "moth", "swallow", "rose", "panther", "snake", "sun", "skull", "scorpion", "horseshoe",
  "dice", "ace", "bolt", "anchor", "diamond", "leopard", "rocknroll", "revolver", "envelope",
] as const;

export type FlashIconName = (typeof flashSheet)[number];

/**
 * TODO(before launch): replace with real Google / Instagram reviews.
 * The copy deck flags every review on the previous build as a placeholder.
 * `placeholder: true` renders a visible badge so these can't ship by accident.
 */
export const reviews = [
  { quote: "Placeholder review. Swap for a real Google review before launch.", name: "Client name", detail: "Script · Forearm", placeholder: true },
  { quote: "Placeholder review. Swap for a real Instagram message before launch.", name: "Client name", detail: "Matching · Wrist", placeholder: true },
  { quote: "Placeholder review. Swap for a real Google review before launch.", name: "Client name", detail: "Custom · Calf", placeholder: true },
];
