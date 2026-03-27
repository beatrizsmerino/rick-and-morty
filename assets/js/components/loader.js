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
 * @see Used in: {@link ajaxHandler}
 */
export function loaderAdd() {
	const loader = loaderCreate();
	if (loader) {
		const timer = setInterval(function() {
			const loaderDom = document.getElementById("loader");
			if (!loaderDom) {
				clearInterval(timer);

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
 * @see Used in: {@link ajaxHandler}
 */
export function loaderRemove() {
	const loaderDom = document.getElementById("loader");
	if (loaderDom) {
		// scripts.jsdocument.querySelectorAll(".page__item").style.filter = "none";
		document.body.classList.remove("is-searching");
		document.body.removeChild(loaderDom);
	}
}
