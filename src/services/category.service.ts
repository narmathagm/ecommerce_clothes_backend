import { CategoryResponse, CreateCategoryDTO, UpdateCategoryDTO } from "../dtos/category.dto";
import { Category } from "../models/category.models";
import { createCategorySchema, formatValidationError, updateCategorySchema } from "../validations/validationSchemas";
import type { ServiceResult } from "./product.service";

function toCategoryResponse(category: Category): CategoryResponse {
    const json = category.toJSON() as any;
    return {
        id: json.id,
        name: json.category_name,
        description: json.description,
        active: json.active,
        created_at: json.created,
        updated_at: json.modified,
    };
}

export class CategoryService {
    public async getAllCategories(): Promise<CategoryResponse[]> {
        const categories = await Category.findAll({ where: { active: 1 } });
        return categories.map(toCategoryResponse);
    }

    public async getCategoryById(id: number): Promise<CategoryResponse | null> {
        const category = await Category.findOne({ where: { id, active: 1 } });
        return category ? toCategoryResponse(category) : null;
    }

    public async createCategory(body: CreateCategoryDTO): Promise<ServiceResult<CategoryResponse | { message: string }>> {
        const validation = createCategorySchema.validate(body, { abortEarly: false });
        if (validation.error) {
            return { status: 400, data: { message: formatValidationError(validation.error) } };
        }

        const category = await Category.create({
            category_name: validation.value.name,
            description: validation.value.description,
        });

        return { status: 201, data: toCategoryResponse(category) };
    }

    public async updateCategory(id: number, body: UpdateCategoryDTO): Promise<ServiceResult<CategoryResponse | { message: string } | null>> {
        const validation = updateCategorySchema.validate(body, { abortEarly: false });
        if (validation.error) {
            return { status: 400, data: { message: formatValidationError(validation.error) } };
        }

        const category = await Category.findByPk(id);
        if (!category) {
            return { status: 404, data: null };
        }

        await category.update({
            ...(validation.value.name ? { category_name: validation.value.name } : {}),
            ...(validation.value.description !== undefined ? { description: validation.value.description } : {}),
        });

        return { status: 200, data: toCategoryResponse(category) };
    }

    public async deleteCategory(id: number): Promise<ServiceResult<{ message: string }>> {
        const category = await Category.findByPk(id);
        if (!category) {
            return { status: 404, data: { message: "Category not found" } };
        }

        await category.update({ active: 0 });
        return { status: 200, data: { message: "Category deleted successfully" } };
    }
}

export const categoryService = new CategoryService();
