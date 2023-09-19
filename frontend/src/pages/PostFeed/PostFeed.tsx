import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import "./PostFeed.scss"
import { usePostsContext } from "../../contexts/PostContext"
import Post from "../../models/Post.model"
import PostBox from "../../components/Post/PostBox"

function PostFeed() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/create")
    }

    const { posts } = usePostsContext()

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h3>Este é o feed de postagens do blog</h3>
                <Button variant="primary" onClick={handleClick}>Criar nova postagem</Button>
            </div>

            <div className="feed">{posts.map((p: Post, i: number) => <PostBox post={p} key={i} />)}</div>
            { posts.length == 0 && 
            <div className="d-flex justify-content-center" >
                <img src="https://media3.giphy.com/media/1l7GT4n3CGTzW/giphy.gif?cid=ecf05e479okyovg8jdh3gzja47rvsu9ts6hneq324ayzm80h&ep=v1_gifs_related&rid=giphy.gif&ct=g"/>            
            </div>
            }
        </>
    )
}

export default PostFeed