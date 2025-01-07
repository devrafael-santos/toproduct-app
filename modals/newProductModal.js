const newProductModal = {
    modal: () => document.getElementById("new-product-modal-section"),
    closeModalBtn: () => document.getElementsByClassName("close")[0],

    nameRequireAlert: () => document.getElementById("name-require-alert"),
    nameInput: () => document.getElementById("new-product-name"),
    descriptionInput: () => document.getElementById("new-product-description"),
    priceRequireAlert: () => document.getElementById("price-require-alert"),
    priceInput: () => document.getElementById("new-product-price"),
    isAvailableBtn: () => document.getElementById("yes-btn"),
    isntAvailableBtn: () => document.getElementById("no-btn"),
    createNewProductBtn: () => document.getElementById("create-new-product-btn"),
    isAvailable: true,

    openModal: () => {
        newProductModal.modal().style.display = "block";
        indexVars.main().style.filter = "blur(2px)";
        indexVars.body().style.overflow = "hidden";
    },
    closeModal: () => {
        newProductModal.modal().style.display = "none";
        indexVars.main().style.filter = "none";
        indexVars.body().style.overflow = "auto";
    }
}

document.getElementsByClassName("new-btn")[0].onclick = newProductModal.openModal;

newProductModal.isAvailableBtn().onclick = function () {
    if (!newProductModal.isAvailable) {

        newProductModal.isAvailableBtn().classList.remove("yes-btn-off");
        newProductModal.isntAvailableBtn().classList.add("no-btn-off");
        newProductModal.isAvailable = true;
        console.log(newProductModal.isAvailable);
    }
}

newProductModal.isntAvailableBtn().onclick = function () {
    if (newProductModal.isAvailable) {

        newProductModal.isntAvailableBtn().classList.remove("no-btn-off");
        newProductModal.isAvailableBtn().classList.add("yes-btn-off");
        newProductModal.isAvailable = false;
        console.log(newProductModal.isAvailable);
    }
}

newProductModal.createNewProductBtn().onclick = function () {

    if (newProductModal.nameInput().value.length <= 0) {
        newProductModal.nameRequireAlert().style.display = "block";
        return;
    } else {
        newProductModal.nameRequireAlert().style.display = "none";
    }

    if (isNaN(parseFloat(newProductModal.priceInput().value))) {
        newProductModal.priceRequireAlert().style.display = "block";
        return
    } else if (newProductModal.priceInput().value < 0) {
        newProductModal.priceRequireAlert().style.display = "block";
        return;
    } else {
        newProductModal.priceRequireAlert().style.display = "none";
    }

    newProductModal.closeModal();
    showLoading();

    productService.createProduct()
        .then(responseStatusCode => {
            if(responseStatusCode === 201) {
                location.reload();
                hideLoading();
            }
            
        })
        .catch(error => {
            console.error(error.message);
            hideLoading();
        });
}