import { Router } from "express";
import ReviewController from "../Controllers/ReviewController.js";
import { authMiddleware } from "../Middlewares/Auth.js";
import ReviewActionController from "../Controllers/ReviewActionController.js";

const router = Router();

router.get("/", ReviewController.get_all);
router.get("/:review", ReviewController.get_one);
router.post("/:product", authMiddleware, ReviewController.create);
router.post(
    "/:review/mark/helpful",
    authMiddleware,
    ReviewActionController.mark_as_helpful
);
router.post(
    "/:review/mark/not-helpful",
    authMiddleware,
    ReviewActionController.masrk_as_not_helpful
);

export default router;
