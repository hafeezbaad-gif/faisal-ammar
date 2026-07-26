import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Menu,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Target,
  BarChart3,
  FileText,
  Truck,
  Quote,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import portrait from "@/assets/faisal-portrait.jpg";

// ---------- Motion helpers ----------
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}


export const Route = createFileRoute("/")({
  component: Landing,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Case Study", href: "#case-study" },
  { label: "Contact", href: "#contact" },
];

function Landing() {
  return (
    <div id="home" className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <CaseStudy />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-14 flex max-w-7xl items-center gap-4 px-6"
    >
      <motion.span
        className="h-px flex-1 bg-hairline origin-right"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        {children}
      </h2>
      <motion.span
        className="h-px flex-1 bg-hairline origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}


function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-hairline/60 bg-background/70 backdrop-blur-md shadow-[0_8px_30px_-15px_rgba(0,0,0,0.15)]"
          : "border-b border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? "h-14 md:h-16" : "h-16 md:h-20"
        }`}
      >
        <a href="#home" className="font-display text-xl font-extrabold tracking-tight">
          <span className="text-primary">FBA</span>
          <span className="text-foreground">withFaisal</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="story-link text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden text-xs font-semibold tracking-[0.2em] text-foreground/80 transition-colors hover:text-primary md:block"
          >
            LET'S TALK
          </a>
          <motion.button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface text-primary transition-colors hover:border-primary hover:shadow-[var(--shadow-glow-sm)]"
          >
            <Menu size={18} />
          </motion.button>
        </div>
      </div>
      {open && (
        <div className="border-t border-hairline bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground"
            >
              Let's Talk
            </a>
          </nav>
        </div>
      )}
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="pointer-events-none absolute inset-0 vertical-lines opacity-60" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[120px]"
        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-10 top-24 h-32 w-32 rounded-full bg-accent/25 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:gap-8">
        {/* Left copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-5 lg:pt-6"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/70 px-3 py-1.5 text-xs text-muted-foreground"
          >
            <motion.span
              animate={{ rotate: [0, 15, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={12} className="text-primary" />
            </motion.span>
            Hello, i'm
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl xl:text-7xl"
          >
            Syed M. Faisal Ammar
            <br />
            <span className="text-gradient-primary">Amazon FBA Expert</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Helping e-commerce brands and private label investors generate
            <span className="text-foreground"> $50K–$300K+/Month </span>
            through precision PPC, automated logistics, and dominant listing
            optimization.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-sm)] transition-shadow hover:shadow-[var(--shadow-glow)]"
            >
              Scale Your Store Now
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/50 px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-surface"
            >
              Schedule A Call
              <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Center portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center lg:col-span-4"
        >
          <motion.div
            className="relative aspect-[3/4] w-full max-w-md"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Split purple circle */}
            <div className="absolute inset-x-4 top-8 bottom-8 rounded-full bg-primary/80" />
            <div className="absolute inset-x-4 top-8 bottom-8 rounded-full bg-background [clip-path:polygon(50%_0,100%_0,100%_100%,50%_100%)]" />
            {/* Frame */}
            <div className="absolute inset-x-2 bottom-0 top-16 overflow-hidden rounded-t-[220px] border border-hairline bg-surface">
              <img
                src={portrait}
                alt="Faisal Abdul, Amazon FBA expert"
                width={912}
                height={1104}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Right metrics */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-3"
        >
          <div className="rounded-3xl border border-hairline bg-surface/70 p-6 backdrop-blur">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Track Record
            </p>
            <div className="mt-5 divide-y divide-hairline">
              <Metric value="$4.5M+" label="Revenue Generated" />
              <Metric value="40+" label="Brands Scaled" />
              <Metric value="8.5x+" label="Average ROAS Achieved" />
            </div>
            <motion.div
              className="mt-6 flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/10 px-3 py-2 text-xs text-foreground/90"
              animate={{
                boxShadow: [
                  "0 0 0 0 color-mix(in oklab, var(--primary) 30%, transparent)",
                  "0 0 24px 4px color-mix(in oklab, var(--primary) 20%, transparent)",
                  "0 0 0 0 color-mix(in oklab, var(--primary) 30%, transparent)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <TrendingUp size={14} className="text-primary" />
              Growth-first, retainer-lean
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <SectionLabel>About</SectionLabel>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            What I Do
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
            The workflow behind
            <br />
            <span className="text-gradient-primary">7-figure storefronts.</span>
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              I help eCommerce brands and service businesses scale revenue and
              generate high-quality leads using data-driven Meta and Google Ads
              strategies.
            </p>
            <p>
              With 5+ years of experience and managing over $1M+ in ad spend, I
              focus on increasing ROAS, reducing CPA, and building scalable
              campaigns that deliver consistent results.
            </p>
            <p>
              From strategy to execution and optimization, I build systems that
              help businesses grow faster and more profitably.
            </p>
          </div>
        </Reveal>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Client Results
          </p>
          <h3 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            What My Clients Say About Results
          </h3>

          <div className="mt-8 space-y-4">
            {[
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
            ].map((t) => (
              <figure
                key={t.name}
                className="rounded-3xl border border-hairline bg-surface/70 p-6 transition-colors hover:border-primary/40"
              >
                <Quote size={22} className="text-primary" />
                <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-4 border-t border-hairline pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 font-display text-xs font-bold text-primary">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="font-display text-xl font-bold text-primary">{t.stat}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {t.statLabel}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { k: "45d", v: "Top-3 rank" },
              { k: "-32%", v: "Ad spend" },
              { k: "4.2x", v: "Sustained ROAS" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-hairline bg-surface/40 p-4 text-center"
              >
                <div className="font-display text-xl font-bold text-foreground">{s.k}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    icon: BarChart3,
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
    icon: Target,
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
    icon: FileText,
    title: "Account Management Services for Amazon",
    bullets: [
      "Amazon Account Setup",
      "Listing Setup",
      "FBA Management",
      "Daily Account Monitoring",
      "Advertising & Promotion",
      "Account Health Support",
      "Review Management",
      "Reporting",
    ],
  },
] as const;

function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-24 md:py-32">
      <SectionLabel>Services</SectionLabel>
      <div className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              Services
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
              My Special Service&nbsp;
              <br />
              For Your&nbsp;
              <br />
              <span className="text-gradient-primary">Business Development</span>
            </h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, bullets }, i) => (
            <div
              key={title}
              className="group relative overflow-hidden border border-hairline bg-surface/70 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:bg-surface hover:shadow-[var(--shadow-glow-sm)]"
              style={{
                borderRadius:
                  i === 0
                    ? "48px 32px 48px 32px"
                    : i === 1
                    ? "32px 48px 32px 48px"
                    : "40px",
              }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-inset ring-primary/25">
                  <Icon size={20} />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold leading-tight text-foreground">
                  {title}
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-foreground/90">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CASES = [
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
] as const;

function CaseStudy() {
  return (
    <section id="case-study" className="relative py-24 md:py-32">
      <SectionLabel>Case Study</SectionLabel>
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Case Studies
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
            Real accounts. <span className="text-gradient-primary">Real receipts.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {CASES.map((c, i) => (
            <article
              key={c.title}
              className={`group relative overflow-hidden rounded-[32px] border border-hairline bg-surface/70 p-8 md:p-10 ${
                i === 0 ? "lg:mt-0" : "lg:mt-12"
              }`}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex items-center justify-between">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {c.tag}
                </span>
                <span className="text-xs text-muted-foreground">Case 0{i + 1}</span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-bold leading-tight md:text-3xl">
                {c.title}
              </h3>

              <div className="mt-6 space-y-5 text-sm">
                <Block label="Problem" value={c.problem} />
                <Block label="Strategy" value={c.strategy} />
              </div>

              <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/10 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                  Result
                </p>
                <div className="mt-2 flex items-baseline gap-3">
                  <div className="font-display text-4xl font-extrabold text-foreground">
                    {c.result}
                  </div>
                  <div className="text-sm text-muted-foreground">{c.resultSub}</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-hairline pt-6">
                {c.stats.map((s) => (
                  <div key={s.v}>
                    <div className="font-display text-lg font-bold text-foreground">{s.k}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Block({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </div>
      <p className="mt-1.5 leading-relaxed text-foreground/85">{value}</p>
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <SectionLabel>Contact</SectionLabel>
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Get In Touch
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] md:text-6xl">
            Let's Scale Your
            <br />
            <span className="text-gradient-primary">Business</span>
          </h2>
          <p className="mt-6 max-w-md text-base text-muted-foreground">
            Book a free strategy call and discover how we can increase your
            revenue or generate consistent, high-quality leads using custom
            distribution strategies.
          </p>

          <div className="mt-10 space-y-4">
            <ContactRow icon={MapPin} label="Location" value="Faisalabad, Pakistan" />
            <ContactRow icon={Mail} label="Email" value="faisalammar6622@gmail.com" />
            <ContactRow icon={Phone} label="Phone" value="+92 3467558646" />
          </div>

          <div className="mt-10 flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Follow
            </span>
            <div className="h-px flex-1 bg-hairline" />
            <a
              aria-label="LinkedIn"
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-foreground/80 transition-all hover:border-primary hover:text-primary"
            >
              <Linkedin size={16} />
            </a>
            <a
              aria-label="Instagram"
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-foreground/80 transition-all hover:border-primary hover:text-primary"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-[32px] border border-hairline bg-surface/80 p-8 backdrop-blur md:p-10"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Full Name" name="name" placeholder="Faisal Abdul" />
            <Field
              label="Email Address"
              name="email"
              type="email"
              placeholder="contact@fbawithfaisal.com"
            />
            <Field label="Phone Number" name="phone" placeholder="+92 346 5767577" />
            <Field label="Website Link" name="website" placeholder="www.fbawithfaisal.com" />
          </div>
          <div className="mt-5">
            <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              placeholder="Write message"
              className="mt-2 w-full resize-none rounded-2xl border border-hairline bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            type="submit"
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-sm)] transition-all hover:shadow-[var(--shadow-glow)]"
          >
            {sent ? "Thanks — I'll be in touch shortly ✓" : "Get My Free Growth Plan"}
            {!sent && (
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-hairline bg-surface/50 p-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-inset ring-primary/25">
        <Icon size={18} />
      </div>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </div>
        <div className="mt-0.5 text-sm font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-hairline bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-hairline bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div className="font-display text-sm font-bold">
          <span className="text-primary">FBA</span>withFaisal
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Faisal Abdul. All rights reserved.
        </div>
        <div className="text-xs text-muted-foreground">
          Built for founders who ship.
        </div>
      </div>
    </footer>
  );
}
