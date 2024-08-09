import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16k"})) // when we fill a form we get  data , from form
app.use(express.urlencoded({extended: true, limit: "16k"}))// for handling the url data
app.use(express.static("public"))
app.use(cookieParser())

export {app}