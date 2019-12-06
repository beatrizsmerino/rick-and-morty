let urlAPI = "https://rickandmortyapi.com/api/";

let appButton = document.getElementById("appButton");
let appContent = document.getElementById("appContent");





// TOOLS
//////////////////////////////////
function svgMe() {
	let images = document.querySelectorAll("img.svgMe");

	// console.info("Array of images -> ", images);

	images.forEach(image => {
		let imgId = image.getAttribute("id");
		let imgClass = image.getAttribute("class");
		let imgUrl = image.getAttribute("src");

		let request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				// console.info("request in xml -> ", request.responseXML);
				callback(request.responseXML);
			}
		};

		function callback(requestXML) {
			let imgSvg = requestXML.querySelector("svg");

			// console.info("data type of 'data' -> ", typeof requestXML);
			// console.info("'data' -> ", requestXML);
			// console.info("images with svgMe -> ", imgSvg);

			if (typeof imgId !== "undefined") {
				// console.info(imgId);
				imgSvg.setAttribute("id", imgId);
			}

			if (typeof imgClass !== "undefined") {
				// console.info(imgClass);
				imgSvg.setAttribute("class", imgClass);
				imgSvg.classList.add("svgMe--replaced");
			}

			imgSvg.removeAttribute("xmlns:a");
			if (
				!imgSvg.getAttribute("viewBox") &&
				imgSvg.getAttribute("height") &&
				imgSvg.getAttribute("width")
			) {
				imgSvg.setAttribute(
					"viewBox",
					"0 0 " +
					imgSvg.getAttribute("height") +
					" " +
					imgSvg.getAttribute("width")
				);
			}

			image.replaceWith(imgSvg);
		}

		request.open("GET", imgUrl);
		request.send();
	});
}

function firstUpperCase(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function delay(fn, ms) {
	let timer = 0;
	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(fn.bind(this, ...args), ms || 0);
	}
}

function getParametersURL(urlString) {
	let urlArray = urlString.split("?");
	let urlArrayParametters = urlArray[1].split("&");
	// console.log("urlString: " + urlString);
	// console.log("urlArray:  " + urlArray.length);
	// console.log("urlArray[1]: " + urlArray[1]);

	console.info(urlArray);
	console.info(urlArrayParametters);

	return urlArrayParametters;
}
function getValueParameterURL(arrayParametters, parameterToFound) {
	let found = arrayParametters.find(a => a.includes(parameterToFound));
	let parameter = found.split("=");
	let value = parameter[1];

	return value;
}





// AJAX HANDLER - FETCH
//////////////////////////////////
function ajaxHandler(url, action) {
	addLoader(appContent);

	fetch(url)
		.then(function (response) {
			//console.log("%c--- Promise 1 ---", "padding: 0.5rem 1rem; color: #C0C0C0; background-color: #454545;");
			// console.info(response);
			// Conversion to JSON
			return response.json();
		})
		.then(function (data) {
			//console.log("%c--- Promise 2 ---", "padding: 0.5rem 1rem; color: #C0C0C0; background-color: #454545;");
			// console.info(data);

			let timer = setInterval(function () {
				removeLoader(appContent);

				setAction(action, appContent, data);

				clearInterval(timer);
			}, 3000);
		})
		.catch(function (error) {
			console.warn(error);
		});
}





// LOADER
//////////////////////////////////
function addLoader(elementDom) {
	let template = `
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
        `;
	let loader = document.createElement("div");
	loader.setAttribute("id", "loader");
	elementDom.appendChild(loader);
	document.getElementById("loader").innerHTML = template;
}

function removeLoader(elementDom) {
	let loader = document.getElementById("loader");
	elementDom.removeChild(loader);
}





// FILTER
//////////////////////////////////
function insertAppContent(url) {
	let linkId = document.getElementById("linkApi");

	if (!linkId) {
		let link = document.createElement("a");
		let linkText = document.createTextNode(url);

		link.setAttribute("id", "linkApi");
		link.setAttribute("href", url);
		link.setAttribute("target", "_blank");
		link.appendChild(linkText);
		appContent.appendChild(link);
	}
}

function setAction(action, elementDom, dataResponse) {
	if (action === "insertFilter") {
		insertFilter(elementDom, dataResponse);
	} else if (action === "insertFilterContent") {
		insertFilterContent(elementDom, dataResponse);
	} else if (action === "insertSearchContent") {
		insertSearchContent(elementDom, dataResponse);
	}
}

function insertFilter(elementDom, responseData) {
	let navId = document.getElementById("filter");

	if (!navId) {
		let list = document.createElement("ul");
		list.setAttribute("id", "filter");
		list.setAttribute("class", "filter");

		for (const key in responseData) {
			const element = responseData[key];
			let item = document.createElement("li");
			let itemText = document.createTextNode(key);

			item.setAttribute("data-filter", key);
			item.setAttribute("data-url", element + "?page=1");
			item.setAttribute("class", "filter__item");

			item.appendChild(itemText);
			list.appendChild(item);
		}

		elementDom.appendChild(list);
	}
}

function activeFilter(item, thisActive) {
	for (let index = 0; index < item.length; index++) {
		const element = item[index];
		if (element.classList.contains("is-active")) {
			//console.log("has class");
			element.classList.remove("is-active");
		}
		thisActive.classList.add("is-active");
	}
}

function insertFilterContent(elementDom, responseData) {
	let list = document.createElement("section");
	list.setAttribute("class", "list");

	const infoContent = function () {
		console.table(responseData.info);
		let listInfo = document.createElement("div");
		listInfo.setAttribute("class", "list-info");
		listInfo.innerHTML = "<p><strong>Results: </strong>" + responseData.info.count + "</p>";

		return listInfo;
	};

	const resultsContent = function () {
		console.table(responseData.results);
		let listCards = document.createElement("div");
		let listCardsInner = document.createElement("div");

		listCards.setAttribute("class", "list-cards");

		listCardsInner.setAttribute("id", "filterResult");
		listCardsInner.setAttribute("class", "list-cards__inner");

		console.group("Results");
		for (const key in responseData.results) {
			const element = responseData.results[key];
			let card = document.createElement("article");

			card.setAttribute("class", "card");
			card.setAttribute("data-index", key);

			console.group("Result " + key);
			for (const titleData in element) {
				const cardItemData = element[titleData];
				console.info(firstUpperCase(titleData) + ": " + cardItemData);

				let cardItemDom = document.createElement("div");
				cardItemDom.setAttribute("class", "card__data");
				cardItemDom.setAttribute("data-type", titleData);

				if (titleData !== "image") {
					let cardParagraphDom = document.createElement("h4");
					cardParagraphDom.setAttribute("class", "card__subtitle");
					let cardParagraphTextDom = document.createTextNode(
						firstUpperCase(titleData) + ": "
					);
					cardParagraphDom.appendChild(cardParagraphTextDom);
					cardItemDom.appendChild(cardParagraphDom);
				} else {
					let cardImageDom = document.createElement("img");
					cardImageDom.setAttribute("src", cardItemData);
					cardItemDom.appendChild(cardImageDom);
				}

				//console.assert(typeof cardItemData === "string" || typeof cardItemData === "number", cardItemData + " es un " + typeof cardItemData);

				if (typeof cardItemData === "object") {
					if (Array.isArray(cardItemData)) {
						let cardUlDom = document.createElement("ul");
						cardUlDom.setAttribute("class", "card__list");

						for (let index = 0; index < cardItemData.length; index++) {
							const cardUlData = cardItemData[index];

							let cardLiDom = document.createElement("li");
							let cardLiTextDom = document.createTextNode(cardUlData);

							cardLiDom.appendChild(cardLiTextDom);
							cardUlDom.appendChild(cardLiDom);
						}

						cardItemDom.appendChild(cardUlDom);
					} else {
						let cardUlDom = document.createElement("ul");
						cardUlDom.setAttribute("class", "card__list");

						for (const key in cardItemData) {
							const cardUlData = cardItemData[key];

							let cardLiDom = document.createElement("li");
							let cardLiTextDom = document.createTextNode(cardUlData);

							cardLiDom.appendChild(cardLiTextDom);
							cardUlDom.appendChild(cardLiDom);
						}

						cardItemDom.appendChild(cardUlDom);
					}
				} else {
					if (titleData !== "image") {
						let cardParagraphDom = document.createElement("p");
						let cardParagraphTextDom = document.createTextNode(cardItemData);

						cardParagraphDom.appendChild(cardParagraphTextDom);
						cardItemDom.appendChild(cardParagraphDom);
					}
				}

				card.appendChild(cardItemDom);
			}
			console.groupEnd();

			listCardsInner.appendChild(card);
		}
		console.groupEnd();

		listCards.appendChild(listCardsInner);

		return listCards;
	};

	list.appendChild(infoContent());
	list.appendChild(resultsContent());
	elementDom.appendChild(list);

	moveImageFilterContent();


	let timerCard = setInterval(function () {
		let cardItem = document.getElementsByClassName("card");

		if (cardItem.length > 0) {
			clearInterval(timerCard);
			for (let index = 0; index < cardItem.length; index++) {
				const element = cardItem[index];

				element.addEventListener("click", function (e) {
					viewCard(cardItem, this);
				});
			}
		}
	});

	addPagination(responseData);
}

function moveImageFilterContent() {
	let card = document.querySelectorAll(".card");
	for (let index = 0; index < card.length; index++) {
		const element = card[index];
		let imageItem = element.querySelector(".card__data[data-type='image']");
		if (imageItem) {
			element.removeChild(imageItem);
			element.insertBefore(imageItem, element.firstChild);
		}
	}
};

function removeFilterContent() {
	let list = document.getElementsByClassName("list")[0];
	if (list && list.innerHTML !== "") {
		appContent.removeChild(list);
	}
}

function viewCard(item, thisView) {
	for (let index = 0; index < item.length; index++) {
		const element = item[index];
		if (!thisView.classList.contains("is-view")) {
			element.classList.remove("is-view");
		}
	}
	thisView.classList.toggle("is-view");
}





// SEARCH
//////////////////////////////////
function addSearch(activeFilter) {
	let searchDom = document.createElement("div");
	let searchInnerDom = document.createElement("div");
	let searchIconDom = document.createElement("div");
	let searchInput = document.createElement("input");
	let activeFilterText = activeFilter.getAttribute("data-filter");

	searchDom.setAttribute("id", "search");
	searchDom.setAttribute("class", "search");
	searchInnerDom.setAttribute("class", "search__inner");
	searchIconDom.setAttribute("class", "search__icon icon-magnifying-glass");

	searchInput.setAttribute("id", "searchInput");
	searchInput.setAttribute("class", "search__input");
	searchInput.setAttribute("placeholder", "Search by name of " + activeFilterText);

	searchInnerDom.appendChild(searchIconDom);
	searchInnerDom.appendChild(searchInput);
	searchDom.appendChild(searchInnerDom);
	appContent.appendChild(searchDom);

	let searchBy;
	switch (activeFilterText) {
		case "characters":
			searchBy = "character";
			break;
		case "episodies":
			searchBy = "episode";
			break;
		case "locations":
			searchBy = "location";
			break;
		default:
			break;
	}

	console.assert(searchBy !== "", "Not Search");
	console.log(searchBy);

	document.getElementById("searchInput").addEventListener("keyup", delay(function (e) {
		let valueInput = this.value;
		// console.log(this);
		// console.log(this.value);
		console.log(urlAPI + searchBy + "/?" + "name" + "=" + valueInput);
		console.assert(valueInput, "Input hasn`t value");

		removeFilterContent();
		removePagination();
		ajaxHandler(
			urlAPI + searchBy + "/?" + "name" + "=" + valueInput,
			"insertFilterContent",
			function (data) {
				console.info("Data: ", data);
			}
		);

	}, 500));
}

function removeSearch() {
	let search = document.getElementById("search");
	if (search) {
		appContent.removeChild(search);
	}
}




// PAGINATION
//////////////////////////////////
function addPagination(responseData) {
	let pagination, buttonNext, buttonPrev, paginationCounter;

	(function () {
		pagination = document.createElement("div");
		pagination.setAttribute("class", "pagination");
		pagination.setAttribute("id", "pagination");

		buttonNext = document.createElement("div");
		buttonNext.setAttribute("class", "pagination__button icon-chevron-right");
		buttonNext.setAttribute("id", "buttonNext");
		buttonNext.setAttribute("data-url", responseData.info.next);

		buttonPrev = document.createElement("div");
		buttonPrev.setAttribute("class", "pagination__button icon-chevron-left");
		buttonPrev.setAttribute("id", "buttonPrev");
		buttonPrev.setAttribute("data-url", responseData.info.prev);
	})();

	(function () {
		let filterActive = document.querySelector(".filter__item.is-active");
		let filterActiveUrl = filterActive.getAttribute("data-url");

		let paginationNext = responseData.info.next;
		let paginationNow = getValueParameterURL(getParametersURL(paginationNext), "page") - 1;

		if (paginationNow < 0 || isNaN(paginationNow) || paginationNow == "undefined" || paginationNow == "") {
			paginationNow = 1;
		}
		let paginationTotal = responseData.info.pages;
		paginationCounter = document.createElement("div");
		let paginationCounterText = document.createTextNode(
			paginationNow + " - " + paginationTotal
		);

		paginationCounter.setAttribute("class", "pagination__counter");
		paginationCounter.appendChild(paginationCounterText);
	})();

	pagination.appendChild(buttonPrev);
	pagination.appendChild(paginationCounter);
	pagination.appendChild(buttonNext);
	appContent.appendChild(pagination);

	let button = document.getElementsByClassName("pagination__button");
	for (let index = 0; index < button.length; index++) {
		const element = button[index];
		element.addEventListener("click", function () {
			let url = this.getAttribute("data-url");

			if (url !== "") {
				removeFilterContent();
				removePagination();
				ajaxHandler(url, "insertFilterContent", function (data) {
					console.info("Data:", data);
				});
			}
		});
	}
}

function removePagination() {
	let pagination = document.getElementById("pagination");
	if (pagination) {
		appContent.removeChild(pagination);
	}
}



appButton.addEventListener("click", function () {
	// alert("Get data API");
	insertAppContent(urlAPI);
	appContent.removeChild(document.getElementById("portal"));
	ajaxHandler(urlAPI, "insertFilter", function (data) {
		console.info("Data:", data);
	});
});

(function () {
	svgMe();

	let timerFilterItem = setInterval(function () {
		let filterItem = document.getElementsByClassName("filter__item");
		if (filterItem.length > 0) {
			clearInterval(timerFilterItem);
			for (let index = 0; index < filterItem.length; index++) {
				const element = filterItem[index];

				element.addEventListener("click", function () {
					removeFilterContent();
					removePagination();
					removeSearch();
					activeFilter(filterItem, this);
					addSearch(this);

					ajaxHandler(
						this.getAttribute("data-url"),
						"insertFilterContent",
						function (data) {
							console.info(key, data);
						}
					);
				});
			}
		}
	});
})();
