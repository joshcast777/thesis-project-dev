/* REACT */
import { useEffect } from "react";

/* COSNTANST */
import { FIELD_DNI, PERSON_DEFAULT } from "./constants";

/* STORES */
import { usePersonStore, useTermStore } from "@/store";

/* COMPONENTS */
import Finish from "./Finish";
import PersonalInformation from "./PersonalInformation";
import TermQuestions from "./TermQuestions";

/* ANIMATE CSS */
import "animate.css";

/* GLOBAL STYLES */
import "./styles.css";

/**
 * Init of the application
 * @date 21/11/2023 - 1:34:31
 *
 * @export
 * @returns {JSX.Element}
 */
export default function App(): JSX.Element {
	const person = usePersonStore(state => state.person);
	const getPerson = usePersonStore(state => state.getPerson);

	const currentTermIndex = useTermStore(state => state.currentTermIndex);

	useEffect(() => {
		async function executeFunctions() {
			const dni = localStorage.getItem(FIELD_DNI);
			console.log(dni);
		}

		executeFunctions();
	}, [getPerson]);

	if (JSON.stringify(person) === JSON.stringify(PERSON_DEFAULT) && localStorage.getItem(FIELD_DNI) === null) {
		return <PersonalInformation />;
	}

	if (currentTermIndex === -1) {
		return <Finish />;
	}

	return <TermQuestions />;
}
