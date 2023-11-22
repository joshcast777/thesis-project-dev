/* SUPABASE */
import { createClient } from "@supabase/supabase-js";

/* TYPES */
import { Database } from "@/types";

/**
 * Description placeholder
 * @date 21/11/2023 - 3:38:30
 *
 * @type {string}
 */
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
/**
 * Description placeholder
 * @date 21/11/2023 - 3:38:30
 *
 * @type {string}
 */
const supabaseKey: string = import.meta.env.VITE_SUPABASE_API_KEY;

/**
 * Supabase cliente object
 * @date 21/11/2023 - 3:38:30
 *
 * @type {*}
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
