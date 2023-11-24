/* TYPES */
import { Person } from "@/types";

/**
 * Name of the table Person
 * @date 21/11/2023 - 3:00:19
 *
 * @type {string}
 */
const PERSONS: string = "Persons";

/**
 * Name of the age field
 * @date 21/11/2023 - 3:00:19
 *
 * @type {string}
 */
const FIELD_AGE: string = "age";
/**
 * Name of the answers field
 * @date 21/11/2023 - 3:00:19
 *
 * @type {string}
 */
const FIELD_ANSWERS: string = "answers";
/**
 * Name of the DNI field
 * @date 21/11/2023 - 3:00:18
 *
 * @type {string}
 */
const FIELD_DNI: string = "dni";
/**
 * Name of the education level field
 * @date 21/11/2023 - 3:00:18
 *
 * @type {string}
 */
const FIELD_EDUCATION_LEVEL: string = "educationLevel";
/**
 * Name of the name field
 * @date 21/11/2023 - 3:00:18
 *
 * @type {string}
 */
const FIELD_NAME: string = "name";
/**
 * Name of the sex field
 * @date 21/11/2023 - 3:00:18
 *
 * @type {string}
 */
const FIELD_SEX: string = "sex";

/**
 * Default values for a Person object
 * @date 21/11/2023 - 3:00:18
 *
 * @type {Person}
 */
const PERSON_DEFAULT: Person = {
	age: "",
	answers: "",
	dni: "",
	id: "",
	name: ""
	// sex: "",
	// educationLevel: ""
} as const;

export { FIELD_AGE, FIELD_ANSWERS, FIELD_DNI, FIELD_EDUCATION_LEVEL, FIELD_NAME, FIELD_SEX, PERSONS, PERSON_DEFAULT };
