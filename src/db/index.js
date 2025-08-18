import mongoose from "mongoose"


const connectDB = async()=>{
    try{
        const data = await mongoose.connect(process.env.MONGOOSE_URL)
    }
    catch(error){
        console.log("the error in database connection is: ",error)
    }
}