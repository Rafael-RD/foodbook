import db from "../database/connection.database.js";

export function emailQuery({email}){
    return db.query("SELECT * FROM users WHERE email=$1",[email]);
}

export function createUser({name, email, photo, bio, password}){
    return db.query(`
    INSERT INTO users (name, email, photo, bio, password)
    VALUES ($1, $2, $3, $4, $5)
    `, [name, email, photo, bio, password]);
}

export function updateLastLogin({email}){
    return db.query(`
    UPDATE users 
    SET "lastLogin"=CURRENT_TIMESTAMP 
    WHERE email=$1
    `, [email]);
}