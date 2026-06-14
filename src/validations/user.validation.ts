import Joi from "joi";

export const userValidation = Joi.object({
    id: Joi.number().optional() ,
    name: Joi.string().required().messages({
        "string.base": "Name should be a string",
        "any.required": "Name is required"
    }),
    
    email: Joi.string().email().required().messages({
        "string.email":"Invalid email",
        "any.required": "Email is required"
    }),

    phone: Joi.string().required().min(10).pattern(/^[6-9]\d{9}$/).messages({
        "string.pattern.base":"Invalid phone number",
        "any.required":"Phone number is required",
        "string.min":"Phone number should be 10 digits"
    }),
    password: Joi.string().required().min(8).messages({
        "any.required":"Password is required",
        "string.min":"Password should be at least 8 characters long"
    }),
    role_id: Joi.number().required().messages({
        "any-required":"Role id is required"
    }),
    active: Joi.boolean().optional(),
    created: Joi.date().optional(),
    created_by: Joi.string().optional(),
    modified: Joi.date().optional(),
    modified_by: Joi.string().optional()
})
