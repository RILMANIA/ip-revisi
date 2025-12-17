import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../store/slices/charactersSlice";
import CharacterCard from "../components/CharacterCard";

export default function CharactersPage() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading characters...</div>
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
      <h1 style={styles.title}>Genshin Impact Characters</h1>

      <div style={styles.grid}>
        {list.map((character) => (
          <CharacterCard key={character} character={character} />
        ))}
      </div>
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "2rem",
    maxWidth: "1400px",
    margin: "0 auto",
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
