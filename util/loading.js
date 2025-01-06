
function showLoading() {
    const div = document.createElement("div");
    div.classList.add("loading");

    main.style.filter = "blur(2.5px)";

    document.body.appendChild(div);
}

function hideLoading() {
    const loadings = document.getElementsByClassName("loading");

    if(loadings.length) {
        loadings[0].remove();
        main.style.filter = "none";
    }
}