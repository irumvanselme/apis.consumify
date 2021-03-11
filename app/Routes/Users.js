import { Router } from "express";
import UserController from "../Controllers/UserController.js";

const router = Router();

router.get("/", UserController.get_all);

export default router;
