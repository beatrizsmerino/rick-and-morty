import { messageAlertAdd } from "./message.js";

//
// @function adblockDetected
// @description Callback executed if adblock is installed
// @see Used inside {@link messageAlert}
// @see Used in: {@link checkAdblock}
//
function adblockDetected() {
	const message = "<i class='message-alert__icon icon-warning'></i> AdBlock is enabled";

	// console.warn(message);
	// alert(message);
	messageAlertAdd("AdBlock", message);
}

//
// @function adblockDisabled
// @description Callback executed if adblock is disabled
// @see Used in: {@link checkAdblock}
//
function adblockDisabled() {
	// let message = "AdBlock is not enabled";
	// console.info(message);
}

//
// @function adblockVerify
// @description Verify if the user has installed the Adblock browser extension
// @see Used inside: {@link adblockDetected} {@link adblockDisabled}
// @see Used in: {@link functionAnonimAutoExecuted}
//
export function adblockVerify() {
	if (typeof blockAdBlock === "undefined") {
		adblockDetected();
	} else {
		blockAdBlock.onDetected(adblockDetected);
		blockAdBlock.onNotDetected(adblockDisabled);
	}
}
