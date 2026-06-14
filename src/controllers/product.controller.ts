import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, Security, Response } from "tsoa";
import { CreateProductDTO, UpdateProductDTO, ProductResponse } from "../dtos/product.dto";
import { productService } from "../services/product.service";

@Route("products")
@Tags("Products")
export class ProductController extends Controller {

    @Get("/")
    public async getAllProducts(): Promise<ProductResponse[]> {
        return productService.getAllProducts();
    }

    @Get("/{id}")
    public async getProductById(@Path() id: number): Promise<ProductResponse | null> {
        return productService.getProductById(id);
    }

    @Security("jwt", ["admin"])
    @Post("/")
    @Response(201, "Created")
    public async createProduct(@Body() body: CreateProductDTO): Promise<ProductResponse | { message: string }> {
        const result = await productService.createProduct(body);
        this.setStatus(result.status);
        return result.data;
    }

    @Security("jwt", ["admin"])
    @Put("/{id}")
    public async updateProduct(@Path() id: number, @Body() body: UpdateProductDTO): Promise<ProductResponse | { message: string } | null> {
        const result = await productService.updateProduct(id, body);
        this.setStatus(result.status);
        return result.data;
    }

    @Security("jwt", ["admin"])
    @Delete("/{id}")
    public async deleteProduct(@Path() id: number): Promise<{ message: string }> {
        const result = await productService.deleteProduct(id);
        this.setStatus(result.status);
        return result.data;
    }
}
