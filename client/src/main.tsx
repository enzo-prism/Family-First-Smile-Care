import { createRoot } from "react-dom/client";
import App from "./App";
import { initGA, initHotjar } from "./lib/analytics";
import "./index.css";

initGA();
initHotjar();

createRoot(document.getElementById("root")!).render(<App />);
