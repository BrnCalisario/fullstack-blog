import express from "express"
import UserController from "../controllers/user.controller"
import { decryptMiddleware } from "../middlewares/decryptHandler"

export const userRouter = express.Router()


userRouter.post("/", decryptMiddleware ,UserController.registerUser)
userRouter.post("/auth", decryptMiddleware ,UserController.authenticateUser)
