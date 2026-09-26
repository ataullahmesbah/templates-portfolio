import { ImageResponse } from "next/og";
import { getProfile, getSettings } from "@/lib/data";
import { safeHex } from "@/lib/utils";

export const alt = "Portfolio preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const [s, p] = await Promise.all([getSettings(), getProfile()]);
  const accent = safeHex(s.accent_color);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(145deg, #1e2024, #23272b)",
          color: "#c4cfde",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: -160, right: -120, width: 520, height: 520, borderRadius: 9999, background: accent, opacity: 0.25, display: "flex" }} />
        <div style={{ fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: accent, display: "flex" }}>Portfolio</div>
        <div style={{ fontSize: 88, fontWeight: 800, color: "#ffffff", marginTop: 20, display: "flex" }}>{p.full_name}</div>
        <div style={{ fontSize: 40, marginTop: 16, display: "flex" }}>{p.professional_title}</div>
        <div style={{ fontSize: 26, marginTop: 40, color: "#878e99", display: "flex" }}>{p.location}</div>
      </div>
    ),
    size
  );
}
