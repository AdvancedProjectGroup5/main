import express from "express";
import {
  createReview,
  getReviewsByMovieId,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

// const reviewRouter = express.reviewRouter();

const reviewRouter = express.Router();

reviewRouter.post("/", createReview);

// Route to get all reviews of a specific movie
reviewRouter.get("/:movieId", getReviewsByMovieId);

// Route to update a review
reviewRouter.put("/:reviewId", updateReview);

// Route to delete a review
reviewRouter.delete("/:reviewId", deleteReview);

export default reviewRouter;
