import express from "express";
import cors from "cors";
import authRouter from "./auth.routes.js";
import postsRouter from "./posts.routes.js";

const indexRouter=express.Router();

indexRouter.use(cors());
indexRouter.use(express.json());

indexRouter.use(authRouter);
indexRouter.use(postsRouter);

export default indexRouter;