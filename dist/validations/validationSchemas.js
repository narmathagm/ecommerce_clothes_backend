"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartItemSchema = exports.addToCartSchema = exports.updateProductSchema = exports.createProductSchema = exports.updateCategorySchema = exports.createCategorySchema = exports.loginSchema = exports.registerSchema = void 0;
exports.formatValidationError = formatValidationError;
const joi_1 = __importDefault(require("joi"));
// Helper regex patterns
const PHONE_PATTERN = /^[6-9]\d{9}$/; // 10 digits starting with 6-9
const NO_SPECIAL_CHARS = /^[a-zA-Z0-9\s\-\.,'&()]+$/; // Allows letters, numbers, spaces, hyphens, dots, commas, apostrophes, ampersands, parentheses
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
// AUTH VALIDATIONS
exports.registerSchema = joi_1.default.object({
    name: joi_1.default.string()
        .required()
        .min(2)
        .max(100)
        .pattern(NO_SPECIAL_CHARS)
        .trim()
        .messages({
        "string.base": "Name should be a string",
        "any.required": "Name is required",
        "string.min": "Name should be at least 2 characters",
        "string.max": "Name should not exceed 100 characters",
        "string.pattern.base": "Name should only contain letters, numbers, spaces, and basic punctuation (no special characters)",
    }),
    email: joi_1.default.string()
        .required()
        .email()
        .lowercase()
        .trim()
        .messages({
        "string.base": "Email should be a string",
        "string.email": "Invalid email format",
        "any.required": "Email is required",
    }),
    phone: joi_1.default.string()
        .required()
        .length(10)
        .pattern(PHONE_PATTERN)
        .trim()
        .messages({
        "string.base": "Phone should be a string",
        "any.required": "Phone number is required",
        "string.length": "Phone number should be exactly 10 digits",
        "string.pattern.base": "Phone number should be 10 digits starting with 6-9",
    }),
    password: joi_1.default.string()
        .required()
        .min(8)
        .max(128)
        .messages({
        "string.base": "Password should be a string",
        "any.required": "Password is required",
        "string.min": "Password should be at least 8 characters long",
        "string.max": "Password should not exceed 128 characters",
    }),
    role_id: joi_1.default.number()
        .optional()
        .valid(1, 2)
        .messages({
        "number.base": "Role ID should be a number",
        "any.only": "Role ID should be 1 (Admin) or 2 (User)",
    }),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .required()
        .email()
        .lowercase()
        .trim()
        .messages({
        "string.base": "Email should be a string",
        "string.email": "Invalid email format",
        "any.required": "Email is required",
    }),
    password: joi_1.default.string()
        .required()
        .min(8)
        .messages({
        "string.base": "Password should be a string",
        "any.required": "Password is required",
        "string.min": "Password should be at least 8 characters long",
    }),
});
// CATEGORY VALIDATIONS
exports.createCategorySchema = joi_1.default.object({
    name: joi_1.default.string()
        .required()
        .min(2)
        .max(100)
        .pattern(NO_SPECIAL_CHARS)
        .trim()
        .messages({
        "string.base": "Category name should be a string",
        "any.required": "Category name is required",
        "string.min": "Category name should be at least 2 characters",
        "string.max": "Category name should not exceed 100 characters",
        "string.pattern.base": "Category name should only contain letters, numbers, spaces, and basic punctuation (no special characters)",
    }),
    description: joi_1.default.string()
        .optional()
        .max(500)
        .pattern(NO_SPECIAL_CHARS)
        .trim()
        .messages({
        "string.base": "Description should be a string",
        "string.max": "Description should not exceed 500 characters",
        "string.pattern.base": "Description should only contain letters, numbers, spaces, and basic punctuation (no special characters)",
    }),
});
exports.updateCategorySchema = joi_1.default.object({
    name: joi_1.default.string()
        .optional()
        .min(2)
        .max(100)
        .pattern(NO_SPECIAL_CHARS)
        .trim()
        .messages({
        "string.base": "Category name should be a string",
        "string.min": "Category name should be at least 2 characters",
        "string.max": "Category name should not exceed 100 characters",
        "string.pattern.base": "Category name should only contain letters, numbers, spaces, and basic punctuation (no special characters)",
    }),
    description: joi_1.default.string()
        .optional()
        .max(500)
        .pattern(NO_SPECIAL_CHARS)
        .trim()
        .messages({
        "string.base": "Description should be a string",
        "string.max": "Description should not exceed 500 characters",
        "string.pattern.base": "Description should only contain letters, numbers, spaces, and basic punctuation (no special characters)",
    }),
});
// PRODUCT VALIDATIONS
exports.createProductSchema = joi_1.default.object({
    title: joi_1.default.string()
        .required()
        .min(2)
        .max(200)
        .pattern(NO_SPECIAL_CHARS)
        .trim()
        .messages({
        "string.base": "Title should be a string",
        "any.required": "Title is required",
        "string.min": "Title should be at least 2 characters",
        "string.max": "Title should not exceed 200 characters",
        "string.pattern.base": "Title should only contain letters, numbers, spaces, and basic punctuation (no special characters)",
    }),
    description: joi_1.default.string()
        .optional()
        .max(1000)
        .pattern(NO_SPECIAL_CHARS)
        .trim()
        .messages({
        "string.base": "Description should be a string",
        "string.max": "Description should not exceed 1000 characters",
        "string.pattern.base": "Description should only contain letters, numbers, spaces, and basic punctuation (no special characters)",
    }),
    rate: joi_1.default.number()
        .required()
        .positive()
        .precision(2)
        .max(999999.99)
        .messages({
        "number.base": "Rate should be a number",
        "any.required": "Rate is required",
        "number.positive": "Rate should be a positive number",
        "number.max": "Rate exceeds maximum value",
    }),
    discount: joi_1.default.number()
        .optional()
        .min(0)
        .max(100)
        .precision(2)
        .messages({
        "number.base": "Discount should be a number",
        "number.min": "Discount should be between 0 and 100",
        "number.max": "Discount should be between 0 and 100",
    }),
    stock_quantity: joi_1.default.number()
        .optional()
        .min(0)
        .integer()
        .messages({
        "number.base": "Stock quantity should be a number",
        "number.min": "Stock quantity should be 0 or positive",
        "number.integer": "Stock quantity should be a whole number",
    }),
    category_id: joi_1.default.number()
        .required()
        .integer()
        .positive()
        .messages({
        "number.base": "Category ID should be a number",
        "any.required": "Category ID is required",
        "number.integer": "Category ID should be a whole number",
        "number.positive": "Category ID should be positive",
    }),
    cloth_type: joi_1.default.string()
        .optional()
        .max(100)
        .pattern(NO_SPECIAL_CHARS)
        .trim()
        .messages({
        "string.base": "Cloth type should be a string",
        "string.max": "Cloth type should not exceed 100 characters",
        "string.pattern.base": "Cloth type should only contain letters, numbers, spaces, and basic punctuation (no special characters)",
    }),
    image_url: joi_1.default.string()
        .optional()
        .allow("")
        .custom((value, helpers) => {
        if (!value || value.startsWith("/uploads/") || /^https?:\/\//.test(value))
            return value;
        return helpers.error("string.uri");
    })
        .messages({
        "string.base": "Image URL should be a string",
        "string.uri": "Image URL should be a valid URL or uploaded image path",
    }),
});
exports.updateProductSchema = joi_1.default.object({
    title: joi_1.default.string()
        .optional()
        .min(2)
        .max(200)
        .pattern(NO_SPECIAL_CHARS)
        .trim()
        .messages({
        "string.base": "Title should be a string",
        "string.min": "Title should be at least 2 characters",
        "string.max": "Title should not exceed 200 characters",
        "string.pattern.base": "Title should only contain letters, numbers, spaces, and basic punctuation (no special characters)",
    }),
    description: joi_1.default.string()
        .optional()
        .max(1000)
        .pattern(NO_SPECIAL_CHARS)
        .trim()
        .messages({
        "string.base": "Description should be a string",
        "string.max": "Description should not exceed 1000 characters",
        "string.pattern.base": "Description should only contain letters, numbers, spaces, and basic punctuation (no special characters)",
    }),
    rate: joi_1.default.number()
        .optional()
        .positive()
        .precision(2)
        .max(999999.99)
        .messages({
        "number.base": "Rate should be a number",
        "number.positive": "Rate should be a positive number",
        "number.max": "Rate exceeds maximum value",
    }),
    discount: joi_1.default.number()
        .optional()
        .min(0)
        .max(100)
        .precision(2)
        .messages({
        "number.base": "Discount should be a number",
        "number.min": "Discount should be between 0 and 100",
        "number.max": "Discount should be between 0 and 100",
    }),
    stock_quantity: joi_1.default.number()
        .optional()
        .min(0)
        .integer()
        .messages({
        "number.base": "Stock quantity should be a number",
        "number.min": "Stock quantity should be 0 or positive",
        "number.integer": "Stock quantity should be a whole number",
    }),
    category_id: joi_1.default.number()
        .optional()
        .integer()
        .positive()
        .messages({
        "number.base": "Category ID should be a number",
        "number.integer": "Category ID should be a whole number",
        "number.positive": "Category ID should be positive",
    }),
    cloth_type: joi_1.default.string()
        .optional()
        .max(100)
        .pattern(NO_SPECIAL_CHARS)
        .trim()
        .messages({
        "string.base": "Cloth type should be a string",
        "string.max": "Cloth type should not exceed 100 characters",
        "string.pattern.base": "Cloth type should only contain letters, numbers, spaces, and basic punctuation (no special characters)",
    }),
    image_url: joi_1.default.string()
        .optional()
        .allow("")
        .custom((value, helpers) => {
        if (!value || value.startsWith("/uploads/") || /^https?:\/\//.test(value))
            return value;
        return helpers.error("string.uri");
    })
        .messages({
        "string.base": "Image URL should be a string",
        "string.uri": "Image URL should be a valid URL or uploaded image path",
    }),
    active: joi_1.default.number()
        .optional()
        .valid(0, 1)
        .messages({
        "number.base": "Active should be a number",
        "any.only": "Active should be 0 (inactive) or 1 (active)",
    }),
});
// CART VALIDATIONS
exports.addToCartSchema = joi_1.default.object({
    product_id: joi_1.default.number()
        .required()
        .integer()
        .positive()
        .messages({
        "number.base": "Product ID should be a number",
        "any.required": "Product ID is required",
        "number.integer": "Product ID should be a whole number",
        "number.positive": "Product ID should be positive",
    }),
    quantity: joi_1.default.number()
        .required()
        .integer()
        .min(1)
        .messages({
        "number.base": "Quantity should be a number",
        "any.required": "Quantity is required",
        "number.integer": "Quantity should be a whole number",
        "number.min": "Quantity should be at least 1",
    }),
});
exports.updateCartItemSchema = joi_1.default.object({
    quantity: joi_1.default.number()
        .required()
        .integer()
        .min(1)
        .messages({
        "number.base": "Quantity should be a number",
        "any.required": "Quantity is required",
        "number.integer": "Quantity should be a whole number",
        "number.min": "Quantity should be at least 1",
    }),
});
// VALIDATION ERROR FORMATTER
function formatValidationError(error) {
    const messages = error.details.map(detail => detail.message);
    return messages.join("; ");
}
