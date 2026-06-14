export interface CreateProductDTO {
    title: string;
    description?: string;
    rate: number;
    discount?: number;
    stock_quantity?: number;
    category_id: number;
    cloth_type?: string;
    image_url?: string;
}

export interface UpdateProductDTO {
    title?: string;
    description?: string;
    rate?: number;
    discount?: number;
    stock_quantity?: number;
    category_id?: number;
    cloth_type?: string;
    image_url?: string;
    active?: number;
}

export interface ProductResponse {
    id: number;
    title: string;
    description: string;
    rate: number;
    discount: number;
    stock_quantity: number;
    category_id: number;
    cloth_type: string;
    image_url: string;
    active: number;
}
