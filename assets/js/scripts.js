
let urlAPI = "https://rickandmortyapi.com/api/";

let appButton = document.getElementById("appButton");
let appContent = document.getElementById("appContent");




// TOOL - SVGME
function svgMe() {
    let images = document.querySelectorAll("img.svgMe");

    console.info("Array of images -> ", images);

    images.forEach(image => {
        let imgId = image.getAttribute("id");
        let imgClass = image.getAttribute("class");
        let imgUrl = image.getAttribute("src");


        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                console.info("request in xml -> ", request.responseXML);
                callback(request.responseXML);
            }
        };

        function callback(requestXML) {
            let imgSvg = requestXML.querySelector("svg");

            console.info("data type of 'data' -> ", typeof requestXML);
            console.info("'data' -> ", requestXML);
            console.info("images with svgMe -> ", imgSvg);

            if (typeof imgId !== "undefined") {
                console.info(imgId);
                imgSvg.setAttribute("id", imgId);
            }

            if (typeof imgClass !== "undefined") {
                console.info(imgClass);
                imgSvg.setAttribute("class", imgClass);
                imgSvg.classList.add("svgMe--replaced");
            }

            imgSvg.removeAttribute("xmlns:a");
            if (
                !imgSvg.getAttribute("viewBox") &&
                imgSvg.getAttribute("height") &&
                imgSvg.getAttribute("width")
            ) {
                imgSvg.setAttribute("viewBox", "0 0 " + imgSvg.getAttribute("height") + " " + imgSvg.getAttribute("width"));
            }

            image.replaceWith(imgSvg);
        }

        request.open("GET", imgUrl);
        request.send();
    });
}





// AJAX HANDLER - FETCH
//////////////////////////////////
function ajaxHandler(url, action) {
    addLoader(appContent);

    fetch(url)
        .then(function (response) {
            console.log("%c--- Promise 1 ---", "padding: 0.5rem 1rem; color: #C0C0C0; background-color: #454545;");
            console.info(response);
            // Conversion to JSON
            return response.json();
        })
        .then(function (data) {
            console.log("%c--- Promise 2 ---", "padding: 0.5rem 1rem; color: #C0C0C0; background-color: #454545;");
            console.info(data);

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
function setAction(action, elementDom, dataResponse) {
    if (action === "insertFilter") {
        insertNavAppContent(elementDom, dataResponse);
    }
}

function insertNavAppContent(elementDom, responseData) {
    let navId = document.getElementById("filter");

    if (!navId) {
        let list = document.createElement("ul");
        list.setAttribute("id", "filter");
        list.setAttribute("class", "filter");

        let stylesItem = `
            text-transform: capitalize;
        `;

        for (const key in responseData) {
            const element = responseData[key];
            let item = document.createElement("li");
            let link = document.createElement("a");
            let linkText = document.createTextNode(key);

            link.setAttribute("href", element);
            link.appendChild(linkText);

            item.setAttribute("class", "filter__item");
            item.style += `; ${stylesItem}`;
            item.appendChild(link);

            list.appendChild(item);
        }

        elementDom.appendChild(list);
    }
}






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



appButton.addEventListener("click", function () {
    // alert("Get data API");
    insertAppContent(urlAPI);
    ajaxHandler(urlAPI, 'insertFilter', function (data) {
        console.info("Data:", data);
    });
});


(function(){
    svgMe();
})();