export interface RegisterDTO {
    name: string;
    email: string;
    password: string;
    phone: string;
    /**
     * Optional role_id. Defaults to USER (2) if not provided.
     */
    role_id?: number;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    token?: string;
    user?: {
        id: number;
        name: string;
        email: string;
        role_id: number;
    };
}
