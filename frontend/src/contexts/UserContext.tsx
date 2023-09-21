import { createContext, useContext, useEffect, useState } from "react"
import { ContextProps } from "./PostContext"
import authService from "../services/authService"

export interface UserInfo {
    username: string,
    email: string,
}

interface UserContextData {
    logged : boolean
    userInfo : UserInfo | undefined,
    setUserInfo : (info : UserInfo) => void
}

const UserContext = createContext<UserContextData | undefined>(undefined)
UserContext.displayName = "userInfo"

export const useUserContext = () => {
    const context = useContext(UserContext)

    if(!context) {
        throw new Error("Erro")
    }

    return context
}

export const UserProvider = ({ children } : ContextProps) => {
    
    useEffect(() => {


        
        const token = sessionStorage.getItem('token')

        if(!token) {
            setLogged(false)
            setUserInfo(undefined)
            return
        }

        const result = await authService.validateToken(token)

        if(!result.valid)



    }, [])


    const [ userInfo, setUserInfo ] = useState<UserInfo>()   
    const [ logged, setLogged ] = useState<boolean>(false)

    const value : UserContextData = {
        logged, userInfo, setUserInfo, 
    }

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    )

}