/* ZOD */
import * as z from "zod";

/* CONSTANTS */
import { FEMALE, FIELD_AGE, FIELD_DNI, FIELD_EDUCATION_LEVEL, FIELD_NAME, FIELD_SEX, HIGH_LEVEL, LOW_LEVEL, MALE, MIDDLE_LEVEL, REQUIRED_FIELD, SELECT_ONE_OPTION } from "@/constants";

/**
 * Schema for the Person
 * @date 21/11/2023 - 2:51:46
 *
 * @type {*}
 */
export const personSchema = z
	.object({
		[FIELD_DNI]: z.string({ required_error: REQUIRED_FIELD }).length(10, "Ingrese 10 dígitos"),
		[FIELD_NAME]: z.string({ required_error: REQUIRED_FIELD }).min(1, "Ingrese sus nombres y apellidos"),
		[FIELD_AGE]: z
			.number({
				required_error: REQUIRED_FIELD,
				invalid_type_error: "Ingrese un número"
			})
			.lt(100, "Ingrese un número menor a 100")
			.gte(18, "Ingrese un número mayor a 18"),
		[FIELD_SEX]: z.enum([FEMALE, MALE], { required_error: SELECT_ONE_OPTION }),
		[FIELD_EDUCATION_LEVEL]: z.enum([HIGH_LEVEL, LOW_LEVEL, MIDDLE_LEVEL], { required_error: SELECT_ONE_OPTION })
	})
	.required();
