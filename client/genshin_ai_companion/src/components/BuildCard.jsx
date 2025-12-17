import { useDispatch } from "react-redux";
import { deleteBuild } from "../store/slices/buildsSlice";

export default function BuildCard({ build, showActions = true, index = 0 }) {
  const dispatch = useDispatch();
  const GENSHIN_API = import.meta.env.VITE_GENSHIN_API_URL;

  // Alternate layout direction for visual variety
  const isImageLeft = index % 2 === 0;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this build?")) {
      try {
        await dispatch(deleteBuild(build.id)).unwrap();
      } catch (error) {
        alert(error);
      }
    }
  };

  const characterImageSide = (
    <div style={styles.imageSide}>
      <img
        src={`${GENSHIN_API}/characters/${build.character_name}/card`}
        alt={build.character_name}
        style={styles.characterImage}
        onError={(e) => {
          e.target.src = `${GENSHIN_API}/characters/${build.character_name}/icon`;
        }}
      />
    </div>
  );

  const infoSide = (
    <div style={styles.infoSide}>
      <div style={styles.header}>
        <h2 style={styles.characterName}>
          {build.character_name.toUpperCase()}
        </h2>
        <div style={styles.metaInfo}>
          {build.isPublic && <span style={styles.badge}>PUBLIC</span>}
          {build.User && <p style={styles.author}>⚔️ {build.User.name}</p>}
        </div>
      </div>

      <div style={styles.profileSection}>
        <h3 style={styles.profileHeading}>BUILD DETAILS</h3>

        <div style={styles.buildContent}>
          <div style={styles.buildItem}>
            <span style={styles.buildLabel}>⚔️ Weapon:</span>
            <p style={styles.buildText}>{build.weapon}</p>
          </div>

          <div style={styles.buildItem}>
            <span style={styles.buildLabel}>✨ Artifact Set:</span>
            <p style={styles.buildText}>{build.artifact}</p>
          </div>

          {build.notes && (
            <div style={styles.buildItem}>
              <span style={styles.buildLabel}>📝 Build Notes:</span>
              <p style={styles.buildText}>{build.notes}</p>
            </div>
          )}
        </div>

        {showActions && (
          <div style={styles.actions}>
            <button onClick={handleDelete} style={styles.deleteButton}>
              🗑️ Delete Build
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={styles.card}>
      {isImageLeft ? (
        <>
          {characterImageSide}
          {infoSide}
        </>
      ) : (
        <>
          {infoSide}
          {characterImageSide}
        </>
      )}
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "20px",
    marginBottom: "3rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    backdropFilter: "blur(10px)",
    overflow: "hidden",
    minHeight: "400px",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  imageSide: {
    flex: "0 0 40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)",
    padding: "2rem",
    position: "relative",
  },
  characterImage: {
    maxWidth: "100%",
    maxHeight: "500px",
    objectFit: "contain",
    filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))",
  },
  infoSide: {
    flex: "1",
    padding: "3rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    marginBottom: "2rem",
  },
  characterName: {
    fontSize: "3rem",
    fontWeight: "900",
    color: "#2c3e50",
    margin: "0 0 1rem 0",
    letterSpacing: "3px",
    lineHeight: "1.1",
  },
  metaInfo: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  badge: {
    backgroundColor: "#667eea",
    color: "white",
    padding: "0.5rem 1.2rem",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "700",
    letterSpacing: "1px",
  },
  author: {
    color: "#718096",
    fontSize: "1rem",
    margin: 0,
    fontWeight: "600",
  },
  profileSection: {
    flex: 1,
  },
  profileHeading: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#667eea",
    marginBottom: "1.5rem",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  buildContent: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  buildItem: {
    borderLeft: "3px solid #667eea",
    paddingLeft: "1rem",
  },
  buildLabel: {
    display: "block",
    color: "#4a5568",
    fontSize: "0.9rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  buildText: {
    color: "#2c3e50",
    fontSize: "1.05rem",
    lineHeight: "1.7",
    margin: 0,
    fontWeight: "400",
  },
  actions: {
    marginTop: "2rem",
    paddingTop: "1.5rem",
    borderTop: "2px solid rgba(102, 126, 234, 0.2)",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "0.9rem 2rem",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s",
    boxShadow: "0 4px 12px rgba(231, 76, 60, 0.3)",
  },
};
