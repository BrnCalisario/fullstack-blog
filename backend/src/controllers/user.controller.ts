import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../middlewares/authHandler";

import { InsertError, InvalidBodyError } from "../models/errors.model";
import SecurityService from "../services/securityService";



class UserController {

    static async getAll(req: Request, res: Response) {
        const result = await User.find()
        res.send({ result })
    }

    static async registerUser(req: Request, res: Response, next : NextFunction) {
                
        const { username, email, password } = req.body as IUser

        if(!username || !email || !password) 
            return next(new InvalidBodyError());
                
        const register = { username, email, password }
        
        const hash = bcrypt.hashSync(register.password)
        register.password = hash

        try {
            const result = await User.create(register)
            
            result ?
                res.status(201).send(`Created succesfully with ID ${result._id}`)
                : res.status(500).send("Error while creating user")
        } catch (error: any) {
            return next(new InsertError("Error while inserting user"))
        }
    }

    static async authenticateUser(req: Request, res: Response, next: NextFunction) {
        
        const { email, password } = req.body

        if(!email || !password)
            return next(new InvalidBodyError())

        const user : IUser | null = await User.findOne({ email })

        if(!user)
            return res.status(404).send({ message : "User not found"})
    

        if(!SecurityService.validatePassword(password, user.password)) 
            return res.status(403).send({ message : "Forbidden"})
        

        const token = await SecurityService.generateToken({ userId: user.id }, '2 days')

        return res.status(200).send({ token, userInfo:  { username : user.username, email: user.email} })

    }
}


export default UserController