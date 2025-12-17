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
    padding: "3rem 2rem",
  },
  hero: {
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: "3.5rem",
    fontWeight: "700",
    marginBottom: "1rem",
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
  },
  subtitle: {
    color: "#ffffff",
    fontSize: "1.5rem",
    marginBottom: "3rem",
    fontWeight: "300",
    textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem",
  },
  feature: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "2.5rem",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    transition: "transform 0.3s, box-shadow 0.3s",
    backdropFilter: "blur(10px)",
  },
  featureTitle: {
    color: "#667eea",
    fontSize: "1.6rem",
    marginBottom: "1rem",
    fontWeight: "600",
  },
  featureText: {
    color: "#4a5568",
    fontSize: "1rem",
    lineHeight: "1.7",
  },
  cta: {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  ctaButton: {
    backgroundColor: "#667eea",
    color: "white",
    padding: "1.2rem 2.5rem",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "1.2rem",
    fontWeight: "600",
    transition: "all 0.3s",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  },
  ctaButtonSecondary: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    color: "#667eea",
    padding: "1.2rem 2.5rem",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "1.2rem",
    fontWeight: "600",
    transition: "all 0.3s",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    border: "2px solid #667eea",
  },
};
