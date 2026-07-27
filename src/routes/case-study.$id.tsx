import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Quote,
  TrendingUp,
  Target,
  BarChart3,
  Sparkles,
  Award,
  AlertTriangle,
  Wrench,
  Lightbulb,
  ListChecks,
  ChevronUp,
} from "lucide-react";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";
import { BarChart, CountUp, DonutChart, LineChart } from "@/components/case-study/charts";

export const Route = createFileRoute("/case-study/$id")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.id);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.study
      ? `${loaderData.study.title} — Case Study`
      : "Case Study";
    const d = loaderData?.study?.subtitle ?? "Amazon growth case study.";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CaseStudyPage,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const TOC = [
  { id: "overview", label: "Executive Summary" },
  { id: "client", label: "Client Overview" },
  { id: "situation", label: "Initial Situation" },
  { id: "goals", label: "Goals & Problems" },
  { id: "audit", label: "Full Store Audit" },
  { id: "research", label: "Research & Validation" },
  { id: "seo", label: "Listing SEO" },
  { id: "creative", label: "Creative & A+" },
  { id: "ppc", label: "PPC Restructure" },
  { id: "scaling", label: "Scaling Strategy" },
  { id: "timeline", label: "Weekly Timeline" },
  { id: "performance", label: "Performance" },
  { id: "results", label: "Final Results" },
  { id: "lessons", label: "Lessons & Takeaways" },
];

function useActive(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const v = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (v[0]) setActive(v[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [ids.join(",")]);
  return active;
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + startY - 96;
  const distance = targetY - startY;
  const duration = Math.min(1600, Math.max(700, Math.abs(distance) * 0.8));
  const start = performance.now();
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + distance * ease(t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function CaseStudyPage() {
  const { study } = Route.useLoaderData();
  const active = useActive(TOC.map((t) => t.id));
  const nextIdx = (study.index + 1) % CASE_STUDIES.length;
  const nextStudy = CASE_STUDIES[nextIdx];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Hero study={study} />

      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                On this page
              </p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {TOC.map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => scrollTo(t.id)}
                      className={`group flex w-full items-center gap-2 rounded-lg border border-transparent px-3 py-1.5 text-left transition ${
                        active === t.id
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`h-1 w-1 rounded-full transition ${
                          active === t.id ? "bg-primary" : "bg-hairline group-hover:bg-foreground/40"
                        }`}
                      />
                      {t.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="min-w-0 space-y-24">
            <Overview study={study} />
            <ClientOverview study={study} />
            <Situation study={study} />
            <GoalsProblems study={study} />
            <Audit study={study} />
            <Research study={study} />
            <SEO study={study} />
            <Creative study={study} />
            <PPC study={study} />
            <Scaling study={study} />
            <Timeline study={study} />
            <Performance study={study} />
            <Results study={study} />
            <Lessons study={study} />
            <PullQuote study={study} />
            <NextCase next={nextStudy} />
          </div>
        </div>
      </div>

      <FloatingBack />
    </div>
  );
}

function TopBar() {
  return (
    <div className="sticky top-0 z-40 border-b border-hairline/70 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          hash="case-study"
          className="group flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
          Back to Case Studies
        </Link>
        <Link
          to="/"
          hash="contact"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow-sm transition hover:brightness-105"
        >
          Work with Faisal
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

function Hero({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-[160px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #FCA311 1px, transparent 0)", backgroundSize: "36px 36px" }} />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
              Case {study.id}
            </span>
            <span className="text-xs text-muted-foreground">{study.tag}</span>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] md:text-6xl"
          >
            {study.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {study.subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {study.stats.map((s) => (
              <div key={s.v} className="rounded-2xl border border-hairline bg-surface/60 p-5">
                <div className="font-display text-2xl font-extrabold text-foreground md:text-3xl">
                  {s.k}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
            <div className="rounded-2xl border border-primary/40 bg-primary/10 p-5">
              <div className="font-display text-2xl font-extrabold text-primary md:text-3xl">
                {study.headline.split(" ")[0]}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-primary/80">
                {study.headline}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- Section wrappers ----------
function Section({
  id,
  eyebrow,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <Reveal>
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </span>
          )}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              {eyebrow}
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold leading-tight md:text-4xl">
              {title}
            </h2>
          </div>
        </div>
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`rounded-2xl border border-hairline bg-surface/60 p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ---------- Content sections ----------
function Overview({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  return (
    <Section id="overview" eyebrow="01" title="Executive Summary" icon={Sparkles}>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <p className="text-base leading-relaxed text-foreground/85">
            {study.title} is a {study.tag.toLowerCase()} account that engaged us with{" "}
            <span className="text-foreground">{study.stats[0].k}</span> in monthly revenue and
            deteriorating unit economics. Over a{" "}
            <span className="text-foreground">{study.client.startedAt.toLowerCase()}</span>, we ran
            a full-stack rebuild spanning listing SEO, creative, PPC restructure, and profit-first
            scaling. The account exited at{" "}
            <span className="text-primary">{study.result}</span> — {study.resultSub}.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {study.kpis.slice(0, 3).map((k) => (
              <div key={k.label} className="rounded-xl border border-hairline bg-background/40 p-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {k.label}
                </div>
                <div className="mt-2 font-display text-xl font-bold">{k.after}</div>
                <div className="mt-1 text-[11px] text-primary">{k.delta}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Engagement
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <Meta label="Industry" value={study.client.industry} />
            <Meta label="Marketplace" value={study.client.marketplace} />
            <Meta label="Catalogue" value={study.client.catalogue} />
            <Meta label="Scope" value={study.client.engagement} />
            <Meta label="Duration" value={study.client.startedAt} />
          </ul>
        </Card>
      </div>
    </Section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-start justify-between gap-3 border-b border-hairline/60 pb-2 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right text-foreground/90">{value}</span>
    </li>
  );
}

function ClientOverview({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  return (
    <Section id="client" eyebrow="02" title="Client Overview" icon={Target}>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <p className="text-sm leading-relaxed text-foreground/85">
            <span className="font-semibold text-foreground">{study.client.name}</span> is a{" "}
            {study.client.industry.toLowerCase()} brand selling on{" "}
            {study.client.marketplace}. The catalogue at engagement start was {study.client.catalogue}.
            The founder team had strong sourcing but no in-house Amazon growth function — every
            lever from PPC to A+ Content had been outsourced piecemeal for two years.
          </p>
        </Card>
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Health snapshot at kickoff
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {study.kpis.map((k) => (
              <div key={k.label} className="rounded-xl border border-hairline bg-background/40 p-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {k.label}
                </div>
                <div className="mt-1 font-mono text-foreground/85">{k.before}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Situation({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  return (
    <Section id="situation" eyebrow="03" title="Initial Business Situation" icon={AlertTriangle}>
      <Card>
        <p className="text-base leading-relaxed text-foreground/85">{study.problem}</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {study.challenges.map((c) => (
            <div key={c.title} className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                {c.title}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{c.detail}</p>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}

function GoalsProblems({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  const goals = [
    `Take ${study.stats[0].k} MRR to a sustainable ${study.stats[1].k}+ run rate`,
    "Bring TACoS into a profit-safe band without cutting velocity",
    "Rebuild organic rank on 5 hero keywords per parent",
    "Ship a creative stack that beats category CTR benchmarks",
    "Install weekly reporting the founder actually reads",
  ];
  return (
    <Section id="goals" eyebrow="04" title="Business Goals & Problems Identified" icon={ListChecks}>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">Goals</p>
          <ul className="mt-4 space-y-3">
            {goals.map((g) => (
              <li key={g} className="flex items-start gap-3 text-sm text-foreground/85">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {g}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Problems Identified
          </p>
          <ul className="mt-4 space-y-3">
            {[
              "Backend search terms wasted on brand words and duplicates",
              "PPC structure with 40+ overlapping campaigns cannibalizing bids",
              "Main image CTR below category benchmark",
              "No SBV or video creative in a video-heavy category",
              "Refund reasons not coded — invisible margin leak",
              "No weekly cadence — decisions lagged actuals by 3-4 weeks",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-foreground/85">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {p}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}

function Audit({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  return (
    <Section id="audit" eyebrow="05" title="Full Store Audit" icon={ListChecks}>
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <Card>
          <p className="text-sm leading-relaxed text-foreground/85">
            Every engagement opens with a 40-point diagnostic across catalogue health, listing
            quality, PPC hygiene, creative, reviews, inventory, and reporting. Below is the
            actual checklist we completed in Week 1.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {study.auditChecklist.map((c) => (
              <li key={c} className="flex items-start gap-2 rounded-lg border border-hairline bg-background/40 px-3 py-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-foreground/85">{c}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Audit Scorecard
          </p>
          <div className="mt-4 space-y-4">
            {[
              { k: "Listing SEO", v: 46 },
              { k: "Creative Stack", v: 38 },
              { k: "PPC Structure", v: 28 },
              { k: "Reporting Cadence", v: 22 },
            ].map((row) => (
              <div key={row.k}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/85">{row.k}</span>
                  <span className="font-mono text-muted-foreground">{row.v}/100</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-hairline/60">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.v}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
            ))}
            <div className="mt-2 rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm text-primary">
              Starting composite: <span className="font-semibold">33 / 100</span>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Research({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  return (
    <Section id="research" eyebrow="06" title="Competitor, Product & Keyword Research" icon={BarChart3}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Competitor Research
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/85">
            Reverse-ASIN'd the top 10 competitors using Helium 10 Cerebro and Brand Analytics
            Search Frequency Rank. Mapped their title structure, image hooks, price ladders, and
            review velocity to identify white space.
          </p>
          <div className="mt-5 space-y-3">
            {[
              { k: "Competitor ASINs reviewed", v: "42" },
              { k: "Winning image hooks catalogued", v: "17" },
              { k: "Price bands modelled", v: "6" },
              { k: "Review pain-points clustered", v: "23 themes" },
            ].map((r) => (
              <div key={r.k} className="flex items-center justify-between border-b border-hairline/60 pb-2 text-sm last:border-0">
                <span className="text-muted-foreground">{r.k}</span>
                <span className="font-mono text-foreground/90">{r.v}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Keyword Research Process
          </p>
          <ol className="mt-3 space-y-3 text-sm">
            {[
              "Seed 25 root terms from Brand Analytics SFR",
              "Cerebro pass on top 10 competitor ASINs",
              "Magnet expansion + long-tail question mining",
              "Score each KW on volume × intent × conversion probability",
              "Cluster into hero / secondary / defense buckets",
              "Assign SKU-to-KW map before writing a single word of copy",
            ].map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-[11px] font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="text-foreground/85">{s}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              Keyword Ranking Movement
            </p>
            <span className="text-xs text-muted-foreground">Organic rank · lower is better</span>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 pr-4">Search Term</th>
                  <th className="pb-3 pr-4">Volume</th>
                  <th className="pb-3 pr-4">Start</th>
                  <th className="pb-3 pr-4">End</th>
                  <th className="pb-3">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline/60">
                {study.keywords.map((kw) => {
                  const pct = Math.min(100, ((kw.from - kw.to) / kw.from) * 100);
                  return (
                    <tr key={kw.term}>
                      <td className="py-3 pr-4 font-mono text-foreground/90">{kw.term}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{kw.volume}</td>
                      <td className="py-3 pr-4 text-muted-foreground">#{kw.from}</td>
                      <td className="py-3 pr-4 font-semibold text-primary">#{kw.to}</td>
                      <td className="py-3">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-hairline/60">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full rounded-full bg-primary"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function SEO({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  return (
    <Section id="seo" eyebrow="07" title="Listing SEO Optimization" icon={TrendingUp}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Search Term Analysis
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/85">
            Pulled the 60-day Search Term Report, joined it against Brand Analytics, and scored
            every term on spend efficiency, conversion, and click share. 214 terms were sent to
            negative — most of them long-tail head-fakes with sub-2% CVR.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { k: "1,842", v: "Terms audited" },
              { k: "214", v: "Negated" },
              { k: "38", v: "Promoted to Exact" },
            ].map((s) => (
              <div key={s.v} className="rounded-xl border border-hairline bg-background/40 p-3 text-center">
                <div className="font-display text-xl font-bold">{s.k}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Backend Search Terms Rebuild
          </p>
          <ul className="mt-3 space-y-2 text-sm text-foreground/85">
            {[
              "Stripped brand words, competitor names, plurals & singulars",
              "Removed duplicates against title + bullets",
              "Filled to 249 bytes with high-intent, comma-free phrases",
              "Added Spanish variants and common misspellings",
              "Locked spelling variants for hero KWs across variations",
            ].map((s) => (
              <li key={s} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {s}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          {
            k: "Title",
            before: "Brand Name Premium 6 Quart Cast Iron Enamel Dutch Oven Pot",
            after: "Enameled Cast Iron Dutch Oven 6 Qt — Oven-Safe, Non-Stick Interior — Round Braiser with Lid — Brand Name",
          },
          {
            k: "Bullet 1",
            before: "High quality materials for lasting use.",
            after: "PROFESSIONAL-GRADE ENAMEL — Chip-resistant vitreous coating, oven-safe to 500°F, works on gas, induction & ceramic.",
          },
          {
            k: "Description",
            before: "Our Dutch oven is perfect for cooking meals for the family.",
            after: "Structured story: Problem → Product → Proof → Guarantee → CTA. 900 words, keyword-clustered by intent.",
          },
        ].map((row) => (
          <Card key={row.k}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              {row.k}
            </p>
            <div className="mt-3 space-y-3 text-sm">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Before</div>
                <p className="mt-1 rounded-lg border border-destructive/25 bg-destructive/5 p-2 text-foreground/70 line-through decoration-destructive/50">
                  {row.before}
                </p>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-primary">After</div>
                <p className="mt-1 rounded-lg border border-primary/25 bg-primary/10 p-2 text-foreground/90">
                  {row.after}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Creative({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  return (
    <Section id="creative" eyebrow="08" title="A+ Content, Storefront & Image Strategy" icon={Sparkles}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            A+ Content Strategy
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/85">
            Built a 7-module A+ Premium layout per parent: hero banner, feature grid, ingredient/
            material honesty, comparison chart, cross-sell carousel, brand story, and FAQ. Every
            module was scripted around a specific objection captured from review mining.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              "Comparison chart lifted attach rate on second SKU by 22%",
              "Brand story module reduced 'unknown brand' refund reason by 41%",
              "FAQ module cleared 6 of top 10 pre-purchase questions",
            ].map((s) => (
              <li key={s} className="flex items-start gap-2 text-foreground/85">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {s}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Image Stack — Before vs After (mockup)
          </p>
          <div className="mt-4 grid grid-cols-7 gap-2">
            {["Main", "Life", "Info", "Info", "Comp", "Life", "Video"].map((label, i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-square rounded-md border border-destructive/30 bg-destructive/10 p-1 text-center">
                  <div className="grid h-full w-full place-items-center rounded-sm bg-background/40 text-[9px] text-muted-foreground">
                    {i < 3 ? label : "—"}
                  </div>
                </div>
                <div className="aspect-square rounded-md border border-primary/40 bg-primary/10 p-1 text-center">
                  <div className="grid h-full w-full place-items-center rounded-sm bg-background/60 text-[9px] font-semibold text-primary">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
            <span>Before · 3 slots used</span>
            <span className="text-primary">After · 7 slots · +video</span>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Storefront Improvements
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {[
              { k: "Tabs", v: "4 category tabs — collections, bestsellers, new, story" },
              { k: "Modules", v: "18 shoppable modules across the tree" },
              { k: "Video", v: "3 auto-play brand vignettes above the fold" },
              { k: "Attribution", v: "UTM'd for off-Amazon paid traffic tracking" },
            ].map((s) => (
              <div key={s.k} className="rounded-xl border border-hairline bg-background/40 p-4">
                <div className="text-[10px] uppercase tracking-wider text-primary">{s.k}</div>
                <div className="mt-2 text-sm text-foreground/85">{s.v}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}

function PPC({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  return (
    <Section id="ppc" eyebrow="09" title="PPC Restructure & Optimization" icon={Target}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Budget Allocation
          </p>
          <div className="mt-6">
            <DonutChart data={study.budget as any} />
          </div>
        </Card>
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            PPC Optimization Funnel
          </p>
          <div className="mt-5 space-y-3">
            {[
              { k: "Impressions", v: "4.2M", pct: 100 },
              { k: "Clicks", v: "68.4K", pct: 78 },
              { k: "Detail Page Views", v: "62.9K", pct: 62 },
              { k: "Add to Cart", v: "18.3K", pct: 34 },
              { k: "Orders", v: "9,140", pct: 22 },
            ].map((s) => (
              <div key={s.k}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/85">{s.k}</span>
                  <span className="font-mono text-muted-foreground">{s.v}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-hairline/60">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          {
            k: "Match Type Strategy",
            body: "SKAG per hero KW in Exact, Phrase for controlled expansion, Broad only for discovery with tight negatives. Auto reserved for research + defensive coverage.",
          },
          {
            k: "Negative Keyword Strategy",
            body: "Weekly SQR pull → automatic negation of any term > $X spend with 0 conversions. Portfolio-level negatives shared across all campaigns for the same SKU.",
          },
          {
            k: "Placement Adjustments",
            body: "TOS multipliers ramped from 0% to +140–180% only after CVR proof. PP muted during off-hours; ROS retained as fallback.",
          },
        ].map((c) => (
          <Card key={c.k}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">{c.k}</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">{c.body}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Campaign Performance Snapshot
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 pr-4">Campaign</th>
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 pr-4">Spend</th>
                  <th className="pb-3 pr-4">Sales</th>
                  <th className="pb-3 pr-4">ACoS</th>
                  <th className="pb-3">ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline/60">
                {study.campaigns.map((c) => (
                  <tr key={c.name} className="text-foreground/90">
                    <td className="py-3 pr-4 font-mono">{c.name}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{c.type}</td>
                    <td className="py-3 pr-4">{c.spend}</td>
                    <td className="py-3 pr-4">{c.sales}</td>
                    <td className="py-3 pr-4 text-primary">{c.acos}</td>
                    <td className="py-3 font-semibold">{c.roas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Scaling({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  return (
    <Section id="scaling" eyebrow="10" title="Scaling Strategy & CRO" icon={TrendingUp}>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Scaling Roadmap
          </p>
          <div className="mt-4 space-y-3">
            {[
              { s: "Prove", d: "Stabilize CVR & ACoS on core SKUs for 14 days." },
              { s: "Layer", d: "Introduce PAT and SBV once organic CVR ≥ 12%." },
              { s: "Scale", d: "Increase winning campaign budgets by 25% every 5 days." },
              { s: "Defend", d: "Brand defense + competitor conquest on 3 top ASINs." },
              { s: "Expand", d: "Open CA / UK with the same structure at 30% budget." },
            ].map((r, i) => (
              <div key={r.s} className="flex gap-3 rounded-xl border border-hairline bg-background/40 p-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <div>
                  <div className="text-sm font-semibold text-foreground">{r.s}</div>
                  <div className="text-sm text-muted-foreground">{r.d}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            A/B Testing Process (Manage Your Experiments)
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { k: "Main Image", v: "3 variants · winner +138% CTR" },
              { k: "Title", v: "2 variants · winner +11% CVR" },
              { k: "A+ Hero", v: "2 variants · winner +9% CVR" },
              { k: "Price bracket", v: "Ladder test · $34.99 → $37.99 optimal" },
            ].map((t) => (
              <li key={t.k} className="flex items-center justify-between border-b border-hairline/60 pb-2 last:border-0">
                <span className="text-foreground/85">{t.k}</span>
                <span className="font-mono text-primary">{t.v}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm text-foreground/90">
            <span className="font-semibold text-primary">Cadence:</span> a new test launched every
            Monday, results reviewed every second Friday.
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Timeline({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  return (
    <Section id="timeline" eyebrow="11" title="Weekly Optimization Timeline" icon={ListChecks}>
      <Card>
        <ol className="relative space-y-6 border-l border-hairline pl-6">
          {study.timeline.map((t, i) => (
            <motion.li
              key={t.week}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="relative"
            >
              <span className="absolute -left-[31px] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-primary/40 bg-background">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                {t.week}
              </div>
              <div className="mt-1 text-lg font-semibold text-foreground">{t.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{t.detail}</p>
            </motion.li>
          ))}
        </ol>
      </Card>
    </Section>
  );
}

function Performance({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  return (
    <Section id="performance" eyebrow="12" title="Performance Tracking" icon={BarChart3}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              Revenue Growth
            </p>
            <span className="text-xs text-muted-foreground">$K / week</span>
          </div>
          <div className="mt-4">
            <LineChart data={study.revenue as any} prefix="$" suffix="K" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              ROAS Trend
            </p>
            <span className="text-xs text-muted-foreground">multiplier</span>
          </div>
          <div className="mt-4">
            <LineChart data={study.roas as any} suffix="x" color="#FFB947" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              ACoS Improvement
            </p>
            <span className="text-xs text-muted-foreground">% — lower is better</span>
          </div>
          <div className="mt-4">
            <BarChart data={study.acos as any} suffix="%" />
          </div>
        </Card>
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            KPI Dashboard
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {study.kpis.map((k) => (
              <div key={k.label} className="rounded-xl border border-hairline bg-background/40 p-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {k.label}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <div className="font-display text-xl font-bold text-foreground">{k.after}</div>
                  <div className="text-[10px] text-muted-foreground line-through">{k.before}</div>
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-primary">
                  <ArrowUpRight className="h-3 w-3" />
                  {k.delta}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Results({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  return (
    <Section id="results" eyebrow="13" title="Final Results & Wins" icon={Award}>
      <div className="grid gap-6 md:grid-cols-3">
        {study.wins.map((w) => (
          <Card key={w.title}>
            <div className="flex items-center gap-2 text-primary">
              <Award className="h-5 w-5" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Win</span>
            </div>
            <div className="mt-3 font-display text-lg font-bold">{w.title}</div>
            <p className="mt-2 text-sm text-muted-foreground">{w.detail}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-4 w-4" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
            Final Performance Dashboard
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <MetricCounter label="Revenue" value={Number(study.revenue.at(-1)!.value)} prefix="$" suffix="K" />
          <MetricCounter label="ROAS" value={Number(study.roas.at(-1)!.value)} suffix="x" decimals={1} />
          <MetricCounter label="ACoS" value={Number(study.acos.at(-1)!.value)} suffix="%" />
          <MetricCounter label="Growth" value={470} suffix="%" />
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Challenges Faced</span>
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            {study.challenges.map((c) => (
              <li key={c.title}>
                <div className="font-semibold text-foreground">{c.title}</div>
                <div className="text-muted-foreground">{c.detail}</div>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="flex items-center gap-2 text-primary">
            <Wrench className="h-4 w-4" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Solutions Implemented</span>
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            {study.solutions.map((c) => (
              <li key={c.title}>
                <div className="font-semibold text-foreground">{c.title}</div>
                <div className="text-muted-foreground">{c.detail}</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}

function MetricCounter({
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  return (
    <div className="rounded-xl border border-primary/30 bg-background/40 p-4">
      <div className="text-[10px] uppercase tracking-wider text-primary">{label}</div>
      <div className="mt-2 font-display text-3xl font-extrabold text-foreground">
        <CountUp to={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>
    </div>
  );
}

function Lessons({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  return (
    <Section id="lessons" eyebrow="14" title="Lessons Learned & Key Takeaways" icon={Lightbulb}>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Lessons Learned
          </p>
          <ul className="mt-4 space-y-3">
            {study.lessons.map((l) => (
              <li key={l} className="flex items-start gap-3 text-sm text-foreground/85">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {l}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Key Takeaways
          </p>
          <ul className="mt-4 space-y-3">
            {study.takeaways.map((l) => (
              <li key={l} className="flex items-start gap-3 text-sm text-foreground/85">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {l}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}

function PullQuote({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-surface/40 to-background p-8 md:p-12">
        <Quote className="absolute right-6 top-6 h-16 w-16 text-primary/20" />
        <p className="max-w-3xl font-display text-2xl font-medium leading-snug md:text-3xl">
          &ldquo;{study.quote.text}&rdquo;
        </p>
        <div className="mt-6 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{study.quote.author}</span> ·{" "}
          {study.quote.role}
        </div>
      </div>
    </Reveal>
  );
}

function NextCase({ next }: { next: (typeof CASE_STUDIES)[number] }) {
  return (
    <Reveal>
      <Link
        to="/case-study/$id"
        params={{ id: next.id }}
        className="group flex items-center justify-between gap-4 rounded-2xl border border-hairline bg-surface/60 p-6 transition hover:border-primary/40 hover:bg-primary/5 md:p-8"
      >
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Next Case Study
          </p>
          <div className="mt-2 font-display text-2xl font-bold">{next.title}</div>
          <p className="mt-1 text-sm text-muted-foreground">{next.headline}</p>
        </div>
        <ArrowRight className="h-6 w-6 text-primary transition group-hover:translate-x-1" />
      </Link>
    </Reveal>
  );
}

function FloatingBack() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <motion.div
        initial={false}
        animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20, pointerEvents: show ? "auto" : "none" }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-40 flex flex-col gap-2"
      >
        <Link
          to="/"
          hash="case-study"
          className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/80 px-4 py-2.5 text-sm font-semibold text-foreground shadow-glow-sm backdrop-blur transition hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
          Case Studies
        </Link>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="grid h-10 w-10 place-items-center self-end rounded-full border border-hairline bg-background/80 text-foreground/80 backdrop-blur transition hover:border-primary/40 hover:text-primary"
          aria-label="Back to top"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
      </motion.div>
    </>
  );
}
