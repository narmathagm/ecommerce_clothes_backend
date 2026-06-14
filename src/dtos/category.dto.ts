export interface CategoryResponse {
    id: number;
    name: string;
    description: string;
    active: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface CreateCategoryDTO {
    name: string;
    description: string;
}

export interface UpdateCategoryDTO {
    name?: string;
    description?: string;
}
