import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";


const generateRefreshAccessTokens = async(userId)=>{
    const user = await User.findById(userId)
    if(!user){
        throw new ApiError(403 , "no user found")
    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    user.save({validateBeforeSave: false})

    return {accessToken , refreshToken}

}


const registerUser = AsyncHandler(async(req,res)=>{

    const {userName,fullName,email,password} = req.body
    if([userName,fullName,password,email].some((field)=> field.trim()==="")){
        throw new ApiError(404 , "all fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{userName},{email}]
    })
    if(!existedUser){
        throw new ApiError(401,"user alreads exists")
    }
    imagePath = await req.file?.profilePic[0]?.path

    if(!imagePath){
        throw new ApiError(401,"image path not found")
    }
    const uploadImage = await uploadOnCloudinary(imagePath)
    if(!uploadImage){
        throw new ApiError(402,"image not uploaded")
    }

    const user = await User.create({
        fullName,
        email: email.toLowerCase(),
        userName: userName.toLowerCase(),
        password,
        profilePic: profilePic.url
    })

   














})

export {registerUser}