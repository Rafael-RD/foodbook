import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { createUser, emailQuery, updateLastLogin, usernameQuery } from "../repositories/auth.respository.js";

dotenv.config();

export async function postRegister(req, res){
    const {username, email, photo, bio, password}=req.body;

    try {
        const emailSearch=await emailQuery({email});
        if(emailSearch.rowCount) return res.status(409).send("email já esta sendo usado");
        const usernameSearch=await usernameQuery({username});
        if(usernameSearch.rowCount) return res.status(409).send("username já esta sendo usado");
        const hash=bcrypt.hashSync(password, 10);
        console.log(hash);
        await createUser({username, email, photo, bio, password: hash});

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
        return res.send({token, username: emailSearch.rows[0].username, photo: emailSearch.rows[0].photo});
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}