import { Router } from "express";
import BrandController from "../Controllers/BrandController.js";

const router = Router();

router.get("/", BrandController.get_all);
router.get("/:id", BrandController.get_one);
router.post("/", BrandController.create);
router.put("/:id", BrandController.edit);
router.delete("/:id", BrandController.delete);

export default router;
