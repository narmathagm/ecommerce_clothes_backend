"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const user_controller_1 = require("./../controllers/user.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const product_controller_1 = require("./../controllers/product.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const category_controller_1 = require("./../controllers/category.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const cart_controller_1 = require("./../controllers/cart.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const auth_controller_1 = require("./../controllers/auth.controller");
const authentication_1 = require("./../middlewares/authentication");
const expressAuthenticationRecasted = authentication_1.expressAuthentication;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "UserResponse": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "phone": { "dataType": "string", "required": true },
            "role_id": { "dataType": "double", "required": true },
            "active": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductResponse": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "title": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "rate": { "dataType": "double", "required": true },
            "discount": { "dataType": "double", "required": true },
            "stock_quantity": { "dataType": "double", "required": true },
            "category_id": { "dataType": "double", "required": true },
            "cloth_type": { "dataType": "string", "required": true },
            "image_url": { "dataType": "string", "required": true },
            "active": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateProductDTO": {
        "dataType": "refObject",
        "properties": {
            "title": { "dataType": "string", "required": true },
            "description": { "dataType": "string" },
            "rate": { "dataType": "double", "required": true },
            "discount": { "dataType": "double" },
            "stock_quantity": { "dataType": "double" },
            "category_id": { "dataType": "double", "required": true },
            "cloth_type": { "dataType": "string" },
            "image_url": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateProductDTO": {
        "dataType": "refObject",
        "properties": {
            "title": { "dataType": "string" },
            "description": { "dataType": "string" },
            "rate": { "dataType": "double" },
            "discount": { "dataType": "double" },
            "stock_quantity": { "dataType": "double" },
            "category_id": { "dataType": "double" },
            "cloth_type": { "dataType": "string" },
            "image_url": { "dataType": "string" },
            "active": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryResponse": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "active": { "dataType": "double", "required": true },
            "created_at": { "dataType": "datetime" },
            "updated_at": { "dataType": "datetime" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateCategoryDTO": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateCategoryDTO": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string" },
            "description": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CartResponse": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "user_id": { "dataType": "double", "required": true },
            "active": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CartItemResponse": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "cart_id": { "dataType": "double", "required": true },
            "product_id": { "dataType": "double", "required": true },
            "quantity": { "dataType": "double", "required": true },
            "unit_price": { "dataType": "double", "required": true },
            "active": { "dataType": "double", "required": true },
            "product": { "dataType": "any" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetCartResponse": {
        "dataType": "refObject",
        "properties": {
            "cart": { "ref": "CartResponse", "required": true },
            "items": { "dataType": "array", "array": { "dataType": "refObject", "ref": "CartItemResponse" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddToCartDTO": {
        "dataType": "refObject",
        "properties": {
            "product_id": { "dataType": "double", "required": true },
            "quantity": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateCartItemDTO": {
        "dataType": "refObject",
        "properties": {
            "quantity": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthResponse": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
            "token": { "dataType": "string" },
            "user": { "dataType": "nestedObjectLiteral", "nestedProperties": { "role_id": { "dataType": "double", "required": true }, "email": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "id": { "dataType": "double", "required": true } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RegisterDTO": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "phone": { "dataType": "string", "required": true },
            "role_id": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginDTO": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "silently-remove-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsUserController_getAllUsers = {};
    app.get('/api/v1/user', authenticateMiddleware([{ "jwt": ["admin"] }]), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.getAllUsers)), async function UserController_getAllUsers(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getAllUsers, request, response });
            const controller = new user_controller_1.UserController();
            await templateService.apiHandler({
                methodName: 'getAllUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProductController_getAllProducts = {};
    app.get('/api/v1/products', ...((0, runtime_1.fetchMiddlewares)(product_controller_1.ProductController)), ...((0, runtime_1.fetchMiddlewares)(product_controller_1.ProductController.prototype.getAllProducts)), async function ProductController_getAllProducts(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProductController_getAllProducts, request, response });
            const controller = new product_controller_1.ProductController();
            await templateService.apiHandler({
                methodName: 'getAllProducts',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProductController_getProductById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/api/v1/products/:id', ...((0, runtime_1.fetchMiddlewares)(product_controller_1.ProductController)), ...((0, runtime_1.fetchMiddlewares)(product_controller_1.ProductController.prototype.getProductById)), async function ProductController_getProductById(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProductController_getProductById, request, response });
            const controller = new product_controller_1.ProductController();
            await templateService.apiHandler({
                methodName: 'getProductById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProductController_createProduct = {
        body: { "in": "body", "name": "body", "required": true, "ref": "CreateProductDTO" },
    };
    app.post('/api/v1/products', authenticateMiddleware([{ "jwt": ["admin"] }]), ...((0, runtime_1.fetchMiddlewares)(product_controller_1.ProductController)), ...((0, runtime_1.fetchMiddlewares)(product_controller_1.ProductController.prototype.createProduct)), async function ProductController_createProduct(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProductController_createProduct, request, response });
            const controller = new product_controller_1.ProductController();
            await templateService.apiHandler({
                methodName: 'createProduct',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProductController_updateProduct = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        body: { "in": "body", "name": "body", "required": true, "ref": "UpdateProductDTO" },
    };
    app.put('/api/v1/products/:id', authenticateMiddleware([{ "jwt": ["admin"] }]), ...((0, runtime_1.fetchMiddlewares)(product_controller_1.ProductController)), ...((0, runtime_1.fetchMiddlewares)(product_controller_1.ProductController.prototype.updateProduct)), async function ProductController_updateProduct(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProductController_updateProduct, request, response });
            const controller = new product_controller_1.ProductController();
            await templateService.apiHandler({
                methodName: 'updateProduct',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProductController_deleteProduct = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.delete('/api/v1/products/:id', authenticateMiddleware([{ "jwt": ["admin"] }]), ...((0, runtime_1.fetchMiddlewares)(product_controller_1.ProductController)), ...((0, runtime_1.fetchMiddlewares)(product_controller_1.ProductController.prototype.deleteProduct)), async function ProductController_deleteProduct(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProductController_deleteProduct, request, response });
            const controller = new product_controller_1.ProductController();
            await templateService.apiHandler({
                methodName: 'deleteProduct',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoryController_getAllCategories = {};
    app.get('/api/v1/categories', ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoryController)), ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoryController.prototype.getAllCategories)), async function CategoryController_getAllCategories(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_getAllCategories, request, response });
            const controller = new category_controller_1.CategoryController();
            await templateService.apiHandler({
                methodName: 'getAllCategories',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoryController_getCategoryById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/api/v1/categories/:id', ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoryController)), ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoryController.prototype.getCategoryById)), async function CategoryController_getCategoryById(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_getCategoryById, request, response });
            const controller = new category_controller_1.CategoryController();
            await templateService.apiHandler({
                methodName: 'getCategoryById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoryController_createCategory = {
        body: { "in": "body", "name": "body", "required": true, "ref": "CreateCategoryDTO" },
    };
    app.post('/api/v1/categories', authenticateMiddleware([{ "jwt": ["admin"] }]), ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoryController)), ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoryController.prototype.createCategory)), async function CategoryController_createCategory(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_createCategory, request, response });
            const controller = new category_controller_1.CategoryController();
            await templateService.apiHandler({
                methodName: 'createCategory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoryController_updateCategory = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        body: { "in": "body", "name": "body", "required": true, "ref": "UpdateCategoryDTO" },
    };
    app.put('/api/v1/categories/:id', authenticateMiddleware([{ "jwt": ["admin"] }]), ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoryController)), ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoryController.prototype.updateCategory)), async function CategoryController_updateCategory(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_updateCategory, request, response });
            const controller = new category_controller_1.CategoryController();
            await templateService.apiHandler({
                methodName: 'updateCategory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoryController_deleteCategory = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.delete('/api/v1/categories/:id', authenticateMiddleware([{ "jwt": ["admin"] }]), ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoryController)), ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoryController.prototype.deleteCategory)), async function CategoryController_deleteCategory(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_deleteCategory, request, response });
            const controller = new category_controller_1.CategoryController();
            await templateService.apiHandler({
                methodName: 'deleteCategory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCartController_getCart = {
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
    };
    app.get('/api/v1/cart', authenticateMiddleware([{ "jwt": ["user"] }]), ...((0, runtime_1.fetchMiddlewares)(cart_controller_1.CartController)), ...((0, runtime_1.fetchMiddlewares)(cart_controller_1.CartController.prototype.getCart)), async function CartController_getCart(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCartController_getCart, request, response });
            const controller = new cart_controller_1.CartController();
            await templateService.apiHandler({
                methodName: 'getCart',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCartController_addItemToCart = {
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        body: { "in": "body", "name": "body", "required": true, "ref": "AddToCartDTO" },
    };
    app.post('/api/v1/cart/items', authenticateMiddleware([{ "jwt": ["user"] }]), ...((0, runtime_1.fetchMiddlewares)(cart_controller_1.CartController)), ...((0, runtime_1.fetchMiddlewares)(cart_controller_1.CartController.prototype.addItemToCart)), async function CartController_addItemToCart(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCartController_addItemToCart, request, response });
            const controller = new cart_controller_1.CartController();
            await templateService.apiHandler({
                methodName: 'addItemToCart',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCartController_updateCartItemQuantity = {
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        body: { "in": "body", "name": "body", "required": true, "ref": "UpdateCartItemDTO" },
    };
    app.put('/api/v1/cart/items/:id', authenticateMiddleware([{ "jwt": ["user"] }]), ...((0, runtime_1.fetchMiddlewares)(cart_controller_1.CartController)), ...((0, runtime_1.fetchMiddlewares)(cart_controller_1.CartController.prototype.updateCartItemQuantity)), async function CartController_updateCartItemQuantity(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCartController_updateCartItemQuantity, request, response });
            const controller = new cart_controller_1.CartController();
            await templateService.apiHandler({
                methodName: 'updateCartItemQuantity',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCartController_removeCartItem = {
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.delete('/api/v1/cart/items/:id', authenticateMiddleware([{ "jwt": ["user"] }]), ...((0, runtime_1.fetchMiddlewares)(cart_controller_1.CartController)), ...((0, runtime_1.fetchMiddlewares)(cart_controller_1.CartController.prototype.removeCartItem)), async function CartController_removeCartItem(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCartController_removeCartItem, request, response });
            const controller = new cart_controller_1.CartController();
            await templateService.apiHandler({
                methodName: 'removeCartItem',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAuthController_register = {
        body: { "in": "body", "name": "body", "required": true, "ref": "RegisterDTO" },
    };
    app.post('/api/v1/auth/register', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController.prototype.register)), async function AuthController_register(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_register, request, response });
            const controller = new auth_controller_1.AuthController();
            await templateService.apiHandler({
                methodName: 'register',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAuthController_login = {
        body: { "in": "body", "name": "body", "required": true, "ref": "LoginDTO" },
    };
    app.post('/api/v1/auth/login', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController.prototype.login)), async function AuthController_login(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });
            const controller = new auth_controller_1.AuthController();
            await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function authenticateMiddleware(security = []) {
        return async function runAuthenticationMiddleware(request, response, next) {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts = [];
            const pushAndRethrow = (error) => {
                failedAttempts.push(error);
                throw error;
            };
            const secMethodOrPromises = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises = [];
                    for (const name in secMethod) {
                        secMethodAndPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response)
                            .catch(pushAndRethrow));
                    }
                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                }
                else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response)
                            .catch(pushAndRethrow));
                    }
                }
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            try {
                request['user'] = await Promise.any(secMethodOrPromises);
                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next();
            }
            catch (err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        };
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
