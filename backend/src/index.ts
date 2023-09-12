import express from 'express'
import 'dotenv/config'
import { Router } from 'express' 
import { connect } from './config/database'
import { userRouter } from './routes/users.router'

const PORT = process.env.PORT ?? 3000

const app = express()
app.use(express.json())

connect()

app.use("/user", userRouter)


app.listen(PORT, () => console.log('server running at http://localhost:' + PORT))