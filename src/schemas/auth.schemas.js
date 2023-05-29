import Joi from "joi";

export const registerSchema=Joi.object({
    username: Joi.string().min(3).max(40).pattern(new RegExp('^[a-z][a-z\d\_]+[a-z\d]$','i')).required(),
    email: Joi.string().email().required(),
    photo: Joi.string().max(300).uri().required(),
    bio: Joi.string().min(0).max(200).required(),
    password: Joi.string().min(3).max(40).required()
});

export const loginSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(40).required()
});