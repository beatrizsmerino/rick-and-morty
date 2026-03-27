/**
 * @module components/pagination
 */
import { appContent } from "../constants/dom.js";
import { apiAjaxHandler } from "../services/api.js";
import { filterRemoveContent } from "./filter.js";

/**
 * @function paginationCreate
 * @description Create pagination
 * @param {Object} responseData - response data of the ajax handler (json)
 * @see Used in: {@link paginationAdd}
 */
function paginationCreate(responseData) {
	const pagination = document.createElement("div");
	pagination.setAttribute("class", "pagination");
	pagination.setAttribute("id", "pagination");

	const buttonNext = document.createElement("div");
	buttonNext.setAttribute("class", "pagination__button icon-chevron-right");
	buttonNext.setAttribute("id", "buttonNext");
	buttonNext.setAttribute("data-url", responseData.info.next);

	const buttonPrev = document.createElement("div");
	buttonPrev.setAttribute("class", "pagination__button icon-chevron-left");
	buttonPrev.setAttribute("id", "buttonPrev");
	buttonPrev.setAttribute("data-url", responseData.info.prev);

	pagination.appendChild(buttonPrev);
	pagination.appendChild(buttonNext);
	appContent.appendChild(pagination);
}

/**
 * @function paginationSetCounter
 * @description Create counter pagination
 * @param {Object} responseData - response data of the ajax handler (json)
 * @see Used in: {@link paginationAdd}
 */
function paginationSetCounter(responseData) {
	const buttonPrev = document.getElementById("buttonPrev");

	const paginationTotal = responseData.info.pages;
	const paginationNext = responseData.info.next;
	let paginationNow = 0;

	// console.log(paginationNext);
	if (paginationNext == "") {
		paginationNow = paginationTotal;
	} else {
		const paginationNextUrl = new URL(paginationNext);
		const numPageNext = paginationNextUrl.searchParams.get("page");
		paginationNow = parseInt(numPageNext) - 1;

		if (paginationNow <= 1 || isNaN(paginationNow)) {
			paginationNow = 1;
		}
	}

	// console.log(paginationNext);
	// console.log(paginationNow);

	const paginationCounter = document.createElement("div");
	const paginationCounterText = document.createTextNode(`${paginationNow.toString()} - ${paginationTotal.toString()}`);

	paginationCounter.setAttribute("class", "pagination__counter");
	paginationCounter.appendChild(paginationCounterText);

	// console.log(paginationCounter);

	buttonPrev.parentNode.insertBefore(paginationCounter, buttonPrev.nextSibling);
}

/**
 * @function paginationAdd
 * @description Add pagination
 * @param {Object} responseData - response data of the ajax handler (json)
 * @see Used inside: {@link paginationCreate}, {@link paginationSetCounter}...
 * @see Used in: {@link filterFoundContent}
 */
export function paginationAdd(responseData) {
	paginationCreate(responseData);
	paginationSetCounter(responseData);

	const button = document.getElementsByClassName("pagination__button");
	for (let index = 0; index < button.length; index++) {
		const element = button[index];

		/**
		 * @description Remove/Add content and pagination by selecting the filter from the navigation menu.
		 * @event click
		 * @type {Object}
		 * @see Used inside: {@link filterRemoveContent}, {@link paginationRemove}, {@link apiAjaxHandler}
		 */
		element.addEventListener("click", function() {
			const url = this.getAttribute("data-url");

			if (url !== "") {
				filterRemoveContent();
				paginationRemove();
				apiAjaxHandler(url, "filterAddContent");
			}
		});
	}
}

/**
 * @function paginationRemove
 * @description Remove pagination
 * @see Used in: {@link scripts.js}, {@link filterAddContent}, {@link searchAdd}, {@link paginationAdd}
 */
export function paginationRemove() {
	const pagination = document.getElementById("pagination");
	if (pagination) {
		appContent.removeChild(pagination);
	}
}
