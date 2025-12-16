import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicBuilds } from "../store/slices/buildsSlice";
import BuildCard from "../components/BuildCard";

export default function PublicBuildsPage() {
  const dispatch = useDispatch();
  const { publicBuilds, loading, error } = useSelector((state) => state.builds);

  useEffect(() => {
    dispatch(fetchPublicBuilds());
  }, [dispatch]);

  if (loading && publicBuilds.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading public builds...</div>
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

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Public Character Builds</h1>

      {publicBuilds.length === 0 ? (
        <div style={styles.empty}>
          <p>No public builds available yet. Be the first to share!</p>
        </div>
      ) : (
        <div style={styles.buildsContainer}>
          {publicBuilds.map((build) => (
            <BuildCard key={build.id} build={build} showActions={false} />
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
  title: {
    color: "#f39c12",
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "2rem",
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
    margin: "2rem auto",
  },
};
