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

  // Element color themes matching Genshin Impact
  const getElementTheme = (vision) => {
    const themes = {
      Pyro: {
        primary: "#ff6b6b",
        secondary: "#ff8e8e",
        gradient:
          "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #ff8e8e 100%)",
      },
      Hydro: {
        primary: "#4fc3f7",
        secondary: "#81d4fa",
        gradient:
          "linear-gradient(135deg, #4fc3f7 0%, #29b6f6 50%, #81d4fa 100%)",
      },
      Electro: {
        primary: "#ab47bc",
        secondary: "#ce93d8",
        gradient:
          "linear-gradient(135deg, #ab47bc 0%, #8e24aa 50%, #ce93d8 100%)",
      },
      Cryo: {
        primary: "#4dd0e1",
        secondary: "#80deea",
        gradient:
          "linear-gradient(135deg, #4dd0e1 0%, #26c6da 50%, #80deea 100%)",
      },
      Anemo: {
        primary: "#4db6ac",
        secondary: "#80cbc4",
        gradient:
          "linear-gradient(135deg, #4db6ac 0%, #26a69a 50%, #80cbc4 100%)",
      },
      Geo: {
        primary: "#ffa726",
        secondary: "#ffb74d",
        gradient:
          "linear-gradient(135deg, #ffa726 0%, #fb8c00 50%, #ffb74d 100%)",
      },
      Dendro: {
        primary: "#9ccc65",
        secondary: "#aed581",
        gradient:
          "linear-gradient(135deg, #9ccc65 0%, #7cb342 50%, #c5e1a5 100%)",
      },
    };
    return themes[vision] || themes.Anemo;
  };

  const elementTheme = selectedCharacter?.vision
    ? getElementTheme(selectedCharacter.vision)
    : getElementTheme("Anemo");

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
    <div
      style={{
        ...styles.container,
        background: elementTheme.gradient,
      }}
    >
      {/* Main Character Showcase */}
      <div style={styles.showcase}>
        {/* Left Side - Character Image */}
        <div style={styles.characterSide}>
          <img
            src={`${GENSHIN_API}/characters/${name}/portrait`}
            alt={name}
            style={styles.characterImage}
            onError={(e) => {
              e.target.src = `${GENSHIN_API}/characters/${name}/icon`;
            }}
          />
        </div>

        {/* Right Side - Character Info */}
        <div style={styles.infoSide}>
          <div style={styles.characterHeader}>
            <h1 style={styles.characterName}>
              {selectedCharacter.name?.toUpperCase()}
            </h1>

            <div style={styles.characterMeta}>
              {selectedCharacter.vision && (
                <span
                  style={{
                    ...styles.elementBadge,
                    backgroundColor: elementTheme.primary,
                  }}
                >
                  ⚡ {selectedCharacter.vision}
                </span>
              )}

              {selectedCharacter.rarity && (
                <div style={styles.stars}>
                  {[...Array(selectedCharacter.rarity)].map((_, i) => (
                    <span key={i} style={styles.star}>
                      ⭐
                    </span>
                  ))}
                </div>
              )}
            </div>

            {selectedCharacter.description && (
              <p style={styles.characterDescription}>
                {selectedCharacter.description}
              </p>
            )}
          </div>

          {/* Official Introduction Section */}
          <div style={styles.infoSection}>
            <h2 style={styles.sectionHeading}>Official Introduction</h2>
            <div style={styles.sectionContent}>
              {selectedCharacter.weapon && (
                <p style={styles.infoText}>
                  <strong>Weapon:</strong> {selectedCharacter.weapon}
                </p>
              )}
              {selectedCharacter.nation && (
                <p style={styles.infoText}>
                  <strong>Nation:</strong> {selectedCharacter.nation}
                </p>
              )}
              {selectedCharacter.affiliation && (
                <p style={styles.infoText}>
                  <strong>Affiliation:</strong> {selectedCharacter.affiliation}
                </p>
              )}
            </div>
          </div>

          {/* Character Story Section */}
          {isAuthenticated && (
            <div style={styles.infoSection}>
              <h2 style={styles.sectionHeading}>Character Story</h2>
              <div style={styles.sectionContent}>
                <div style={styles.aiButtons}>
                  <button
                    onClick={handleGetExplanation}
                    disabled={aiLoading}
                    style={{
                      ...styles.aiButton,
                      backgroundColor: elementTheme.primary,
                    }}
                  >
                    {aiLoading ? "Loading..." : "🤖 Get AI Explanation"}
                  </button>

                  <button
                    onClick={handleGetRecommendation}
                    disabled={aiLoading}
                    style={{
                      ...styles.aiButton,
                      backgroundColor: elementTheme.secondary,
                    }}
                  >
                    {aiLoading ? "Loading..." : "⚔️ Build Recommendation"}
                  </button>
                </div>

                {showExplanation && explanations[name] && (
                  <div style={styles.aiResult}>
                    <p style={styles.aiText}>{explanations[name]}</p>
                  </div>
                )}

                {showRecommendation && recommendations[name] && (
                  <div style={styles.aiResult}>
                    <p style={styles.aiText}>{recommendations[name]}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {isAuthenticated && (
            <div style={styles.favoriteSection}>
              <FavoriteButton characterName={name} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },
  showcase: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    position: "relative",
  },
  characterSide: {
    flex: "0 0 45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    position: "relative",
  },
  characterImage: {
    maxWidth: "100%",
    maxHeight: "90vh",
    objectFit: "contain",
    filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
    animation: "float 3s ease-in-out infinite",
  },
  infoSide: {
    flex: "1",
    padding: "4rem 3rem",
    overflowY: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  characterHeader: {
    marginBottom: "1rem",
  },
  characterName: {
    fontSize: "4rem",
    fontWeight: "900",
    color: "#2c3e50",
    margin: "0 0 1rem 0",
    textTransform: "uppercase",
    letterSpacing: "3px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
    lineHeight: "1.1",
  },
  characterMeta: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    marginBottom: "1.5rem",
  },
  elementBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.6rem 1.5rem",
    borderRadius: "25px",
    color: "white",
    fontSize: "1rem",
    fontWeight: "700",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  stars: {
    display: "flex",
    gap: "0.25rem",
  },
  star: {
    fontSize: "1.5rem",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
  },
  characterDescription: {
    fontSize: "1.1rem",
    lineHeight: "1.8",
    color: "#4a5568",
    margin: "0",
    fontWeight: "400",
  },
  infoSection: {
    backgroundColor: "rgba(247, 250, 252, 0.9)",
    padding: "2rem",
    borderRadius: "16px",
    border: "1px solid rgba(102, 126, 234, 0.1)",
  },
  sectionHeading: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "1.5rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  sectionContent: {
    color: "#4a5568",
  },
  infoText: {
    fontSize: "1.05rem",
    lineHeight: "1.8",
    margin: "0.75rem 0",
    fontWeight: "400",
  },
  aiButtons: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
  },
  aiButton: {
    padding: "0.9rem 1.8rem",
    borderRadius: "12px",
    border: "none",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  aiResult: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "12px",
    marginTop: "1rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  aiText: {
    fontSize: "1rem",
    lineHeight: "1.8",
    color: "#4a5568",
    whiteSpace: "pre-wrap",
    margin: "0",
  },
  favoriteSection: {
    marginTop: "auto",
    paddingTop: "2rem",
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
