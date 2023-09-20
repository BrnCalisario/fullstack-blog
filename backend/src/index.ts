import express from 'express'
import 'dotenv/config'
import { connect } from './config/database'
import errorHandler from './middlewares/errorHandler'

import { userRouter } from './routes/users.router'
import { postRouter } from './routes/post.router'
import cors from "cors"
import { corsOptions } from './config/options'


const PORT = process.env.PORT ?? 3000

const app = express()
app.use(express.json())
app.use(cors(corsOptions))

connect()

app.use("/user", userRouter)
app.use("/post", postRouter)



app.use(errorHandler)

app.listen(PORT, () => console.log('server running at http://localhost:' + PORT))

