/**
 * @module components/copyright
 */
import { getCurrentYear } from "../utils/date.js";

/**
 * @function addCurrentYear
 * @description Add the current year to the copyright
 * @see Used inside: {@link getCurrentYear}
 * @see Used in: {@link scripts.js}
 */
export function addCurrentYear() {
	const copyrightYear = document.querySelector("#currentYear");
	if (copyrightYear) {
		copyrightYear.innerHTML = getCurrentYear();
	}
}
