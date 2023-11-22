/* SUPABASE */
import { supabase } from "@/config/supabase.config";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

/* TYPES */
import { Term } from "@/types";

/* CONSTANTS */
import { TERMS, FIELD_ID } from "@/constants";

/**
 * Get a term according the id
 * @date 21/11/2023 - 1:40:25
 *
 * @async
 * @param {number} id
 * @returns {Promise<PostgrestSingleResponse<Term>>}
 */
async function getTerm(id: number): Promise<PostgrestSingleResponse<Term>> {
	return await supabase.from(TERMS).select().eq(FIELD_ID, id);
}

export { getTerm };
