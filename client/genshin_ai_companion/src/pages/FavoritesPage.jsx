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
    padding: "3rem 2rem",
  },
  title: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: "3rem",
    fontWeight: "700",
    marginBottom: "3rem",
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "2rem",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "16px",
    padding: "1.5rem",
    textAlign: "center",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  image: {
    width: "100%",
    height: "240px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "1rem",
    cursor: "pointer",
    transition: "transform 0.3s",
  },
  name: {
    color: "#2c3e50",
    fontSize: "1.3rem",
    fontWeight: "600",
    margin: "0.75rem 0",
    textTransform: "capitalize",
  },
  removeButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "10px",
    cursor: "pointer",
    width: "100%",
    marginTop: "0.75rem",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s",
    boxShadow: "0 2px 8px rgba(231, 76, 60, 0.3)",
  },
  empty: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: "1.3rem",
    padding: "4rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    maxWidth: "600px",
    margin: "0 auto",
    textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
  },
  button: {
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "600",
    marginTop: "1rem",
    transition: "all 0.3s",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  },
  loading: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: "1.5rem",
    padding: "3rem",
    textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
  },
  error: {
    backgroundColor: "rgba(231, 76, 60, 0.95)",
    color: "white",
    padding: "1.5rem",
    borderRadius: "12px",
    textAlign: "center",
    maxWidth: "600px",
    margin: "2rem auto",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
  },
};
