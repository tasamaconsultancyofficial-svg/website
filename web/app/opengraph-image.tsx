import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${SITE.name} — GCC Tax, Finance & Strategy Advisory`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "linear-gradient(135deg, #050505 0%, #151515 60%, #0b0b0b 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            color: "#dfc79a",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          {SITE.shortName}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 62,
            fontWeight: 700,
            marginTop: 28,
            lineHeight: 1.15,
            maxWidth: 920,
            color: "#ffffff",
          }}
        >
          GCC advisory for businesses built to scale.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 36,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          Tax &middot; Finance &middot; Strategy &middot; Compliance
        </div>
      </div>
    ),
    { ...size },
  );
}
