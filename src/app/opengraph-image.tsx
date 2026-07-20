import { ImageResponse } from "next/og";

export const alt = "ЧПУ-фрезеровка дерева и пластика в Ярославле";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#f4f1ec",
        color: "#24231f",
        display: "flex",
        height: "100%",
        padding: "64px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 26, fontWeight: 700 }}>
          CNC · Ярославль
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#825129", display: "flex", fontSize: 20, letterSpacing: 4, textTransform: "uppercase" }}>
            Дерево · МДФ · Фанера · Пластик
          </div>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.05, marginTop: 24, maxWidth: 760 }}>
            ЧПУ-фрезеровка по вашим размерам
          </div>
        </div>
      </div>
      <div style={{ alignItems: "center", background: "#24231f", borderRadius: 42, display: "flex", justifyContent: "center", marginLeft: 54, width: 330 }}>
        <div style={{ alignItems: "center", border: "3px solid #c79862", borderRadius: 28, color: "#dfba8f", display: "flex", fontSize: 58, height: 210, justifyContent: "center", width: 210 }}>
          CNC
        </div>
      </div>
    </div>,
    size,
  );
}
