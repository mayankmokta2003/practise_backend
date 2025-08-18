import dotenv from "dotenv"
import { connectDB } from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
    path: './env'
})


connectDB()
try {
    app.listen(process.env.PORT , ()=>{
             console.log("the port is running at: ", process.env.PORT )
           })
} catch (error) {
    console.log("the error here in DB in indexDB.js is: ",error)
}