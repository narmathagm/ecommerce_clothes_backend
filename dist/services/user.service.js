"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const user_models_1 = require("../models/user.models");
class UserService {
    async getAllUsers() {
        const users = await user_models_1.User.findAll({
            attributes: { exclude: ["password"] },
        });
        return users.map((user) => user.toJSON());
    }
    async findByEmail(email) {
        return user_models_1.User.findOne({ where: { email } });
    }
    async findByPhone(phone) {
        return user_models_1.User.findOne({ where: { phone } });
    }
    async createUser(payload) {
        return user_models_1.User.create(payload);
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
