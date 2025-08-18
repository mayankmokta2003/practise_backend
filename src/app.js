import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

import router from "./routes/user.routes.js"

app.use("/api/v1/app", router)

export {app}