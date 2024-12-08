import React, { useEffect, useState } from "react";
import apiClient from "../utils/api";

const FavouriteCard = ({ movieId }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Movie ID: {movieId}</h3>
    </div>
  );
};

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await apiClient.get("/favourites");
        setFavourites(response.data);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Favourites</h1>
      <div style={styles.grid}>
        {favourites.length === 0 && <p>You have no favourites yet.</p>}
        {favourites.map((favourite) => (
          <FavouriteCard key={favourite.id} movieId={favourite.movie_id} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    margin: "0",
    fontSize: "18px",
    color: "#555",
  },
};

export default FavouritesPage;
