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
exports.CartItem = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const cart_models_1 = require("./cart.models");
const product_models_1 = require("./product.models");
let CartItem = class CartItem extends sequelize_typescript_1.Model {
};
exports.CartItem = CartItem;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], CartItem.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => cart_models_1.Cart),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], CartItem.prototype, "cart_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => cart_models_1.Cart),
    __metadata("design:type", cart_models_1.Cart)
], CartItem.prototype, "cart", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_models_1.Product),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], CartItem.prototype, "product_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_models_1.Product),
    __metadata("design:type", product_models_1.Product)
], CartItem.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        defaultValue: 1,
    }),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: false,
    }),
    __metadata("design:type", Number)
], CartItem.prototype, "unit_price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TINYINT,
        allowNull: false,
        defaultValue: 1,
    }),
    __metadata("design:type", Number)
], CartItem.prototype, "active", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
    }),
    __metadata("design:type", String)
], CartItem.prototype, "created_by", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
    }),
    __metadata("design:type", String)
], CartItem.prototype, "modified_by", void 0);
exports.CartItem = CartItem = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "cart_items",
        timestamps: true,
        createdAt: "created",
        updatedAt: "modified",
    })
], CartItem);
