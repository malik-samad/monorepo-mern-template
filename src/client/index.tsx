import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Accept HMR for the module
if (module.hot) {
  module.hot.accept("./App", () => {
    console.info("🔁  React HMR Reloading `./app`...");
    try {
      const App = require("./App").default;
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    } catch (error) {
      console.error(error);
    }
  });
  console.info("✅  React HMR Enabled!");
}
