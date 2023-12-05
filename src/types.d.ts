import { AGREE, AGREEMENT_LEVEL, DISAGREE, EDUCATION_LEVEL, ENUMS, FEMALE, HIGH_LEVEL, INSERT, LOW_LEVEL, MALE, MIDDLE_LEVEL, PERSONS, PUBLIC, ROW, TOTALLY_AGREE, TOTALLY_DISAGREE, TABLES, TERMS
} from "@/constants";

/**
 * Type for all types from database
 * @date 21/11/2023 - 0:50:26
 *
 * @typedef {Database}
 */
type Database = {
	public: {
		Tables: {
			Terms: {
				Row: {
					complexWord: string;
					definition: string;
					difficulty: number;
					example: string;
					id: number;
					textId: string;
					useCase: string;
				};
			};
			PersonAnswers: {
				Insert: {
					definitionAnswer: Database[PUBLIC][ENUMS][AGREEMENT_LEVEL];
					exampleAnswer: Database[PUBLIC][ENUMS][AGREEMENT_LEVEL];
					id?: number;
					personId: number;
					termId: number;
					useCaseAnswer: Database[PUBLIC][ENUMS][AGREEMENT_LEVEL];
				};
			};
			Persons: {
				Row: {
					age: number;
					answers: number;
					dni: string;
					educationLevel: Database[PUBLIC][ENUMS][EDUCATION_LEVEL];
					id: number;
					name: string;
				};
				Insert: {
					age: number;
					answers: number;
					dni: string;
					educationLevel: Database[PUBLIC][ENUMS][EDUCATION_LEVEL];
					id?: number;
					name: string;
				};
			};
		};
		Enums: {
			AgreementLevel: AGREE | DISAGREE | NEUTRAL | TOTALLY_AGREE | TOTALLY_DISAGREE;
			EducationLevel: HIGH_LEVEL | LOW_LEVEL | MIDDLE_LEVEL;
			Sex: FEMALE | MALE;
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
