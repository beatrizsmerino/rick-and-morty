/**
 * @module scripts
 * @description Get the data from the API 'Rick and Morty' and display it. It generates a navigation menu filtering through the 3 types of data (characters, locations and episodes). It has a pagination in each of them. It has a searcher input to filter by name.
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright Beatriz Sopeña Merino 2019. It is free software and you can find the source code on Github.
 * @see {@link https://beatrizsmerino.github.io/rick-and-morty/}
 */

import { urlAPI } from "./constants/api.js";
import { appButton, appContent } from "./constants/dom.js";
import { svgMe } from "./utils/svg.js";
import { apiAddLink, apiAjaxHandler } from "./services/api.js";
import { adblockVerify } from "./components/adblock.js";
import { addCurrentYear } from "./components/copyright.js";
import { filterActive, filterRemoveContent } from "./components/filter.js";
import { paginationRemove } from "./components/pagination.js";
import { searchAdd, searchRemove } from "./components/search.js";

/**
 * @description Get API data
 * @event click
 * @type {Object}
 * @see {@link module:services/api~apiAddLink|apiAddLink}
 * @see {@link module:services/api~apiAjaxHandler|apiAjaxHandler}
 */
appButton.addEventListener("click", function() {
	// alert("Get API data");
	apiAddLink(urlAPI);
	const portal = document.getElementById("portal");
	if (portal) {
		appContent.removeChild(portal);
	}
	apiAjaxHandler(urlAPI, "filterAdd");
});

/**
 * @function functionAnonimAutoExecuted
 * @description Anonymous auto executed function
 * @see {@link module:utils/svg~svgMe|svgMe}
 */
(function() {
	adblockVerify();
	svgMe();
	addCurrentYear();

	const timerFilterItem = setInterval(function() {
		const filterArray = document.getElementsByClassName("filter__item");
		if (filterArray.length > 0) {
			clearInterval(timerFilterItem);
			for (let index = 0; index < filterArray.length; index++) {
				const filterItem = filterArray[index];

				/**
				 * @description Remove / Add content and pagination when selecting the filter of the navigation menu.
				 * @event click
				 * @type {Object}
				 * @see {@link module:components/filter~filterRemoveContent|filterRemoveContent}
				 * @see {@link module:components/pagination~paginationRemove|paginationRemove}
				 * @see {@link module:components/search~searchRemove|searchRemove}
				 * @see {@link module:components/filter~filterActive|filterActive}
				 * @see {@link module:components/search~searchAdd|searchAdd}
				 * @see {@link module:services/api~apiAjaxHandler|apiAjaxHandler}
				 */
				filterItem.addEventListener("click", function() {
					filterRemoveContent();
					paginationRemove();
					searchRemove();

					filterActive(filterArray, this);
					searchAdd(this);
					apiAjaxHandler(this.getAttribute("data-url"), "filterAddContent");
				});
			}
		}
	});
}());
