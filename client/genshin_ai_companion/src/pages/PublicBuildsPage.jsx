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
          {publicBuilds.map((build, index) => (
            <BuildCard
              key={build.id}
              build={build}
              showActions={false}
              index={index}
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
  title: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: "3rem",
    fontWeight: "700",
    marginBottom: "3rem",
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
    margin: "2rem auto",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
  },
};
