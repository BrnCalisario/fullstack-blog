import CryptoJS from "crypto-js"

export const encryptBody = (value : any) => {
    const result = CryptoJS.AES.encrypt(JSON.stringify(value), 'senha').toString()
    return result
}