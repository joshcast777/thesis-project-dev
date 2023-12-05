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
			<div className="m-auto w-full overflow-hidden rounded-xl border bg-background p-3 shadow sm:w-[60rem]">
				<p className="mb-3 text-center text-9xl font-semibold uppercase">Gracias</p>

				<p className="mt-5 text-center text-3xl font-medium">Muchas gracias por participar en nuestro proyecto de tesis</p>
			</div>
		</div>
	);
}
