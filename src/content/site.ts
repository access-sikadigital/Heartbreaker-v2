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

export type MenuGroup = { label: string; href?: string; icon: string; children?: (NavItem & { icon: string })[] };

/** Phone / tablet menu: the sitemap folded into short groups, sitemap order kept. */
export const menuGroups: MenuGroup[] = [
  { label: "Home", href: "/", icon: "swallow" },
  {
    label: "Fine Line",
    icon: "rose",
    children: [
      { label: "All fine line", href: "/fine-line-tattoos", icon: "rose" },
      { label: "Small tattoos", href: "/fine-line-tattoos/small-tattoos", icon: "diamond" },
      { label: "Script & lettering", href: "/fine-line-tattoos/script-lettering", icon: "envelope" },
      { label: "Custom tattoos", href: "/fine-line-tattoos/custom-tattoos", icon: "panther" },
      { label: "Matching tattoos", href: "/fine-line-tattoos/couples-matching", icon: "ace" },
      { label: "Flower tattoos", href: "/fine-line-tattoos/floral-botanical", icon: "rose" },
      { label: "Minimalist tattoos", href: "/fine-line-tattoos/minimalist", icon: "bolt" },
      { label: "Cover up tattoos", href: "/fine-line-tattoos/cover-ups", icon: "moth" },
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

/**
 * Service hub ("Pick where to start"). Decision (client, Oct 2026): no prices anywhere on the site.
 * `audience` = who it's for (short, caps on screen); `body` = the outcome in the client's words (copy deck, Sep 2026).
 */
export const serviceList = [
  { title: "Small tattoos", audience: "First tattoos", body: "Small and easy to place. Drawn at the size it's worn, so the detail holds.", href: "/fine-line-tattoos/small-tattoos", icon: "diamond", image: "/images/work/bow-ankle.jpg" },
  { title: "Script & lettering", audience: "Names, dates, words", body: "Hand-drawn or set from a font, spaced so it stays readable for years.", href: "/fine-line-tattoos/script-lettering", icon: "envelope", image: "/images/work/script-shoulder.jpg" },
  { title: "Custom tattoos", audience: "A specific idea", body: "Your idea, drawn with you. Small pieces through to sleeves and back pieces.", href: "/fine-line-tattoos/custom-tattoos", icon: "panther", image: "/images/work/lion.jpg" },
  { title: "Matching tattoos", audience: "Couples, friends, family", body: "Two designs made to go together, booked in the same session.", href: "/fine-line-tattoos/couples-matching", icon: "ace", image: "/images/work/matching-hands.jpg" },
  { title: "Flower tattoos", audience: "Birth flowers, botanicals", body: "Drawn from real references, so it reads as the actual plant.", href: "/fine-line-tattoos/floral-botanical", icon: "rose", image: "/images/work/floral-ankle.jpg" },
  { title: "Minimalist tattoos", audience: "Simple and clean", body: "The fewest lines that still work. Not always small.", href: "/fine-line-tattoos/minimalist", icon: "bolt", image: "/images/work/stars.jpg" },
  { title: "Cover up tattoos", audience: "Old work", body: "Send a photo first. Some old tattoos can be reworked, some can't, and we'll tell you.", href: "/fine-line-tattoos/cover-ups", icon: "moth", image: "/images/work/floral-sleeve-2.jpg" },
] as const;

export const cta = {
  // Straight to the live booking widget, as on the previous build
  book: { label: "Book a tattoo", href: "https://book.heartbreakerink.com/widget/bookings/tattoo-app" },
  voucher: { label: "Gift a voucher", href: "/gift-vouchers" },
};

/**
 * Home page copy deck (website-copy-system, 31 Oct 2026). Sources: client intro doc, developer copy deck (Sep 2026),
 * Sika keyword map (4 Sep 2026), competitor teardown, official fact check. Open items are marked TO CONFIRM.
 * Voice: direct, warm, unfussy — what the artist would say at the chair. No slogans, no superlatives.
 */
export const home = {
  seo: {
    // primary keyword: "fine line tattoo studio" + Mornington (title ≤ 60, description ≤ 155)
    title: "Fine Line Tattoo Studio in Mornington | Heartbreaker Ink",
    description:
      "Fine line tattoo studio in Mornington on the Mornington Peninsula. Small tattoos, script, custom and matching work, drawn by hand. By appointment.",
  },
  hero: {
    eyebrow: "Barkly St, Mornington · By appointment",
    title: "Fine line tattoo studio in Mornington",
    lede: "Small pieces, script and custom work, drawn by hand. Fine line is all we do.",
    facts: [
      { k: "Style", v: "Fine line only" },
      { k: "Drawing", v: "By hand" },
      { k: "Bookings", v: "18+ · by appointment" },
    ],
    secondary: { label: "See healed work", href: "/gallery" },
  },
  marquee: ["Fine line", "Small tattoos", "Script & lettering", "Custom", "Matching", "Flash", "Mornington"],
  intro: {
    eyebrow: "The studio",
    title: "Fine line is all we do",
    // GEO answer-first line: who / what / where in one quotable sentence
    lede: "Heartbreaker Ink is a fine line tattoo studio on Barkly Street in Mornington, on Victoria's Mornington Peninsula. We tattoo small pieces, script and lettering, custom work, matching tattoos and flash, by appointment.",
    story: [
      "Thin lines are unforgiving. There's no shading to hide a wobble, so the drawing takes as long as it does. Every design is spaced for how it will heal, not just how it looks on the day.",
      "You don't need a concept or a reason. Plenty of good tattoos are just a shape someone liked.",
    ],
    aside: "Nobody here will make you feel stupid for being nervous, for asking what it costs, or for changing your mind on placement three times.",
    asideLabel: "From the studio",
    cta: { label: "Book a tattoo", href: "https://book.heartbreakerink.com/widget/bookings/tattoo-app" },
    more: { label: "About the studio", href: "/about" },
    promises: [
      { title: "Fine line only", body: "Single needle, thin lines, sized for the body it's going on. It's the only style we tattoo.", icon: "rose" },
      { title: "A straight answer", body: "If an idea won't hold up as fine line at the size you want, we'll tell you before you book.", icon: "diamond" },
      { title: "Drawn before the day", body: "You see your design before the appointment, so changes happen then, not in the chair.", icon: "envelope" },
      // TO CONFIRM: number of beds / artists in the new studio
      { title: "More beds, shorter wait", body: "The bigger studio has more beds and more artists, so you're not waiting as long to get in.", icon: "bolt" },
    ],
  },
  services: {
    eyebrow: "What we do",
    title: "Pick where to start",
    intro: "Every style here is fine line. Start with the one closest to your idea.",
    all: { label: "All fine line services", href: "/fine-line-tattoos" },
  },
  work: {
    eyebrow: "Healed work",
    title: "Healed, not fresh",
    subtitle: "Fine line settles as it heals, so we photograph our work weeks after the session, not on the day. This is what it actually looks like.",
    cta: { label: "See the gallery", href: "/gallery" },
  },
  process: {
    eyebrow: "Booking",
    title: "Booking a tattoo",
    steps: [
      // facts: copy deck (Contact, Custom, Studio Policy)
      { n: "01", title: "Send your idea", body: "References, rough size and where it's going. You'll get a straight answer on whether it works as fine line.", meta: "Usually a reply the same day", icon: "envelope" },
      { n: "02", title: "We draw it", body: "You see the design before your appointment. A non-refundable deposit holds the date.", meta: "48 hours' notice to move your date", icon: "diamond" },
      { n: "03", title: "Get tattooed", body: "Stencil, placement check, then the work. Take breaks when you need them. You leave with written aftercare.", meta: "Free touch-ups within 3 months", icon: "swallow" },
    ],
    secondary: { label: "Studio policy", href: "/studio-policy" },
  },
  events: {
    eyebrow: "Events & collabs",
    title: "Fine line tattoos at your event",
    body: "We bring the artists, setup and equipment to corporate days, festivals, weddings and private parties.",
    detail: "Guests pick from a set of flash designs and leave with a real tattoo, done properly on site.",
    types: [
      { label: "Corporate days", icon: "diamond" },
      { label: "Festivals", icon: "sun" },
      { label: "Weddings", icon: "rose" },
      { label: "Private parties", icon: "dice" },
    ],
    included: "Artists, setup, equipment, consumables and travel, quoted as one package rather than per tattoo.",
    // TO CONFIRM: OK to name past activations (e.g. Vinehop 2025) as proof?
    caption: "On site at an event",
    cta: { label: "Enquire about an event", href: "/collabs-events" },
  },
  faq: {
    eyebrow: "Questions",
    title: "Before you book",
    intro: "The ones people ask most. Anything else, just ask.",
  },
  visit: {
    eyebrow: "Finding the studio",
    title: "On Barkly Street, Mornington",
    rows: [
      { k: "Address", v: "Shop 5, 53–55 Barkly St, Mornington VIC" },
      { k: "By car", v: "About an hour from Melbourne via the Nepean Highway and Peninsula Link. Around twenty minutes from Frankston." },
      { k: "Parking", v: "Street parking on and around Barkly Street. Allow a few extra minutes on weekends and over summer." },
      { k: "Hours", v: "By appointment. Later sessions on request." },
    ],
    suburbs: "Most clients come from Mornington, Mount Eliza, Mount Martha, Somerville, Moorooduc, Tyabb and Frankston, and a fair few make the drive from Melbourne.",
  },
  reviews: {
    title: "Sent by someone",
    cta: { label: "Read more", href: "/reviews" },
  },
};

/**
 * Home FAQ (AEO). Answers are 40–60 words, answer-first. Also rendered as FAQPage JSON-LD.
 * Official facts checked 31 Oct 2026: Lifeblood (tattoo/piercing eligibility), Better Health Channel (tattoos).
 * Healing advice is the studio's own aftercare guidance (copy deck), not an official health claim.
 */
export const faqs = [
  {
    q: "Does a fine line tattoo hurt?",
    a: "It's uncomfortable rather than unbearable, and placement matters more than size. A small piece on the ribs will feel stronger than a bigger one on the forearm. Fine line uses a single needle, which most people find gentler than shading, and you can take breaks whenever you want.",
  },
  {
    q: "How much does a tattoo cost?",
    a: "It depends on size, detail, placement and how much drawing happens first. Every piece is quoted before you book, so you'll know the price before you pay the non-refundable deposit that holds your date. Send your idea and a rough size to get a quote.",
  },
  {
    q: "How long does a tattoo take to heal?",
    a: "The surface usually settles in about two weeks. The deeper layers take longer, which is why a tattoo can look healed before it's finished. While it heals, keep it clean, out of direct sun and out of pools, the ocean and spas. You'll get written aftercare on the day.",
  },
  {
    q: "How old do I need to be?",
    a: "Eighteen, with photo ID on the day. In Victoria it's illegal to tattoo anyone under 18 unless it's for medical purposes, so there are no exceptions, even with a parent there. If it's a birthday tattoo, book it for on or after the day.",
    source: "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/tattoos",
  },
  {
    q: "What if I need to reschedule?",
    // TO CONFIRM: how the 12-month "deposit on file" rule sits with "deposit forfeited" — wording simplified here
    a: "Give at least 48 hours' notice and you can move your date once on the same deposit. With less notice than that, the deposit is forfeited. The full details are in the studio policy, and it's worth reading before you pay.",
  },
  {
    q: "Can I donate blood after getting a tattoo?",
    a: "Yes, after a short wait. Lifeblood says that if your tattoo was done at a licensed studio in Australia, you can give plasma straight away but need to wait one week before giving blood or platelets. Rules change, so check Lifeblood before you donate.",
    source: "https://www.lifeblood.com.au/faq/eligibility/lifestyle-and-risk-factors/tattoo-or-piercing",
  },
];

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
