/* SUPABASE */
import { supabase } from "@/config/supabase.config";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

/* TYPES */
import { PersonInsert, Person, PersonAnswerInsert } from "@/types";

/* CONSTANTS */
import { PERSONS, PERSON_ANSWERS, FIELD_DNI, FIELD_ID } from "@/constants";

/**
 * Add a new person
 * @date 21/11/2023 - 1:42:05
 *
 * @async
 * @param {PersonInsert} person
 * @returns {Promise<PostgrestSingleResponse<Person>>}
 */
async function addPerson(person: PersonInsert): Promise<PostgrestSingleResponse<Person>> {
	return await supabase.from(PERSONS).insert([person]).select();
}

/**
 * Add a new answer of a person
 * @date 21/11/2023 - 1:42:05
 *
 * @async
 * @param {PersonAnswerInsert} personAnswer
 * @returns {Promise<PostgrestSingleResponse<null>>}
 */
async function addPersonAnswer(personAnswer: PersonAnswerInsert): Promise<PostgrestSingleResponse<null>> {
	return await supabase.from(PERSON_ANSWERS).insert([personAnswer]);
}

/**
 * Get a person according the DNI
 * @date 21/11/2023 - 1:42:05
 *
 * @async
 * @param {string} dni
 * @returns {Promise<PostgrestSingleResponse<Person>>}
 */
async function getPerson(dni: string): Promise<PostgrestSingleResponse<Person>> {
	return await supabase.from(PERSONS).select().eq(FIELD_DNI, dni);
}

/**
 * Update a person
 * @date 21/11/2023 - 1:42:05
 *
 * @async
 * @param {Person} person
 * @returns {Promise<PostgrestSingleResponse<Person>>}
 */
async function updatePerson(person: Person): Promise<PostgrestSingleResponse<Person>> {
	return await supabase.from(PERSONS).update(person).eq(FIELD_ID, person.id).select();
}

export { addPerson, addPersonAnswer, getPerson, updatePerson };
