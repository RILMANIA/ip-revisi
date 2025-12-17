import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={styles.container}>
      {/* Hero Section with Background Image */}
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            GENSHIN
            <br />
            IMPACT
          </h1>
          <p style={styles.heroSubtitle}>
            Step into Teyvat, a vast world teeming with life and flowing with
            elemental energy
          </p>

          <div style={styles.heroCTA}>
            <Link to="/characters" style={styles.exploreCTA}>
              Explore Characters
            </Link>
          </div>
        </div>

        {/* Social Media Icons */}
        <div style={styles.socialIcons}>
          <a href="#" style={styles.socialIcon}>
            📘
          </a>
          <a href="#" style={styles.socialIcon}>
            💬
          </a>
          <a href="#" style={styles.socialIcon}>
            🐦
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.featuresSection}>
        <div style={styles.featuresGrid}>
          <Link to="/characters" style={styles.featureCard}>
            <div style={styles.featureIcon}>🎮</div>
            <h3 style={styles.featureTitle}>Browse Characters</h3>
            <p style={styles.featureText}>
              Explore all Genshin Impact characters with detailed information
            </p>
          </Link>

          <Link to="/favorites" style={styles.featureCard}>
            <div style={styles.featureIcon}>⭐</div>
            <h3 style={styles.featureTitle}>Save Favorites</h3>
            <p style={styles.featureText}>
              Keep track of your favorite characters for quick access
            </p>
          </Link>

          <Link to="/my-builds" style={styles.featureCard}>
            <div style={styles.featureIcon}>⚔️</div>
            <h3 style={styles.featureTitle}>Create Builds</h3>
            <p style={styles.featureText}>
              Design and share your optimal character builds
            </p>
          </Link>

          <Link to="/public-builds" style={styles.featureCard}>
            <div style={styles.featureIcon}>🤖</div>
            <h3 style={styles.featureTitle}>AI Insights</h3>
            <p style={styles.featureText}>
              Get AI-powered explanations and recommendations
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
  },
  heroSection: {
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #4a9fd8 0%, #89c9f5 100%)",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundImage: 'url("/genshin-hero-bg.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  heroContent: {
    textAlign: "center",
    zIndex: 2,
    maxWidth: "900px",
    padding: "2rem",
  },
  heroTitle: {
    fontSize: "6rem",
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: "2rem",
    textShadow: "4px 4px 8px rgba(0,0,0,0.5)",
    letterSpacing: "8px",
    lineHeight: "1.1",
  },
  heroSubtitle: {
    fontSize: "1.5rem",
    color: "#ffffff",
    marginBottom: "3rem",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    fontWeight: "400",
    maxWidth: "700px",
    margin: "0 auto 3rem",
    lineHeight: "1.6",
  },
  heroCTA: {
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
  },
  exploreCTA: {
    backgroundColor: "#ffc107",
    color: "#2c3e50",
    padding: "1.2rem 3rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "1.2rem",
    fontWeight: "700",
    transition: "all 0.3s",
    boxShadow: "0 4px 16px rgba(255, 193, 7, 0.5)",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  socialIcons: {
    position: "absolute",
    bottom: "3rem",
    left: "3rem",
    display: "flex",
    gap: "1rem",
    zIndex: 3,
  },
  socialIcon: {
    width: "50px",
    height: "50px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    fontSize: "1.5rem",
    transition: "all 0.3s",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
  featuresSection: {
    padding: "5rem 2rem",
    backgroundColor: "#f8f9fa",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2.5rem",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  featureCard: {
    backgroundColor: "white",
    padding: "3rem 2rem",
    borderRadius: "16px",
    textAlign: "center",
    textDecoration: "none",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  featureIcon: {
    fontSize: "3.5rem",
    marginBottom: "1.5rem",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
  },
  featureTitle: {
    color: "#2c3e50",
    fontSize: "1.5rem",
    marginBottom: "1rem",
    fontWeight: "700",
  },
  featureText: {
    color: "#6c757d",
    fontSize: "1rem",
    lineHeight: "1.7",
    margin: 0,
  },
};
