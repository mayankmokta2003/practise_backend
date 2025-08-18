import mongoose from "mongoose"


const connectDB = async()=>{
    try{
        const data = await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("the data base is connected successfully" ,)
    }
    catch(error){
        console.log("the error in database connection is: ",error)
    }
}

export {connectDB}