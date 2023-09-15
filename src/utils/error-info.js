export const generateProductInfoError = (product) => {
    return `One or more properties were incomplete or not valid.
    list of required properties:
    *title : needs to be a string, received ${product.title}
    *description: needs to be a string, received ${product.description}
    *price: needs to be a number, received ${product.price}
    *thumbnail: needs to be a string, received ${product.thumbnail}
    *code: needs to be a number, received ${product.code}
    *stock: needs to be a number, received ${product.stock}
    `
}