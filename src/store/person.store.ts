/* ZUSTAND */
import { create } from "zustand";
import { devtools } from "zustand/middleware";

/* SERVICES */
import { addPerson, addPersonAnswer, getPerson, updatePerson } from "@/services";

/* TYPES */
import { PersonStore, PersonInsert, Person, PersonAnswerInsert } from "@/types";

/* SUPABASE */
import { PostgrestSingleResponse } from "@supabase/supabase-js";

/* CONSTANTS */
import { PERSON_DEFAULT, ADD_PERSON, ADD_PERSON_ANSWER, GET_PERSON, UPDATE_PERSON, FIELD_DNI, FIELD_ANSWERS } from "@/constants";

/**
 * Store for person
 * @date 21/11/2023 - 1:39:24
 *
 * @type {*}
*/
export const usePersonStore = create<PersonStore>()(
	devtools((set, get) => ({
		errorMessage: "",
		isLoading: false,
		person: PERSON_DEFAULT,
		addPerson: async (personInsert: PersonInsert): Promise<void> => {
			set(
				(state: PersonStore): PersonStore => ({
					...state,
					isLoading: true
				}),
				false,
				ADD_PERSON
			);

			const { data: persons, error }: PostgrestSingleResponse<Person> = await addPerson(personInsert);

			if (error !== null) {
				set(
					(state: PersonStore): PersonStore => ({
						...state,
						errorMessage: error.message,
						isLoading: false
					}),
					false,
					ADD_PERSON
				);

				setTimeout((): void => {
					set(
						(state: PersonStore): PersonStore => ({
							...state,
							errorMessage: ""
						}),
						false,
						ADD_PERSON
					);
				}, 3000);

				return;
			}

			set(
				(state: PersonStore): PersonStore => ({
					...state,
					isLoading: false,
					person: persons[0]
				}),
				false,
				ADD_PERSON
			);

			localStorage.setItem(FIELD_DNI, persons[0].dni);
			localStorage.setItem(FIELD_ANSWERS, persons[0].answers);
		},
		addPersonAnswer: async (personAnswer: PersonAnswerInsert): Promise<void> => {
			set(
				(state: PersonStore): PersonStore => ({
					...state,
					isLoading: true
				}),
				false,
				ADD_PERSON_ANSWER
			);

			const { person } = get();

			const { error }: PostgrestSingleResponse<null> = await addPersonAnswer(personAnswer);

			if (error !== null) {
				set(
					(state: PersonStore): PersonStore => ({
						...state,
						errorMessage: error.message,
						isLoading: false
					}),
					false,
					ADD_PERSON_ANSWER
				);

				setTimeout(() => {
					set(
						(state: PersonStore): PersonStore => ({
							...state,
							errorMessage: ""
						}),
						false,
						ADD_PERSON_ANSWER
					);
				}, 3000);

				return;
			}

			set(
				(state: PersonStore): PersonStore => ({
					...state,
					isLoading: false
				}),
				false,
				ADD_PERSON_ANSWER
			);

			localStorage.setItem(FIELD_ANSWERS, person.answers + 1);
		},
		getPerson: async (dni: string): Promise<void> => {
			set(
				(state: PersonStore): PersonStore => ({
					...state,
					isLoading: true
				}),
				false,
				GET_PERSON
			);

			const { data: persons, error }: PostgrestSingleResponse<Person> = await getPerson(dni);

			if (error !== null || persons.length === 0) {
				set(
					(state: PersonStore): PersonStore => ({
						...state,
						errorMessage: error ? error.message : "No se encontraron datos",
						isLoading: false
					}),
					false,
					GET_PERSON
				);

				setTimeout(() => {
					set(
						(state: PersonStore): PersonStore => ({
							...state,
							errorMessage: ""
						}),
						false,
						GET_PERSON
					);
				}, 3000);

				return;
			}

			set(
				(state: PersonStore): PersonStore => ({
					...state,
					isLoading: false,
					person: persons[0]
				}),
				false,
				GET_PERSON
			);

			localStorage.setItem(FIELD_DNI, persons[0].dni);
			localStorage.setItem(FIELD_ANSWERS, persons[0].answers);
		},
		updatePerson: async (person: Person): Promise<void> => {
			set(
				(state: PersonStore): PersonStore => ({
					...state,
					isLoading: true
				}),
				false,
				UPDATE_PERSON
			);

			const { data: persons, error }: PostgrestSingleResponse<Person> = await updatePerson(person);

			if (error !== null || persons.length === 0) {
				set(
					(state: PersonStore): PersonStore => ({
						...state,
						errorMessage: error ? error.message : "No se pudieron actualizar los datos",
						isLoading: false
					}),
					false,
					UPDATE_PERSON
				);

				setTimeout(() => {
					set(
						(state: PersonStore): PersonStore => ({
							...state,
							errorMessage: ""
						}),
						false,
						UPDATE_PERSON
					);
				}, 3000);

				return;
			}

			set(
				(state: PersonStore): PersonStore => ({
					...state,
					isLoading: false,
					person: persons[0]
				}),
				false,
				UPDATE_PERSON
			);
		}
	}))
);
