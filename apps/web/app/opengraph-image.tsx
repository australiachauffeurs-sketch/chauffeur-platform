import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Elite Chauffeurs Adelaide — Luxury Airport Transfers & Corporate Car Hire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #09090B 0%, #1a1407 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 110,
            height: 110,
            borderRadius: 28,
            background: "#C9A84C",
            color: "#09090B",
            fontSize: 52,
            fontWeight: 800,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 36,
          }}
        >
          EC
        </div>
        <div style={{ display: "flex", color: "#FFFFFF", fontSize: 64, fontWeight: 800 }}>
          Elite Chauffeurs Adelaide
        </div>
        <div style={{ display: "flex", color: "#C9A84C", fontSize: 30, marginTop: 18 }}>
          Luxury Airport Transfers · Fixed Prices · No Surge
        </div>
        <div style={{ display: "flex", color: "#9CA3AF", fontSize: 22, marginTop: 28 }}>
          ★ 4.9 rating · 24/7 · All Adelaide suburbs
        </div>
      </div>
    ),
    { ...size }
  );
}
