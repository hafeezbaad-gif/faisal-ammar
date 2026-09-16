import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  role: string;
  stat: string;
  statLabel: string;
};

export type KeyValue = { k: string; v: string };

export type SiteContent = {
  hero: {
    badge: string;
    name: string;
    accent: string;
    paragraph: string;
    highlight: string;
    paragraphEnd: string;
    primaryCta: string;
    secondaryCta: string;
    trackRecordLabel: string;
    metrics: KeyValue[];
    note: string;
  };
  marquee: { metric: string; label: string }[];
  about: {
    eyebrow: string;
    headingTop: string;
    headingAccent: string;
    paragraphs: string[];
    resultsEyebrow: string;
    resultsHeading: string;
    testimonials: Testimonial[];
    stats: KeyValue[];
  };
  services: {
    eyebrow: string;
    headingTop: string;
    headingAccent: string;
    ctaLabel: string;
    items: { title: string; bullets: string[] }[];
  };
  cases: {
    eyebrow: string;
    headingTop: string;
    headingAccent: string;
    items: {
      tag: string;
      title: string;
      problem: string;
      strategy: string;
      result: string;
      resultSub: string;
      stats: KeyValue[];
    }[];
  };
};

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    badge: "Hello, i'm",
    name: "Syed M. Faisal Ammar",
    accent: "Ecommerce Expert",
    paragraph:
      "Helping e-commerce brands and private label investors generate",
    highlight: "$50K–$300K+/Month",
    paragraphEnd:
      "through precision PPC, automated logistics, and dominant listing optimization.",
    primaryCta: "Scale Your Store Now",
    secondaryCta: "Schedule A Call",
    trackRecordLabel: "Track Record",
    metrics: [
      { k: "$4.5M+", v: "Revenue Generated" },
      { k: "40+", v: "Brands Scaled" },
      { k: "8.5x+", v: "Average ROAS Achieved" },
    ],
    note: "Growth-first, retainer-lean",
  },
  marquee: [
    { metric: "$10M+", label: "Verified Ecommerce Revenue" },
    { metric: "Prime", label: "Eligible Fast Delivery" },
    { metric: "100K+", label: "Units Shipped Worldwide" },
    { metric: "100%", label: "Satisfaction Guaranteed" },
  ],
  about: {
    eyebrow: "What I Do",
    headingTop: "The workflow behind",
    headingAccent: "7-figure storefronts.",
    paragraphs: [
      "I help eCommerce brands and service businesses scale revenue and generate high-quality leads using data-driven Meta and Google Ads strategies.",
      "With 5+ years of experience and managing over $1M+ in ad spend, I focus on increasing ROAS, reducing CPA, and building scalable campaigns that deliver consistent results.",
      "From strategy to execution and optimization, I build systems that help businesses grow faster and more profitably.",
    ],
    resultsEyebrow: "Client Results",
    resultsHeading: "What My Clients Say About Results",
    testimonials: [
      {
        quote:
          "Faisal completely transformed our Amazon launch. Our PPC ad spend dropped by 32% while our total organic keyword indexing jumped straight to the top 3 spots within 45 days. Absolutely incredible communication.",
        initials: "MK",
        name: "Marcus K.",
        role: "Founder, Premium Kitchenware Brand",
        stat: "+287%",
        statLabel: "Rev. in 90d",
      },
      {
        quote:
          "We were burning $18K/month on PPC with barely a 1.6x return. Faisal rebuilt our campaign structure from scratch and hit a 6.1x ROAS in the second month. He genuinely understands the algorithm.",
        initials: "SA",
        name: "Sarah A.",
        role: "CEO, Wellness Supplements",
        stat: "6.1x",
        statLabel: "ROAS in 60d",
      },
      {
        quote:
          "Our listings finally look and read like a real brand. A+ content, backend terms, image sequencing — everything got surgically upgraded. Conversion jumped from 8% to 21% on the hero SKU.",
        initials: "DR",
        name: "David R.",
        role: "Owner, Outdoor Gear Co.",
        stat: "21%",
        statLabel: "New CVR",
      },
    ],
    stats: [
      { k: "45d", v: "Top-3 rank" },
      { k: "-32%", v: "Ad spend" },
      { k: "4.2x", v: "Sustained ROAS" },
    ],
  },
  services: {
    eyebrow: "Services",
    headingTop: "Helping Brands Stand Out &",
    headingAccent: "Scale",
    ctaLabel: "Talk to an Expert",
    items: [
      {
        title: "PPC Management Services for Amazon",
        bullets: [
          "A/B Testing",
          "Achieve High ROI",
          "Reduce ACoS & Optimize ROAS",
          "Boost CVR & CTR",
          "Adjust Bids Strategically",
          "Structure Campaigns Efficiently",
          "Tailor Ad Strategies",
          "Budget-friendly Strategies",
        ],
      },
      {
        title: "Private Label A-Z Launch",
        bullets: [
          "Viable Product Selection",
          "Advanced Market Research",
          "Product Development and Its Validation",
          "Product Sourcing and Logistics Management",
          "Design and Packaging",
          "Off Amazon Marketing Plan for Product",
          "Product Launch and Ranking",
        ],
      },
      {
        title: "Account Management Services for Amazon",
        bullets: [
          "Amazon Account Setup",
          "Listing Setup",
          "Campaign Management",
          "Daily Account Monitoring",
          "Advertising & Promotion",
          "Account Health Support",
          "Review Management",
          "Reporting",
        ],
      },
    ],
  },
  cases: {
    eyebrow: "Case Studies",
    headingTop: "Real accounts.",
    headingAccent: "Real receipts.",
    items: [
      {
        tag: "Kitchenware",
        title: "The Kitchenware Private Label Scale",
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
      },
      {
        tag: "Electronics",
        title: "Electronics Accessory Turnaround",
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
      },
    ],
  },
};

export const SITE_CONTENT_KEY = "home";

export function mergeContent(raw: unknown): SiteContent {
  if (!raw || typeof raw !== "object") return DEFAULT_CONTENT;
  const v = raw as Partial<SiteContent>;
  return {
    hero: { ...DEFAULT_CONTENT.hero, ...(v.hero ?? {}) },
    marquee: v.marquee?.length ? v.marquee : DEFAULT_CONTENT.marquee,
    about: { ...DEFAULT_CONTENT.about, ...(v.about ?? {}) },
    services: { ...DEFAULT_CONTENT.services, ...(v.services ?? {}) },
    cases: { ...DEFAULT_CONTENT.cases, ...(v.cases ?? {}) },
  };
}

export async function fetchSiteContent(): Promise<SiteContent> {
  const { data } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", SITE_CONTENT_KEY)
    .maybeSingle();
  return mergeContent(data?.value);
}

export function useSiteContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  useEffect(() => {
    let active = true;
    fetchSiteContent()
      .then((c) => {
        if (active) setContent(c);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  return content;
}
