import express from "express";
import cors from "cors";

const indexRouter=express.Router();

indexRouter.use(cors());
indexRouter.use(express.json());

// indexRouter.use();

export default indexRouter;