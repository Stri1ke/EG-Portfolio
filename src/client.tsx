import { hydrateRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("Missing page root");
hydrateRoot(
  container,
  <App
    slug={container.dataset.slug || ""}
    root={container.dataset.root || "./"}
  />,
);
