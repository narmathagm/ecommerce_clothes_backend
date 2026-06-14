export interface AddToCartDTO {
    product_id: number;
    quantity: number;
}

export interface UpdateCartItemDTO {
    quantity: number;
}

export interface CartItemResponse {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    active: number;
    product?: any; // To include product details
}

export interface CartResponse {
    id: number;
    user_id: number;
    active: number;
}

export interface GetCartResponse {
    cart: CartResponse;
    items: CartItemResponse[];
}
