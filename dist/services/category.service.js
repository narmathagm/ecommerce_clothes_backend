"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = exports.CategoryService = void 0;
const category_models_1 = require("../models/category.models");
const validationSchemas_1 = require("../validations/validationSchemas");
function toCategoryResponse(category) {
    const json = category.toJSON();
    return {
        id: json.id,
        name: json.category_name,
        description: json.description,
        active: json.active,
        created_at: json.created,
        updated_at: json.modified,
    };
}
class CategoryService {
    async getAllCategories() {
        const categories = await category_models_1.Category.findAll({ where: { active: 1 } });
        return categories.map(toCategoryResponse);
    }
    async getCategoryById(id) {
        const category = await category_models_1.Category.findOne({ where: { id, active: 1 } });
        return category ? toCategoryResponse(category) : null;
    }
    async createCategory(body) {
        const validation = validationSchemas_1.createCategorySchema.validate(body, { abortEarly: false });
        if (validation.error) {
            return { status: 400, data: { message: (0, validationSchemas_1.formatValidationError)(validation.error) } };
        }
        const category = await category_models_1.Category.create({
            category_name: validation.value.name,
            description: validation.value.description,
        });
        return { status: 201, data: toCategoryResponse(category) };
    }
    async updateCategory(id, body) {
        const validation = validationSchemas_1.updateCategorySchema.validate(body, { abortEarly: false });
        if (validation.error) {
            return { status: 400, data: { message: (0, validationSchemas_1.formatValidationError)(validation.error) } };
        }
        const category = await category_models_1.Category.findByPk(id);
        if (!category) {
            return { status: 404, data: null };
        }
        await category.update({
            ...(validation.value.name ? { category_name: validation.value.name } : {}),
            ...(validation.value.description !== undefined ? { description: validation.value.description } : {}),
        });
        return { status: 200, data: toCategoryResponse(category) };
    }
    async deleteCategory(id) {
        const category = await category_models_1.Category.findByPk(id);
        if (!category) {
            return { status: 404, data: { message: "Category not found" } };
        }
        await category.update({ active: 0 });
        return { status: 200, data: { message: "Category deleted successfully" } };
    }
}
exports.CategoryService = CategoryService;
exports.categoryService = new CategoryService();
