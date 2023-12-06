/* REACT */
// import React from "react";
import ReactDOM from "react-dom/client";

/* INIT APP */
import App from "./App.tsx";

/* COMPONENTS */
import { Toaster } from "@/components/ui";

// <React.StrictMode>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<>
		<App />

		<Toaster />
	</>
);
// </React.StrictMode>
