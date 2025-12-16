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
    backgroundColor: "#34495e",
    borderRadius: "8px",
    padding: "1rem",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "0.5rem",
  },
  name: {
    color: "#ecf0f1",
    fontSize: "1.2rem",
    margin: 0,
    textTransform: "capitalize",
  },
};
