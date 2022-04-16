import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./routes/app";
import store from "./redux-config/store";

const root = createRoot(document.querySelector("#root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
