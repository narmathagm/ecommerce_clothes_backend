"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = 'test';
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const role_models_1 = require("./models/role.models");
const permission_models_1 = require("./models/permission.models");
const rolePermission_models_1 = require("./models/rolePermission.models");
describe('Backend integration tests', () => {
    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        await database_1.sequelize.sync({ force: true });
        const adminRole = await role_models_1.Role.create({ role_name: 'ADMIN' });
        const userRole = await role_models_1.Role.create({ role_name: 'USER' });
        const permissions = await Promise.all([
            permission_models_1.Permission.create({ permission_name: 'CREATE_PRODUCT' }),
            permission_models_1.Permission.create({ permission_name: 'VIEW_PRODUCT' }),
            permission_models_1.Permission.create({ permission_name: 'UPDATE_PRODUCT' }),
            permission_models_1.Permission.create({ permission_name: 'DELETE_PRODUCT' }),
            permission_models_1.Permission.create({ permission_name: 'VIEW_USERS' }),
            permission_models_1.Permission.create({ permission_name: 'ADD_TO_CART' }),
            permission_models_1.Permission.create({ permission_name: 'REMOVE_FROM_CART' }),
        ]);
        await Promise.all(permissions.map((permission) => rolePermission_models_1.RolePermission.create({ role_id: adminRole.id, permission_id: permission.id })));
        await Promise.all(permissions
            .filter((permission) => ['VIEW_PRODUCT', 'ADD_TO_CART', 'REMOVE_FROM_CART'].includes(permission.permission_name))
            .map((permission) => rolePermission_models_1.RolePermission.create({ role_id: userRole.id, permission_id: permission.id })));
    });
    afterAll(async () => {
        await database_1.sequelize.close();
    });
    it('should register and login admin and user and enforce role-based permissions', async () => {
        const registerAdmin = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/auth/register')
            .send({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'adminpass123',
            phone: '9876543210',
            role_id: 1,
        });
        expect(registerAdmin.statusCode).toBe(201);
        expect(registerAdmin.body.message).toContain('User registered successfully');
        const registerUser = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/auth/register')
            .send({
            name: 'Normal User',
            email: 'user@example.com',
            password: 'userpass123',
            phone: '9876543211',
        });
        expect(registerUser.statusCode).toBe(201);
        const loginAdmin = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/auth/login')
            .send({
            email: 'admin@example.com',
            password: 'adminpass123',
        });
        expect(loginAdmin.statusCode).toBe(200);
        expect(loginAdmin.body.token).toBeDefined();
        const adminToken = loginAdmin.body.token;
        const loginUser = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/auth/login')
            .send({
            email: 'user@example.com',
            password: 'userpass123',
        });
        expect(loginUser.statusCode).toBe(200);
        expect(loginUser.body.token).toBeDefined();
        const userToken = loginUser.body.token;
        const categoryResponse = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/categories')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
            name: 'Shirts',
            description: 'Casual shirts',
        });
        expect(categoryResponse.statusCode).toBe(201);
        expect(categoryResponse.body.name).toBe('Shirts');
        const categoryId = categoryResponse.body.id;
        const categoryUnauthorized = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/categories')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
            name: 'Pants',
            description: 'Casual pants',
        });
        expect(categoryUnauthorized.statusCode).toBe(403);
        const createProduct = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/products')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
            title: 'Blue Shirt',
            description: 'A nice blue shirt',
            rate: 24.99,
            discount: 10,
            stock_quantity: 50,
            category_id: categoryId,
            cloth_type: 'Cotton',
            image_url: 'https://example.com/image.jpg',
        });
        expect(createProduct.statusCode).toBe(201);
        expect(createProduct.body.title).toBe('Blue Shirt');
        const productId = createProduct.body.id;
        const productUnauthorized = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/products')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
            title: 'Red Shirt',
            rate: 19.99,
            category_id: categoryId,
        });
        expect(productUnauthorized.statusCode).toBe(403);
        const addToCart = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/cart/items')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
            product_id: productId,
            quantity: 2,
        });
        expect(addToCart.statusCode).toBe(201);
        expect(addToCart.body.product_id).toBe(productId);
        expect(addToCart.body.quantity).toBe(2);
        const cartResponse = await (0, supertest_1.default)(app_1.default)
            .get('/api/v1/cart')
            .set('Authorization', `Bearer ${userToken}`);
        console.log('CART_RESPONSE_BODY', cartResponse.statusCode, cartResponse.body);
        expect(cartResponse.statusCode).toBe(200);
        expect(cartResponse.body.cart).toBeDefined();
        expect(cartResponse.body.items.length).toBeGreaterThan(0);
        const updateCartItem = await (0, supertest_1.default)(app_1.default)
            .put(`/api/v1/cart/items/${addToCart.body.id}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ quantity: 3 });
        expect(updateCartItem.statusCode).toBe(200);
        expect(updateCartItem.body.quantity).toBe(3);
        const deleteCartItem = await (0, supertest_1.default)(app_1.default)
            .delete(`/api/v1/cart/items/${addToCart.body.id}`)
            .set('Authorization', `Bearer ${userToken}`);
        expect(deleteCartItem.statusCode).toBe(200);
        expect(deleteCartItem.body.message).toContain('Item removed from cart');
    });
});
