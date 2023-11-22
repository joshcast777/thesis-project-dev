/* TYPES */
import { Term } from "@/types";

/**
 * Name of the table Term
 * @date 21/11/2023 - 2:55:43
 *
 * @type {string}
 */
const TERMS: string = "Terms";

/**
 * Name of the complex word field
 * @date 21/11/2023 - 2:55:43
 *
 * @type {string}
 */
const FIELD_COMPLEX_WORD: string = "complexWord";
/**
 * Name of the definition field
 * @date 21/11/2023 - 2:55:43
 *
 * @type {string}
 */
const FIELD_DEFINITION: string = "definition";
/**
 * Name of the difficulty field
 * @date 21/11/2023 - 2:55:43
 *
 * @type {string}
 */
const FIELD_DIFFICULTY: string = "difficulty";
/**
 * Name of the example field
 * @date 21/11/2023 - 2:55:43
 *
 * @type {string}
 */
const FIELD_EXAMPLE: string = "example";
/**
 * Name of the text ID field
 * @date 21/11/2023 - 2:55:42
 *
 * @type {string}
 */
const FIELD_TEXT_ID: string = "textId";
/**
 * Name of the use case field
 * @date 21/11/2023 - 2:55:42
 *
 * @type {string}
 */
const FIELD_USE_CASE: string = "useCase";

/**
 * Default values for a Term object
 * @date 21/11/2023 - 2:55:42
 *
 * @type {Term}
 */
const TERM_DEFAULT: Term = {
	complexWord: "",
	definition: "",
	difficulty: "",
	example: "",
	id: "",
	textId: "",
	useCase: ""
} as const;

export { FIELD_COMPLEX_WORD, FIELD_DEFINITION, FIELD_DIFFICULTY, FIELD_EXAMPLE, FIELD_TEXT_ID, FIELD_USE_CASE, TERMS, TERM_DEFAULT };
