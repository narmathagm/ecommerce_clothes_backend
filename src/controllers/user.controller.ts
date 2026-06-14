import { Controller, Get, Route, Tags, Security } from "tsoa";
import { UserResponse } from "../dtos/user.dto";
import { userService } from "../services/user.service";

@Route("user")
@Tags("User")
export class UserController extends Controller {

    @Security("jwt", ["admin"])
    @Get("/")
    public async getAllUsers(): Promise<UserResponse[]> {
        return userService.getAllUsers();
    }
}
