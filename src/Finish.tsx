/* REAECT */
import { useEffect } from "react";

/* CONSTANTS */
import { FIELD_ANSWERS, FIELD_DNI } from "./constants";

/**
 * Finish component when a person answers all terms
 * @date 5/12/2023 - 1:21:11
 *
 * @export
 * @returns {JSX.Element}
 */
export default function Finish(): JSX.Element {
	useEffect((): void => {
		localStorage.removeItem(FIELD_DNI);
		localStorage.removeItem(FIELD_ANSWERS);
	}, []);

	return (
		<div className="container my-10">
			<div className="m-auto w-full overflow-hidden rounded-xl border bg-background p-3 shadow lg:max-w-[60rem]">
				<p className="mb-3 text-center text-6xl font-semibold uppercase xs:text-7xl md:text-8xl">Gracias</p>

				<p className="mt-10 text-center text-xl font-medium xs:text-2xl md:text-3xl">Muchas gracias por participar en nuestro proyecto de tesis</p>
			</div>
		</div>
	);
}
