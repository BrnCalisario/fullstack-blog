import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcryptjs"

class UserController {

    static async getAll(req: Request, res: Response) {
        const query = await User.find()
        return query
    }

    static async CreateUser(req: Request, res: Response) {                
        try {
            const register = req.body as IUser

            console.log(register)
            
            res.send("Ok")

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(register.password, salt)

            register.password = hash

            const result = await User.create(register)

            result ?
                res.status(201).send(`Created succesfully with ID ${result._id}`)
                : res.status(500).send("Error while creating user")

        } catch (error: any) {
            console.error(error)
            res.status(400).send(error.message)
        }
    }
}


export default UserController