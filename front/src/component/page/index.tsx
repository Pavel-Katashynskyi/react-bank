import React, { ReactNode, CSSProperties } from "react";
import "./index.css";

interface PageProps {
  children: ReactNode;
  style?: CSSProperties;
}

export default function Page({ children, style }: PageProps) {
  return (
    <div className="page" style={style}>
      {children}
      <div className="home-indicator"></div>
    </div>
  );
}
