import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import { CLOUDINARY_FOLDER_NAME } from '../constants.js';


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        console.log("Uploading file:", localFilePath);

        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "image",
                folder: CLOUDINARY_FOLDER_NAME
            }
        );

        console.log("Cloudinary response:", response);

        fs.unlinkSync(localFilePath);

        return response;

    } catch (error) {
        console.log("Cloudinary Upload Error:", error);
        console.log("HTTP Code:", error.http_code);
        console.log("Message:", error.message);
        console.log("Error details:", error.error);

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

export { uploadOnCloudinary }
