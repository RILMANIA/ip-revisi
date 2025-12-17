import { useDispatch } from "react-redux";
import { deleteBuild } from "../store/slices/buildsSlice";

export default function BuildCard({ build, showActions = true }) {
  const dispatch = useDispatch();
  const GENSHIN_API = import.meta.env.VITE_GENSHIN_API_URL;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this build?")) {
      try {
        await dispatch(deleteBuild(build.id)).unwrap();
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <img
          src={`${GENSHIN_API}/characters/${build.character_name}/icon`}
          alt={build.character_name}
          style={styles.characterImage}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/100?text=Character";
          }}
        />
        <div style={styles.headerContent}>
          <div style={styles.header}>
            <h3 style={styles.title}>{build.character_name}</h3>
            {build.isPublic && <span style={styles.badge}>Public</span>}
          </div>
          {build.User && <p style={styles.author}>By: {build.User.name}</p>}
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.section}>
          <strong style={styles.label}>Weapon:</strong>
          <p style={styles.text}>{build.weapon}</p>
        </div>

        <div style={styles.section}>
          <strong style={styles.label}>Artifacts:</strong>
          <p style={styles.text}>{build.artifact}</p>
        </div>

        {build.notes && (
          <div style={styles.section}>
            <strong style={styles.label}>Notes:</strong>
            <p style={styles.text}>{build.notes}</p>
          </div>
        )}
      </div>

      {showActions && (
        <div style={styles.actions}>
          <button onClick={handleDelete} style={styles.deleteButton}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "16px",
    padding: "2rem",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  cardHeader: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "flex-start",
    marginBottom: "1.5rem",
    paddingBottom: "1.5rem",
    borderBottom: "2px solid rgba(102, 126, 234, 0.2)",
  },
  characterImage: {
    width: "120px",
    height: "120px",
    borderRadius: "12px",
    objectFit: "cover",
    border: "3px solid #667eea",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  },
  headerContent: {
    flex: 1,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.75rem",
  },
  title: {
    color: "#2c3e50",
    margin: 0,
    fontSize: "1.8rem",
    fontWeight: "700",
  },
  badge: {
    backgroundColor: "#667eea",
    color: "white",
    padding: "0.4rem 1rem",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  author: {
    color: "#718096",
    fontSize: "0.95rem",
    margin: 0,
    fontWeight: "500",
  },
  content: {
    color: "#4a5568",
  },
  section: {
    marginBottom: "1.25rem",
  },
  label: {
    color: "#667eea",
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "1rem",
    fontWeight: "600",
  },
  text: {
    margin: 0,
    lineHeight: "1.7",
    fontSize: "1rem",
  },
  actions: {
    display: "flex",
    gap: "0.75rem",
    marginTop: "1.5rem",
    paddingTop: "1.5rem",
    borderTop: "2px solid rgba(102, 126, 234, 0.2)",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s",
    boxShadow: "0 2px 8px rgba(231, 76, 60, 0.3)",
  },
};
