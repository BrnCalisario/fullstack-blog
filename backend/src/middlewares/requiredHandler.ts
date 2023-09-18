import { Request, Response, NextFunction } from 'express';
import { RequiredFields } from '../models/required.model';
import { InvalidBodyError } from '../models/errors.model';


function checkRequiredFields<T extends {}>(
    req : Request,
    res : Response,
    next : NextFunction
) {
    
    const body = req.body as T

    const requiredFields = Object.keys(body) as RequiredFields<T>[]

    const badFields = requiredFields.filter((f) => !Boolean(body[f]))

    console.log(requiredFields)
    console.log(badFields)

    if(badFields.length > 0)
        throw new InvalidBodyError()

    next()
}

export default checkRequiredFields