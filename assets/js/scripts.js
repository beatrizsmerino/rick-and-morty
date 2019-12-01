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





// RESULT - FETCH
//////////////////////////////////
function insertAppContent(url) {
	let linkId = document.getElementById("linkApi");

	if (!linkId) {
		let link = document.createElement("a");
		let linkText = document.createTextNode(url);

		link.setAttribute("id", "linkApi");
		link.setAttribute("class", "link--api");
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
			item.setAttribute("data-url", element);
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

	function info() {
		console.info(responseData.info);
		let info = document.createElement("div");
		info.setAttribute("class", "list-info");
		info.innerHTML = "<p><strong>Results: </strong>" + responseData.info.count + "</p>";
		info.innerHTML += "<p><strong>Pages: <strong>" + responseData.info.pages + "</p>";
		return info;
	}

	function results() {
		console.log(responseData.results);
		let listCards = document.createElement("div")
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

				let cardParagraphDom = document.createElement("h4");
				cardParagraphDom.setAttribute("class", "card__subtitle");
				let cardParagraphTextDom = document.createTextNode(firstUpperCase(titleData) + ": ");
				cardParagraphDom.appendChild(cardParagraphTextDom);
				cardItemDom.appendChild(cardParagraphDom);

				// console.log(typeof cardItem);
				// console.assert(Array.isArray(cardItem), true);

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
					let cardParagraphDom = document.createElement("p");
					let cardParagraphTextDom = document.createTextNode(cardItemData);

					cardParagraphDom.appendChild(cardParagraphTextDom);
					cardItemDom.appendChild(cardParagraphDom);
				}

				card.appendChild(cardItemDom);
			}
			console.groupEnd();

			listCardsInner.appendChild(card);
		}
		console.groupEnd();

		listCards.appendChild(listCardsInner);

		return listCards;
	}

	list.appendChild(info());
	list.appendChild(results());
	elementDom.appendChild(list);
}

function removeFilterContent() {
	let list = document.getElementsByClassName("list")[0];
	if (list && list.innerHTML !== "") {
		appContent.removeChild(list);
	}
}

	}
}





appButton.addEventListener("click", function () {
	// alert("Get data API");
	insertAppContent(urlAPI);
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

					activeFilter(filterItem, this);

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
