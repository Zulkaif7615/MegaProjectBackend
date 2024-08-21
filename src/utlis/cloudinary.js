import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // if(localFilePath){
    //     console.log("localFilePath exit:",localFilePath);

    // }else{
    //     console.log("localFilePath does not exit");

    // }
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    // console.log("file is upload in cloudinary", response.url);
    fs.unlinkSync(localFilePath);
// console.log("cloudinary response",response);

    return response;
  } catch (error) {
    console.log("file is not upload in cloudinary");

    fs.unlinkSync(localFilePath); // remove the locally
    //save temporary file as the upload operation got failes
    return null;
  }
};

export { uploadCloudinary };
// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//     { public_id: "olympic_flag" },
//     function(error, result) {console.log(result); });
