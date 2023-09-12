import express from "express"
import User, { IUser } from "../models/user.model"
import { genSaltSync, hashSync } from "bcrypt-ts"

export const userRouter = express.Router()

userRouter.get("/", async (req, res) => {
    const query = await User.find({ })

    res.send(query)
})



userRouter.post("/", async (req, res) => {
    try {        
        const register = req.body as IUser
                
        const salt = genSaltSync(10)
        // const hash = hashSync(register.password, salt)

        // register.password = hash
        
        // const result = await User.create(register)

        // result ?
        //     res.status(201).send(`Created succesfully with ID ${ result._id }`) 
        //     : res.status(500).send("Error while creating user")

    } catch (error : any) {
        console.error(error)
        res.status(400).send(error.message)
    }
})
