/**
 * @module services/api
 */
import { appContent } from "../constants/dom.js";
import { filterSetAction } from "../components/filter.js";
import { loaderAdd, loaderRemove } from "../components/loader.js";
import { messageRemove, messageError404Add } from "../components/message.js";

/**
 * @function apiAddLink
 * @description Add link of the API to the app content
 * @param {String} url - root of the API
 * @see Used in: {@link scripts.js}
 */
export function apiAddLink(url) {
	const linkId = document.getElementById("linkApi");

	if (!linkId) {
		const link = document.createElement("a");
		const linkText = document.createTextNode(url);

		link.setAttribute("id", "linkApi");
		link.setAttribute("href", url);
		link.setAttribute("target", "_blank");
		link.appendChild(linkText);
		appContent.appendChild(link);
	}
}

/**
 * @function apiAjaxHandler
 * @description API request
 * @param {String} url - root of the API
 * @param {String} action - name of the action to execute
 * @see Used inside: {@link loaderAdd}, {@link loaderRemove}, {@link filterSetAction}
 * @see Used in: {@link searchAdd}, {@link paginationAdd}, {@link scripts.js}
 */
export function apiAjaxHandler(url, action) {
	loaderAdd();

	fetch(url).
		then(handleResponse).
		then(function(data) {
			// console.log("%c--- Promise 2 ---", "padding: 0.5rem 1rem; color: #C0C0C0; background-color: #454545;");
			// console.info(data);
			// console.info('data is', data);
			const timer = setInterval(function() {
				clearInterval(timer);
				loaderRemove();
				messageRemove("messageError404");
				filterSetAction(action, appContent, data);
			}, 3000);
		}).
		catch(function(error) {
			// console.warn('error is', error);
			if (error.status === 404) {
				loaderRemove();
				messageError404Add();
			}
		});

	/**
	 * @function handleResponse
	 * @description Route the response to the correct handler based on content type
	 * @param {Response} response - fetch response object
	 * @return {Promise} returns the parsed response
	 */
	function handleResponse(response) {
		const contentType = response.headers.get("content-type");
		if (contentType?.includes("application/json")) {
			return handleJSONResponse(response);
		} else if (contentType?.includes("text/html")) {
			return handleTextResponse(response);
		}

		// Other response types as necessary. I haven't found a need for them yet though.
		throw new Error(`Sorry, content-type ${contentType} not supported`);
	}

	/**
	 * @function handleJSONResponse
	 * @description Parse a JSON response and reject if not ok
	 * @param {Response} response - fetch response object
	 * @return {Promise} returns the parsed JSON or a rejected promise
	 */
	function handleJSONResponse(response) {
		return response.json().then(json => {
			if (response.ok) {
				return json;
			}

			return Promise.reject(Object.assign(new Error(response.statusText), {
				...json,
				"status": response.status,
			}));
		});
	}

	/**
	 * @function handleTextResponse
	 * @description Parse a text response and reject if not ok
	 * @param {Response} response - fetch response object
	 * @return {Promise} returns the parsed text or a rejected promise
	 */
	function handleTextResponse(response) {
		return response.text().then(text => {
			if (response.ok) {
				return text;
			}

			return Promise.reject(Object.assign(new Error(response.statusText), {
				"status": response.status,
				"err": text,
			}));
		});
	}
}
