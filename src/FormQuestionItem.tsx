/* UI COMPONENTS */
import { FormItem, FormControl, FormLabel, RadioGroupItem } from "@/components/ui";

/* UTILS FOR CLASSES */
import { cn } from "./lib/utils";

/**
 * Props for the form question item
 * @date 21/11/2023 - 3:54:23
 *
 * @typedef {FormQuestionItemProp}
 */
type FormQuestionItemProp = {
	className: string;
	icon: JSX.Element;
	label: string;
	value: string;
	radioId: string;
};

/**
 * Item for every option in a radio group
 * @date 21/11/2023 - 3:54:23
 *
 * @export
 * @param {FormQuestionItemProp} param0
 * @param {string} param0.className
 * @param {string} param0.label
 * @param {string} param0.value
 * @param {string} param0.radioId
 * @returns {*}
 */
export function FormQuestionItem({ className, icon, label, value, radioId }: FormQuestionItemProp) {
	return (
		<FormItem className={cn("flex items-center space-y-0 rounded-md border bg-background font-medium shadow lg:flex-1 lg:text-center", className)}>
			<FormControl>
				<RadioGroupItem value={value} id={radioId} className="hidden" />
			</FormControl>

			<FormLabel htmlFor={radioId} className="mt-0 flex w-full items-center p-3 text-xl hover:cursor-pointer">
				{icon}
				<span className="flex-1 text-center">{label}</span>
			</FormLabel>
		</FormItem>
	);
}
