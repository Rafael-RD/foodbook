import db from "../database/connection.database.js";

export function emailQuery({email}){
    return db.query("SELECT * FROM users WHERE email=$1",[email]);
}

export function usernameQuery({username}){
    return db.query("SELECT * FROM users WHERE username=$1",[username]);
}