import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacterDetail } from "../store/slices/charactersSlice";
import { getAIExplanation, getAIRecommendation } from "../store/slices/aiSlice";
import FavoriteButton from "../components/FavoriteButton";
import { fetchFavorites } from "../store/slices/favoritesSlice";

export default function CharacterDetailPage() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { selectedCharacter, loading, error } = useSelector(
    (state) => state.characters
  );
  const {
    explanations,
    recommendations,
    loading: aiLoading,
  } = useSelector((state) => state.ai);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const GENSHIN_API = import.meta.env.VITE_GENSHIN_API_URL;

  const [showExplanation, setShowExplanation] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);

  useEffect(() => {
    dispatch(fetchCharacterDetail(name));
    if (isAuthenticated) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, name, isAuthenticated]);

  const handleGetExplanation = () => {
    dispatch(getAIExplanation(name));
    setShowExplanation(true);
  };

  const handleGetRecommendation = () => {
    dispatch(getAIRecommendation(name));
    setShowRecommendation(true);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading character details...</div>
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

  if (!selectedCharacter) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>No character data found</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <img
            src={`${GENSHIN_API}/characters/${name}/icon`}
            alt={name}
            style={styles.image}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300?text=Character";
            }}
          />

          <div style={styles.info}>
            <h1 style={styles.title}>{selectedCharacter.name}</h1>

            {selectedCharacter.vision && (
              <p style={styles.detail}>
                <strong>Vision:</strong> {selectedCharacter.vision}
              </p>
            )}

            {selectedCharacter.weapon && (
              <p style={styles.detail}>
                <strong>Weapon:</strong> {selectedCharacter.weapon}
              </p>
            )}

            {selectedCharacter.nation && (
              <p style={styles.detail}>
                <strong>Nation:</strong> {selectedCharacter.nation}
              </p>
            )}

            {selectedCharacter.affiliation && (
              <p style={styles.detail}>
                <strong>Affiliation:</strong> {selectedCharacter.affiliation}
              </p>
            )}

            {selectedCharacter.rarity && (
              <p style={styles.detail}>
                <strong>Rarity:</strong> {"⭐".repeat(selectedCharacter.rarity)}
              </p>
            )}

            {isAuthenticated && <FavoriteButton characterName={name} />}
          </div>
        </div>

        {selectedCharacter.description && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Description</h2>
            <p style={styles.text}>{selectedCharacter.description}</p>
          </div>
        )}

        {isAuthenticated && (
          <div style={styles.aiSection}>
            <h2 style={styles.sectionTitle}>AI Insights</h2>

            <div style={styles.aiButtons}>
              <button
                onClick={handleGetExplanation}
                disabled={aiLoading}
                style={styles.aiButton}
              >
                {aiLoading ? "Loading..." : "🤖 Get AI Explanation"}
              </button>

              <button
                onClick={handleGetRecommendation}
                disabled={aiLoading}
                style={styles.aiButton}
              >
                {aiLoading ? "Loading..." : "⚔️ Get Build Recommendation"}
              </button>
            </div>

            {showExplanation && explanations[name] && (
              <div style={styles.aiResult}>
                <h3 style={styles.aiResultTitle}>AI Explanation</h3>
                <p style={styles.text}>{explanations[name]}</p>
              </div>
            )}

            {showRecommendation && recommendations[name] && (
              <div style={styles.aiResult}>
                <h3 style={styles.aiResultTitle}>Build Recommendation</h3>
                <p style={styles.text}>{recommendations[name]}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
    backgroundColor: "#1a1a2e",
    padding: "2rem",
  },
  content: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    gap: "2rem",
    backgroundColor: "#34495e",
    padding: "2rem",
    borderRadius: "8px",
    marginBottom: "2rem",
  },
  image: {
    width: "300px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  info: {
    flex: 1,
  },
  title: {
    color: "#f39c12",
    fontSize: "2.5rem",
    marginBottom: "1rem",
    textTransform: "capitalize",
  },
  detail: {
    color: "#ecf0f1",
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
  },
  section: {
    backgroundColor: "#34495e",
    padding: "2rem",
    borderRadius: "8px",
    marginBottom: "2rem",
  },
  sectionTitle: {
    color: "#3498db",
    fontSize: "1.8rem",
    marginBottom: "1rem",
  },
  text: {
    color: "#ecf0f1",
    fontSize: "1.1rem",
    lineHeight: "1.8",
  },
  aiSection: {
    backgroundColor: "#34495e",
    padding: "2rem",
    borderRadius: "8px",
  },
  aiButtons: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  aiButton: {
    backgroundColor: "#9b59b6",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  aiResult: {
    backgroundColor: "#2c3e50",
    padding: "1.5rem",
    borderRadius: "8px",
    marginTop: "1rem",
  },
  aiResultTitle: {
    color: "#f39c12",
    fontSize: "1.5rem",
    marginBottom: "1rem",
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
