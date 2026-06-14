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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const category_models_1 = require("./category.models");
const cartItem_models_1 = require("./cartItem.models");
let Product = class Product extends sequelize_typescript_1.Model {
};
exports.Product = Product;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Product.prototype, "rate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 0.00,
    }),
    __metadata("design:type", Number)
], Product.prototype, "discount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], Product.prototype, "stock_quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => category_models_1.Category),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Product.prototype, "category_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => category_models_1.Category),
    __metadata("design:type", category_models_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "cloth_type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(500),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "image_url", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TINYINT,
        allowNull: false,
        defaultValue: 1,
    }),
    __metadata("design:type", Number)
], Product.prototype, "active", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "created_by", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "modified_by", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cartItem_models_1.CartItem),
    __metadata("design:type", Array)
], Product.prototype, "cartItems", void 0);
exports.Product = Product = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "products",
        timestamps: true,
        createdAt: "created",
        updatedAt: "modified",
    })
], Product);
