import express from "express"

import PostController from "../controllers/post.controller"

export const postRouter = express.Router()

postRouter.post('/', PostController.createPost)
