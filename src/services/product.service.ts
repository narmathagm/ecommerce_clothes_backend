import { CreateProductDTO, ProductResponse, UpdateProductDTO } from "../dtos/product.dto";
import { Product } from "../models/product.models";
import { createProductSchema, formatValidationError, updateProductSchema } from "../validations/validationSchemas";

export interface ServiceResult<T> {
    status: number;
    data: T;
}

export class ProductService {
    public async getAllProducts(): Promise<ProductResponse[]> {
        const products = await Product.findAll({ where: { active: 1 } });
        return products.map((product) => product.toJSON() as ProductResponse);
    }

    public async getProductById(id: number): Promise<ProductResponse | null> {
        const product = await Product.findOne({ where: { id, active: 1 } });
        return product ? (product.toJSON() as ProductResponse) : null;
    }

    public async createProduct(body: CreateProductDTO): Promise<ServiceResult<ProductResponse | { message: string }>> {
        const validation = createProductSchema.validate(body, { abortEarly: false });
        if (validation.error) {
            return { status: 400, data: { message: formatValidationError(validation.error) } };
        }

        const product = await Product.create({ ...validation.value });
        return { status: 201, data: product.toJSON() as ProductResponse };
    }

    public async updateProduct(id: number, body: UpdateProductDTO): Promise<ServiceResult<ProductResponse | { message: string } | null>> {
        const validation = updateProductSchema.validate(body, { abortEarly: false });
        if (validation.error) {
            return { status: 400, data: { message: formatValidationError(validation.error) } };
        }

        const product = await Product.findByPk(id);
        if (!product) {
            return { status: 404, data: null };
        }

        await product.update(validation.value);
        return { status: 200, data: product.toJSON() as ProductResponse };
    }

    public async deleteProduct(id: number): Promise<ServiceResult<{ message: string }>> {
        const product = await Product.findByPk(id);
        if (!product) {
            return { status: 404, data: { message: "Product not found" } };
        }

        await product.update({ active: 0 });
        return { status: 200, data: { message: "Product deleted successfully" } };
    }
}

export const productService = new ProductService();
