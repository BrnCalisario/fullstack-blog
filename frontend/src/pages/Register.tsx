import { Button, Form } from "react-bootstrap"
import FormField from "../components/FormField"
import useInput from "brn-useinput"
import { FormEvent } from "react"
import { encryptBody } from "../services/encrypt"
import axios from "axios"

function Register() {

    const [username, bindUsername, resetUsername] = useInput('')
    const [email, bindEmail, resetEmail] = useInput('')
    const [password, bindPassword, resetPassword] = useInput('')


    const clearAll = () => {
        resetUsername()
        resetEmail()
        resetPassword()
    }

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const body = { username, email, password }        
 
        const crypt = encryptBody(body)
        
        await axios.post('http://localhost:3030/user', { 
            crypt
        }).then(res => {

            console.log(res)
            clearAll()
        })        
        .catch(err => {
            console.log(err)
        })
    
    }

    return (
        <div className="w-50 mx-auto">
            <Form onSubmit={handleSubmit}>
                <h2 className="text-center">Cadastro</h2>
                <FormField 
                    labelContent="Nome de Usuário"
                    bind={bindUsername} 
                    args={{ placeholder : "Seu apelido de infância"}} />
                
                <FormField 
                    labelContent="E-mail"
                    bind={bindEmail}
                    args={{ placeholder : "usuario@example.com" }}/>

                <FormField labelContent="Senha"
                    bind={bindPassword}
                    args={{ type: "password", placeholder: "sua_senha_123" }}
                />

                <Button type="submit" className="mt-3 w-100" variant="primary">Cadastrar</Button>
            </Form>
        </div>
    )
}

export default Register