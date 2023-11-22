/* ZOD */
import * as z from "zod";

/**
 * Schema for the Person
 * @date 21/11/2023 - 2:51:46
 *
 * @type {*}
 */
export const personSchema = z
	.object({
		dni: z.string({ required_error: "Campo requerido" }).length(10, "Ingrese 10 dígitos"),
		name: z.string({ required_error: "Campo requerido" }).min(1, "Ingrese sus nombres y apellidos"),
		age: z
			.number({
				required_error: "Campo requerido",
				invalid_type_error: "Ingrese un número"
			})
			.lt(100, "Ingrese un número menor a 100")
			.gte(18, "Ingrese un número mayor a 18"),
		educationLevel: z.enum(["lowLevel", "middleLevel", "highLevel"], { required_error: "Seleccione uno" })
	})
	.required();
