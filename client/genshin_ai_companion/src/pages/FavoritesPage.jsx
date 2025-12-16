import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFavorites, removeFavorite } from "../store/slices/favoritesSlice";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((state) => state.favorites);
  const GENSHIN_API = import.meta.env.VITE_GENSHIN_API_URL;

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleRemove = async (id) => {
    try {
      await dispatch(removeFavorite(id)).unwrap();
    } catch (err) {
      alert(err);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading favorites...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Favorite Characters</h1>

      {list.length === 0 ? (
        <div style={styles.empty}>
          <p>No favorites yet. Start exploring characters!</p>
          <button onClick={() => navigate("/characters")} style={styles.button}>
            Browse Characters
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {list.map((favorite) => (
            <div key={favorite.id} style={styles.card}>
              <img
                src={`${GENSHIN_API}/characters/${favorite.character_name}/icon`}
                alt={favorite.character_name}
                style={styles.image}
                onClick={() =>
                  navigate(`/characters/${favorite.character_name}`)
                }
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/200?text=Character";
                }}
              />
              <h3 style={styles.name}>{favorite.character_name}</h3>
              <button
                onClick={() => handleRemove(favorite.id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
    backgroundColor: "#1a1a2e",
    padding: "2rem",
  },
  title: {
    color: "#f39c12",
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1.5rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#34495e",
    borderRadius: "8px",
    padding: "1rem",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "0.5rem",
    cursor: "pointer",
  },
  name: {
    color: "#ecf0f1",
    fontSize: "1.2rem",
    margin: "0.5rem 0",
    textTransform: "capitalize",
  },
  removeButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    marginTop: "0.5rem",
  },
  empty: {
    textAlign: "center",
    color: "#ecf0f1",
    fontSize: "1.2rem",
    padding: "3rem",
  },
  button: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.1rem",
    marginTop: "1rem",
  },
  loading: {
    color: "#ecf0f1",
    textAlign: "center",
    fontSize: "1.5rem",
    padding: "3rem",
  },
  error: {
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "1rem",
    borderRadius: "4px",
    textAlign: "center",
    maxWidth: "600px",
    margin: "2rem auto",
  },
};
