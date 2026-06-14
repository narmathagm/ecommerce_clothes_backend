"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("./user.service");
const validationSchemas_1 = require("../validations/validationSchemas");
const TOKEN_EXPIRES_IN = "1d";
function getJwtSecret() {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw new Error("JWT_ACCESS_SECRET is not configured.");
    }
    return secret;
}
class AuthService {
    generateToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role_id: user.role_id }, getJwtSecret(), { expiresIn: TOKEN_EXPIRES_IN });
    }
    async register(body) {
        // Validate input
        const validation = validationSchemas_1.registerSchema.validate(body, { abortEarly: false });
        if (validation.error) {
            return {
                status: 400,
                response: { message: (0, validationSchemas_1.formatValidationError)(validation.error) },
            };
        }
        const validatedBody = validation.value;
        const existingUser = await user_service_1.userService.findByEmail(validatedBody.email);
        if (existingUser) {
            return {
                status: 400,
                response: { message: "Email already exists" },
            };
        }
        const existingPhone = await user_service_1.userService.findByPhone(validatedBody.phone);
        if (existingPhone) {
            return {
                status: 400,
                response: { message: "Mobile number already exists" },
            };
        }
        const hashedPassword = await bcryptjs_1.default.hash(validatedBody.password, 10);
        const role_id = validatedBody.role_id || 2;
        await user_service_1.userService.createUser({
            name: validatedBody.name,
            email: validatedBody.email,
            password: hashedPassword,
            phone: validatedBody.phone,
            role_id,
        });
        return {
            status: 201,
            response: { message: "User registered successfully" },
        };
    }
    async login(body) {
        // Validate input
        const validation = validationSchemas_1.loginSchema.validate(body, { abortEarly: false });
        if (validation.error) {
            return {
                status: 400,
                response: { message: (0, validationSchemas_1.formatValidationError)(validation.error) },
            };
        }
        const validatedBody = validation.value;
        const user = await user_service_1.userService.findByEmail(validatedBody.email);
        if (!user) {
            return {
                status: 401,
                response: { message: "Invalid email or password" },
            };
        }
        const isMatch = await bcryptjs_1.default.compare(validatedBody.password, user.password);
        if (!isMatch) {
            return {
                status: 401,
                response: { message: "Invalid email or password" },
            };
        }
        const token = this.generateToken(user);
        return {
            status: 200,
            response: {
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role_id: user.role_id,
                },
            },
        };
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
