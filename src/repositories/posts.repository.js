import db from "../database/connection.database.js";

export function userPostsQuery({userId}){
    return db.query(`SELECT * FROM posts WHERE "userId"=$1`,[userId]);
}