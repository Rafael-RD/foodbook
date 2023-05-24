import express from "express";
import dotenv from "dotenv";
import indexRouter from "./routes/index.routes.js";

dotenv.config();
const server=express();

server.use(indexRouter);

server.listen(process.env.PORT, ()=>console.log("Server on "+process.env.PORT));