import { getCurrentYear } from "../utils/date.js";

/**
 * @function addCurrentYear
 * @description Add the current year to the copyright
 * @see Used inside: {@link getCurrentYear}
 * @see Used in: {@link functionAnonimAutoExecuted}
 */
export function addCurrentYear() {
	const copyrightYear = document.querySelector("#currentYear");

	copyrightYear.innerHTML = getCurrentYear();
}
