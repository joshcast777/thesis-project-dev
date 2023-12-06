/* COSNTANST */
import { PERSON_DEFAULT } from "./constants";

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

	const currentTermIndex = useTermStore(state => state.currentTermIndex);

	if (JSON.stringify(person) === JSON.stringify(PERSON_DEFAULT)) {
		return <PersonalInformation />;
	}

	console.log(currentTermIndex);
	if (currentTermIndex === -1) {
		return <Finish />;
	}

	return <TermQuestions />;
}
