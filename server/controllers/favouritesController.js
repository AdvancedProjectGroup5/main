import { pool } from "../helper/db.js";

const addFavourite = async (req, res) => {
  const { userId } = req.user;
  const { movieId } = req.body;

  if (!movieId) {
    return res.status(400).json({ error: "Missing movieId" });
  }

  try {
    const newFavourite = await pool.query(
      `INSERT INTO favourites (user_id, movie_id) 
       VALUES ($1, $2) 
       ON CONFLICT (user_id, movie_id) DO NOTHING 
       RETURNING *`,
      [userId, movieId]
    );

    if (newFavourite.rows.length === 0) {
      return res.status(409).json({ error: "Movie already in favorites" });
    }

    res.status(201).json(newFavourite.rows[0]);
  } catch (error) {
    console.error("Error adding favourite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserFavourites = async (req, res) => {
  const { userId } = req.user;

  try {
    const favourites = await pool.query(
      `SELECT * FROM favourites WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );

    res.status(200).json(favourites.rows);
  } catch (error) {
    console.error("Error fetching favourites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteFavourite = async (req, res) => {
  const { favouriteId } = req.params;
  const { userId } = req.user;

  try {
    const deletedFavourite = await pool.query(
      `DELETE FROM favourites WHERE id = $1 AND user_id = $2 RETURNING *`,
      [favouriteId, userId]
    );

    if (deletedFavourite.rows.length === 0) {
      return res.status(404).json({ error: "Favourite not found" });
    }

    res.status(200).json({ message: "Favourite deleted successfully" });
  } catch (error) {
    console.error("Error deleting favourite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { addFavourite, getUserFavourites, deleteFavourite };
