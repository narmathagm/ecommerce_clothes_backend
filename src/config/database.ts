import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

import { Role } from "../models/role.models";
import { Permission } from "../models/permission.models";
import { RolePermission } from "../models/rolePermission.models";
import { User } from "../models/user.models";
import { Category } from "../models/category.models";
import { Product } from "../models/product.models";
import { Cart } from "../models/cart.models";
import { CartItem } from "../models/cartItem.models";

const isTest = process.env.NODE_ENV === 'test';

export const sequelize = isTest
    ? new Sequelize({
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
        models: [Role, Permission, RolePermission, User, Category, Product, Cart, CartItem],
    })
    : new Sequelize(
        process.env.DB_NAME || "ecommerce_clothes",
        process.env.DB_USER || "root",
        process.env.DB_PASSWORD || "",
        {
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
            models: [Role, Permission, RolePermission, User, Category, Product, Cart, CartItem],
        }
    );

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully.");
        console.log("✅ Database ready (schema managed manually).");
    } catch (error) {
        console.error("❌ Unable to connect to the database:", error);
        process.exit(1);
    }
};
