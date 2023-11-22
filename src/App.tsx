/* ROUTES */
import AppRoutes from "./routes/AppRoutes";

/* STORES */
import { usePersonStore } from "@/store";

/* ANIMATE CSS */
import "animate.css";

/* GLOBAL STYLES */
import "./styles.css";
import { useEffect } from "react";

/**
 * Init of the application
 * @date 21/11/2023 - 1:34:31
 *
 * @export
 * @returns {JSX.Element}
 */
export default function App(): JSX.Element {
	const getPerson = usePersonStore(state => state.getPerson);

	useEffect(() => {
		async function executeFunctions() {
			const dni = localStorage.getItem("dni");

			if (dni === undefined) {
				await getPerson(dni!);
			}
		}

		executeFunctions();
	}, []);

	return <AppRoutes />;
}
