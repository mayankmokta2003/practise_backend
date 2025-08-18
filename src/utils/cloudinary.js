import fs from "fs"
import { v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_API_NAME,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    api_key:process.env.CLOUDINARY_API_KEY
});

const uploadOnCloudinary = async (picture)=>{
    try{
        if(!picture)return null
        const response = cloudinary.uploader.upload(picture , {
            resource_type: "auto"})
            console.log("URL of the image is: ",response.url)
            return response
    }
    catch(error){
        fs.unlinkSync(picture)
        return null
    }
}

export {uploadOnCloudinary}