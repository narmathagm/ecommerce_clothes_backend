"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const role_models_1 = require("../models/role.models");
const permission_models_1 = require("../models/permission.models");
const rolePermission_models_1 = require("../models/rolePermission.models");
const user_models_1 = require("../models/user.models");
const category_models_1 = require("../models/category.models");
const product_models_1 = require("../models/product.models");
const cart_models_1 = require("../models/cart.models");
const cartItem_models_1 = require("../models/cartItem.models");
const isTest = process.env.NODE_ENV === 'test';
exports.sequelize = isTest
    ? new sequelize_typescript_1.Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        define: {
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        },
        models: [role_models_1.Role, permission_models_1.Permission, rolePermission_models_1.RolePermission, user_models_1.User, category_models_1.Category, product_models_1.Product, cart_models_1.Cart, cartItem_models_1.CartItem],
    })
    : new sequelize_typescript_1.Sequelize(process.env.DB_NAME || "ecommerce_clothes", process.env.DB_USER || "root", process.env.DB_PASSWORD || "", {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        logging: false,
        define: {
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        },
        models: [role_models_1.Role, permission_models_1.Permission, rolePermission_models_1.RolePermission, user_models_1.User, category_models_1.Category, product_models_1.Product, cart_models_1.Cart, cartItem_models_1.CartItem],
    });
const connectDB = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log("✅ Database connected successfully.");
        console.log("✅ Database ready (schema managed manually).");
    }
    catch (error) {
        console.error("❌ Unable to connect to the database:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
