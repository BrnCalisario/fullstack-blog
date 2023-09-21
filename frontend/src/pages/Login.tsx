import { Button, Form } from "react-bootstrap"
import FormField from "../components/Form/FormField"
import useInput from "brn-useinput"
import { FormEvent, useState } from "react"
import { NavLink } from "react-router-dom"
import authService from "../services/authService"
import { useUserContext } from "../contexts/UserContext"

function Login() {

    const [email, bindEmail, resetEmail] = useInput('')
    const [password, bindPassword, resetPassword] = useInput('')

    const { setUserInfo } = useUserContext()

    const [error, setError] = useState<boolean>(false)

    const clearAll = () => {
        resetEmail()
        resetPassword()
    }

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const body = { email, password }        
        
        await authService.login(body)
            .then(res => {
                
                if(!res)
                    throw new Error()

                setUserInfo(res)
            })
            .catch(err => {
                console.log(err)
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

                <span>Não tem uma conta ? <NavLink to="/register">Crie uma aqui</NavLink></span>
            </Form>
        </div>
    )
}

export default Login