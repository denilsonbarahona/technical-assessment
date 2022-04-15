import React from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/app";

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
