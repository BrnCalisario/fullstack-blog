import express from 'express'
import 'dotenv/config'
import { connect } from './config/database'
import errorHandler from './middlewares/errorHandler'

import { userRouter } from './routes/users.router'
import { postRouter } from './routes/post.router'
import cors from "cors"

const PORT = process.env.PORT ?? 3000

const app = express()
app.use(cors())
app.use(express.json())

connect()

app.use("/user", userRouter)
app.use("/post", postRouter)

app.use(errorHandler)

app.listen(PORT, () => console.log('server running at http://localhost:' + PORT))

