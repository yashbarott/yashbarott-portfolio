import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#ffffff",
          fontFamily: "Inter, sans-serif",
          fontSize: 64,
          fontWeight: 700,
          padding: "64px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 960 }}>
          <div style={{ fontSize: 48, marginBottom: 20, letterSpacing: "-1px" }}>
            Yash Barot
          </div>
          <div style={{ fontSize: 38, lineHeight: 1.2, color: "#f97316" }}>
            WordPress & Shopify Expert
          </div>
          <div style={{ marginTop: 32, fontSize: 24, color: "#cccccc" }}>
            Fast, modern websites built to sell and scale.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
