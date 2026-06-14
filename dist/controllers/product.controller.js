"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const tsoa_1 = require("tsoa");
const product_service_1 = require("../services/product.service");
let ProductController = class ProductController extends tsoa_1.Controller {
    async getAllProducts() {
        return product_service_1.productService.getAllProducts();
    }
    async getProductById(id) {
        return product_service_1.productService.getProductById(id);
    }
    async createProduct(body) {
        const result = await product_service_1.productService.createProduct(body);
        this.setStatus(result.status);
        return result.data;
    }
    async updateProduct(id, body) {
        const result = await product_service_1.productService.updateProduct(id, body);
        this.setStatus(result.status);
        return result.data;
    }
    async deleteProduct(id) {
        const result = await product_service_1.productService.deleteProduct(id);
        this.setStatus(result.status);
        return result.data;
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, tsoa_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, tsoa_1.Get)("/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
__decorate([
    (0, tsoa_1.Security)("jwt", ["admin"]),
    (0, tsoa_1.Post)("/"),
    (0, tsoa_1.Response)(201, "Created"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, tsoa_1.Security)("jwt", ["admin"]),
    (0, tsoa_1.Put)("/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, tsoa_1.Security)("jwt", ["admin"]),
    (0, tsoa_1.Delete)("/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, tsoa_1.Route)("products"),
    (0, tsoa_1.Tags)("Products")
], ProductController);
