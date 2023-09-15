import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { usePostsContext } from "../contexts/PostContext"
import Post from "../models/Post.model"


function PostFeed() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/create")
    }
    
    const { posts } = usePostsContext()

    return (
        <>
            <h3>Este é o feed de postagens do blog</h3>
            <Button variant="primary" onClick={handleClick}>Criar nova postagem</Button>
            { posts.map((p : Post, i : number) => <h4 key={i}>{ p.title }</h4>)}
        </>
    )
}

export default PostFeed