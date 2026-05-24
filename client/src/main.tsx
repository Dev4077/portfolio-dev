import { createRoot } from "react-dom/client";
import { setAuthTokenGetter } from "@workspace/api-client-react";
import App from "./App";
import { getToken } from "./lib/auth";
import "./index.css";

setAuthTokenGetter(() => getToken());

document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(<App />);
