import { Router } from "express";
import UserController from "../Controllers/UserController.js";

const router = Router();

router.post("/register", UserController.create);
router.post("/login", UserController.login);

export default router;
