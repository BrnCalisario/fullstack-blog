import CryptoJS from "crypto-js"

export const encryptBody = (value : any) => {
    
    const SECRET = import.meta.env.VITE_SECRET || ''

    if(!SECRET)
        throw new Error("Environment not set")
  
    const result = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET).toString()

    return result
}