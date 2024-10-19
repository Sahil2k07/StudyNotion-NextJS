import { v2 as cloudinary } from "cloudinary";

type UploadOptions = {
  height?: number;
  quality?: number;
  resource_type: "auto" | "image" | "video" | "raw";
  folder: string;
};

export const CloudinaryConnect = async () => {
  try {
    if (
      cloudinary.config().cloud_name &&
      cloudinary.config().api_key &&
      cloudinary.config().api_secret
    ) {
      return;
    }

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME!,
      api_key: process.env.API_KEY!,
      api_secret: process.env.API_SECRET!,
    });

    console.log("Connected to Cloudinary Successfully");
  } catch (error) {
    console.log("Error connecting to Cloudinary");
    console.log(error);
  }
};

export const uploadImageToCloudinary = (
  fileBuffer: Buffer,
  folder: string,
  height?: number,
  quality?: number,
  contentType?: string
): Promise<{ secure_url: string } | null> => {
  return new Promise((resolve, reject) => {
    const options: UploadOptions = { folder, resource_type: "auto" };

    if (height) {
      options.height = height;
    }

    if (quality) {
      options.quality = quality;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as { secure_url: string });
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};
