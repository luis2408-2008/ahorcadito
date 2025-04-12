import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Additional styles for our game
import "./utils/gameUtils.ts";

createRoot(document.getElementById("root")!).render(<App />);
