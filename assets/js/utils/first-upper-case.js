/**
 * @function firstUpperCase
 * @description Converts the first letter of a string to uppercase
 * @param {String} string - string with the this letter in lowercase
 * @return {String} returns the same modified string
 * @see Used in: {@link cardCreate}
 */
export function firstUpperCase(string) {
	const stingLowerCase = string.toLowerCase();
	const stringCapitalize = stingLowerCase.charAt(0).toUpperCase() + stingLowerCase.slice(1);

	return stringCapitalize;
}
