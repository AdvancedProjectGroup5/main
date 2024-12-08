import express from "express";
import {
  addFavourite,
  getUserFavourites,
  deleteFavourite,
} from "../controllers/favouritesController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();
router.use(auth);
router.post("/", addFavourite);
router.get("/", getUserFavourites);
router.delete("/:favouriteId", deleteFavourite);

export default router;
