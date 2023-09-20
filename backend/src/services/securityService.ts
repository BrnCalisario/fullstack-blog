import jsonwebtoken from "jsonwebtoken"
import * as bcrypt from "bcryptjs"

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

}

export default SecurityService