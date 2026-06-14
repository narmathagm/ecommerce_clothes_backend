import { AddToCartDTO, CartItemResponse, GetCartResponse, UpdateCartItemDTO } from "../dtos/cart.dto";
import { Cart } from "../models/cart.models";
import { CartItem } from "../models/cartItem.models";
import { Category } from "../models/category.models";
import { Product } from "../models/product.models";
import { addToCartSchema, formatValidationError, updateCartItemSchema } from "../validations/validationSchemas";
import type { ServiceResult } from "./product.service";

export class CartService {
    private async getOrCreateCart(userId: number): Promise<Cart> {
        let cart = await Cart.findOne({ where: { user_id: userId, active: 1 } });
        if (!cart) {
            cart = await Cart.create({ user_id: userId });
        }
        return cart;
    }

    public async getCart(userId: number): Promise<GetCartResponse> {
        const cart = await this.getOrCreateCart(userId);
        const items = await CartItem.findAll({
            where: { cart_id: cart.id, active: 1 },
            include: [{ model: Product, include: [Category] }],
        });

        return {
            cart: cart.toJSON() as any,
            items: items.map((item) => item.toJSON() as CartItemResponse),
        };
    }

    public async addItemToCart(userId: number, body: AddToCartDTO): Promise<ServiceResult<CartItemResponse | { message: string }>> {
        const validation = addToCartSchema.validate(body, { abortEarly: false });
        if (validation.error) {
            return { status: 400, data: { message: formatValidationError(validation.error) } };
        }

        const cart = await this.getOrCreateCart(userId);
        const product = await Product.findOne({ where: { id: validation.value.product_id, active: 1 } });
        if (!product) {
            return { status: 404, data: { message: "Product not found" } };
        }

        let cartItem = await CartItem.findOne({
            where: { cart_id: cart.id, product_id: validation.value.product_id, active: 1 },
        });

        if (cartItem) {
            cartItem.quantity += validation.value.quantity;
            await cartItem.save();
        } else {
            cartItem = await CartItem.create({
                cart_id: cart.id,
                product_id: validation.value.product_id,
                quantity: validation.value.quantity,
                unit_price: product.rate,
            });
        }

        return { status: 201, data: cartItem.toJSON() as CartItemResponse };
    }

    public async updateCartItemQuantity(userId: number, id: number, body: UpdateCartItemDTO): Promise<ServiceResult<CartItemResponse | { message: string }>> {
        const validation = updateCartItemSchema.validate(body, { abortEarly: false });
        if (validation.error) {
            return { status: 400, data: { message: formatValidationError(validation.error) } };
        }

        const cart = await this.getOrCreateCart(userId);
        const cartItem = await CartItem.findOne({ where: { id, cart_id: cart.id, active: 1 } });
        if (!cartItem) {
            return { status: 404, data: { message: "Cart item not found" } };
        }

        if (validation.value.quantity <= 0) {
            await cartItem.update({ active: 0 });
            return { status: 200, data: { message: "Item removed from cart" } };
        }

        await cartItem.update({ quantity: validation.value.quantity });
        return { status: 200, data: cartItem.toJSON() as CartItemResponse };
    }

    public async removeCartItem(userId: number, id: number): Promise<ServiceResult<{ message: string }>> {
        const cart = await this.getOrCreateCart(userId);
        const cartItem = await CartItem.findOne({ where: { id, cart_id: cart.id, active: 1 } });
        if (!cartItem) {
            return { status: 404, data: { message: "Cart item not found" } };
        }

        await cartItem.update({ active: 0 });
        return { status: 200, data: { message: "Item removed from cart" } };
    }
}

export const cartService = new CartService();
