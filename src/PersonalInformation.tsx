/* REACT */
import { useEffect, useState } from "react";

/* REACT HOOK FORM */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/* STORES */
import { usePersonStore } from "@/store";

/* SCHEMAS */
import { personSchema } from "@/schemas";

/* UI COMPONENTS */
import { Alert, AlertDescription, AlertTitle, Badge, Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, RadioGroup, RadioGroupItem, useToast } from "@/components/ui";

/* TYPES */
import { Person, PersonInsert } from "@/types";

/* UTILS FOR CSS CLASSES */
import { cn } from "./lib/utils";

/* CONSTANTS */
import { FEMALE, FEMALE_NAME, FIELD_AGE, FIELD_DNI, FIELD_EDUCATION_LEVEL, FIELD_NAME, FIELD_SEX, HIGH_LEVEL, LOW_LEVEL, MALE, MALE_NAME, MIDDLE_LEVEL, PERSON_DEFAULT } from "@/constants";

/* ICONS */
import { AlertTriangle, Loader2, Play } from "lucide-react";

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
	const errorMessage = usePersonStore(state => state.errorMessage);
	const isLoading = usePersonStore(state => state.isLoading);
	const person = usePersonStore(state => state.person);

	useEffect(() => {
		if (errorMessage !== "") {
			toast({
				variant: "destructive",
				title: (<p>Error:</p>) as string & JSX.Element,
				description: <p>{errorMessage}</p>
			});
		}
	}, [errorMessage, toast]);

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

		if (JSON.stringify(person) === JSON.stringify(PERSON_DEFAULT)) {
			setShowForm("show");

			form.clearErrors();

			return;
		}
	}

	async function onSubmit(values: PersonInsert) {
		await addPerson({
			...values,
			answers: 0
		});
	}

	return (
		<div className="container my-10 flex justify-center">
			<div className="w-full space-y-10 overflow-hidden rounded-xl border bg-background p-3 shadow sm:w-[40rem]">
				<h1 className="text-center text-5xl font-semibold tracking-tight">Formulario</h1>

				<p className="text-xl">Bienvenido, esta es una encuenta para el proyecto de tesis que nos permitirá conocer si las definiciones, ejemplos y casos de uso generados por una Inteligencia Artificial (AI) pueden ser relevantes a la hora de sintetizar textos científicos.</p>

				<Alert variant="warning" className="[&>svg~*]:pl-11">
					<AlertTriangle className="h-8 w-8" />

					<AlertTitle className="text-xl">Advertencia</AlertTitle>

					<AlertDescription className="text-lg">Son 500 términos los cuales debe analizar y que se le irán mostrando uno a uno, junto con ello debe responder 3 preguntas por cada término, de opción múltiple. No tiene que responder todas en un solo intento, puede cerrar y continuar después. Mantenga la página abierta una sola vez para evitar problemas de sincronización.</AlertDescription>
				</Alert>

				<div className="space-y-6 rounded-lg border p-3 shadow">
					<p className="text-center text-2xl font-semibold leading-none">Ayúdenos a identificarlo</p>

					<p className="text-xl">Si cierra la página, el navegador o desea continuar en otro dispositivo, su cédula nos ayudará a identificarlo para que pueda continuar desde la última pregunta que contestó. Si ya se ha registrado, lo redirigirá al último término por responder que se registró, de lo contrario tendrá que registrarse.</p>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name={FIELD_DNI}
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-xl">Cédula</FormLabel>

										<div className="space-y-2 xs:flex xs:space-x-2 xs:space-y-0">
											<FormControl>
												<Input {...field} type="text" placeholder="Cédula" className={inputClass(fieldState.invalid)} />
											</FormControl>

											<Button disabled={isLoading} type="button" className="h-12 w-full" onClick={handleClickValidateDni}>
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
									name={FIELD_NAME}
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

								<div className="xs:flex xs:space-x-4">
									<FormField
										control={form.control}
										name={FIELD_AGE}
										render={({ field, fieldState }) => (
											<FormItem className="xs:flex-1">
												<FormLabel className="text-xl">Edad</FormLabel>

												<FormControl>
													<Input {...field} type="number" placeholder="Edad" className={inputClass(fieldState.invalid)} onChange={e => field.onChange(parseInt(e.target.value))} />
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={FIELD_SEX}
										render={({ field, fieldState }) => (
											<FormItem className="xs:flex-1">
												<FormLabel className="text-xl">Sexo</FormLabel>

												<FormControl>
													<RadioGroup {...field} onValueChange={field.onChange} defaultValue={field.value} className={`space-y-3 xs:flex xs:space-y-0 ${inputClass(fieldState.invalid)}`}>
														<FormItem
															className={cn("h-auto space-y-0 rounded-md border bg-background p-2 shadow xs:flex-1", {
																ring: form.getValues().sex === MALE
															})}
														>
															<FormControl>
																<RadioGroupItem value={MALE} id={MALE_NAME} className="hidden" />
															</FormControl>

															<FormLabel htmlFor={MALE_NAME} className="mt-0 flex flex-wrap items-center gap-4 hover:cursor-pointer">
																<p className="text-lg font-normal">Masculino</p>
															</FormLabel>
														</FormItem>

														<FormItem
															className={cn("h-auto space-y-0 rounded-md border bg-background p-2 shadow xs:flex-1", {
																ring: form.getValues().sex === FEMALE
															})}
														>
															<FormControl>
																<RadioGroupItem value={FEMALE} id={FEMALE_NAME} className="hidden" />
															</FormControl>

															<FormLabel htmlFor={FEMALE_NAME} className="mt-0 flex flex-wrap items-center gap-4 hover:cursor-pointer">
																<p className="text-lg font-normal">Femenino</p>
															</FormLabel>
														</FormItem>
													</RadioGroup>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name={FIELD_EDUCATION_LEVEL}
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel className="text-xl">Nivel de ecuación</FormLabel>

											<FormControl>
												<RadioGroup {...field} onValueChange={field.onChange} defaultValue={field.value} className={`space-y-3 ${inputClass(fieldState.invalid)}`}>
													<FormItem
														className={cn("min-h-12 space-y-0 rounded-md border bg-background shadow", {
															ring: form.getValues().educationLevel === LOW_LEVEL
														})}
													>
														<FormControl>
															<RadioGroupItem value={LOW_LEVEL} id={LOW_LEVEL} className="hidden" />
														</FormControl>

														<FormLabel htmlFor={LOW_LEVEL} className="mt-0 flex flex-wrap items-center gap-4 p-2 hover:cursor-pointer">
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
														className={cn("min-h-12 space-y-0 rounded-md border bg-background shadow", {
															ring: form.getValues().educationLevel === MIDDLE_LEVEL
														})}
													>
														<FormControl>
															<RadioGroupItem value={MIDDLE_LEVEL} id={MIDDLE_LEVEL} className="hidden" />
														</FormControl>

														<FormLabel htmlFor={MIDDLE_LEVEL} className="mt-0 flex flex-wrap items-center gap-4 p-2 hover:cursor-pointer">
															<p className="text-lg font-normal">Nivel medio</p>

															<Badge variant="outline" className="text-md font-normal">
																Primeros niveles de universidad
															</Badge>
														</FormLabel>
													</FormItem>

													<FormItem
														className={cn("min-h-12 space-y-0 rounded-md border bg-background shadow", {
															ring: form.getValues().educationLevel === HIGH_LEVEL
														})}
													>
														<FormControl>
															<RadioGroupItem value={HIGH_LEVEL} id={HIGH_LEVEL} className="hidden" />
														</FormControl>

														<FormLabel htmlFor={HIGH_LEVEL} className="mt-0 flex flex-wrap items-center gap-4 p-2 hover:cursor-pointer">
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
									<Button disabled={isLoading} type="submit" className="h-12">
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
