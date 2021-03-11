import { Router } from "express";
import RateController from "../Controllers/RateController.js";
import { authMiddleware } from "../Middlewares/Auth.js";

const router = Router();

router.get("/", RateController.get_all);
router.get("/:id", RateController.get_one);
router.post("/:id", authMiddleware, RateController.create);
router.put("/:id", authMiddleware, RateController.edit);
router.delete("/:id", authMiddleware, RateController.delete);

export default router;
