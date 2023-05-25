import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { createUser, emailQuery, updateLastLogin } from "../repositories/auth.respository.js";

dotenv.config();

export async function postRegister(req, res){
    const {name, email, photo, bio, password}=req.body;

    try {
        const emailSearch=await emailQuery({email});
        if(emailSearch.rowCount) return res.sendStatus(409);
        const hash=bcrypt.hashSync(password, 10);
        console.log(hash);
        await createUser({name, email, photo, bio, password: hash});

        return res.sendStatus(201);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export async function postLogin(req, res){
    const {email, password}=req.body;

    try {
        const emailSearch=await emailQuery({email});
        if(!emailSearch.rowCount) res.sendStatus(404);
        if(bcrypt.compareSync(password, emailSearch.rows[0].password)===false) return res.sendStatus(401);
        const token=jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "24h"});
        await updateLastLogin({email});
        return res.send({token});
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}