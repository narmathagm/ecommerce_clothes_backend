import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RegisterDTO, LoginDTO, AuthResponse } from "../dtos/auth.dto";
import { userService } from "./user.service";
import { registerSchema, loginSchema, formatValidationError } from "../validations/validationSchemas";

const TOKEN_EXPIRES_IN = "1d";

function getJwtSecret(): string {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw new Error("JWT_ACCESS_SECRET is not configured.");
    }
    return secret;
}

export interface AuthServiceResult {
    status: number;
    response: AuthResponse;
}

export class AuthService {
    private generateToken(user: any) {
        return jwt.sign(
            { id: user.id, email: user.email, role_id: user.role_id },
            getJwtSecret(),
            { expiresIn: TOKEN_EXPIRES_IN }
        );
    }

    public async register(body: RegisterDTO): Promise<AuthServiceResult> {
        // Validate input
        const validation = registerSchema.validate(body, { abortEarly: false });
        if (validation.error) {
            return {
                status: 400,
                response: { message: formatValidationError(validation.error) },
            };
        }
        const validatedBody = validation.value as RegisterDTO;

        const existingUser = await userService.findByEmail(validatedBody.email);
        if (existingUser) {
            return {
                status: 400,
                response: { message: "Email already exists" },
            };
        }

        const existingPhone = await userService.findByPhone(validatedBody.phone);
        if (existingPhone) {
            return {
                status: 400,
                response: { message: "Mobile number already exists" },
            };
        }

        const hashedPassword = await bcrypt.hash(validatedBody.password, 10);
        const role_id = validatedBody.role_id || 2;

        await userService.createUser({
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

    public async login(body: LoginDTO): Promise<AuthServiceResult> {
        // Validate input
        const validation = loginSchema.validate(body, { abortEarly: false });
        if (validation.error) {
            return {
                status: 400,
                response: { message: formatValidationError(validation.error) },
            };
        }
        const validatedBody = validation.value as LoginDTO;

        const user = await userService.findByEmail(validatedBody.email);
        if (!user) {
            return {
                status: 401,
                response: { message: "Invalid email or password" },
            };
        }

        const isMatch = await bcrypt.compare(validatedBody.password, user.password);
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

export const authService = new AuthService();
