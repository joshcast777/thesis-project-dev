import { AGREE, AGREEMENT_LEVEL, DISAGREE, EDUCATION_LEVEL, ENUMS, FEMALE, FIELD_AGE, FIELD_ANSWERS, FIELD_COMPLEX_WORD, FIELD_DEFINITION, FIELD_DEFINITION_ANSWER, FIELD_DIFFICULTY, FIELD_DNI, FIELD_EDUCATION_LEVEL, FIELD_EXAMPLE, FIELD_EXAMPLE_ANSWER, FIELD_ID, FIELD_NAME, FIELD_SEX, FIELD_TEXT_ID, FIELD_USE_CASE, FIELD_USE_CASE_ANSWER, HIGH_LEVEL, INSERT, LOW_LEVEL, MALE, MIDDLE_LEVEL, PERSONS, PERSON_ANSWERS, PUBLIC, ROW, SEX, TOTALLY_AGREE, TOTALLY_DISAGREE, TABLES, TERMS } from "@/constants";

/**
 * Type for all types from database
 * @date 21/11/2023 - 0:50:26
 *
 * @typedef {Database}
 */
type Database = {
	[PUBLIC]: {
		[TABLES]: {
			[TERMS]: {
				[ROW]: {
					[FIELD_COMPLEX_WORD]: string;
					[FIELD_DEFINITION]: string;
					[FIELD_DIFFICULTY]: number;
					[FIELD_EXAMPLE]: string;
					[FIELD_ID]: number;
					[FIELD_TEXT_ID]: string;
					[FIELD_USE_CASE]: string;
				};
			};
			[PERSON_ANSWERS]: {
				[INSERT]: {
					[FIELD_DEFINITION_ANSWER]: Database[PUBLIC][ENUMS][AGREEMENT_LEVEL];
					[FIELD_EXAMPLE_ANSWER]: Database[PUBLIC][ENUMS][AGREEMENT_LEVEL];
					[FIELD_ID]?: number;
					personId: number;
					termId: number;
					[FIELD_USE_CASE_ANSWER]: Database[PUBLIC][ENUMS][AGREEMENT_LEVEL];
				};
			};
			[PERSONS]: {
				[ROW]: {
					[FIELD_AGE]: number;
					[FIELD_ANSWERS]: number;
					[FIELD_DNI]: string;
					[FIELD_SEX]: Database[PUBLIC][ENUMS][SEX];
					[FIELD_EDUCATION_LEVEL]: Database[PUBLIC][ENUMS][EDUCATION_LEVEL];
					[FIELD_ID]: number;
					[FIELD_NAME]: string;
				};
				[INSERT]: {
					[FIELD_AGE]: number;
					[FIELD_ANSWERS]: number;
					[FIELD_DNI]: string;
					[FIELD_SEX]: Database[PUBLIC][ENUMS][SEX];
					[FIELD_EDUCATION_LEVEL]: Database[PUBLIC][ENUMS][EDUCATION_LEVEL];
					[FIELD_ID]?: number;
					[FIELD_NAME]: string;
				};
			};
		};
		[ENUMS]: {
			[AGREEMENT_LEVEL]: AGREE | DISAGREE | NEUTRAL | TOTALLY_AGREE | TOTALLY_DISAGREE;
			[EDUCATION_LEVEL]: HIGH_LEVEL | LOW_LEVEL | MIDDLE_LEVEL;
			[SEX]: FEMALE | MALE;
		};
	};
};

/**
 * Types for all tables from database
 * @date 21/11/2023 - 0:50:26
 *
 * @typedef {DatabaseTables}
 */
type DatabaseTables = Database[PUBLIC][TABLES];
/**
 * Types for all enumarations from database
 * @date 21/11/2023 - 0:50:26
 *
 * @typedef {DatabaseEnums}
 */
type DatabaseEnums = Database[ENUMS];

/* -------------------- ENUMS -------------------- */
/**
 * Agreement Level type
 * @date 21/11/2023 - 0:50:25
 *
 * @export
 * @typedef {AgreementLevel}
 */
type AgreementLevel = DatabaseEnums[AGREEMENT_LEVEL];
/**
 * Education Level type
 * @date 21/11/2023 - 0:50:25
 *
 * @export
 * @typedef {EducationLevel}
 */
type EducationLevel = DatabaseEnums[EDUCATION_LEVEL];

/* -------------------- PERSON -------------------- */
/**
 * Type for the person object from database
 * @date 21/11/2023 - 0:50:24
 *
 * @typedef {DatabasePersonTable}
 */
type DatabasePersonTable = DatabaseTables[PERSONS];

/**
 * Person type
 * @date 21/11/2023 - 0:50:24
 *
 * @export
 * @typedef {Person}
 */
type Person = DatabasePersonTable[ROW];

/**
 * Person type for insertions
 * @date 21/11/2023 - 0:50:24
 *
 * @export
 * @typedef {PersonInsert}
 */
type PersonInsert = DatabasePersonTable[INSERT];

/**
 * Person type for the store
 * @date 21/11/2023 - 0:50:24
 *
 * @export
 * @typedef {PersonStore}
 */
type PersonStore = {
	errorMessage: string;
	isLoading: boolean;
	person: Person;
	addPerson: (person: PersonInsert) => Promise<void>;
	addPersonAnswer: (personAnswer: PersonAnswer) => Promise<void>;
	getPerson: (dni: string) => Promise<void>;
	updatePerson: (person: Person) => Promise<void>;
};

/* -------------------- PERSON ANSWER -------------------- */
/**
 * Type for the person answer object from database
 * @date 21/11/2023 - 0:50:24
 *
 * @typedef {DatabasePersonAnswerTable}
 */
type DatabasePersonAnswerTable = DatabaseTables[PERSON_ANSWER];

/**
 * PersonAnswer type for insertions
 * @date 21/11/2023 - 0:50:24
 *
 * @export
 * @typedef {PersonAnswerInsert}
 */
type PersonAnswerInsert = DatabasePersonAnswerTable[INSERT];

/* -------------------- TERM -------------------- */
/**
 * Type for the term object from database
 * @date 21/11/2023 - 0:50:25
 *
 * @typedef {DatabaseTermTable}
 */
type DatabaseTermTable = DatabaseTables[TERMS];

/**
 * Term type
 * @date 21/11/2023 - 0:50:25
 *
 * @export
 * @typedef {Term}
 */
type Term = DatabaseTermTable[Row];

/**
 * Term type for the store
 * @date 21/11/2023 - 0:50:24
 *
 * @export
 * @typedef {TermStore}
 */
type TermStore = {
	currentTerm: Term;
	currentTermIndex: number;
	errorMessage: string;
	isLoading: boolean;
	getTerm: () => Promise<void>;
	setCurrentTermIndex: (currentTermIndex: number) => void;
};

export { AgreementLevel, Database, EducationLevel, Person, PersonAnswerInsert, PersonInsert, PersonStore, Term, TermStore, TranslatorObject };
