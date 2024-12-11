import { toast } from "react-hot-toast";
import apiClient from "../utils/api";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const FavouriteButton = ({ movieId }) => {
  return (
    <button
      onClick={async () => {
        toast.promise(apiClient.post("/favourites", { movie_id: movieId }), {
          pending: "Adding..",
          success: "Movie added to favourites!",
          error: "Something went wrong!",
        });
      }}
      style={{
        backgroundColor: "#6b07d7",
        marginLeft: "10px",
      }}
    >
      <FaRegHeart />
    </button>
  );
};
const UnFavouriteButton = ({ movieId }) => {
  return (
    <button
      onClick={async () => {
        toast.promise(apiClient.post(`/favourites/${movieId}`), {
          pending: "Removing..",
          success: "Movie removed from favourites!",
          error: "Something went wrong!",
        });
      }}
      style={{
        backgroundColor: "#ed2e2e",
        marginLeft: "10px",
      }}
    >
      <FaHeart />
    </button>
  );
};
export { FavouriteButton, UnFavouriteButton };
