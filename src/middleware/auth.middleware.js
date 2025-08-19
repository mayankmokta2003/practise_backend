import { ApiError } from "../utils/ApiError"
import  Jwt  from "jsonwebtoken"
import { User } from "../models/user.model"

const auth = async(req,res,next)=>{
    const token = req.cookie.accessToken
    if(!token){
        throw new ApiError(500,"token not found")
    }
    const decodeToken =  Jwt.verify("refreshToken",process.env.ACCESS_TOKEN_SECRET)
    if(!decodeToken){
        throw new ApiError(505,"no decoded token found")
    }
    const user = await User.findById(decodeToken?._id).select("-password")

    req.user = user
    next()
}