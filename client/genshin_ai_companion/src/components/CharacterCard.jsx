import { useNavigate } from "react-router-dom";

export default function CharacterCard({ character }) {
  const navigate = useNavigate();
  const GENSHIN_API = import.meta.env.VITE_GENSHIN_API_URL;

  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/characters/${character}`)}
    >
      <img
        src={`${GENSHIN_API}/characters/${character}/icon`}
        alt={character}
        style={styles.image}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/200?text=Character";
        }}
      />
      <h3 style={styles.name}>{character}</h3>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "16px",
    padding: "1.5rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "center",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    border: "2px solid transparent",
  },
  image: {
    width: "100%",
    height: "240px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "1rem",
    transition: "transform 0.3s",
  },
  name: {
    color: "#2c3e50",
    fontSize: "1.3rem",
    fontWeight: "600",
    margin: 0,
    textTransform: "capitalize",
  },
};
