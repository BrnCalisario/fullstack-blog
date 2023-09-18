import { Schema, model } from 'mongoose'

export interface IPost {
    title: string,
    content: string,
    votes?: number,
    postTime?: Date
}

const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    votes: { type: Number, default: 0 },
    postTime : { type : Date, default : Date.now }  
})

const Post = model<IPost>('Post', postSchema)

export default Post
