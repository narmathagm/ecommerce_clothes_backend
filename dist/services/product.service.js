"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = exports.ProductService = void 0;
const product_models_1 = require("../models/product.models");
const validationSchemas_1 = require("../validations/validationSchemas");
class ProductService {
    async getAllProducts() {
        const products = await product_models_1.Product.findAll({ where: { active: 1 } });
        return products.map((product) => product.toJSON());
    }
    async getProductById(id) {
        const product = await product_models_1.Product.findOne({ where: { id, active: 1 } });
        return product ? product.toJSON() : null;
    }
    async createProduct(body) {
        const validation = validationSchemas_1.createProductSchema.validate(body, { abortEarly: false });
        if (validation.error) {
            return { status: 400, data: { message: (0, validationSchemas_1.formatValidationError)(validation.error) } };
        }
        const product = await product_models_1.Product.create({ ...validation.value });
        return { status: 201, data: product.toJSON() };
    }
    async updateProduct(id, body) {
        const validation = validationSchemas_1.updateProductSchema.validate(body, { abortEarly: false });
        if (validation.error) {
            return { status: 400, data: { message: (0, validationSchemas_1.formatValidationError)(validation.error) } };
        }
        const product = await product_models_1.Product.findByPk(id);
        if (!product) {
            return { status: 404, data: null };
        }
        await product.update(validation.value);
        return { status: 200, data: product.toJSON() };
    }
    async deleteProduct(id) {
        const product = await product_models_1.Product.findByPk(id);
        if (!product) {
            return { status: 404, data: { message: "Product not found" } };
        }
        await product.update({ active: 0 });
        return { status: 200, data: { message: "Product deleted successfully" } };
    }
}
exports.ProductService = ProductService;
exports.productService = new ProductService();
