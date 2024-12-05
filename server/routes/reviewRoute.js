import express from "express";
import {
  createReview,
  getUserReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", createReview);

reviewRouter.get("/:userId", getUserReviews);

reviewRouter.put("/:reviewId", updateReview);

reviewRouter.delete("/:reviewId", deleteReview);

export default reviewRouter;
