import { Router } from "express";
import { generateProducts } from "../utils/generate-products.js";
import CustomError from "../utils/error-handler.js";
import { generateProductInfoError } from "../utils/error-info.js";
import EnumsErrors from "../utils/error-enums.js";


const router = Router();
let products = [];

//mocking products
router.get("/mockingproducts", (req, res, next) => {
    try {
        
        for (let index = 0; index < 50; index++) {
            products.push(generateProducts());
        }
        return res.status(200).send({status: "success", payload: products});
    } catch (error) {
        next(error);
    }
});

//get all products
router.get("/", (req, res, next) => {
    try {
        return res.status(200).send({status: "success", payload: products});
    } catch (error) {
        next(error);
    }
})

//add a product
router.post("/", (req, res, next) => {
    try {
        const product = req.body
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.stock || !product.code) {
            console.log(product.title)
            CustomError.createError({
                name: "add product error",
                cause: generateProductInfoError(product),
                message: "Error adding product",
                code: EnumsErrors.INVALID_TYPES_ERROR
            });
        };
        const productAdd = {
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock
        };
        products.push(productAdd);
        return res.status(200).send({ status: "success", payload: productAdd});
    } catch (error) {
        next(error);
    }
})

export default router;