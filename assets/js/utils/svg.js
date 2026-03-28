/**
 * @module utils/svg
 */

/**
 * @function svgMe
 * @description Converts an `<img>` tag, with a `.svg` extension and a class `svgMe`, into a `<svg>` tag.
 * @see Used in: {@link scripts.js}
 */
export function svgMe() {
	const images = document.querySelectorAll("img.svgMe");

	// console.info("Array of images -> ", images);

	images.forEach(image => {
		const imgId = image.getAttribute("id");
		const imgClass = image.getAttribute("class");
		const imgUrl = image.getAttribute("src");
		if (!imgUrl) {
			return;
		}

		const request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (request.readyState === 4 && request.status === 200) {
				// console.info("request in xml -> ", request.responseXML);
				return callback(request.responseXML);
			}

			return null;
		};

		function callback(requestXML) {
			const imgSvg = requestXML.querySelector("svg");
			if (!imgSvg) {
				return;
			}

			// console.info("data type of 'data' -> ", typeof requestXML);
			// console.info("'data' -> ", requestXML);
			// console.info("images with svgMe -> ", imgSvg);

			if (imgId) {
				// console.info(imgId);
				imgSvg.setAttribute("id", imgId);
			}

			if (imgClass) {
				// console.info(imgClass);
				imgSvg.setAttribute("class", imgClass);
				imgSvg.classList.add("svgMe--replaced");
			}

			imgSvg.removeAttribute("xmlns:a");
			if (!imgSvg.getAttribute("viewBox") && imgSvg.getAttribute("height") && imgSvg.getAttribute("width")) {
				imgSvg.setAttribute("viewBox", `0 0 ${imgSvg.getAttribute("height")} ${imgSvg.getAttribute("width")}`);
			}

			image.replaceWith(imgSvg);
		}

		request.open("GET", imgUrl);
		request.send();
	});
}
