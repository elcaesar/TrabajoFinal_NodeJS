import { Router } from "express";
import { getAllOrders, getOneOrder } from "../controllers/order.controller.js";
import auth from "./auth.js";
const router = Router();

router.get("/", auth, getAllOrders); // todas las ordenes de un usuario
router.get("/:numero", auth, getOneOrder); // una orden especifica

export default router;
