import { Router } from "express";
import ConsumerCategory from "../Controllers/ConsumerCategoryController.js";

const router = Router();

router.get("/", ConsumerCategory.get_all);
router.get("/:id", ConsumerCategory.get_one);
router.post("/", ConsumerCategory.create);
router.put("/:id", ConsumerCategory.edit);
router.delete("/:id", ConsumerCategory.delete);

export default router;
