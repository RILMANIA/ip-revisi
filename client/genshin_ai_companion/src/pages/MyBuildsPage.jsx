import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBuilds } from "../store/slices/buildsSlice";
import BuildCard from "../components/BuildCard";
import BuildForm from "../components/BuildForm";

export default function MyBuildsPage() {
  const dispatch = useDispatch();
  const { myBuilds, loading, error } = useSelector((state) => state.builds);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchMyBuilds());
  }, [dispatch]);

  const handleSuccess = () => {
    setShowForm(false);
    dispatch(fetchMyBuilds());
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
        <button onClick={() => setShowForm(!showForm)} style={styles.addButton}>
          {showForm ? "Cancel" : "+ Create New Build"}
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {showForm && (
        <div style={styles.formContainer}>
          <BuildForm onSuccess={handleSuccess} />
        </div>
      )}

      {myBuilds.length === 0 ? (
        <div style={styles.empty}>
          <p>No builds yet. Create your first character build!</p>
        </div>
      ) : (
        <div style={styles.buildsContainer}>
          {myBuilds.map((build) => (
            <BuildCard key={build.id} build={build} showActions={true} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
    backgroundColor: "#1a1a2e",
    padding: "2rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1000px",
    margin: "0 auto 2rem",
  },
  title: {
    color: "#f39c12",
    fontSize: "2.5rem",
  },
  addButton: {
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  formContainer: {
    maxWidth: "1000px",
    margin: "0 auto 2rem",
  },
  buildsContainer: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  empty: {
    textAlign: "center",
    color: "#ecf0f1",
    fontSize: "1.2rem",
    padding: "3rem",
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
    maxWidth: "1000px",
    margin: "0 auto 2rem",
  },
};
