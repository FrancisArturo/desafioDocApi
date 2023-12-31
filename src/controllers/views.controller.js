import { CartsService, ProductsService, UsersService } from '../repositories/index.js';

export default class ViewsController {
    productsService;
    cartsService;
    usersService;
    constructor() {
        this.productsService = ProductsService;
        this.cartsService = CartsService;
        this.usersService = UsersService;
    }
    defaultViewController = async (req, res) => {
        if (req.user) {
            if (req.user.user.role == "pswRecover"){
                return res.redirect("login")
            }
            return res.redirect("home");
        } else {
            return res.redirect("login");
        }
    }
    loginViewController = async (req, res) => {
        if (req.user) {
            if (req.user.user.role == "pswRecover"){
                return res.render("login")
            }
            return res.redirect("home");
        } else {
            return res.render("login");
        }
    }
    registerViewController = async (req, res) => {
        res.render("register");
    }
    recoverViewController = async ( req, res) => {
        res.render("recover");
    }
    recoverAuthorizedController = async (req, res) => {
        if (req.user) {
            res.render("recovercomplete");
        } else {
            res.render("recover");
        }
    }
    addProductViewController = async (req, res) => {
        res.render("addproduct");
    }
    updateProductViewController = async (req, res) => {
        res.render("updateproduct");
    }
    ticketViewController = async (req, res) => {
        res.render("ticket");
    }
    homeViewController = async (req, res) => {
        //query para buscar productos por categoria: frutas, lacteos o panificados
        const { limit = 10, page = 1, category = "all", sort = undefined  } = req.query;
        const user = req.user;
        let adminRole = false;
        let userRole = false;
        let premiumRole = false;
        let cartId;
        
        if (user.user.role == "admin"){
            adminRole = true;
        } else if (user.user.role == "user"){
            userRole = true;
            const userFound = await this.usersService.getUserById(user.user.user);
            const cartIdFound = String(userFound.carts);
            const cartIdMatch = cartIdFound.match(/[0-9a-f]{24}/i);
            cartId = cartIdMatch[0];
        } else if (user.user.role == "premium"){
            premiumRole = true;
            const userFound = await this.usersService.getUserById(user.user.user);
            const cartIdFound = String(userFound.carts);
            const cartIdMatch = cartIdFound.match(/[0-9a-f]{24}/i);
            cartId = cartIdMatch[0];
        }
        
        try {
            const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await this.productsService.getallProducts(limit, page, category, sort);
            res.render("home", { products : docs, hasPrevPage, hasNextPage, nextPage, prevPage, page, limit, category, sort, user,cartId, adminRole, userRole, premiumRole });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    getProductsCartViewController = async (req, res) => {
        try {
            const { cid } = req.params;
            const checkCart = await this.cartsService.getCartById(cid);
            if (!checkCart) {
                return res.json({
                    message: "Cart not found",
                })
            };
            const cartProducts = checkCart.products;
            res.render("cart", { cartProducts, cid });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}