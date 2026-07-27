import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Point = { month: string; value: number };

export function LineChart({
  data,
  height = 220,
  suffix = "",
  prefix = "",
  color = "#FCA311",
  fill = true,
}: {
  data: Point[];
  height?: number;
  suffix?: string;
  prefix?: string;
  color?: string;
  fill?: boolean;
}) {
  const w = 600;
  const h = height;
  const pad = { l: 40, r: 16, t: 16, b: 28 };
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = (w - pad.l - pad.r) / (data.length - 1);
  const points = data.map((d, i) => {
    const x = pad.l + i * stepX;
    const y = pad.t + (1 - (d.value - min) / range) * (h - pad.t - pad.b);
    return { x, y, ...d };
  });
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const area =
    `M ${points[0].x} ${h - pad.b} ` +
    points.map((p) => `L ${p.x} ${p.y}`).join(" ") +
    ` L ${points[points.length - 1].x} ${h - pad.b} Z`;
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${w} ${h}`}
      className="w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
        <line
          key={i}
          x1={pad.l}
          x2={w - pad.r}
          y1={pad.t + t * (h - pad.t - pad.b)}
          y2={pad.t + t * (h - pad.t - pad.b)}
          stroke="#263A66"
          strokeWidth={1}
          strokeDasharray="3 4"
          opacity={0.5}
        />
      ))}
      {[0, 0.5, 1].map((t, i) => {
        const v = max - t * range;
        return (
          <text
            key={i}
            x={pad.l - 6}
            y={pad.t + t * (h - pad.t - pad.b) + 4}
            textAnchor="end"
            fontSize="10"
            fill="#E5E5E5"
            opacity={0.6}
          >
            {prefix}
            {Math.round(v)}
            {suffix}
          </text>
        );
      })}
      {points.map((p, i) =>
        i % Math.ceil(points.length / 6) === 0 || i === points.length - 1 ? (
          <text
            key={i}
            x={p.x}
            y={h - 8}
            textAnchor="middle"
            fontSize="10"
            fill="#E5E5E5"
            opacity={0.55}
          >
            {p.month}
          </text>
        ) : null,
      )}
      {fill && (
        <motion.path
          d={area}
          fill={`url(#grad-${color})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      )}
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView ? 1 : 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={3}
          fill={color}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.6 + i * 0.04 }}
        />
      ))}
    </svg>
  );
}

export function BarChart({
  data,
  height = 220,
  color = "#FCA311",
  suffix = "",
}: {
  data: Point[];
  height?: number;
  color?: string;
  suffix?: string;
}) {
  const w = 600;
  const h = height;
  const pad = { l: 40, r: 16, t: 16, b: 28 };
  const max = Math.max(...data.map((d) => d.value));
  const bw = ((w - pad.l - pad.r) / data.length) * 0.62;
  const step = (w - pad.l - pad.r) / data.length;
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <svg ref={ref} viewBox={`0 0 ${w} ${h}`} className="w-full">
      {[0, 0.5, 1].map((t, i) => (
        <line
          key={i}
          x1={pad.l}
          x2={w - pad.r}
          y1={pad.t + t * (h - pad.t - pad.b)}
          y2={pad.t + t * (h - pad.t - pad.b)}
          stroke="#263A66"
          strokeDasharray="3 4"
          opacity={0.5}
        />
      ))}
      {[0, 0.5, 1].map((t, i) => (
        <text
          key={i}
          x={pad.l - 6}
          y={pad.t + t * (h - pad.t - pad.b) + 4}
          textAnchor="end"
          fontSize="10"
          fill="#E5E5E5"
          opacity={0.6}
        >
          {Math.round(max - t * max)}
          {suffix}
        </text>
      ))}
      {data.map((d, i) => {
        const x = pad.l + i * step + (step - bw) / 2;
        const barH = (d.value / max) * (h - pad.t - pad.b);
        const y = h - pad.b - barH;
        return (
          <g key={d.month}>
            <motion.rect
              x={x}
              y={h - pad.b}
              width={bw}
              height={0}
              rx={3}
              fill={color}
              animate={inView ? { y, height: barH } : {}}
              transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            />
            <text
              x={x + bw / 2}
              y={h - 8}
              fontSize="10"
              fill="#E5E5E5"
              opacity={0.55}
              textAnchor="middle"
            >
              {d.month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function DonutChart({
  data,
  size = 200,
}: {
  data: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = size / 2 - 12;
  const cx = size / 2;
  const cy = size / 2;
  const stroke = 22;
  let acc = 0;
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const circumference = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-10">
      <svg ref={ref} width={size} height={size} className="shrink-0 -rotate-90">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="#263A66"
          strokeWidth={stroke}
          fill="none"
          opacity={0.35}
        />
        {data.map((d, i) => {
          const frac = d.value / total;
          const dash = frac * circumference;
          const offset = -acc * circumference;
          acc += frac;
          return (
            <motion.circle
              key={d.label}
              cx={cx}
              cy={cy}
              r={r}
              stroke={d.color}
              strokeWidth={stroke}
              fill="none"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={0}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
              transform={`rotate(${-acc * 360 + frac * 360} ${cx} ${cy})`}
            />
          );
        })}
      </svg>
      <ul className="w-full space-y-2 text-sm">
        {data.map((d) => (
          <li key={d.label} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ background: d.color }}
              />
              <span className="text-foreground/85">{d.label}</span>
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {d.value}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
