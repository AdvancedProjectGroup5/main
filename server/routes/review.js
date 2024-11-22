import express from "express";
import {
  createReview,
  getUserReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const reviewRouter = express.reviewRouter();

reviewRouter.post("/", createReview);

// Route to get all reviews of a specific user
reviewRouter.get("/:userId", getUserReviews);

// Route to update a review
reviewRouter.put("/:reviewId", updateReview);

// Route to delete a review
reviewRouter.delete("/:reviewId", deleteReview);

export default reviewRouter;
