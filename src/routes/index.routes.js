import express from "express";
import cors from "cors";
import authRouter from "./auth.routes.js";

const indexRouter=express.Router();

indexRouter.use(cors());
indexRouter.use(express.json());

indexRouter.use(authRouter);

export default indexRouter;