import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          Genshin AI Companion
        </Link>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          <Link to="/characters" style={styles.link}>
            Characters
          </Link>
          <Link to="/public-builds" style={styles.link}>
            Public Builds
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/favorites" style={styles.link}>
                My Favorites
              </Link>
              <Link to="/builds" style={styles.link}>
                My Builds
              </Link>
              <span style={styles.username}>{user?.name}</span>
              <button onClick={handleLogout} style={styles.button}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
              <Link to="/register" style={styles.link}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#2c3e50",
    padding: "1rem 0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "#f39c12",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  link: {
    color: "#ecf0f1",
    textDecoration: "none",
    transition: "color 0.3s",
  },
  username: {
    color: "#3498db",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};
