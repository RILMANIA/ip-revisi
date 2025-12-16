import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/slices/favoritesSlice";

export default function FavoriteButton({ characterName }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);
  const isFavorite = favorites.some(
    (fav) => fav.character_name === characterName
  );

  const handleToggle = () => {
    if (isFavorite) {
      const favorite = favorites.find(
        (fav) => fav.character_name === characterName
      );
      dispatch(removeFavorite(favorite.id));
    } else {
      dispatch(addFavorite(characterName));
    }
  };

  return (
    <button
      onClick={handleToggle}
      style={isFavorite ? styles.buttonActive : styles.button}
    >
      {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
    </button>
  );
}

const styles = {
  button: {
    backgroundColor: "#95a5a6",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "1rem",
  },
  buttonActive: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "1rem",
  },
};
