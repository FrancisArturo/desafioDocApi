
const updateIdproduct = document.getElementById("updateproductId")
const updateProductTitle = document.getElementById("updatetitle");
const updateProductPrice = document.getElementById("updateprice");
const updateProductDescription = document.getElementById("updatedescription");
const updateProductStock = document.getElementById("updatestock");
const updateProductCategory = document.getElementById("updatecategory");
const updateProductStatus = document.getElementById("updatestatus");
const updateProductCode = document.getElementById("updatecode");
const updateProductThumbnail= document.getElementById("updatethumbnail");
const updateBtn = document.getElementById("updateProductBtn");


async function clearValues() {
    updateIdproduct.value = "";
    updateProductTitle.value = "";
    updateProductPrice.value = "";
    updateProductDescription.value = "";
    updateProductStock.value = "";
    updateProductCategory.value = "";
    updateProductStatus.value = "";
    updateProductCode.value = "";
    updateProductThumbnail.value = "";
}

async function updateProduct(pid, productUpdate) {
    const res = await fetch(`/api/v1/products/${pid}`, {
        method: "PUT",
        body: JSON.stringify(productUpdate),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
}

updateBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const productUpdateArray = [];
    let productValuesCheck;
    const pid = updateIdproduct.value;
        const product = {
            title: updateProductTitle.value,
            description: updateProductDescription.value,
            code: updateProductCode.value,
            price: updateProductPrice.value,
            status: updateProductStatus.value,
            stock: updateProductStock.value,
            category: updateProductCategory.value,
            thumbnail: updateProductThumbnail.value
        };
        const productKeys = Object.keys(product);
        productValuesCheck = productKeys.map(function (key) {
            if (product[key]) {
                productUpdateArray.push([key, product[key]])
            };
        });
        const productUpdate = Object.fromEntries(productUpdateArray);
        const data = await updateProduct(pid, productUpdate);
        if (data.message == "Product updated successfully") {
            alert("Product updated successfully");
        } else if (data.message == "No product found") {
            alert("No product found");
        } else {
            alert("Update Product Error");
        }
        await clearValues();
});


