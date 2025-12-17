import { useDispatch } from "react-redux";
import { deleteBuild } from "../store/slices/buildsSlice";

export default function BuildCard({ build, showActions = true }) {
  const dispatch = useDispatch();

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
      <div style={styles.header}>
        <h3 style={styles.title}>{build.character_name}</h3>
        {build.isPublic && <span style={styles.badge}>Public</span>}
      </div>

      {build.User && <p style={styles.author}>By: {build.User.name}</p>}

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
    backgroundColor: "#34495e",
    borderRadius: "8px",
    padding: "1.5rem",
    marginBottom: "1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  title: {
    color: "#f39c12",
    margin: 0,
    fontSize: "1.5rem",
  },
  badge: {
    backgroundColor: "#27ae60",
    color: "white",
    padding: "0.25rem 0.75rem",
    borderRadius: "12px",
    fontSize: "0.875rem",
  },
  author: {
    color: "#95a5a6",
    fontSize: "0.875rem",
    marginBottom: "1rem",
  },
  content: {
    color: "#ecf0f1",
  },
  section: {
    marginBottom: "1rem",
  },
  label: {
    color: "#3498db",
    display: "block",
    marginBottom: "0.25rem",
  },
  text: {
    margin: 0,
    lineHeight: "1.6",
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
