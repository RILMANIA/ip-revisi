import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Welcome to Genshin AI Companion</h1>
        <p style={styles.subtitle}>
          Your ultimate tool for Genshin Impact character builds and AI-powered
          insights
        </p>

        <div style={styles.features}>
          <div style={styles.feature}>
            <h3 style={styles.featureTitle}>🎮 Browse Characters</h3>
            <p style={styles.featureText}>
              Explore all Genshin Impact characters with detailed information
            </p>
          </div>

          <div style={styles.feature}>
            <h3 style={styles.featureTitle}>⭐ Save Favorites</h3>
            <p style={styles.featureText}>
              Keep track of your favorite characters for quick access
            </p>
          </div>

          <div style={styles.feature}>
            <h3 style={styles.featureTitle}>⚔️ Create Builds</h3>
            <p style={styles.featureText}>
              Design and share your optimal character builds with the community
            </p>
          </div>

          <div style={styles.feature}>
            <h3 style={styles.featureTitle}>🤖 AI Insights</h3>
            <p style={styles.featureText}>
              Get AI-powered explanations and build recommendations
            </p>
          </div>
        </div>

        <div style={styles.cta}>
          <Link to="/characters" style={styles.ctaButton}>
            Explore Characters
          </Link>
          <Link to="/public-builds" style={styles.ctaButtonSecondary}>
            View Public Builds
          </Link>
        </div>
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
  hero: {
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    color: "#f39c12",
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  subtitle: {
    color: "#ecf0f1",
    fontSize: "1.5rem",
    marginBottom: "3rem",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem",
  },
  feature: {
    backgroundColor: "#34495e",
    padding: "2rem",
    borderRadius: "8px",
  },
  featureTitle: {
    color: "#3498db",
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  featureText: {
    color: "#ecf0f1",
    fontSize: "1rem",
    lineHeight: "1.6",
  },
  cta: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
  },
  ctaButton: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "1rem 2rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "1.2rem",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  ctaButtonSecondary: {
    backgroundColor: "#27ae60",
    color: "white",
    padding: "1rem 2rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "1.2rem",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};
