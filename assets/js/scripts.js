
let urlAPI = "https://rickandmortyapi.com/api/";

let appButton = document.getElementById("appButton");
let appContent = document.getElementById("appContent");





// AJAX HANDLER - FETCH
//////////////////////////////////
function ajaxHandler(url) {

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
                insertNavAppContent(appContent, data);
                clearInterval(timer);
            }, 3000);

        })
        .catch(function (error) {
            console.warn(error);
        });
}





// RESULT - FETCH
//////////////////////////////////
function insertNavAppContent(elementDom, responseData) {
    let list = document.createElement("ul");
    list.setAttribute("class", "filter");

    let stylesItem = `
        text-transform: capitalize;
        font-weight: 700;
    `;

    for (const key in responseData) {
        const element = responseData[key];
        let item = document.createElement("li");
        let link = document.createElement("a");
        let linkText = document.createTextNode(key);

        link.setAttribute("href", element);
        link.appendChild(linkText);

        item.style += `; ${stylesItem}`;
        item.appendChild(link);
        
        list.appendChild(item);
    }

    elementDom.appendChild(list);
}






function insertAppContent(url) {
    let linkElementDom = document.createElement("a");
    let linkTextElementDom = document.createTextNode(url);

    linkElementDom.setAttribute("href", url);
    linkElementDom.setAttribute("target", "_blank");
    linkElementDom.appendChild(linkTextElementDom);
    appContent.appendChild(linkElementDom);
}



appButton.addEventListener("click", function () {
    // alert("Get data API");
    insertAppContent(urlAPI);
    ajaxHandler(urlAPI, function (data) {
        console.info("Data:", data);
    });
});