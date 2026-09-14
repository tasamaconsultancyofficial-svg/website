import type { CSSProperties } from "react";

/**
 * Looping animated diagram: ledger data fanning out through parallel AI
 * agents, converging on the orchestrator, and landing as a report. Pure
 * SVG + CSS (see .flow-line / .flow-node / .flow-dot in globals.css) —
 * no image assets, so it stays crisp at any size and respects
 * prefers-reduced-motion.
 */

const AGENT_NODES: readonly [number, number][] = [
  [230, 55],
  [350, 40],
  [470, 55],
  [230, 165],
  [350, 180],
  [470, 165],
];

const SOURCE = { x: 56, y: 110, r: 28 };
const ORCHESTRATOR = { x: 590, y: 110, r: 30 };
const GOLD = "#b89254";

function inPath(x: number, y: number) {
  return `M84,110 C150,110 ${x - 70},${y} ${x},${y}`;
}
function outPath(x: number, y: number) {
  return `M${x},${y} C${x + 70},${y} 500,110 560,110`;
}

export function AutomationFlow({
  tone = "dark",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const line = tone === "light" ? "rgba(21,21,21,0.15)" : "rgba(255,255,255,0.14)";
  const stroke = tone === "light" ? "#151515" : "#ffffff";
  const fill = tone === "light" ? "#f4f1eb" : "rgba(255,255,255,0.06)";
  const label = tone === "light" ? "#6f7378" : "rgba(255,255,255,0.5)";

  return (
    <svg viewBox="0 0 760 220" className={className} role="img" aria-label="Ledger data flowing through parallel AI agents into a single CFO report">
      {AGENT_NODES.map(([x, y], i) => (
        <path
          key={`in-${i}`}
          d={inPath(x, y)}
          fill="none"
          stroke={line}
          strokeWidth={1.5}
          className="flow-line"
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
      {AGENT_NODES.map(([x, y], i) => (
        <path
          key={`out-${i}`}
          d={outPath(x, y)}
          fill="none"
          stroke={line}
          strokeWidth={1.5}
          className="flow-line"
          style={{ animationDelay: `${i * 0.12 + 0.3}s` }}
        />
      ))}
      <path d="M620,110 L672,110" fill="none" stroke={line} strokeWidth={1.5} className="flow-line" />

      {AGENT_NODES.map(([x, y], i) => (
        <circle
          key={`dot-in-${i}`}
          r={3}
          fill={GOLD}
          className="flow-dot"
          style={{ offsetPath: `path('${inPath(x, y)}')`, animationDelay: `${i * 0.3}s` } as CSSProperties}
        />
      ))}
      {AGENT_NODES.map(([x, y], i) => (
        <circle
          key={`dot-out-${i}`}
          r={3}
          fill={GOLD}
          className="flow-dot"
          style={{ offsetPath: `path('${outPath(x, y)}')`, animationDelay: `${i * 0.3 + 1.2}s` } as CSSProperties}
        />
      ))}
      <circle
        r={3}
        fill={GOLD}
        className="flow-dot"
        style={{ offsetPath: "path('M620,110 L672,110')", animationDelay: "2.6s" } as CSSProperties}
      />

      {/* Source: ledger */}
      <circle cx={SOURCE.x} cy={SOURCE.y} r={SOURCE.r} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <path d="M45,100h22M45,110h22M45,120h14" stroke={stroke} strokeWidth={1.6} strokeLinecap="round" />
      <text x={SOURCE.x} y={SOURCE.y + 44} textAnchor="middle" fontSize={9} letterSpacing="0.14em" fill={label}>
        LEDGER
      </text>

      {/* Parallel agents */}
      {AGENT_NODES.map(([x, y], i) => (
        <g key={`node-${i}`} className="flow-node" style={{ animationDelay: `${i * 0.18}s` }}>
          <circle cx={x} cy={y} r={15} fill={fill} stroke={GOLD} strokeWidth={1.4} />
        </g>
      ))}

      {/* Orchestrator */}
      <circle cx={ORCHESTRATOR.x} cy={ORCHESTRATOR.y} r={ORCHESTRATOR.r} fill={fill} stroke={GOLD} strokeWidth={1.8} />
      <circle cx={ORCHESTRATOR.x} cy={ORCHESTRATOR.y} r={7} fill={GOLD} />
      <text x={ORCHESTRATOR.x} y={ORCHESTRATOR.y + 46} textAnchor="middle" fontSize={9} letterSpacing="0.14em" fill={label}>
        ORCHESTRATOR
      </text>

      {/* Output: report */}
      <rect x={688} y={90} width={34} height={40} rx={3} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <path d="M696,102h18M696,110h18M696,118h12" stroke={stroke} strokeWidth={1.4} strokeLinecap="round" />
      <text x={705} y={146} textAnchor="middle" fontSize={9} letterSpacing="0.14em" fill={label}>
        REPORT
      </text>
    </svg>
  );
}
