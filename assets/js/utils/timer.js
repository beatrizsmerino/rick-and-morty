/**
 * @function delay
 * @description Executes a function after a given time
 * @param {Function} fn - function to execute
 * @param {Number} ms - delay time in miliseconds
 * @see Used in: {@link searchAdd}
 */
export function delay(fn, ms) {
	let timer = 0;

	return function(...args) {
		clearTimeout(timer);
		timer = setTimeout(fn.bind(this, ...args), ms || 0);
	};
}
