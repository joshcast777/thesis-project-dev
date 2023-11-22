/* REACT ROUTER */
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";

/* CONSTANTS */
import { ROOT_ROUTE, PERSON_DEFAULT, TERM_ROUTE } from "@/constants";

/* PAGES */
import PersonalInformation from "@/PersonalInformation";
import TermQuestions from "@/TermQuestions";

/* ROUTES VERIFIER */
import { PublicRoutes, PrivateRoutes } from "./AccessRoutes";

/* STORES */
import { usePersonStore } from "@/store";

/**
 * Routes manager of the application
 * @date 21/11/2023 - 2:54:00
 *
 * @export
 * @returns {JSX.Element}
 */
export default function AppRoutes(): JSX.Element {
	const person = usePersonStore(state => state.person);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={ROOT_ROUTE}
					element={
						<PublicRoutes isAuthenticated={JSON.stringify(person) === JSON.stringify(PERSON_DEFAULT)} redirectTo={TERM_ROUTE}>
							<PersonalInformation />
						</PublicRoutes>
					}
				/>

				<Route
					path={TERM_ROUTE}
					element={
						<PrivateRoutes isAuthenticated={JSON.stringify(person) === JSON.stringify(PERSON_DEFAULT)} redirectTo={ROOT_ROUTE}>
							<TermQuestions />
						</PrivateRoutes>
					}
				/>

				<Route path="/*" element={<Navigate to={ROOT_ROUTE} />} />
			</Routes>
		</BrowserRouter>
	);
}
