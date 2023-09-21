import axios from "axios"
import { encryptBody } from "./encrypt"
import { UserInfo } from "../contexts/UserContext"

const URL = "http://localhost:3030"

const authService = {

    async login(data: { email: string, password: string }): Promise<UserInfo | null> {

        const crypt = encryptBody(data)

        console.log(data)
        console.log(crypt)

        const response = await axios.post(URL + "/user/auth", { crypt })

        const { token, userInfo } = response.data

        sessionStorage.setItem('token', token)

        return userInfo as UserInfo
    },

    async validateToken(token: string): Promise<any> {
        const response = await axios.post("http://localhost:3030/user/validate", token)

        const { result : valid, userInfo } = response.data

        return { valid, userInfo}
    },

    logout(): void {
        localStorage.removeItem('token')
    }

}

export default authService