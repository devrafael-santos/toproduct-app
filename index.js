
const modal = {
    newProductModal: () => document.getElementById("new-product-modal-section"),
    productModal: () => document.getElementById("product-modal-section"),
    closeNewProductModalBtn: () => document.getElementsByClassName("close")[0],
    closeProductModalBtn: () => document.getElementsByClassName("close")[1],
    nameRequireAlert: () => document.getElementById("name-require-alert"),
    nameInput: () => document.getElementById("new-product-name"),
    descriptionInput: () => document.getElementById("new-product-description"),
    priceInput: () => document.getElementById("new-product-price"),
    priceRequireAlert: () => document.getElementById("price-require-alert"),
    isAvailableBtn: () => document.getElementById("yes-btn"),
    isntAvailableBtn: () => document.getElementById("no-btn"),
    createNewProductBtn: () => document.getElementById("create-new-product-btn"),
}

let isAvailable = true;

const main = document.getElementById("main");
const body = document.getElementById("body");
let products = [];

insertProductsOnScreen();

async function insertProductsOnScreen() {

    showLoading();

    products = await fetch("https://toproduct-api-production.up.railway.app/products?sort=price,asc")
        .then(response => response.json())
        .then(data => data.content)
        .catch(error => {
            console.error(error.message);
            hideLoading();
        });


    products.forEach((product) => {

        document.getElementsByClassName("products-summary")[0].innerHTML += `
                <div class="product" onclick="openProductModal(this)">
                    <h5 class="product-name">${product.name}</h5>
                    <div class="product-price">
                        <h1 class="product-price-coin">R$</h1>
                        <h2 class="product-price-value">${product.price}</h2>
                    </div>
                </div>
        `;

    });
    hideLoading();

}

function setProductOnModal(product) {
    document.getElementById("product-name").innerText = product.name;
    document.getElementById("product-description").innerText = product.description;
    document.getElementById("product-price").innerText = product.price;

    if (product.available) {
        document.getElementById("product-isAvailable").innerText = "Disponível";
        document.getElementById("product-isAvailable").style.color = "green";
    } else {
        document.getElementById("product-isAvailable").innerText = "Indisponível";
        document.getElementById("product-isAvailable").style.color = "red";
    }
}

function openProductModal(productDiv) {
    modal.productModal().style.display = "block";
    main.style.filter = "blur(2px)";
    body.style.overflow = "hidden";

    const productName = productDiv.getElementsByClassName("product-name")[0].innerText;
    const product = products.find((product) => product.name == productName);

    setProductOnModal(product);
}

function closeProductModal() {
    modal.productModal().style.display = "none";
    main.style.filter = "none";
    body.style.overflow = "auto";
}

function openNewProductModal() {
    modal.newProductModal().style.display = "block";
    main.style.filter = "blur(2px)";
    body.style.overflow = "hidden";
}

function closeNewProductModal() {
    modal.newProductModal().style.display = "none";
    main.style.filter = "none";
    body.style.overflow = "auto";
}

document.getElementsByClassName("new-btn")[0].onclick = openNewProductModal;

window.addEventListener("keydown", (event) => {

    if(event.key === 'Escape') {
        if (modal.newProductModal().style.display == "block") {
            closeNewProductModal();
        }
        if (modal.productModal().style.display == "block") {
            closeProductModal();
        }
    }
});


modal.productModal().addEventListener("keydown", (event) => {
  if(event.key === 'Escape') {
       closeProductModal();
  }
});

modal.newProductModal().addEventListener("keydown", (event) => {
    if(event.key === 'Escape') {
        closeNewProductModal();
    }
});

window.onclick = function (event) {
    if (event.target == modal.newProductModal()) {
        closeNewProductModal();
    }
    if (event.target == modal.productModal()) {
        closeProductModal();
    }
}

modal.closeNewProductModalBtn().onclick = closeNewProductModal;
modal.closeProductModalBtn().onclick = closeProductModal;


modal.isAvailableBtn().onclick = function () {
    if (!isAvailable) {

        modal.isAvailableBtn().classList.remove("yes-btn-off");
        modal.isntAvailableBtn().classList.add("no-btn-off");
        isAvailable = true;
    }
}

modal.isntAvailableBtn().onclick = function () {
    if (isAvailable) {

        modal.isntAvailableBtn().classList.remove("no-btn-off");
        modal.isAvailableBtn().classList.add("yes-btn-off");
        isAvailable = false;
    }
}

modal.createNewProductBtn().onclick = async function () {

    if (modal.nameInput().value.length <= 0) {
        modal.nameRequireAlert().style.display = "block";
        return;
    } else {
        modal.nameRequireAlert().style.display = "none";
    }

    if (isNaN(parseFloat(modal.priceInput().value))) {
        modal.priceRequireAlert().style.display = "block";
        return
    } else if (modal.priceInput().value < 0) {
        modal.priceRequireAlert().style.display = "block";
        return;
    } else {
        modal.priceRequireAlert().style.display = "none";
    }

    closeNewProductModal();
    showLoading();

    fetch("https://toproduct-api-production.up.railway.app/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: modal.nameInput().value,
            description: modal.descriptionInput().value,
            price: parseFloat(modal.priceInput().value),
            available: isAvailable,
        }),
    })
        .then(response => response.json())
        .catch(error => {
            console.error(error.message);
            hideLoading();
        });

    closeNewProductModal();

    showLoading();
    setTimeout(() => {
        location.reload();
        hideLoading();
    }, 1000);
}
