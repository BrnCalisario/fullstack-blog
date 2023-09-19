import { Button, Form } from "react-bootstrap"
import FormField from "../components/FormField"
import useInput from "brn-useinput"
import { FormEvent, useState } from "react"
import axios from "axios"
import { encryptBody } from "../services/encrypt"

function Login() {

    const [email, bindEmail, resetEmail] = useInput('')
    const [password, bindPassword, resetPassword] = useInput('')


    const [error, setError] = useState<boolean>(false)

    const clearAll = () => {
        resetEmail()
        resetPassword()
    }

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const body = { email, password }        
 
        const crypt = encryptBody(body)
        
        await axios.post('http://localhost:3030/user/auth', { 
            crypt
        }).then(res => {
        
            const jwt = res.data

            sessionStorage.setItem('token', jwt.token)
            console.log("authenticated")

            clearAll()
        })        
        .catch(err => {
            // const { status } = err.response

            // console.log(status)

            // if(status === 404)

            setError(true)
        })
    
    }

    return (
        <div className="w-50 mx-auto">
            <Form onSubmit={handleSubmit}>
                <h2 className="text-center">Login</h2>
                { error && <h4 className="text-center text-danger">E-mail ou senha inválidos</h4>}
                <FormField 
                    labelContent="E-mail"
                    bind={bindEmail}
                    args={{ }}/>

                <FormField labelContent="Senha"
                    bind={bindPassword}
                    args={{ type: "password" }}
                />

                <Button type="submit" className="mt-3 w-100" variant="success">Entrar</Button>
            </Form>
        </div>
    )
}

export default Login