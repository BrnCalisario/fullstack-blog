import express from "express"
import UserController from "../controllers/user.controller"

export const userRouter = express.Router()

userRouter.get("/", UserController.getAll)
userRouter.post("/", UserController.CreateUser)
