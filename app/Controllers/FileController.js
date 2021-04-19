import Controller from "./Controller.js";
import cloudinary from "../../Config/Cloudinary.js";

class FileController extends Controller {
    async upload(req, res) {
        try {
            const resp = [];
            for (let i = 0; i < req.files.length; i++) {
                resp[i] = (
                    await cloudinary.uploader.upload(req.files[i].path)
                ).secure_url;
            }

            

            return res.send(resp);
        } catch (err) {
            console.error(err);
            res.status(500).json({ err: "Something went wrong" });
        }
    }
}

export default new FileController();
