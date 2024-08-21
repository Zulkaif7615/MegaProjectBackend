import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
// here same changing
app.use(express.json({limit: "160k"})) // when we fill a form we get  data , from form
app.use(express.urlencoded({extended: true, limit: "16k"}))// for handling the url data
app.use(express.static("public"))
app.use(cookieParser())


// routers import
import userRouter from './routes/user.routes.js'

// routes Decliration

app.use("/api/v1/users", userRouter)
// http:localhost:8000/api/v2/users/register

export {app}