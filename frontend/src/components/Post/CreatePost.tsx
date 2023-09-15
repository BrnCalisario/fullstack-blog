import { Button, Form } from "react-bootstrap"
import useInput from "brn-useinput"
import FormField from "../FormField"
import { FormEvent, useEffect, useState } from "react"
import { usePostsContext } from "../../contexts/PostContext"

function CreatePost() {

    const [error, setError] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    const [title, bindTitle] = useInput('')
    const [content, bindContent] = useInput('')

    const { posts, addPosts } = usePostsContext()
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!title || !content)
        {
            setError(true)
            return
        }

        setSuccess(true)

        addPosts({title, content, votes : 0})
    }

    useEffect(() => {
        if(!success)
            return

        const timer = setTimeout(() => {
            setSuccess(false)
        }, 2500)

        return () => clearTimeout(timer)

    }, [success])


    return (
        <div>
            <Form className="w-50 mx-auto" onSubmit={handleSubmit}>
                <h2 className="text-center">Nova Postagem</h2>
                
                { error && <h4 className="text-center text-danger">Erro ao criar postagem</h4> }
                { success && <h4 className="text-center text-success">Postagem criada com sucesso!</h4> }
                
                <FormField labelContent="Título" bind={bindTitle} args={{ placeholder: 'Minha Postagem' }} />
                <FormField labelContent="Conteúdo" bind={bindContent} args={{ as: 'textarea', placeholder: 'Meu Conteúdo' }} />
                
                <Button type="submit" variant="primary" className="mt-3 w-100">Postar</Button>
            </Form>
        </div>
    )
}

export default CreatePost