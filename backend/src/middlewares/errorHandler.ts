import { Request, Response, NextFunction } from "express";
import { RequestError } from "../models/errors.model";

function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next : NextFunction
) {
    if (err instanceof RequestError) {
        res.status(err.statusCode).json({ error : err.message })
        return
    }

    console.log(err)
    res.status(500).json({ error : "Internal server error"})
}

export default errorHandler