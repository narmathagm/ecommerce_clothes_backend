"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userValidation = joi_1.default.object({
    id: joi_1.default.number().optional(),
    name: joi_1.default.string().required().messages({
        "string.base": "Name should be a string",
        "any.required": "Name is required"
    }),
    email: joi_1.default.string().email().required().messages({
        "string.email": "Invalid email",
        "any.required": "Email is required"
    }),
    phone: joi_1.default.string().required().min(10).pattern(/^[6-9]\d{9}$/).messages({
        "string.pattern.base": "Invalid phone number",
        "any.required": "Phone number is required",
        "string.min": "Phone number should be 10 digits"
    }),
    password: joi_1.default.string().required().min(8).messages({
        "any.required": "Password is required",
        "string.min": "Password should be at least 8 characters long"
    }),
    role_id: joi_1.default.number().required().messages({
        "any-required": "Role id is required"
    }),
    active: joi_1.default.boolean().optional(),
    created: joi_1.default.date().optional(),
    created_by: joi_1.default.string().optional(),
    modified: joi_1.default.date().optional(),
    modified_by: joi_1.default.string().optional()
});
