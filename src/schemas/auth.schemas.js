import Joi from "joi";

export const registerSchema=Joi.object({
    name: Joi.string().min(3).max(40).required(),
    email: Joi.string().email().required(),
    photo: Joi.string().max(300).uri().required(),
    bio: Joi.string().min(0).max(200).required(),
    password: Joi.string().min(3).max(40).required()
});

export const loginSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(40).required()
});