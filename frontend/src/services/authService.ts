import axios from "axios"
import { encryptBody } from "./encrypt"


const API = axios.create({
    baseURL: "http://localhost:3030",
    headers: {
        "Content-Type": "application/json"
    }
})

const authService = {

    async login(data: { email: string, password: string }): Promise<string | null> {

        const crypt = encryptBody(data)

        console.log(data)
        console.log(crypt)

        const response = await API.post("/user/auth", crypt)

        const { token, userInfo } = response.data.jwt

        sessionStorage.setItem('token', token)

        return token

    },

    async isTokenValid(token: string): Promise<boolean> {
        const response = await axios.post("http://localhost:3030/user/validate", token)
        return response.data.result as boolean
    },

    logout(): void {
        localStorage.removeItem('token')
    }

}

export default authService