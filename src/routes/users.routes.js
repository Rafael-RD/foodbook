import { Router } from "express";
import validateTokenMiddleware from "../middlewares/validateToken.middleware.js";
import { getUsername } from "../controllers/users.controller.js";

const usersRouter=Router();

usersRouter.get("/:username", validateTokenMiddleware, getUsername);

export default usersRouter;