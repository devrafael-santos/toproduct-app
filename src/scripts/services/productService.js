const productService = {
    findAllSortPriceAsc: async () => {
        const response = await fetch("https://toproduct-api-production.up.railway.app/products?sort=price,asc");
        const data = await response.json();
        return data.content;
    },
    createProduct: async () => {
        const response = await fetch("https://toproduct-api-production.up.railway.app/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newProductModal.nameInput().value,
                description: newProductModal.descriptionInput().value,
                price: parseFloat(newProductModal.priceInput().value),
                available: newProductModal.isAvailable,
            }),
        })
        return response.status;
    }
}