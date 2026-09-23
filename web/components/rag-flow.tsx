import type { CSSProperties } from "react";

/**
 * Looping animated diagram of the RAG (retrieval-augmented generation)
 * pipeline: documents are chunked and embedded, a question retrieves only
 * matching passages scoped to that tenant, and the model drafts an answer
 * strictly from that retrieved text. Reuses the .flow-line / .flow-node /
 * .flow-dot keyframes from the automation-flow diagram.
 */

const GOLD = "#b89254";

const STAGES = [
  { x: 70, label: "Your documents" },
  { x: 280, label: "Chunk & embed" },
  { x: 490, label: "Scoped retrieval" },
  { x: 700, label: "Grounded answer" },
] as const;

function segment(x1: number, x2: number) {
  return `M${x1 + 30},100 L${x2 - 30},100`;
}

export function RagFlow({
  tone = "dark",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const line = tone === "light" ? "rgba(21,21,21,0.15)" : "rgba(255,255,255,0.16)";
  const stroke = tone === "light" ? "#151515" : "#ffffff";
  const fill = tone === "light" ? "#f4f1eb" : "rgba(255,255,255,0.06)";
  const label = tone === "light" ? "#6f7378" : "rgba(255,255,255,0.55)";

  return (
    <svg
      viewBox="0 0 760 160"
      className={className}
      role="img"
      aria-label="A document is chunked, embedded, retrieved for a specific client, and used to draft a grounded, cited answer"
    >
      {STAGES.slice(0, -1).map((s, i) => (
        <path
          key={`line-${i}`}
          d={segment(s.x, STAGES[i + 1].x)}
          fill="none"
          stroke={line}
          strokeWidth={1.5}
          className="flow-line"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}

      {STAGES.slice(0, -1).map((s, i) => (
        <circle
          key={`dot-${i}`}
          r={3}
          fill={GOLD}
          className="flow-dot"
          style={
            {
              offsetPath: `path('${segment(s.x, STAGES[i + 1].x)}')`,
              animationDelay: `${i * 0.55}s`,
            } as CSSProperties
          }
        />
      ))}

      {STAGES.map((s, i) => (
        <g key={s.label} className="flow-node" style={{ animationDelay: `${i * 0.18}s` }}>
          <circle
            cx={s.x}
            cy={100}
            r={30}
            fill={fill}
            stroke={i === STAGES.length - 1 ? GOLD : stroke}
            strokeWidth={i === STAGES.length - 1 ? 1.8 : 1.4}
          />
          {i === STAGES.length - 1 && <circle cx={s.x} cy={100} r={7} fill={GOLD} />}
        </g>
      ))}

      {STAGES.map((s, i) => {
        const anchor = i === 0 ? "start" : i === STAGES.length - 1 ? "end" : "middle";
        const x = i === 0 ? s.x - 30 : i === STAGES.length - 1 ? s.x + 30 : s.x;
        return (
          <text
            key={`label-${s.label}`}
            x={x}
            y={148}
            textAnchor={anchor}
            fontSize={10.5}
            letterSpacing="0.06em"
            fill={label}
          >
            {String(i + 1).padStart(2, "0")} — {s.label}
          </text>
        );
      })}
    </svg>
  );
}
