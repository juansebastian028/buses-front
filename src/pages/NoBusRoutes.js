import React from "react";
import { StarFilled } from "@ant-design/icons";
export const NoBusRoutes = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <StarFilled style={{ fontSize: "500%" }} />
      <h2>Sin Rutas Favoritas</h2>
    </div>
  );
};
