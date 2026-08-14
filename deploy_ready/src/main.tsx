import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import Index from "./routes/index";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
);
