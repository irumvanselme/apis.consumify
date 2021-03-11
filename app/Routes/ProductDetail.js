import { Router } from "express";
import ProductDetail from "../Controllers/ProductDetailController.js";

const router = Router();

router.get("/", ProductDetail.get_all);
router.get("/:id", ProductDetail.get_one);
router.post("/", ProductDetail.create);
router.put("/:id", ProductDetail.edit);
router.delete("/:id", ProductDetail.delete);

export default router;
