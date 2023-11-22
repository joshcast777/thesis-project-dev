/* REACT */
import { useEffect } from "react";

/* REACT HOOK FORM */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/* STORES */
import { useTermStore, usePersonStore } from "@/store";

/* SCHEMAS */
import { termSchema } from "./schemas";

/* PAGES */
import Finish from "./Finish";

/* UI COMPONENTS */
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, RadioGroup } from "@/components/ui";

/* COMPONENTS */
import { FormQuestionItem } from "./FormQuestionItem";

/* TYPES */
import { PersonAnswerInsert, Term } from "@/types";

/* UTILS FOR CLASSES */
import { cn } from "./lib/utils";

/* CONSTANTS */
import { AGREE, DEFINITION_AGREEMENT_QUESTION, DISAGREE, EXAMPLE_AGREEMENT_QUESTION, FIELD_DEFINITION_ANSWER, FIELD_EXAMPLE_ANSWER, FIELD_USE_CASE_ANSWER, NEUTRAL, PERSON_DEFAULT, READ_DEFINITION, READ_EXAMPLE, READ_USE_CASE, SOMEWHAT_AGREE, SOMEWHAT_DISAGREE, TERM_DEFAULT, USE_CASE_AGREEMENT_QUESTION } from "@/constants";

/* ICONS */
import { Loader2, Play } from "lucide-react";

/**
 * Props for the form question
 * @date 21/11/2023 - 3:59:40
 *
 * @typedef {FormQuestionProp}
 */
type FormQuestionProp = {
	agreementQuestion: string;
	name: "definitionAnswer" | "exampleAnswer" | "useCaseAnswer";
};

/**
 * Props for the text of the term
 * @date 21/11/2023 - 3:59:39
 *
 * @typedef {TextTermProp}
 */
type TextTermProp = {
	title: string;
	text: string;
};

/**
 * Applies CSS classes
 * @date 21/11/2023 - 3:59:39
 *
 * @param {boolean} invalid
 * @returns {string}
 */
function inputClass(invalid: boolean): string {
	return cn("mb-7 mt-2 h-auto text-xl", {
		"animate__animated animate__shakeX border-red-300 ring-red-500 focus-visible:ring-red-500": invalid
	});
}

/**
 * Text term to be showed
 * @date 21/11/2023 - 3:59:39
 *
 * @param {TextTermProp} param0
 * @param {string} param0.title
 * @param {string} param0.text
 * @returns {JSX.Element}
 */
function TextTerm({ title, text }: TextTermProp): JSX.Element {
	return (
		<div className="space-y-3 lg:flex-1">
			<h3 className="text-2xl font-medium first-letter:uppercase">{title}</h3>

			<p className="text-xl font-normal first-letter:uppercase">{text}</p>
		</div>
	);
}

/**
 * Question of every term
 * @date 21/11/2023 - 3:59:39
 *
 * @export
 * @returns {JSX.Element}
 */
export default function TermQuestions(): JSX.Element {
	const errorMessage = usePersonStore(state => state.errorMessage);
	const isPersonLoading = usePersonStore(state => state.isLoading);
	const person = usePersonStore(state => state.person);
	const addPersonAnswer = usePersonStore(state => state.addPersonAnswer);
	const updatePerson = usePersonStore(state => state.updatePerson);

	const currentTerm = useTermStore(state => state.currentTerm);
	const currentTermIndex = useTermStore(state => state.currentTermIndex);
	const isTermLoading = useTermStore(state => state.isLoading);
	const setCurrentTermIndex = useTermStore(state => state.setCurrentTermIndex);
	const getTerm = useTermStore(state => state.getTerm);

	useEffect(() => {
		async function getTermInPage(): Promise<void> {
			if (JSON.stringify(person) !== JSON.stringify(PERSON_DEFAULT)) {
				setCurrentTermIndex(person.answers);

				await getTerm();
			}
		}

		getTermInPage();
	}, []);

	const form = useForm<Term>({
		resolver: zodResolver(termSchema),
		defaultValues: TERM_DEFAULT
	});

	async function handleSubmit(values: PersonAnswerInsert) {
		await addPersonAnswer({
			...values,
			personId: person.id,
			termId: currentTerm.id
		});

		if (errorMessage === "") {
			await updatePerson({
				...person,
				answers: currentTerm.id
			});
		}

		if (errorMessage === "") {
			await getTerm();

			form.reset();
		}
	}

	function FormQuestion({ agreementQuestion, name }: FormQuestionProp): JSX.Element {
		return (
			<FormField
				control={form.control}
				name={name}
				render={({ field, fieldState }) => (
					<FormItem className="space-y-5 lg:flex-1">
						<FormLabel className="text-2xl font-medium">{agreementQuestion}</FormLabel>

						<FormControl>
							<RadioGroup {...field} onValueChange={field.onChange} defaultValue={field.value} className={`space-y-3 ${inputClass(fieldState.invalid)}`}>
								<FormQuestionItem
									className={cn("border-red-500 text-red-700", {
										"bg-red-200": form.getValues()[name] === DISAGREE
									})}
									label="Desacuerdo"
									value={DISAGREE}
									radioId={`${name}-${DISAGREE}`}
								/>

								<FormQuestionItem
									className={cn("border-orange-500 text-orange-600", {
										"bg-orange-200": form.getValues()[name] === SOMEWHAT_DISAGREE
									})}
									label="Poco desacuerdo"
									value={SOMEWHAT_DISAGREE}
									radioId={`${name}-${SOMEWHAT_DISAGREE}`}
								/>

								<FormQuestionItem
									className={cn("border-yellow-500 text-yellow-600", {
										"bg-yellow-100": form.getValues()[name] === NEUTRAL
									})}
									label="Neutral"
									value={NEUTRAL}
									radioId={`${name}-${NEUTRAL}`}
								/>

								<FormQuestionItem
									className={cn("border-green-500 text-green-600", {
										"bg-green-100": form.getValues()[name] === SOMEWHAT_AGREE
									})}
									label="Poco de acuerdo"
									value={SOMEWHAT_AGREE}
									radioId={`${name}-${SOMEWHAT_AGREE}`}
								/>

								<FormQuestionItem
									className={cn("border-blue-500 text-blue-600", {
										"bg-blue-100": form.getValues()[name] === AGREE
									})}
									label="De acuerdo"
									value={AGREE}
									radioId={`${name}-${AGREE}`}
								/>
							</RadioGroup>
						</FormControl>

						<FormMessage />
					</FormItem>
				)}
			/>
		);
	}

	if (isTermLoading) {
		return (
			<div className="container my-10">
				<div className="m-auto flex w-full justify-center overflow-hidden rounded-xl border bg-background p-3 shadow sm:w-[60rem]">
					<Loader2 className="h-16 w-16 animate-spin" />
				</div>
			</div>
		);
	}

	if (currentTermIndex === -1) {
		return <Finish />;
	}

	return (
		<div className="container my-10">
			<div className="m-auto w-full overflow-hidden rounded-xl border bg-background p-3 shadow sm:w-[60rem]">
				<p className="mb-3 text-center text-xl">Término N° {currentTerm.id}</p>

				<h1 className="mb-10 text-center text-5xl font-semibold tracking-tight first-letter:uppercase">{currentTerm.complexWord}</h1>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
						<div className="space-y-5 rounded-lg border p-3 shadow lg:flex lg:space-x-5 lg:space-y-0">
							<TextTerm title={READ_DEFINITION} text={currentTerm.definition} />

							<FormQuestion agreementQuestion={DEFINITION_AGREEMENT_QUESTION} name={FIELD_DEFINITION_ANSWER} />
						</div>

						<div className="space-y-5 rounded-lg border p-3 shadow lg:flex lg:space-x-5 lg:space-y-0">
							<TextTerm title={READ_EXAMPLE} text={currentTerm.example} />

							<FormQuestion agreementQuestion={EXAMPLE_AGREEMENT_QUESTION} name={FIELD_EXAMPLE_ANSWER} />
						</div>

						<div className="space-y-5 rounded-lg border p-3 shadow lg:flex lg:space-x-5 lg:space-y-0">
							<TextTerm title={READ_USE_CASE} text={currentTerm.useCase} />

							<FormQuestion agreementQuestion={USE_CASE_AGREEMENT_QUESTION} name={FIELD_USE_CASE_ANSWER} />
						</div>

						<div className="flex justify-end">
							<Button disabled={isPersonLoading}>
								<span className="text-md">{currentTermIndex === -1 ? "Finalizar" : "Continuar"}</span> {isPersonLoading ? <Loader2 className="ml-3 animate-spin" /> : <Play className="ml-3" />}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
