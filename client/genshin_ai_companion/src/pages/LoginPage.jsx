import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../store/slices/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap();
      navigate("/");
    } catch (err) {
      // Error is already in Redux state
      console.error("Login failed:", err);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await dispatch(googleLogin(credentialResponse.credential)).unwrap();
      navigate("/");
    } catch (err) {
      // Error is already in Redux state
      console.error("Google login failed:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={styles.divider}>OR</div>

        <div style={styles.googleContainer}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.error("Google Login Failed");
            }}
          />
        </div>

        <p style={styles.text}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "3rem",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "450px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    backdropFilter: "blur(10px)",
  },
  title: {
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "2rem",
    fontWeight: "700",
  },
  error: {
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "1rem",
    borderRadius: "10px",
    marginBottom: "1.5rem",
    fontSize: "0.95rem",
  },
  form: {
    marginBottom: "2rem",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    color: "#2c3e50",
    marginBottom: "0.5rem",
    fontWeight: "600",
    fontSize: "0.95rem",
  },
  input: {
    width: "100%",
    padding: "0.9rem",
    borderRadius: "10px",
    border: "2px solid #e2e8f0",
    backgroundColor: "#ffffff",
    color: "#2c3e50",
    fontSize: "1rem",
    transition: "border-color 0.3s",
  },
  button: {
    width: "100%",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    padding: "1rem",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "1.05rem",
    fontWeight: "600",
    marginTop: "1rem",
    transition: "all 0.3s",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  },
  divider: {
    textAlign: "center",
    color: "#718096",
    margin: "2rem 0",
    position: "relative",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  googleContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  text: {
    color: "#4a5568",
    textAlign: "center",
    margin: 0,
    fontSize: "0.95rem",
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "600",
  },
};
