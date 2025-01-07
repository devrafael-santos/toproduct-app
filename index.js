
const indexVars = {
    main: () => document.getElementById("main"),
    body: () => document.getElementById("body"),
    products: []
}

insertProductsOnScreen();

function insertProductsOnScreen() {

    showLoading();

    productService.findAllSortPriceAsc()
        .then(products => {
            products.forEach((product) => {

                document.getElementsByClassName("products-summary")[0].innerHTML += `
                        <div class="product" onclick="productModal.openModal(); productModal.setProductOnModal(this)">
                            <h5 class="product-name">${product.name}</h5>
                            <div class="product-price">
                                <h1 class="product-price-coin">R$</h1>
                                <h2 class="product-price-value">${product.price}</h2>
                            </div>
                        </div>
                `;
            });
            indexVars.products = products;
            hideLoading();
        })
        .catch(error => {
            console.error(error.message);
            hideLoading();
        });
}

window.addEventListener("keydown", (event) => {

    if (event.key === 'Escape') {
        if (newProductModal.modal().style.display == "block") {
            newProductModal.closeModal();
        }
        if (productModal.modal().style.display == "block") {
            productModal.closeModal();
        }
    }
});

window.onclick = function (event) {
    if (event.target == newProductModal.modal()) {
        newProductModal.closeModal();
    }
    if (event.target == productModal.modal()) {
        productModal.closeModal();
    }
}

newProductModal.closeModalBtn().onclick = newProductModal.closeModal;
productModal.closeModalBtn().onclick = productModal.closeModal;


