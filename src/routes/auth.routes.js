import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schemas.js";
import { postLogin, postRegister } from "../controllers/auth.controller.js";

const authRouter=Router();

authRouter.post("/register", validationMiddleware(registerSchema), postRegister);
authRouter.post("/login", validationMiddleware(loginSchema), postLogin);

export default authRouter;