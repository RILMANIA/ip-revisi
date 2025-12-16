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
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const hasValidGoogleClientId = googleClientId && googleClientId !== 'your-google-client-id-here' && googleClientId.includes('.apps.googleusercontent.com');

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
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await dispatch(googleLogin(credentialResponse.credential)).unwrap();
      navigate("/");
    } catch (err) {
      // Error is already in Redux state
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

        {hasValidGoogleClientId && (
          <>
            <div style={styles.divider}>OR</div>
            <div style={styles.googleContainer}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  console.error("Google Login Failed");
                }}
              />
            </div>
          </>
        )}

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
    backgroundColor: "#1a1a2e",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  card: {
    backgroundColor: "#34495e",
    padding: "2rem",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    color: "#f39c12",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  error: {
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "0.75rem",
    borderRadius: "4px",
    marginBottom: "1rem",
  },
  form: {
    marginBottom: "1.5rem",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    color: "#ecf0f1",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid #7f8c8d",
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "0.75rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "1rem",
  },
  divider: {
    textAlign: "center",
    color: "#95a5a6",
    margin: "1.5rem 0",
    position: "relative",
  },
  googleContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
  text: {
    color: "#ecf0f1",
    textAlign: "center",
    margin: 0,
  },
  link: {
    color: "#3498db",
    textDecoration: "none",
  },
};
