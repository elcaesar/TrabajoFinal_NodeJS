import { Router } from "express";
import {
  deleteCart,
  deleteProductFromCart,
  getProductsFromCart,
  postProductOnCart,
} from "../controllers/cart.controller.js";
import auth from "./auth.js";
const router = Router();

router.get("/productos", auth, getProductsFromCart); // lista los productos del carrito de este usuario
router.post("/productos", auth, postProductOnCart); // recibe un producto y lo agrega al carrito de este usuario
router.delete("/productos/:id_prod", auth, deleteProductFromCart); // recibe el id de un producto y si ést está en el carrito lo elimina
router.delete("/", auth, deleteCart); // vacía el carrito de compras

export default router;
