import { Router } from "express";
import ProductController from "../Controllers/ProductController.js";
import { authMiddleware } from "../Middlewares/Auth.js";

const router = Router();

router.get("/", ProductController.get_all);
router.get("/:id", ProductController.details);
router.get("/:id/default", ProductController.get_one);
router.get("/:id/reviews", ProductController.reviews);
router.post("/", authMiddleware, ProductController.create);

export default router;
