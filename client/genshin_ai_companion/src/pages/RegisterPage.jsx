import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../store/slices/authSlice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(formData)).unwrap();
      navigate("/login");
    } catch (err) {
      // Error is already in Redux state
      console.error("Registration failed:", err);
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
        <h1 style={styles.title}>Register</h1>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

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
              minLength={5}
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={styles.text}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login here
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
