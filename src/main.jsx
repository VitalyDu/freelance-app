import { Root } from "@/components/Root";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./mockEnv.js";
import "@telegram-apps/telegram-ui/dist/styles.css";
import "./i18n";

createRoot(document.getElementById("root")).render(<Root />);