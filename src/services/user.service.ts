import { User } from "../models/user.models";
import { RegisterDTO } from "../dtos/auth.dto";
import { UserResponse } from "../dtos/user.dto";

export class UserService {
  public async getAllUsers(): Promise<UserResponse[]> {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return users.map((user) => user.toJSON() as UserResponse);
  }

  public async findByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  public async findByPhone(phone: string) {
    return User.findOne({ where: { phone } });
  }

  public async createUser(payload: Omit<RegisterDTO, "role_id"> & { password: string; role_id: number }) {
    return User.create(payload as any);
  }
}

export const userService = new UserService();
