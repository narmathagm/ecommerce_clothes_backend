import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, Security, Request, Response } from "tsoa";
import { AddToCartDTO, UpdateCartItemDTO, GetCartResponse, CartItemResponse } from "../dtos/cart.dto";
import * as express from "express";
import { cartService } from "../services/cart.service";

@Route("cart")
@Tags("Cart")
export class CartController extends Controller {
    @Security("jwt", ["user"])
    @Get("/")
    public async getCart(@Request() request: express.Request): Promise<GetCartResponse> {
        const user: any = (request as any).user;
        return cartService.getCart(user.id);
    }

    @Security("jwt", ["user"])
    @Post("/items")
    @Response(201, "Created")
    public async addItemToCart(@Request() request: express.Request, @Body() body: AddToCartDTO): Promise<CartItemResponse | { message: string }> {
        const user: any = (request as any).user;
        const result = await cartService.addItemToCart(user.id, body);
        this.setStatus(result.status);
        return result.data;
    }

    @Security("jwt", ["user"])
    @Put("/items/{id}")
    public async updateCartItemQuantity(@Request() request: express.Request, @Path() id: number, @Body() body: UpdateCartItemDTO): Promise<CartItemResponse | { message: string }> {
        const user: any = (request as any).user;
        const result = await cartService.updateCartItemQuantity(user.id, id, body);
        this.setStatus(result.status);
        return result.data;
    }

    @Security("jwt", ["user"])
    @Delete("/items/{id}")
    public async removeCartItem(@Request() request: express.Request, @Path() id: number): Promise<{ message: string }> {
        const user: any = (request as any).user;
        const result = await cartService.removeCartItem(user.id, id);
        this.setStatus(result.status);
        return result.data;
    }
}
