/* REACT */
import { useEffect, useState } from "react";

/* REACT HOOK FORM */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/* REACT ROUTER */
import { useNavigate } from "react-router-dom";

/* STORES */
import { usePersonStore, useTermStore } from "@/store";

/* SCHEMAS */
import { personSchema } from "@/schemas";

/* UI COMPONENTS */
import { Badge, Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, RadioGroup, RadioGroupItem, useToast } from "@/components/ui";

/* TYPES */
import { Person, PersonInsert } from "@/types";

/* UTILS FOR CSS CLASSES */
import { cn } from "./lib/utils";

/* CONSTANTS */
import { FIELD_DNI, PERSON_DEFAULT, TERM_ROUTE } from "@/constants";

/* ICONS */
import { Loader2, Play } from "lucide-react";

/**
 * Applies CSS classes
 * @date 21/11/2023 - 4:04:41
 *
 * @param {boolean} invalid
 * @returns {string}
 */
function inputClass(invalid: boolean): string {
	return cn("text-lg", {
		"animate__animated animate__shakeX text-red-500 placeholder:text-red-400 border-red-300 ring-red-500 focus-visible:ring-red-500": invalid
	});
}

/**
 * Personal informatión page
 * @date 21/11/2023 - 4:05:27
 *
 * @export
 * @returns {JSX.Element}
 */
export default function PersonalInformation(): JSX.Element {
	const [showForm, setShowForm] = useState<"show" | "not-show">("not-show");

	const { toast } = useToast();

	const addPerson = usePersonStore(state => state.addPerson);
	const getPerson = usePersonStore(state => state.getPerson);
	const errorPersonMessage = usePersonStore(state => state.errorMessage);
	const isLoading = usePersonStore(state => state.isLoading);
	const person = usePersonStore(state => state.person);

	const errorTermMessage = useTermStore(state => state.errorMessage);
	const getTerm = useTermStore(state => state.getTerm);

	const navigate = useNavigate();

	useEffect(() => {
		if (errorPersonMessage !== "" || errorTermMessage !== "") {
			toast({
				variant: "destructive",
				title: <p>Error:</p> as string & JSX.Element,
				description: <p>{errorPersonMessage}</p>
			});
		}
	}, [errorPersonMessage, errorTermMessage, toast]);

	const form = useForm<Person>({
		resolver: zodResolver(personSchema),
		defaultValues: PERSON_DEFAULT
	});

	async function handleClickValidateDni(): Promise<void> {
		if (form.getValues().dni === "") {
			form.setError(FIELD_DNI, {
				type: "required",
				message: "Campo requerido"
			});

			return;
		} else if (form.getValues().dni.length < 10 || form.getValues().dni.length > 10) {
			form.setError(FIELD_DNI, {
				type: "maxLength",
				message: "Ingrese 10 dígitos"
			});

			return;
		}

		await getPerson(form.getValues().dni);

		const success: boolean = JSON.stringify(person) === JSON.stringify(PERSON_DEFAULT);

		if (success) {
			setShowForm("show");

			form.clearErrors();

			return;
		}

		if (!success) {
			navigate(TERM_ROUTE);
		}
	}

	async function onSubmit(values: PersonInsert) {
		await addPerson({
			...values,
			answers: 0
		});

		if (errorPersonMessage !== "") {
			await getTerm();
		}

		if (errorTermMessage !== "") {
			navigate(TERM_ROUTE);
		}
	}

	return (
		<div className="container my-10 flex justify-center">
			<div className="w-full space-y-10 overflow-hidden rounded-xl border bg-background p-3 shadow sm:w-[40rem]">
				<h1 className="text-center text-5xl font-semibold tracking-tight">Formulario</h1>

				<p className="text-xl">Bienvenido, esta es una encuenta para el proyecto de tesis que nos permitirá conocer si las definiciones, ejemplos y casos de uso generados por una Inteligencia Artificial (AI) pueden ser relevantes a la hora de sintetizar textos científicos</p>

				<div className="space-y-6 rounded-lg border p-3 shadow">
					<p className="text-center text-2xl font-semibold leading-none">Ayúdenos a identificarlo</p>

					<p className="text-xl">Si cierra la página, el navegador o desea continuar en otro dispositivo, su cédula nos ayudará a identificarlo para que pueda continuar desde la última pregunta que contestó</p>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="dni"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-xl">Cédula</FormLabel>

										<div className="space-y-2 xs:flex xs:space-x-2 xs:space-y-0">
											<FormControl>
												<Input {...field} type="text" placeholder="Cédula" className={inputClass(fieldState.invalid)} />
											</FormControl>

											<Button disabled={isLoading} type="button" className="w-full" onClick={handleClickValidateDni}>
												<span className="text-md">{showForm === "not-show" ? "Verificar" : "Volver a verificar"}</span> {isLoading && <Loader2 className="direction-reverse direction-reverse ml-3 animate-spin" />}
											</Button>
										</div>

										<FormMessage />
									</FormItem>
								)}
							/>

							<div
								className={cn("space-y-8", {
									hidden: showForm === "not-show",
									block: showForm === "show"
								})}
							>
								<FormField
									control={form.control}
									name="name"
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel className="text-xl">Nombres y apellidos</FormLabel>

											<FormControl>
												<Input {...field} type="text" placeholder="Nombres y apellidos" className={inputClass(fieldState.invalid)} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="age"
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel className="text-xl">Edad</FormLabel>

											<FormControl>
												<Input {...field} type="number" id="age" placeholder="Edad" className={inputClass(fieldState.invalid)} onChange={e => field.onChange(parseInt(e.target.value))} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="educationLevel"
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel className="text-xl">Nivel de ecuación</FormLabel>

											<FormControl>
												<RadioGroup {...field} onValueChange={field.onChange} defaultValue={field.value} className={`space-y-3 ${inputClass(fieldState.invalid)}`}>
													<FormItem
														className={cn("space-y-0 rounded-md border bg-background p-3 shadow", {
															ring: form.getValues().educationLevel === "lowLevel"
														})}
													>
														<FormControl>
															<RadioGroupItem value="lowLevel" id="lowLevel" className="hidden" />
														</FormControl>

														<FormLabel htmlFor="lowLevel" className="mt-0 flex flex-wrap items-center gap-4 hover:cursor-pointer">
															<p className="text-lg font-normal">Nivel bajo</p>

															<Badge variant="outline" className="text-md font-normal">
																Sin estudios
															</Badge>

															<Badge variant="outline" className="text-md font-normal">
																Primaria
															</Badge>

															<Badge variant="outline" className="text-md font-normal">
																Secundaria
															</Badge>
														</FormLabel>
													</FormItem>

													<FormItem
														className={cn("space-y-0 rounded-md border bg-background p-3 shadow", {
															ring: form.getValues().educationLevel === "middleLevel"
														})}
													>
														<RadioGroupItem value="middleLevel" id="middleLevel" className="hidden" />

														<FormLabel htmlFor="middleLevel" className="mt-0 flex flex-wrap items-center gap-4 hover:cursor-pointer">
															<p className="text-lg font-normal">Nivel medio</p>

															<Badge variant="outline" className="text-md font-normal">
																Primeros niveles de universidad
															</Badge>
														</FormLabel>
													</FormItem>

													<FormItem
														className={cn("space-y-0 rounded-md border bg-background p-3 shadow", {
															ring: form.getValues().educationLevel === "highLevel"
														})}
													>
														<RadioGroupItem value="highLevel" id="highLevel" className="hidden" />

														<FormLabel htmlFor="highLevel" className="mt-0 flex flex-wrap items-center gap-4 hover:cursor-pointer">
															<p className="text-lg font-normal">Nivel alto</p>

															<Badge variant="outline" className="text-md font-normal">
																Últimos niveles de universidad
															</Badge>

															<Badge variant="outline" className="text-md font-normal">
																Graduados
															</Badge>

															<Badge variant="outline" className="text-md font-normal">
																Postgrados
															</Badge>
														</FormLabel>
													</FormItem>
												</RadioGroup>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex justify-end">
									<Button disabled={isLoading} type="submit">
										<span className="text-md">Continuar</span> {isLoading ? <Loader2 className="ml-3 animate-spin" /> : <Play className="ml-3" />}
									</Button>
								</div>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}
