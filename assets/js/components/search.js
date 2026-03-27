/**
 * @module components/search
 */
import { urlAPI } from "../constants/api.js";
import { appContent } from "../constants/dom.js";
import { delay } from "../utils/timer.js";
import { apiAjaxHandler } from "../services/api.js";
import { filterRemoveContent } from "./filter.js";
import { paginationRemove } from "./pagination.js";

/**
 * @function searchCreate
 * @description Create searcher
 * @see Used in: {@link searchAdd}
 */
function searchCreate() {
	const searchDom = document.createElement("div");
	const searchInnerDom = document.createElement("div");
	const searchIconDom = document.createElement("div");
	const searchInput = document.createElement("input");

	searchDom.setAttribute("id", "search");
	searchDom.setAttribute("class", "search");
	searchInnerDom.setAttribute("class", "search__inner");
	searchIconDom.setAttribute("class", "search__icon icon-magnifying-glass");

	searchInput.setAttribute("id", "searchInput");
	searchInput.setAttribute("class", "search__input");

	searchInnerDom.appendChild(searchIconDom);
	searchInnerDom.appendChild(searchInput);
	searchDom.appendChild(searchInnerDom);
	appContent.appendChild(searchDom);
}

/**
 * @function searchGet
 * @description Get the active filter to find it.
 * @param {Element} filterSelected - filter selected
 * @return {String} returns the search category name
 * @see Used in: {@link searchAdd}
 */
function searchGet(filterSelected) {
	const searchInput = document.getElementById("searchInput");
	const filterActiveText = filterSelected.getAttribute("data-filter");
	searchInput.setAttribute("placeholder", `Search by name of ${filterActiveText}`);

	let searchBy = "";
	switch (filterActiveText) {
	case "characters":
		searchBy = "character";
		break;
	case "episodes":
		searchBy = "episode";
		break;
	case "locations":
		searchBy = "location";
		break;
	default:
		break;
	}

	// console.assert(searchBy !== "", "Not Search");
	// console.log(searchBy);

	return searchBy;
}

/**
 * @function searchAdd
 * @description Add searcher
 * @param {Element} filterSelected - filter selected
 * @see Used inside: {@link searchCreate}, {@link searchGet}...
 * @see Used in: {@link scripts.js}
 */
export function searchAdd(filterSelected) {
	searchCreate();

	const searchBy = searchGet(filterSelected);

	/**
	 * @description Search by selected filter name when typing in the search engine input.
	 * @event keyup
	 * @type {Object}
	 * @see Used inside: {@link delay}, {@link filterRemoveContent}, {@link paginationRemove}, {@link apiAjaxHandler}
	 */
	document.getElementById("searchInput").addEventListener(
		"keyup",
		delay(function() {
			const valueInput = this.value;

			filterRemoveContent();
			paginationRemove();
			apiAjaxHandler(`${urlAPI + searchBy}/?name=${valueInput}`, "filterAddContent");

			// console.log(this);
			// console.log(this.value);
			// console.log(urlAPI + searchBy + "/?name=" + valueInput);
			// console.assert(valueInput, "Input hasn`t value");
		}, 500),
	);
}

/**
 * @function searchRemove
 * @description Remove searcher
 * @see Used in: {@link scripts.js}
 */
export function searchRemove() {
	const search = document.getElementById("search");
	if (search) {
		appContent.removeChild(search);
	}
}
