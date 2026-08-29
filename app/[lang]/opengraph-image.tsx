import { ImageResponse } from "next/og";

export const alt = "Youth GEO Japan — Geography and GIS youth community in Japan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#F7F3ED",
          color: "#3e3a39",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#DDF1DF",
            borderRadius: "999px",
            height: "430px",
            position: "absolute",
            right: "-80px",
            top: "-120px",
            width: "430px",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div style={{ color: "#6A5748", display: "flex", fontSize: 28, fontWeight: 600 }}>
            GEOGRAPHY · GIS · GEOSPATIAL LEARNING
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              letterSpacing: "-3px",
              marginTop: "28px",
            }}
          >
            Youth GEO Japan
          </div>
          <div style={{ display: "flex", fontSize: 34, lineHeight: 1.4, marginTop: "24px" }}>
            地理とGISを学び、つながり、未来をつくる若者コミュニティ
          </div>
        </div>
      </div>
    ),
    size,
  );
}
