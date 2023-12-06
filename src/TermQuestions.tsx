/* REACT */
import { useEffect } from "react";

/* REACT HOOK FORM */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/* STORES */
import { useTermStore, usePersonStore } from "@/store";

/* SCHEMAS */
import { termSchema } from "./schemas";

/* UI COMPONENTS */
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, RadioGroup } from "@/components/ui";

/* COMPONENTS */
import { FormQuestionItem } from "./FormQuestionItem";

/* TYPES */
import { PersonAnswerInsert, Term } from "@/types";

/* UTILS FOR CLASSES */
import { cn } from "./lib/utils";

/* CONSTANTS */
import { AGREE, DEFINITION_AGREEMENT_QUESTION, DISAGREE, EXAMPLE_AGREEMENT_QUESTION, FIELD_DEFINITION_ANSWER, FIELD_EXAMPLE_ANSWER, FIELD_USE_CASE_ANSWER, NEUTRAL, READ_DEFINITION, READ_EXAMPLE, READ_USE_CASE, TOTALLY_AGREE, TOTALLY_DISAGREE, TERM_DEFAULT, USE_CASE_AGREEMENT_QUESTION } from "@/constants";

/* ICONS */
import { Angry, Frown, Laugh, Loader2, Meh, Play, Smile } from "lucide-react";

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
			await getTerm(person.answers + 1);
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
			setCurrentTermIndex(person.answers);
			await getTerm(currentTerm.id + 1);

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
									className={cn("border-red-500 text-red-500", {
										"bg-red-500 text-white": form.getValues()[name] === DISAGREE
									})}
									icon={<Angry className="h-10 w-10" />}
									label="Totalmente en desacuerdo"
									value={DISAGREE}
									radioId={`${name}-${DISAGREE}`}
								/>

								<FormQuestionItem
									className={cn("border-orange-400 text-orange-500", {
										"bg-orange-400 text-white": form.getValues()[name] === TOTALLY_DISAGREE
									})}
									icon={<Frown className="h-10 w-10" />}
									label="En desacuerdo"
									value={TOTALLY_DISAGREE}
									radioId={`${name}-${TOTALLY_DISAGREE}`}
								/>

								<FormQuestionItem
									className={cn("border-yellow-500 text-yellow-500", {
										"bg-yellow-500 text-white": form.getValues()[name] === NEUTRAL
									})}
									icon={<Meh className="h-10 w-10" />}
									label="Neutral"
									value={NEUTRAL}
									radioId={`${name}-${NEUTRAL}`}
								/>

								<FormQuestionItem
									className={cn("border-green-500 text-green-500", {
										"bg-green-500 text-white": form.getValues()[name] === TOTALLY_AGREE
									})}
									icon={<Smile className="h-10 w-10" />}
									label="De acuerdo"
									value={TOTALLY_AGREE}
									radioId={`${name}-${TOTALLY_AGREE}`}
								/>

								<FormQuestionItem
									className={cn("border-blue-500 text-blue-500", {
										"bg-blue-500 text-white": form.getValues()[name] === AGREE
									})}
									icon={<Laugh className="h-10 w-10" />}
									label="Totalmente de acuerdo"
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
				<div className="m-auto flex w-full justify-center overflow-hidden rounded-xl border bg-background p-3 shadow lg:max-w-[60rem]">
					<Loader2 className="h-16 w-16 animate-spin" />
				</div>
			</div>
		);
	}

	return (
		<div className="container my-10">
			<div className="m-auto w-full overflow-hidden rounded-xl border bg-background p-3 shadow lg:max-w-[60rem]">
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
