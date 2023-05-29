import Joi from "joi";

export default postSchema=Joi.object({
    image: Joi.string().max(300).uri().required(),
    description: Joi.string().min(0).max(200).required()
})