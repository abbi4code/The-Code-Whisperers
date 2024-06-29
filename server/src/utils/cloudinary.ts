import { v2 as cloudinary} from "cloudinary";
import fs from "fs"
import ApiError from "./apiError";


    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
    });

    const cloudinaryUpload = async(localfilepath:any)=>{
        try {
            if(!localfilepath){
                throw new ApiError(404,"error in local file path")
            }
            const res = await cloudinary.uploader.upload(localfilepath, {
              resource_type: "image",
              allowed_formats: ["jpg", "jpeg", "png", "webp"],
            });
            console.log("uploaded on cloudinary",res)
            return res

        
        } catch (error) {
            fs.unlinkSync(localfilepath)
            throw new ApiError(404,"something went wrong in upload")
            
        }


    }


    export default cloudinaryUpload



