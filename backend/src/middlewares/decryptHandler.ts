import { NextFunction, Request, Response } from "express";
import CryptoJS from "crypto-js"
import { BadEncryptError } from "../models/errors.model";

export function decryptMiddleware(
    req: Request,
    res: Response,
    next : NextFunction )
{
    try {

        const secret = process.env.API_SECRET

        if(!secret)
            throw new Error("Environment not set: API SECRET")

        var bytes = CryptoJS.AES.decrypt(req.body.crypt, secret)

        const result = bytes.toString(CryptoJS.enc.Utf8)


        req.body = JSON.parse(result)

        next()
    } catch (error) {

        return next(new BadEncryptError())
    }
}