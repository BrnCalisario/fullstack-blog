import { Request, Response } from "express";
import Post, { IPost } from "../models/post.model";

class PostController {
     
    static async CreatePost(req : Request, res : Response) {
        try {
            const data = req.body as IPost

            const result = await Post.create(data)

            result ?
                res.status(201).send(`Created succesfully with ID ${result._id}`)
                : res.status(500).send("Error while creating post")
        } catch (error : any) {
            console.error(error)
            res.status(400).send(error.message)
        }
    } 
}

export default PostController