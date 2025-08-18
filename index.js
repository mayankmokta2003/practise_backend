import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import express, { json, urlencoded } from "express"

const app = express()


dotenv.config({
    path: './env'
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())


export {app}