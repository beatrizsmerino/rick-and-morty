/**
 * @module components/filter
 */
import { appContent } from "../constants/dom.js";
import { cardCreate, cardMoveImage, cardWhenClicked } from "./card.js";
import { paginationAdd, paginationRemove } from "./pagination.js";

/**
 * @function filterSetAction
 * @description List of functions to choose from
 * @param {String} action - name of the action to execute
 * @param {HTMLElement} elementDom - DOM element where the response data is inserted
 * @param {Object} dataResponse - response data of the ajax handler (json)
 * @see {@link module:components/filter~filterAdd|filterAdd}
 * @see {@link module:components/filter~filterAddContent|filterAddContent}
 * @see {@link module:services/api~apiAjaxHandler|apiAjaxHandler}
 */
export function filterSetAction(action, elementDom, dataResponse) {
	if (action === "filterAdd") {
		filterAdd(elementDom, dataResponse);
	} else if (action === "filterAddContent") {
		filterAddContent(elementDom, dataResponse);
	}
}

/**
 * @function filterAdd
 * @description Add navigation menu filtering through the 3 types of data (characters, locations and episodes) to the app content.
 * @param {HTMLElement} elementDom - DOM element where the filter is inserted
 * @param {Object} responseData - response data of the ajax handler (json)
 * @see {@link module:components/filter~filterSetAction|filterSetAction}
 */
function filterAdd(elementDom, responseData) {
	const navId = document.getElementById("filter");

	if (!navId) {
		const list = document.createElement("ul");
		list.setAttribute("id", "filter");
		list.setAttribute("class", "filter");

		for (const key in responseData) {
			if (Object.hasOwn(responseData, key)) {
				const element = responseData[key];
				const item = document.createElement("li");
				const itemText = document.createTextNode(key);

				item.setAttribute("data-filter", key);
				item.setAttribute("data-url", `${element}?page=1`);
				item.setAttribute("class", "filter__item");

				item.appendChild(itemText);
				list.appendChild(item);
			}
		}

		elementDom.appendChild(list);
	}
}

/**
 * @function filterActive
 * @description Add class 'is-active' to the item of the navigation clicked.
 * @param {HTMLCollection} item - filter list
 * @param {Element} thisActive - filter selected
 * @see {@link module:scripts|scripts.js}
 */
export function filterActive(item, thisActive) {
	for (let index = 0; index < item.length; index++) {
		const element = item[index];
		if (element.classList.contains("is-active")) {
			// console.log("has class");
			element.classList.remove("is-active");
		}
		thisActive.classList.add("is-active");
	}
}

/**
 * @function filterAddContentInfo
 * @description Insert information to the content with the number of results of the request
 * @param {Object} responseData - response data of the ajax handler (json)
 * @return {Element} returns the info content element
 * @see {@link module:components/filter~filterAddContent|filterAddContent}
 */
function filterAddContentInfo(responseData) {
	// console.table(responseData.info);
	const listInfo = document.createElement("div");
	listInfo.setAttribute("class", "list-info");
	listInfo.innerHTML = `<p><strong>Results: </strong>${responseData.info.count}</p>`;

	return listInfo;
}

/**
 * @function filterAddContentResults
 * @description Insert results to the content of the request
 * @param {Object} responseData - response data of the ajax handler (json)
 * @return {Element} returns the results content element
 * @see {@link module:components/card~cardCreate|cardCreate}
 * @see {@link module:components/card~cardMoveImage|cardMoveImage}
 * @see {@link module:components/card~cardWhenClicked|cardWhenClicked}
 * @see {@link module:components/filter~filterAddContent|filterAddContent}
 */
function filterAddContentResults(responseData) {
	// console.table(responseData.results);
	const listCards = document.createElement("div");
	const listCardsInner = document.createElement("div");

	listCards.setAttribute("class", "list-cards");

	listCardsInner.setAttribute("id", "filterResult");
	listCardsInner.setAttribute("class", "list-cards__inner");

	cardCreate(listCardsInner, responseData);
	cardMoveImage();
	cardWhenClicked();

	listCards.appendChild(listCardsInner);

	return listCards;
}

/**
 * @function filterAddContent
 * @description Add the filter content application
 * @param {HTMLElement} elementDom - DOM element where the filter content is inserted
 * @param {Object} responseData - response data of the ajax handler (json)
 * @see {@link module:components/filter~filterAddContentInfo|filterAddContentInfo}
 * @see {@link module:components/filter~filterAddContentResults|filterAddContentResults}
 * @see {@link module:components/filter~filterSetAction|filterSetAction}
 */
function filterAddContent(elementDom, responseData) {
	const list = document.createElement("section");
	list.setAttribute("class", "list");
	list.setAttribute("id", "list");

	const infoContent = filterAddContentInfo(responseData);
	const resultsContent = filterAddContentResults(responseData);

	/**
	 * @function filterAddAllContent
	 * @description Insert the content
	 * @see {@link module:components/filter~filterFoundContent|filterFoundContent}
	 */
	function filterAddAllContent() {
		list.appendChild(infoContent);
		list.appendChild(resultsContent);
		elementDom.appendChild(list);
	}

	/**
	 * @function filterFoundContent
	 * @description Check if the contents of one filter are shown and before loading another one, delete it
	 * @return {boolean} returns true if content was replaced, false otherwise
	 * @see {@link module:components/filter~filterAddAllContent|filterAddAllContent}
	 * @see {@link module:components/filter~filterRemoveContent|filterRemoveContent}
	 * @see {@link module:components/pagination~paginationRemove|paginationRemove}
	 * @see {@link module:components/pagination~paginationAdd|paginationAdd}
	 */
	function filterFoundContent() {
		const element = document.querySelectorAll(".list");

		// console.dir(element);
		// console.log(element.length);
		if (element.length === 0) {
			filterAddAllContent();
			paginationAdd(responseData);

			return false;
		}
		filterRemoveContent();
		paginationRemove();
		filterAddAllContent();
		paginationAdd(responseData);

		return true;
	}

	const timer = setInterval(function() {
		try {
			if (filterFoundContent()) {
				clearInterval(timer);
			}
		} catch (error) {
			console.error(error);
			clearInterval(timer);
		}
	}, 100);
}

/**
 * @function filterRemoveContent
 * @description Remove the selected filter content of the application content
 * @see {@link module:components/search~searchAdd|searchAdd}
 * @see {@link module:components/filter~filterAddContent|filterAddContent}
 * @see {@link module:components/pagination~paginationAdd|paginationAdd}
 * @see {@link module:scripts|scripts.js}
 */
export function filterRemoveContent() {
	const list = document.querySelectorAll(".list");
	for (let index = 0; index < list.length; index++) {
		const element = list[index];
		if (element && element.innerHTML !== "") {
			appContent.removeChild(element);
		}
	}
}
