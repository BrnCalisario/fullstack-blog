import jsonwebtoken from "jsonwebtoken"
import jwt from "jsonwebtoken"
import * as bcrypt from "bcryptjs"
import { SECRET_KEY } from "../middlewares/authHandler"


class SecurityService {

    static saltRounds = 10

    static async hashPassword(password: string): Promise<string> {

        const salt = await bcrypt.genSalt(SecurityService.saltRounds)

        const hash = await bcrypt.hash(password, salt)

        return hash;
    }

    static async validatePassword(
        password: string,
        hash: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }

    static async generateToken(data : object, expiresIn : string) {
    
        const secret = process.env.JWT_SECRET;

        if(!secret) {
            throw new Error("Environment not set: JWT SECRET")
        }
        
        const token = jsonwebtoken.sign(data, secret, { expiresIn })
        
        return token
    }

    static validateToken(token : string) : boolean {
        try {
            const secret = process.env.JWT_SECRET

            if(!secret) {
                throw new Error("Environment not set: JWT SECRET")
            }
            
            jwt.verify(token, secret)

            return true
        } catch {
            return false
        }


        return false
    }

}

export default SecurityService