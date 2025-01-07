
function showLoading() {
    const div = document.createElement("div");
    div.classList.add("loading");

    indexVars.main().style.filter = "blur(2.5px)";

    document.body.appendChild(div);
}

function hideLoading() {
    const loadings = document.getElementsByClassName("loading");

    if(loadings.length) {
        loadings[0].remove();
        indexVars.main().style.filter = "none";
    }
}