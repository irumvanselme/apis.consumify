import { Router } from "express";
import ProductCategory from "../Controllers/ProductCategoryController.js";

const router = Router();

router.get("/", ProductCategory.get_all);
router.get("/:id", ProductCategory.get_one);
router.get("/:id/products", ProductCategory.products);
router.post("/", ProductCategory.create);
router.put("/:id", ProductCategory.edit);
router.delete("/:id", ProductCategory.delete);

export default router;
