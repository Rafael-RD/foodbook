import { userPostsQuery } from "../repositories/posts.repository.js";
import { emailQuery, usernameQuery } from "../repositories/users.repository.js";


export async function getUsername(req, res){
    const {username}=req.params;
    const {tokenData}=res.locals;

    try {
        const emailSearch=await emailQuery({email: tokenData.email});
        if(!emailSearch.rowCount) return res.sendStatus(403);
        const usernameSearch=await usernameQuery({username});
        if(!usernameSearch.rowCount) return res.sendStatus(404);
        const userPostsSearch=await userPostsQuery({userId: usernameSearch.rows[0].id});
        const resp={
            username: usernameSearch.rows[0].username,
            photo: usernameSearch.rows[0].photo,
            bio: usernameSearch.rows[0].bio,
            posts: userPostsSearch.rows.map(e=>({...e, userId: undefined}))
        }
        return res.send(resp);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}