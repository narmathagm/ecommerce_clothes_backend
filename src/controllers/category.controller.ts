import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, Security, Response } from "tsoa";
import { CreateCategoryDTO, UpdateCategoryDTO, CategoryResponse } from "../dtos/category.dto";
import { categoryService } from "../services/category.service";

@Route("categories")
@Tags("Categories")
export class CategoryController extends Controller {

    @Get("/")
    public async getAllCategories(): Promise<CategoryResponse[]> {
        return categoryService.getAllCategories();
    }

    @Get("/{id}")
    public async getCategoryById(@Path() id: number): Promise<CategoryResponse | null> {
        return categoryService.getCategoryById(id);
    }

    @Security("jwt", ["admin"])
    @Post("/")
    @Response(201, "Created")
    public async createCategory(@Body() body: CreateCategoryDTO): Promise<CategoryResponse | { message: string }> {
        const result = await categoryService.createCategory(body);
        this.setStatus(result.status);
        return result.data;
    }

    @Security("jwt", ["admin"])
    @Put("/{id}")
    public async updateCategory(@Path() id: number, @Body() body: UpdateCategoryDTO): Promise<CategoryResponse | { message: string } | null> {
        const result = await categoryService.updateCategory(id, body);
        this.setStatus(result.status);
        return result.data;
    }

    @Security("jwt", ["admin"])
    @Delete("/{id}")
    public async deleteCategory(@Path() id: number): Promise<{ message: string }> {
        const result = await categoryService.deleteCategory(id);
        this.setStatus(result.status);
        return result.data;
    }
}
