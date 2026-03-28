/**
 * @module utils/date
 */

/**
 * @function getCurrentYear
 * @description Get the current year
 * @return {Number} returns the current year
 * @see {@link module:components/copyright~addCurrentYear|addCurrentYear}
 */
export function getCurrentYear() {
	const year = new Date().getFullYear();

	return year;
}
