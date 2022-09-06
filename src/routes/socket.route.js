import { Router } from "express";
import {
  getAllMessages,
  getMessagesFromMail,
  postMessage,
} from "../controllers/socketController.js";
import auth from "./auth.js";
const router = Router();

router.get("/", auth, getAllMessages);
router.get("/:email", auth, getMessagesFromMail);
router.post("/", auth, postMessage);

export default router;
