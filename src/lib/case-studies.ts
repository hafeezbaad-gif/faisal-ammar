export type CaseStudy = {
  id: string;
  slug: string;
  index: number;
  tag: string;
  title: string;
  subtitle: string;
  headline: string;
  client: {
    name: string;
    industry: string;
    marketplace: string;
    catalogue: string;
    engagement: string;
    startedAt: string;
  };
  problem: string;
  strategy: string;
  result: string;
  resultSub: string;
  stats: { k: string; v: string }[];
  kpis: { label: string; before: string; after: string; delta: string }[];
  revenue: { month: string; value: number }[]; // in $K
  roas: { month: string; value: number }[];
  acos: { month: string; value: number }[];
  budget: { label: string; value: number; color: string }[];
  campaigns: {
    name: string;
    type: string;
    spend: string;
    sales: string;
    acos: string;
    roas: string;
  }[];
  keywords: {
    term: string;
    from: number;
    to: number;
    volume: string;
  }[];
  timeline: { week: string; title: string; detail: string }[];
  auditChecklist: string[];
  wins: { title: string; detail: string }[];
  challenges: { title: string; detail: string }[];
  solutions: { title: string; detail: string }[];
  lessons: string[];
  takeaways: string[];
  quote: { text: string; author: string; role: string };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "01",
    slug: "kitchenware-private-label-scale",
    index: 0,
    tag: "Kitchenware",
    title: "The Kitchenware Private Label Scale",
    subtitle:
      "From $12K/mo plateau to $68.5K/mo in 90 days with a full backend + PPC rebuild.",
    headline: "5.7× revenue lift in one quarter",
    client: {
      name: "Nordic Hearth Kitchenware Co.",
      industry: "Home & Kitchen — Private Label",
      marketplace: "Amazon US (Primary), CA & UK (Secondary)",
      catalogue: "12 SKUs across 3 parent listings",
      engagement: "Full Account Management + PPC",
      startedAt: "Q1 · 90-day sprint",
    },
    problem:
      "An established kitchen brand stuck at $12,000/month with zero ad scaling and declining organic ranks.",
    strategy:
      "Re-architected backend search terms, pruned toxic non-converting phrases from broad match campaigns, and launched aggressive Exact Match keyword ranking loops.",
    result: "$68,500/mo",
    resultSub: "in 90 days · 4.2x ROAS",
    stats: [
      { k: "$12K", v: "Starting MRR" },
      { k: "$68.5K", v: "New MRR" },
      { k: "4.2x", v: "Sustained ROAS" },
    ],
    kpis: [
      { label: "Monthly Revenue", before: "$12,000", after: "$68,500", delta: "+470%" },
      { label: "TACoS", before: "38%", after: "11%", delta: "-71%" },
      { label: "ROAS", before: "1.6x", after: "4.2x", delta: "+163%" },
      { label: "Conversion Rate", before: "6.8%", after: "17.4%", delta: "+156%" },
      { label: "Sessions / mo", before: "9,200", after: "31,400", delta: "+241%" },
      { label: "Organic Rank (hero KW)", before: "#48", after: "#4", delta: "+44 pos" },
    ],
    revenue: [
      { month: "W1", value: 12 },
      { month: "W2", value: 14 },
      { month: "W3", value: 18 },
      { month: "W4", value: 23 },
      { month: "W5", value: 29 },
      { month: "W6", value: 34 },
      { month: "W7", value: 41 },
      { month: "W8", value: 47 },
      { month: "W9", value: 54 },
      { month: "W10", value: 59 },
      { month: "W11", value: 64 },
      { month: "W12", value: 68.5 },
    ],
    roas: [
      { month: "W1", value: 1.6 },
      { month: "W2", value: 1.9 },
      { month: "W3", value: 2.2 },
      { month: "W4", value: 2.6 },
      { month: "W5", value: 3.0 },
      { month: "W6", value: 3.3 },
      { month: "W7", value: 3.6 },
      { month: "W8", value: 3.8 },
      { month: "W9", value: 4.0 },
      { month: "W10", value: 4.1 },
      { month: "W11", value: 4.15 },
      { month: "W12", value: 4.2 },
    ],
    acos: [
      { month: "W1", value: 62 },
      { month: "W2", value: 55 },
      { month: "W3", value: 48 },
      { month: "W4", value: 41 },
      { month: "W5", value: 36 },
      { month: "W6", value: 32 },
      { month: "W7", value: 29 },
      { month: "W8", value: 26 },
      { month: "W9", value: 25 },
      { month: "W10", value: 24 },
      { month: "W11", value: 23.5 },
      { month: "W12", value: 23 },
    ],
    budget: [
      { label: "Exact Match Ranking", value: 42, color: "#FCA311" },
      { label: "Product Targeting", value: 22, color: "#FFB947" },
      { label: "Brand Defense", value: 14, color: "#FFD08A" },
      { label: "Auto Discovery", value: 12, color: "#5B7BC7" },
      { label: "Sponsored Display", value: 10, color: "#263A66" },
    ],
    campaigns: [
      { name: "SP · Exact · Hero KW", type: "Sponsored Products", spend: "$4,120", sales: "$24,800", acos: "16.6%", roas: "6.0x" },
      { name: "SP · Broad · Discovery", type: "Sponsored Products", spend: "$1,860", sales: "$7,020", acos: "26.5%", roas: "3.7x" },
      { name: "SP · PAT · Competitor ASINs", type: "Product Targeting", spend: "$2,240", sales: "$9,680", acos: "23.1%", roas: "4.3x" },
      { name: "SB · Video · Brand Story", type: "Sponsored Brands", spend: "$1,150", sales: "$5,900", acos: "19.5%", roas: "5.1x" },
      { name: "SD · Remarketing Views", type: "Sponsored Display", spend: "$740", sales: "$3,410", acos: "21.7%", roas: "4.6x" },
    ],
    keywords: [
      { term: "cast iron dutch oven", from: 48, to: 4, volume: "82K/mo" },
      { term: "enameled dutch oven 6 qt", from: 71, to: 6, volume: "34K/mo" },
      { term: "ceramic knife set", from: 63, to: 9, volume: "27K/mo" },
      { term: "kitchen utensil holder", from: 92, to: 12, volume: "19K/mo" },
      { term: "nonstick skillet ceramic", from: 55, to: 7, volume: "44K/mo" },
    ],
    timeline: [
      { week: "Week 1", title: "Full Account & Listing Audit", detail: "Diagnostics on 12 SKUs, PPC health check, search-term forensic pass." },
      { week: "Week 2", title: "Backend Search Terms + SEO Rebuild", detail: "Rewrote titles, bullets, description, and 249 backend bytes." },
      { week: "Week 3", title: "Campaign Restructure", detail: "Collapsed 41 legacy campaigns into a 9-campaign SKAG framework." },
      { week: "Week 4-5", title: "Ranking Loop Launch", detail: "Exact match at aggressive bids + coupon stack to push hero KWs to page 1." },
      { week: "Week 6-8", title: "A+ Content & Storefront", detail: "New A+ modules, comparison chart, and 4-tab storefront live." },
      { week: "Week 9-10", title: "Bid Automation + Placement Tuning", detail: "Layered dayparting and TOS placement multipliers up to +180%." },
      { week: "Week 11-12", title: "Scale + Guardrails", detail: "3x budget on winners, negatives cleanup, TACoS locked below 12%." },
    ],
    auditChecklist: [
      "Category node & browse tree correctness",
      "Backend search terms — bytes, duplicates, brand terms removed",
      "Title structure & keyword front-loading",
      "Bullet points — feature/benefit balance, mobile truncation",
      "A+ Content coverage & module quality",
      "Image stack — main, lifestyle, infographic, comparison, video",
      "Review velocity, negative themes & Vine plan",
      "Pricing, coupon and Subscribe & Save eligibility",
      "PPC waste — 60-day negative harvest",
      "Inventory health & IPI score",
    ],
    wins: [
      { title: "Hero KW to Page 1", detail: "Ranked #4 organically for an 82K/mo keyword in 38 days." },
      { title: "TACoS collapsed", detail: "From 38% to 11% while spend grew 3.4x." },
      { title: "Sustained 4.2x ROAS", detail: "Held for 6 consecutive weeks post-scale." },
    ],
    challenges: [
      { title: "Review velocity gap", detail: "Only 62 reviews vs. 4,000+ on competitors." },
      { title: "Bleeding auto campaigns", detail: "37% of spend on non-converting search terms." },
      { title: "Weak image CTR", detail: "Main image CTR 0.31% vs. category average 0.52%." },
    ],
    solutions: [
      { title: "Vine + insert card flow", detail: "Enrolled all parents in Vine and rewrote insert copy — 3.1× review velocity." },
      { title: "SKAG negative harvest", detail: "Migrated converting terms to Exact, killed 214 wasted phrases." },
      { title: "Main image A/B test", detail: "Ran 3 variants via Manage Your Experiments — winner lifted CTR to 0.71%." },
    ],
    lessons: [
      "Backend bytes are the fastest lever — most brands ship them broken.",
      "Ranking loops only work when the listing already converts above category mean.",
      "Kill the story of ‘brand awareness’ spend — every dollar must map to a search term.",
    ],
    takeaways: [
      "A tight 9-campaign structure outperforms 40+ legacy campaigns every time.",
      "Main image CTR is the single highest-leverage creative asset on Amazon.",
      "TACoS — not ACoS — is the real profit compass at scale.",
    ],
    quote: {
      text:
        "In 12 weeks we went from wondering if the brand was dying to hiring a second ops person to keep up with orders. Faisal runs the account like a CFO with a PPC console.",
      author: "M. Larsen",
      role: "Founder, Nordic Hearth",
    },
  },
  {
    id: "02",
    slug: "electronics-accessory-turnaround",
    index: 1,
    tag: "Electronics",
    title: "Electronics Accessory Turnaround",
    subtitle:
      "Rescued a bleeding electronics accessory brand — cut ACoS from 74% to 23% and unlocked $110K+ of seasonal revenue.",
    headline: "51-point ACoS drop, six-figure revenue recovered",
    client: {
      name: "Volt & Co. Accessories",
      industry: "Consumer Electronics Accessories",
      marketplace: "Amazon US & DE",
      catalogue: "8 SKUs · charging & audio accessories",
      engagement: "PPC Rescue + Creative Overhaul",
      startedAt: "Pre-Q4 · 10-week sprint",
    },
    problem:
      "Bleeding cash on high-ACoS generic keywords with bad conversion rates caused by poorly optimized image ordering and lackluster copy.",
    strategy:
      "Implemented thorough competitor listing reviews, rewrote A+ feature bullets, and split-tested main CTR images alongside targeted video ads.",
    result: "23% ACoS",
    resultSub: "down from 74% · $110K+ unlocked",
    stats: [
      { k: "74%", v: "Old ACoS" },
      { k: "23%", v: "New ACoS" },
      { k: "$110K+", v: "Seasonal Rev." },
    ],
    kpis: [
      { label: "ACoS", before: "74%", after: "23%", delta: "-69%" },
      { label: "Conversion Rate", before: "5.1%", after: "12.8%", delta: "+151%" },
      { label: "Main Image CTR", before: "0.28%", after: "0.74%", delta: "+164%" },
      { label: "Ad Sales", before: "$41K", after: "$152K", delta: "+271%" },
      { label: "Gross Margin", before: "6%", after: "27%", delta: "+21 pts" },
      { label: "Refund Rate", before: "9.2%", after: "3.4%", delta: "-63%" },
    ],
    revenue: [
      { month: "W1", value: 18 },
      { month: "W2", value: 19 },
      { month: "W3", value: 22 },
      { month: "W4", value: 26 },
      { month: "W5", value: 33 },
      { month: "W6", value: 44 },
      { month: "W7", value: 58 },
      { month: "W8", value: 78 },
      { month: "W9", value: 96 },
      { month: "W10", value: 110 },
    ],
    roas: [
      { month: "W1", value: 1.35 },
      { month: "W2", value: 1.5 },
      { month: "W3", value: 1.8 },
      { month: "W4", value: 2.2 },
      { month: "W5", value: 2.7 },
      { month: "W6", value: 3.1 },
      { month: "W7", value: 3.5 },
      { month: "W8", value: 3.9 },
      { month: "W9", value: 4.2 },
      { month: "W10", value: 4.35 },
    ],
    acos: [
      { month: "W1", value: 74 },
      { month: "W2", value: 68 },
      { month: "W3", value: 58 },
      { month: "W4", value: 49 },
      { month: "W5", value: 41 },
      { month: "W6", value: 35 },
      { month: "W7", value: 30 },
      { month: "W8", value: 27 },
      { month: "W9", value: 25 },
      { month: "W10", value: 23 },
    ],
    budget: [
      { label: "Exact Match Winners", value: 38, color: "#FCA311" },
      { label: "Sponsored Brands Video", value: 24, color: "#FFB947" },
      { label: "Competitor PAT", value: 18, color: "#FFD08A" },
      { label: "Category PAT", value: 12, color: "#5B7BC7" },
      { label: "Auto Discovery", value: 8, color: "#263A66" },
    ],
    campaigns: [
      { name: "SP · Exact · Winner Set", type: "Sponsored Products", spend: "$6,240", sales: "$32,900", acos: "19.0%", roas: "5.3x" },
      { name: "SB · Video · Category", type: "Sponsored Brands Video", spend: "$4,180", sales: "$18,600", acos: "22.5%", roas: "4.4x" },
      { name: "SP · PAT · Top Competitors", type: "Product Targeting", spend: "$2,970", sales: "$12,400", acos: "23.9%", roas: "4.2x" },
      { name: "SD · View Remarketing", type: "Sponsored Display", spend: "$1,540", sales: "$6,750", acos: "22.8%", roas: "4.4x" },
      { name: "SP · Auto · Discovery", type: "Auto", spend: "$1,120", sales: "$4,180", acos: "26.8%", roas: "3.7x" },
    ],
    keywords: [
      { term: "usb c charger 65w", from: 84, to: 3, volume: "68K/mo" },
      { term: "wireless earbuds bluetooth 5.3", from: 121, to: 11, volume: "112K/mo" },
      { term: "gan charger 3 port", from: 66, to: 5, volume: "24K/mo" },
      { term: "magnetic phone charger", from: 58, to: 8, volume: "39K/mo" },
      { term: "usb hub 4 port powered", from: 91, to: 14, volume: "17K/mo" },
    ],
    timeline: [
      { week: "Week 1", title: "PPC Forensics + Listing Audit", detail: "60-day search term dump, wasted-spend map, listing scorecards." },
      { week: "Week 2", title: "Creative Kill Switch", detail: "Paused $18K/mo of high-ACoS spend, briefed new image + video assets." },
      { week: "Week 3", title: "Listing Rewrite + A+ Refresh", detail: "New titles, benefit-led bullets, and 7-module A+ per parent." },
      { week: "Week 4", title: "Main Image A/B Test", detail: "3-variant Manage Your Experiments run — winner deployed marketplace-wide." },
      { week: "Week 5-6", title: "SBV + Competitor PAT Push", detail: "Launched Sponsored Brands Video and competitor ASIN targeting at scale." },
      { week: "Week 7-8", title: "Bid & Placement Optimization", detail: "TOS multipliers +140%, dayparting cut wasted midnight impressions." },
      { week: "Week 9-10", title: "Q4 Scale Window", detail: "3.5× spend on winners entering peak, capped ACoS via automated rules." },
    ],
    auditChecklist: [
      "Search term report — 60-day negative pass",
      "Match type distribution & bid ladders",
      "Placement report analysis (TOS vs. ROS vs. PP)",
      "Campaign naming & structure hygiene",
      "Image stack CTR benchmark vs. category",
      "A+ Content module scoring",
      "Video ad availability & creative brief",
      "Refund & return reason coding",
      "Inventory cover during ramp",
      "Brand Analytics — SFR & repeat purchase",
    ],
    wins: [
      { title: "ACoS 74% → 23%", detail: "In under 10 weeks with 3.5× more spend." },
      { title: "Main image CTR 2.6×", detail: "New hero image beat control in 6 days of testing." },
      { title: "$110K seasonal unlock", detail: "Cleared inventory position pre-Q4 with healthy margin." },
    ],
    challenges: [
      { title: "Legacy generic keywords", detail: "70%+ of budget was on head terms with 4% CVR." },
      { title: "Refund-driven review erosion", detail: "9.2% refund rate was pulling star rating below 4.0." },
      { title: "No video creative", detail: "Zero SBV live in a video-dominant category." },
    ],
    solutions: [
      { title: "Winner-first PPC structure", detail: "Every converting search term promoted to its own Exact SKAG." },
      { title: "Insert card + QC callout", detail: "Cut refunds 63% through clearer setup instructions and QC gates." },
      { title: "Sponsored Brands Video suite", detail: "3 SBV creatives per parent — took 24% of budget at 4.4x ROAS." },
    ],
    lessons: [
      "In electronics, image CTR is the single fastest ACoS lever — before you touch a bid.",
      "Refund rate is a PPC problem in disguise; fix it and CVR follows.",
      "Video is table stakes in accessories, not a nice-to-have.",
    ],
    takeaways: [
      "Cut before you scale — pausing waste created the budget to fund winners.",
      "Every SKU deserves an SBV creative in a visual category.",
      "Placement multipliers move the needle more than bid tweaks once structure is clean.",
    ],
    quote: {
      text:
        "We had written off the account. Faisal turned the spend into a profit engine, and Q4 became our best quarter on record — by a mile.",
      author: "R. Okafor",
      role: "Head of Growth, Volt & Co.",
    },
  },
];

export function getCaseStudy(id: string) {
  return CASE_STUDIES.find((c) => c.id === id || c.slug === id);
}
