/* ZUSTAND */
import { create } from "zustand";
import { devtools } from "zustand/middleware";

/* SUPABASE */
import { PostgrestSingleResponse } from "@supabase/supabase-js";

/* SERVICES */
import { getTerm } from "@/services";

/* TYPES */
import { Term, TermStore } from "@/types";

/* CONSTANTS */
import { GET_TERM, SET_CURRENT_TERM_INDEX, TERM_DEFAULT } from "@/constants";

/**
 * Store for term
 * @date 21/11/2023 - 1:38:12
 *
 * @type {*}
 */
export const useTermStore = create<TermStore>()(
	devtools(set => ({
		currentTerm: TERM_DEFAULT,
		currentTermIndex: 0,
		errorMessage: "",
		isLoading: false,
		getTerm: async (id: number): Promise<void> => {
			console.log(id);
			set(
				(state: TermStore): TermStore => ({
					...state,
					currentTermIndex: id,
					isLoading: true
				}),
				false,
				GET_TERM
			);

			const { data: currentTerm, error }: PostgrestSingleResponse<Term> = await getTerm(id);

			if (error !== null) {
				set(
					(state: TermStore): TermStore => ({
						...state,
						currentTermIndex: state.currentTermIndex - 1,
						isLoading: false,
						errorMessage: error.message
					}),
					false,
					GET_TERM
				);

				setTimeout((): void => {
					set(
						(state: TermStore): TermStore => ({
							...state,
							errorMessage: ""
						}),
						false,
						GET_TERM
					);
				}, 3000);

				return;
			}

			if (currentTerm.length === 0) {
				set(
					(state: TermStore): TermStore => ({
						...state,
						currentTermIndex: -1,
						isLoading: false
					}),
					false,
					GET_TERM
				);

				return;
			}

			set(
				(state: TermStore): TermStore => ({
					...state,
					isLoading: false,
					currentTerm: currentTerm[0]
				}),
				false,
				GET_TERM
			);
		},
		setCurrentTermIndex: (currentTermIndex: number): void => {
			set(
				(state: TermStore): TermStore => ({
					...state,
					currentTermIndex
				}),
				false,
				SET_CURRENT_TERM_INDEX
			);
		}
	}))
);
