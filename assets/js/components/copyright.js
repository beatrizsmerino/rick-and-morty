/**
 * @module components/copyright
 */
import { getCurrentYear } from "../utils/date.js";

/**
 * @function addCurrentYear
 * @description Add the current year to the copyright
 * @see {@link module:utils/date~getCurrentYear|getCurrentYear}
 * @see {@link module:scripts|scripts.js}
 */
export function addCurrentYear() {
	const copyrightYear = document.querySelector("#currentYear");
	if (copyrightYear) {
		copyrightYear.innerHTML = getCurrentYear();
	}
}
