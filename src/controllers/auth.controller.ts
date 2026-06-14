import { Controller, Post, Route, Tags, Body, Response } from "tsoa";
import { RegisterDTO, LoginDTO, AuthResponse } from "../dtos/auth.dto";
import { authService } from "../services/auth.service";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {

    @Post("/register")
    @Response<AuthResponse>(201, "Created")
    @Response<AuthResponse>(400, "Bad Request")
    public async register(@Body() body: RegisterDTO): Promise<AuthResponse> {
        try {
            const result = await authService.register(body);
            this.setStatus(result.status);
            return result.response;
        } catch (error: any) {
            this.setStatus(500);
            return { message: error.message || "Internal Server Error" };
        }
    }

    @Post("/login")
    @Response<AuthResponse>(200, "Success")
    @Response<AuthResponse>(401, "Unauthorized")
    public async login(@Body() body: LoginDTO): Promise<AuthResponse> {
        try {
            const result = await authService.login(body);
            this.setStatus(result.status);
            return result.response;
        } catch (error: any) {
            this.setStatus(500);
            return { message: error.message || "Internal Server Error" };
        }
    }
}
