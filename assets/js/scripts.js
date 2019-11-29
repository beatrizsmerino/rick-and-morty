
let urlAPI = "https://rickandmortyapi.com/api/";

let appButton = document.getElementById("appButton");
let appContent = document.getElementById("appContent");


// AJAX HANDLER - FETCH
//////////////////////////////////
function insertAppContent(url) {
    let linkElementDom = document.createElement("a");
    let linkTextElementDom = document.createTextNode(url);

    linkElementDom.setAttribute("href", url);
    linkElementDom.setAttribute("target", "_blank");
    linkElementDom.appendChild(linkTextElementDom);
    appContent.appendChild(linkElementDom);
}

appButton.addEventListener("click", function(){
    alert("Get data API");
    insertAppContent(urlAPI);
});