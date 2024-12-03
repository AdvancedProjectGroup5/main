import { pool } from "../helper/db.js";

const createReview = async (req, res) => {
  const { userId, movieId, comment, rating } = req.body;

  if (!userId || !movieId || !rating) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newReview = await pool.query(
      `INSERT INTO reviews (user_id, movie_id, comment, rating) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [userId, movieId, comment, rating]
    );
    res.status(201).json(newReview.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all reviews of a user
const getUserReviews = async (req, res) => {
  const { userId } = req.params;

  try {
    const reviews = await pool.query(
      `SELECT * FROM reviews WHERE user_id = $1`,
      [userId]
    );
    res.status(200).json(reviews.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a review
const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { comment, rating } = req.body;

  if (!comment && !rating) {
    return res.status(400).json({ error: "Nothing to update" });
  }

  try {
    const updatedReview = await pool.query(
      `UPDATE reviews 
       SET comment = COALESCE($1, comment), 
           rating = COALESCE($2, rating) 
       WHERE id = $3 
       RETURNING *`,
      [comment, rating, reviewId]
    );

    if (updatedReview.rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(updatedReview.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const deletedReview = await pool.query(
      `DELETE FROM reviews WHERE id = $1 RETURNING *`,
      [reviewId]
    );

    if (deletedReview.rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export { createReview, getUserReviews, updateReview, deleteReview };
