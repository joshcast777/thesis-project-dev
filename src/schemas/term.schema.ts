/* ZOD */
import * as z from "zod";

/**
 * Schema for the term
 * @date 21/11/2023 - 1:43:32
 *
 * @type {*}
 */
export const termSchema = z
	.object({
		definitionAnswer: z.enum(["agree", "somewhatAgree", "neutral", "somewhatDisagree", "disagree"], { required_error: "Selecciones uno" }),
		exampleAnswer: z.enum(["agree", "somewhatAgree", "neutral", "somewhatDisagree", "disagree"], { required_error: "Selecciones uno" }),
		useCaseAnswer: z.enum(["agree", "somewhatAgree", "neutral", "somewhatDisagree", "disagree"], { required_error: "Selecciones uno" })
	})
	.required();
