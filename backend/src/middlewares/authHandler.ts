import jwt, { Secret, JwtPayload, Jwt, JsonWebTokenError } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { TokenNotProvidedError } from "../models/errors.model"

export const SECRET_KEY : Secret = 'SENHA'

export interface CustomRequest extends Request {
    token : string | JwtPayload
}

interface Token {
    userId : number
}

export const auth = async (req: Request, res : Response, next : NextFunction) => {

    if(!SECRET_KEY)
        return next(new Error('Environment not set: API SECRET'))

    const token = req.header('Authorization')?.replace('Bearer ', '')  

    if(!token) {
        return next(new TokenNotProvidedError())
    }

    const decoded = jwt.verify(token, SECRET_KEY)

    if(!decoded) {
        return next(new TokenNotProvidedError())
    }
    
    (req as CustomRequest).token = decoded

    next()   
}