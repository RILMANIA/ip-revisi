import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBuilds } from "../store/slices/buildsSlice";
import BuildCard from "../components/BuildCard";
import BuildForm from "../components/BuildForm";

export default function MyBuildsPage() {
  const dispatch = useDispatch();
  const { myBuilds, loading, error } = useSelector((state) => state.builds);
  const [showForm, setShowForm] = useState(false);
  const [editingBuild, setEditingBuild] = useState(null);

  useEffect(() => {
    dispatch(fetchMyBuilds());
  }, [dispatch]);

  const handleSuccess = () => {
    setShowForm(false);
    setEditingBuild(null);
    dispatch(fetchMyBuilds());
  };

  const handleEdit = (build) => {
    setEditingBuild(build);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setEditingBuild(null);
  };

  if (loading && myBuilds.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading builds...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Builds</h1>
        <button onClick={() => editingBuild ? handleCancelEdit() : setShowForm(!showForm)} style={styles.addButton}>
          {showForm ? "Cancel" : "+ Create New Build"}
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {showForm && (
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>
            {editingBuild ? "✏️ Edit Build" : "➕ Create New Build"}
          </h2>
          <BuildForm existingBuild={editingBuild} onSuccess={handleSuccess} />
        </div>
      )}

      {myBuilds.length === 0 ? (
        <div style={styles.empty}>
          <p>No builds yet. Create your first character build!</p>
        </div>
      ) : (
        <div style={styles.buildsContainer}>
          {myBuilds.map((build, index) => (
            <BuildCard
              key={build.id}
              build={build}
              showActions={true}
              index={index}
              onEdit={handleEdit}
            />
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto 3rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  title: {
    color: "#ffffff",
    fontSize: "3rem",
    fontWeight: "700",
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
  },
  addButton: {
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
  formContainer: {
    maxWidth: "1200px",
    margin: "0 auto 3rem",
  },
  formTitle: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "2rem",
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
  },
  buildsContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
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
    maxWidth: "1200px",
    margin: "0 auto 3rem",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
  },
};
