import { v2 as cloudinary } from "cloudinary";
import logger from "./logger";

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Missing Cloudinary environment variables");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMediaToCloudinary = (file: any) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        ///Learning image optimization options
        quality: "auto:good", // Auto quality optimization
        fetch_format: "auto", // Auto format selection
        flags: "progressive", // Progressive JPEG loading
        //Set reasonable size limits
        width: 1920,
        height: 1080,
        crop: "limit", // Only resize if larger than specified dimensions
      },
      (error, result) => {
        if (error) {
          logger.error("Error while uploading media to cloudinary", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};

const deleteMediaFromCloudinary = async (publicId: any) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    logger.info("Media deleted successfuly from cloud stroage", publicId);
    return result;
  } catch (error) {
    logger.error("Error deleting media from cludinary", error);
    throw error;
  }
};

const getOptimizedImageUrl = (publicId: string, options?: any) => {
  return cloudinary.url(publicId, {
    f_auto: true, // Auto format (WebP/AVIF when supported)
    q_auto: true, // Auto quality
    w_auto: true, // Auto width
    dpr_auto: true, // Auto device pixel ratio
    ...options,
  });
};

export {
  deleteMediaFromCloudinary,
  uploadMediaToCloudinary,
  getOptimizedImageUrl,
};
