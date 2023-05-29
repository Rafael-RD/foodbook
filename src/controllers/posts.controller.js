import dotenv from 'dotenv';
import { emailQuery } from '../repositories/users.repository.js';

dotenv.config();

export async function postPost(){
    const {image, description}=req.body;
    const {email}=res.locals.tokenData;

    try {
        const emailSearch=await emailQuery({email});
        if(!emailSearch.rowCount) return res.sendStatus(401);
        return res.sendStatus(501);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}