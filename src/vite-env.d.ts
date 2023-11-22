/// <reference types="vite/client" />

/**
 * Environment variables in the Vite.js context
 * @date 21/11/2023 - 3:48:20
 *
 * @interface ImportMetaEnv
 * @typedef {ImportMetaEnv}
 */
interface ImportMetaEnv {
	/**
	 * Supabase API key
	 * @date 21/11/2023 - 3:48:20
	 *
	 * @readonly
	 * @type {string}
	 */
	readonly VITE_SUPABASE_API_KEY: string;
	/**
	 * Supabase URL
	 * @date 21/11/2023 - 3:48:20
	 *
	 * @readonly
	 * @type {string}
	 */
	readonly VITE_SUPABASE_URL: string;
}

/**
 * Import meta for Vite.js
 * @date 21/11/2023 - 3:48:20
 *
 * @interface ImportMeta
 * @typedef {ImportMeta}
 */
interface ImportMeta {
	/**
	 * Environment variables in the Vite.js context
	 * @date 21/11/2023 - 3:48:20
	 *
	 * @readonly
	 * @type {ImportMetaEnv}
	 */
	readonly env: ImportMetaEnv;
}
