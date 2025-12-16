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
    backgroundColor: "#1a1a2e",
    padding: "2rem",
  },
  title: {
    color: "#f39c12",
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1.5rem",
    maxWidth: "1200px",
    margin: "0 auto",
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
    maxWidth: "600px",
    margin: "2rem auto",
  },
};
