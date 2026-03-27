/**
 * @module components/loader
 */

/**
 * @var loaderTimer
 * @description Timer ID for the loader interval, used to cancel it when `loaderRemove()` is called
 * @type {number|null}
 */
let loaderTimer = null;

/**
 * @function loaderCreate
 * @description Creation of a loading animation
 * @return {HTMLElement}
 * @see Used in: {@link loaderAdd}
 */
function loaderCreate() {
	const template = `
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
        `;
	const loader = document.createElement("div");

	loader.setAttribute("id", "loader");
	loader.setAttribute("class", "loader");
	loader.innerHTML = template;

	return loader;
}

/**
 * @function loaderAdd
 * @description Add loading animation
 * @see Used in: {@link apiAjaxHandler}
 */
export function loaderAdd() {
	const loader = loaderCreate();
	if (loader) {
		loaderTimer = setInterval(function() {
			const loaderDom = document.getElementById("loader");
			if (!loaderDom) {
				clearInterval(loaderTimer);
				loaderTimer = null;

				// document.querySelectorAll(".page__item").style.filter = "blur(1rem)";
				document.body.classList.add("is-searching");
				document.body.appendChild(loader);
			}
		}, 100);
	}
}

/**
 * @function loaderRemove
 * @description Remove loading animation
 * @see Used in: {@link apiAjaxHandler}
 */
export function loaderRemove() {
	if (loaderTimer) {
		clearInterval(loaderTimer);
		loaderTimer = null;
	}
	const loaderDom = document.getElementById("loader");
	if (loaderDom) {
		// document.querySelectorAll(".page__item").style.filter = "none";
		document.body.classList.remove("is-searching");
		document.body.removeChild(loaderDom);
	}
}
