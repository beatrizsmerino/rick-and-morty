/**
 * @module components/adblock
 */
import { messageAlertAdd } from "./message.js";

/**
 * @function adblockDetected
 * @description Callback executed if adblock is installed
 * @see {@link module:components/message~messageAlertAdd|messageAlertAdd}
 * @see {@link module:components/adblock~adblockVerify|adblockVerify}
 */
function adblockDetected() {
	const message = "<i class='message-alert__icon icon-warning'></i> AdBlock is enabled";

	// console.warn(message);
	// alert(message);
	messageAlertAdd("AdBlock", message);
}

/**
 * @function adblockDisabled
 * @description Callback executed if adblock is disabled
 * @see {@link module:components/adblock~adblockVerify|adblockVerify}
 */
function adblockDisabled() {
	// let message = "AdBlock is not enabled";
	// console.info(message);
}

/**
 * @function adblockVerify
 * @description Verify if the user has installed the Adblock browser extension
 * @see {@link module:components/adblock~adblockDetected|adblockDetected}
 * @see {@link module:components/adblock~adblockDisabled|adblockDisabled}
 * @see {@link module:scripts|scripts.js}
 */
export function adblockVerify() {
	if (typeof blockAdBlock === "undefined") {
		adblockDetected();
	} else {
		blockAdBlock.onDetected(adblockDetected);
		blockAdBlock.onNotDetected(adblockDisabled);
	}
}
