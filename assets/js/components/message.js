/**
 * @module components/message
 */
import { appContent } from "../constants/dom.js";
import { filterRemoveContent } from "./filter.js";
import { paginationRemove } from "./pagination.js";

/**
 * @function messageAdd
 * @description Create the message component
 * @param {String} messageId - Id for events js
 * @param {String} messageClass - Class css with modifier BEM of the message
 * @param {String} messageText - Text of the message
 * @return {HTMLElement|null} returns the message element or null if already exists
 * @see Used inside: {@link messageCloseAdd}
 * @see Used in: {@link messageError404Add}, {@link messageAlertAdd}
 */
export function messageAdd(messageId, messageClass, messageText) {
	const messageDom = document.getElementById(messageId);

	let messageButton = "";
	switch (messageClass) {
	case "message-alert":
		messageButton = messageCloseAdd();
		messageButton = messageButton.outerHTML;
		break;
	case "message-error404":
		messageButton = "";
		break;
	default:
		break;
	}

	if (!messageDom) {
		const messageElem = document.createElement("div");
		messageElem.setAttribute("id", messageId);
		messageElem.setAttribute("class", `message ${messageClass}`);

		const templateMessage = `
			<div class="message__inner">
				${messageButton}
				<div class="message__content">
					<p>
						${messageText}
					</p>
				</div>
			</div>
		`;
		messageElem.innerHTML = templateMessage;

		return messageElem;
	}

	return null;
}

/**
 * @function messageCloseAdd
 * @description Create a button for remove the message
 * @return {HTMLElement} returns the close button element
 * @see Used in: {@link messageAlertAdd}
 */
function messageCloseAdd() {
	const buttonDom = document.createElement("button");
	buttonDom.classList.add("message__button-close");

	return buttonDom;
}

/**
 * @function messageRemove
 * @description Remove the message component
 * @param {String} messageId - id of the message to remove
 * @see Used in: {@link apiAjaxHandler}
 */
export function messageRemove(messageId) {
	const message = document.getElementById(messageId);
	if (message) {
		message.parentElement.removeChild(message);

		// console.log("Message removed");
	}
}

/**
 * @function messageError404Add
 * @description Add message error 404 (search not found)
 * @see Used inside: {@link messageAdd}
 * @see Used in: {@link apiAjaxHandler}
 */
export function messageError404Add() {
	filterRemoveContent();
	paginationRemove();

	const templateMessage = messageAdd("messageError404", "message-error404", "Error 404.</br> Search not found");
	appContent.appendChild(templateMessage);
}

/**
 * @function messageAlertAdd
 * @description Create a alert personalized
 * @param {String} messageName - Name of message in camellCase
 * @param {String} messageText - Text of message
 * @see Used inside: {@link messageAdd}, {@link messageRemove}
 */
export function messageAlertAdd(messageName, messageText) {
	const messageId = `messageAlert${messageName}`;
	const templateMessage = messageAdd(messageId, "message-alert", messageText);
	document.body.appendChild(templateMessage);
	document.querySelector(`#${messageId} .message__button-close`).addEventListener("click", function() {
		messageRemove(messageId);
	});
}
