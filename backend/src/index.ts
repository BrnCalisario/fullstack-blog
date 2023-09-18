import express from 'express'
import 'dotenv/config'
import { connect } from './config/database'
import { userRouter } from './routes/users.router'
import errorHandler from './middlewares/errorHandler'
import { postRouter } from './routes/post.router'
import checkRequiredFields from './middlewares/requiredHandler'
import { IUser } from './models/user.model'

const PORT = process.env.PORT ?? 3000

const app = express()
app.use(express.json())

connect()

app.use("/user", userRouter)
app.use("/post", postRouter)

app.use(errorHandler)

app.listen(PORT, () => console.log('server running at http://localhost:' + PORT))

