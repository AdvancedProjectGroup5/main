import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import {
  postRegistration,
  postLogin,
  postLogout,
  deleteAccount,
} from "../controllers/UserController.js";

const router = Router();

router.post("/signup", postRegistration);
router.post("/login", postLogin);
router.post("/logout", auth, postLogout);
router.delete("/delete/:id", auth, deleteAccount);

export default router;
