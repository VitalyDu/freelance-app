import { Root } from "@/app/Root";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./mockEnv.js";
import "@telegram-apps/telegram-ui/dist/styles.css";
import "./i18n";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(<Root />);
