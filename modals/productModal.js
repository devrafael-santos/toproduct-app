const productModal = {
    modal: () => document.getElementById("product-modal-section"),
    closeModalBtn: () => document.getElementsByClassName("close")[1],

    openModal: () => {
        productModal.modal().style.display = "block";
        indexVars.main().style.filter = "blur(2px)";
        indexVars.body().style.overflow = "hidden";
    },
    closeModal: () => {
        productModal.modal().style.display = "none";
        indexVars.main().style.filter = "none";
        indexVars.body().style.overflow = "auto";
    },
    setProductOnModal: (productDiv) => {
        const productName = productDiv.getElementsByClassName("product-name")[0].innerText;
        const product = indexVars.products.find((product) => product.name == productName);

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
}