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
                <p style={{ ...styles.text, whiteSpace: "pre-wrap" }}>
                  {explanations[name]}
                </p>
              </div>
            )}

            {showRecommendation && recommendations[name] && (
              <div style={styles.aiResult}>
                <h3 style={styles.aiResultTitle}>Build Recommendation</h3>
                <p style={{ ...styles.text, whiteSpace: "pre-wrap" }}>
                  {recommendations[name]}
                </p>
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
    padding: "3rem 2rem",
  },
  content: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    gap: "2.5rem",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "2.5rem",
    borderRadius: "20px",
    marginBottom: "2.5rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    backdropFilter: "blur(10px)",
  },
  image: {
    width: "320px",
    height: "320px",
    objectFit: "cover",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
  },
  info: {
    flex: 1,
  },
  title: {
    color: "#2c3e50",
    fontSize: "3rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
    textTransform: "capitalize",
  },
  detail: {
    color: "#4a5568",
    fontSize: "1.2rem",
    marginBottom: "0.75rem",
    fontWeight: "500",
  },
  section: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "2.5rem",
    borderRadius: "20px",
    marginBottom: "2.5rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    backdropFilter: "blur(10px)",
  },
  sectionTitle: {
    color: "#667eea",
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
  },
  text: {
    color: "#4a5568",
    fontSize: "1.1rem",
    lineHeight: "1.8",
  },
  aiSection: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "2.5rem",
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    backdropFilter: "blur(10px)",
  },
  aiButtons: {
    display: "flex",
    gap: "1.5rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
  },
  aiButton: {
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1.05rem",
    fontWeight: "600",
    transition: "all 0.3s",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  },
  aiResult: {
    backgroundColor: "rgba(247, 250, 252, 0.95)",
    padding: "2rem",
    borderRadius: "12px",
    marginTop: "1.5rem",
    border: "2px solid rgba(102, 126, 234, 0.2)",
  },
  aiResultTitle: {
    color: "#667eea",
    fontSize: "1.6rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
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
