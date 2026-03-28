/**
 * @module utils/string
 */

/**
 * @function firstUpperCase
 * @description Converts the first letter of a string to uppercase
 * @param {String} string - string with the first letter in lowercase
 * @return {String} returns the same modified string
 * @see {@link module:components/card~cardCreate|cardCreate}
 */
export function firstUpperCase(string) {
	const stringLowerCase = string.toLowerCase();
	const stringCapitalize = stringLowerCase.charAt(0).toUpperCase() + stringLowerCase.slice(1);

	return stringCapitalize;
}
