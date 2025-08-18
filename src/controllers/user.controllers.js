import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import cookieParser from "cookie-parser";


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

    const {userName,fullName,email,password,DOB} = req.body

    if ([email, userName, password,fullName,DOB].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
      }

    console.log("hahahahhahahaaahaha",req.body)
    const existedUser = await User.findOne({
        $or: [{userName},{email}]
    })
    if(existedUser){
        throw new ApiError(401,"user alreads exists")
    }

    const user = await User.create({
        fullName,
        email: email.toLowerCase(),
        userName: userName.toLowerCase(),
        password,
        DOB,
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
      );
      if (!createdUser) {
        throw new ApiError(404, "something went wrong");
      }
    
    res.status(200)
    .json(
        new ApiResponse(
            201,
            createdUser,
            "user created successfully"
        )
    )
})





const loginUser = AsyncHandler(async(req,res)=>{
    const {email , password} = req.body

    if(!(email,password)){
        throw new ApiError(504, "fields are required")
    }

    const user = await User.findById(email)
    if(!email){
        throw new ApiError(404, "user does not exist")
    }
    const checkPassword = await user.isPasswordCorrect(password)
    if(!checkPassword){
        throw new ApiError(404, "incorrect password")
    }

    const{accessToken , refreshToken} = generateRefreshAccessTokens(user._id)

    options = {
        httpOnly: true,
        secure: true
    }
    res.status(200)
    .cookies("accessToken",accessToken,options)
    .cookies("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {user: accessToken , refreshToken , user},
            "user logged in successfully"
        )
    )


})






export {registerUser,loginUser}