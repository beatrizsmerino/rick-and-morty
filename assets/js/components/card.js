/**
 * @module components/card
 */
import { firstUpperCase } from "../utils/string.js";

/**
 * @function cardCreateList
 * @description Create a list of items from an array or object
 * @param {Array|object} data - data to create list items from
 * @returns {HTMLElement} returns the ul element with li children
 * @see {@link module:components/card~cardCreateItem|cardCreateItem}
 */
function cardCreateList(data) {
	const cardUlDom = document.createElement("ul");
	cardUlDom.setAttribute("class", "card__list");

	if (Array.isArray(data)) {
		for (let index = 0; index < data.length; index++) {
			const cardUlData = data[index];

			const cardLiDom = document.createElement("li");
			const cardLiTextDom = document.createTextNode(cardUlData);

			cardLiDom.appendChild(cardLiTextDom);
			cardUlDom.appendChild(cardLiDom);
		}
	} else {
		for (const subKey in data) {
			if (Object.hasOwn(data, subKey)) {
				const cardUlData = data[subKey];

				const cardLiDom = document.createElement("li");
				const cardLiTextDom = document.createTextNode(cardUlData);

				cardLiDom.appendChild(cardLiTextDom);
				cardUlDom.appendChild(cardLiDom);
			}
		}
	}

	return cardUlDom;
}

/**
 * @function cardCreateItem
 * @description Create the content for a card data field
 * @param {string} titleData - property name
 * @param {string|number|Array|object} cardItemData - property value
 * @returns {HTMLElement} returns the card data div element
 * @see {@link module:components/card~cardCreateList|cardCreateList}
 * @see {@link module:components/card~cardCreate|cardCreate}
 */
function cardCreateItem(titleData, cardItemData) {
	const cardItemDom = document.createElement("div");
	cardItemDom.setAttribute("class", "card__data");
	cardItemDom.setAttribute("data-type", titleData);

	if (titleData !== "image") {
		const cardParagraphDom = document.createElement("h4");
		cardParagraphDom.setAttribute("class", "card__subtitle");
		const cardParagraphTextDom = document.createTextNode(`${firstUpperCase(titleData)}: `);
		cardParagraphDom.appendChild(cardParagraphTextDom);
		cardItemDom.appendChild(cardParagraphDom);
	} else {
		const cardImageDom = document.createElement("img");
		cardImageDom.setAttribute("src", cardItemData);
		cardItemDom.appendChild(cardImageDom);
	}

	if (typeof cardItemData === "object") {
		cardItemDom.appendChild(cardCreateList(cardItemData));
	} else if (titleData !== "image") {
		const cardParagraphDom = document.createElement("p");
		const cardParagraphTextDom = document.createTextNode(cardItemData);

		cardParagraphDom.appendChild(cardParagraphTextDom);
		cardItemDom.appendChild(cardParagraphDom);
	}

	return cardItemDom;
}

/**
 * @function cardCreate
 * @description Create card with the data response
 * @param {Element} listCardsInner - DOM element that wraps up the card list
 * @param {object} responseData - response data of the ajax handler (json)
 * @see {@link module:components/card~cardCreateItem|cardCreateItem}
 * @see {@link module:components/card~cardCreateList|cardCreateList}
 * @see {@link module:utils/string~firstUpperCase|firstUpperCase}
 * @see {@link module:components/filter~filterAddContentResults|filterAddContentResults}
 */
export function cardCreate(listCardsInner, responseData) {
	// console.group("Results");
	for (const key in responseData.results) {
		if (Object.hasOwn(responseData.results, key)) {
			const element = responseData.results[key];
			const card = document.createElement("article");

			card.setAttribute("class", "card");
			card.setAttribute("data-index", key);

			const cardButton = document.createElement("span");
			cardButton.setAttribute("class", "card__button icon-eye");

			// console.group("Result " + key);
			for (const titleData in element) {
				if (Object.hasOwn(element, titleData)) {
					const cardItemData = element[titleData];

					// console.info(firstUpperCase(titleData) + ": " + cardItemData);

					card.appendChild(cardButton);
					card.appendChild(cardCreateItem(titleData, cardItemData));
				}
			}

			// console.groupEnd();

			listCardsInner.appendChild(card);
		}
	}

	// console.groupEnd();
}

/**
 * @function cardMoveImage
 * @description Move the card image up.
 * @see {@link module:components/filter~filterAddContentResults|filterAddContentResults}
 */
export function cardMoveImage() {
	const timer = setInterval(function() {
		const cardData = document.querySelectorAll(".card__data");
		if (cardData.length > 0) {
			clearInterval(timer);
			const card = document.querySelectorAll(".card");
			for (let index = 0; index < card.length; index++) {
				const element = card[index];
				const imageItem = element.querySelector(".card__data[data-type='image']");
				if (imageItem) {
					element.removeChild(imageItem);
					element.insertBefore(imageItem, element.firstChild);
				}
			}
		}
	}, 300);
}

/**
 * @function cardToggleView
 * @description See more card info
 * @param {HTMLCollection} item - list of cards
 * @param {Element} thisView - card selected
 * @see {@link module:components/card~cardWhenClicked|cardWhenClicked}
 */
function cardToggleView(item, thisView) {
	for (let index = 0; index < item.length; index++) {
		const element = item[index];
		if (!thisView.classList.contains("is-view")) {
			element.classList.remove("is-view");
		}
	}
	thisView.classList.toggle("is-view");
}

/**
 * @function cardWhenClicked
 * @description Event click in the card
 * @see {@link module:components/card~cardToggleView|cardToggleView}
 * @see {@link module:scripts|scripts.js}
 */
export function cardWhenClicked() {
	const timerCard = setInterval(function() {
		const cardItem = document.getElementsByClassName("card");

		if (cardItem.length > 0) {
			clearInterval(timerCard);
			for (let index = 0; index < cardItem.length; index++) {
				const element = cardItem[index];

				/**
				 * @description View more card info when click it.
				 * @event click
				 * @type {object}
				 * @see {@link module:components/card~cardToggleView|cardToggleView}
				 */
				element.addEventListener("click", function() {
					cardToggleView(cardItem, this);
				});
			}
		}
	});
}
