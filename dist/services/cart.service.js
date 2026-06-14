"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = exports.CartService = void 0;
const cart_models_1 = require("../models/cart.models");
const cartItem_models_1 = require("../models/cartItem.models");
const category_models_1 = require("../models/category.models");
const product_models_1 = require("../models/product.models");
const validationSchemas_1 = require("../validations/validationSchemas");
class CartService {
    async getOrCreateCart(userId) {
        let cart = await cart_models_1.Cart.findOne({ where: { user_id: userId, active: 1 } });
        if (!cart) {
            cart = await cart_models_1.Cart.create({ user_id: userId });
        }
        return cart;
    }
    async getCart(userId) {
        const cart = await this.getOrCreateCart(userId);
        const items = await cartItem_models_1.CartItem.findAll({
            where: { cart_id: cart.id, active: 1 },
            include: [{ model: product_models_1.Product, include: [category_models_1.Category] }],
        });
        return {
            cart: cart.toJSON(),
            items: items.map((item) => item.toJSON()),
        };
    }
    async addItemToCart(userId, body) {
        const validation = validationSchemas_1.addToCartSchema.validate(body, { abortEarly: false });
        if (validation.error) {
            return { status: 400, data: { message: (0, validationSchemas_1.formatValidationError)(validation.error) } };
        }
        const cart = await this.getOrCreateCart(userId);
        const product = await product_models_1.Product.findOne({ where: { id: validation.value.product_id, active: 1 } });
        if (!product) {
            return { status: 404, data: { message: "Product not found" } };
        }
        let cartItem = await cartItem_models_1.CartItem.findOne({
            where: { cart_id: cart.id, product_id: validation.value.product_id, active: 1 },
        });
        if (cartItem) {
            cartItem.quantity += validation.value.quantity;
            await cartItem.save();
        }
        else {
            cartItem = await cartItem_models_1.CartItem.create({
                cart_id: cart.id,
                product_id: validation.value.product_id,
                quantity: validation.value.quantity,
                unit_price: product.rate,
            });
        }
        return { status: 201, data: cartItem.toJSON() };
    }
    async updateCartItemQuantity(userId, id, body) {
        const validation = validationSchemas_1.updateCartItemSchema.validate(body, { abortEarly: false });
        if (validation.error) {
            return { status: 400, data: { message: (0, validationSchemas_1.formatValidationError)(validation.error) } };
        }
        const cart = await this.getOrCreateCart(userId);
        const cartItem = await cartItem_models_1.CartItem.findOne({ where: { id, cart_id: cart.id, active: 1 } });
        if (!cartItem) {
            return { status: 404, data: { message: "Cart item not found" } };
        }
        if (validation.value.quantity <= 0) {
            await cartItem.update({ active: 0 });
            return { status: 200, data: { message: "Item removed from cart" } };
        }
        await cartItem.update({ quantity: validation.value.quantity });
        return { status: 200, data: cartItem.toJSON() };
    }
    async removeCartItem(userId, id) {
        const cart = await this.getOrCreateCart(userId);
        const cartItem = await cartItem_models_1.CartItem.findOne({ where: { id, cart_id: cart.id, active: 1 } });
        if (!cartItem) {
            return { status: 404, data: { message: "Cart item not found" } };
        }
        await cartItem.update({ active: 0 });
        return { status: 200, data: { message: "Item removed from cart" } };
    }
}
exports.CartService = CartService;
exports.cartService = new CartService();
