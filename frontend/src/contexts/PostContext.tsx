import { createContext, useContext, useState } from "react";
import Post from "../models/Post.model";


interface PostContextData {
    posts: Post[]
    addPosts: (post: Post) => void
    updateVote: (votes: number, index: number) => void
}

const PostsContext = createContext<PostContextData | undefined>(undefined)
PostsContext.displayName = 'Posts'

export const usePostsContext = () => {
    const context = useContext(PostsContext)
    if (!context) {
        throw new Error('usePostsContext must be used inside a PostsContext.Provider')
    }

    return context
}

export interface ContextProps {
    children: JSX.Element | JSX.Element[]
}

export const PostsProvider = ({ children }: ContextProps) => {
        
    const [posts, setPosts] = useState<Post[]>([])

    const addPosts = (post: Post) => {
        setPosts((prev) => [post, ...prev])
    }

    const updateVote = (votes: number, index: number) => {
        const updatedPosts = [...posts]

        updatedPosts[index].votes += votes;
        setPosts(updatedPosts)
    }

    const value: PostContextData = {
        posts,
        addPosts,
        updateVote,
    }

    return (
        <PostsContext.Provider value={value}>
            {children}
        </PostsContext.Provider>
    )
}