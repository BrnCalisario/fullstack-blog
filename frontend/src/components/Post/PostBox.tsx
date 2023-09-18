import Post from "../../models/Post.model"
import "./Post.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp as leanThumb} from "@fortawesome/free-regular-svg-icons"
import { faThumbsUp as filledThumb } from "@fortawesome/free-solid-svg-icons"


interface Props {
    post: Post
}

function PostBox({ post }: Props) {
    return (
        <div className="post-preview">
            <h5>{post.title}</h5>
            <p>{post.content}</p>
            <div className="like-wrap">
                <span>{post.votes}</span><button><FontAwesomeIcon icon={filledThumb} /></button>
            </div>
        </div>
    )
}

export default PostBox