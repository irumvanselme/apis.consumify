import cloudinary from "cloudinary";

const imageServer = cloudinary.v2;

imageServer.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default imageServer;
