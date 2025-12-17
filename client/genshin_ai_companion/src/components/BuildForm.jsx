import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBuild, updateBuild } from "../store/slices/buildsSlice";
import axios from "axios";

export default function BuildForm({ existingBuild, onSuccess }) {
  const dispatch = useDispatch();
  const [artifacts, setArtifacts] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    character_name: existingBuild?.character_name || "",
    weapon: existingBuild?.weapon || "",
    artifact: existingBuild?.artifact || "",
    notes: existingBuild?.notes || "",
    isPublic: existingBuild?.isPublic || false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artifactsRes, weaponsRes, charactersRes] = await Promise.all([
          axios.get("https://genshin.jmp.blue/artifacts"),
          axios.get("https://genshin.jmp.blue/weapons"),
          axios.get("https://genshin.jmp.blue/characters"),
        ]);
        setArtifacts(artifactsRes.data);
        setWeapons(weaponsRes.data);
        setCharacters(charactersRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (existingBuild) {
        await dispatch(
          updateBuild({ id: existingBuild.id, buildData: formData })
        ).unwrap();
      } else {
        await dispatch(createBuild(formData)).unwrap();
      }
      onSuccess?.();
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Character Name:</label>
        <select
          name="character_name"
          value={formData.character_name}
          onChange={handleChange}
          required
          style={styles.input}
          disabled={loading}
        >
          <option value="">
            {loading ? "Loading characters..." : "Select a character"}
          </option>
          {characters.map((character) => (
            <option key={character} value={character}>
              {character
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Weapon:</label>
        <select
          name="weapon"
          value={formData.weapon}
          onChange={handleChange}
          required
          style={styles.input}
          disabled={loading}
        >
          <option value="">
            {loading ? "Loading weapons..." : "Select a weapon"}
          </option>
          {weapons.map((weapon) => (
            <option key={weapon} value={weapon}>
              {weapon
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Artifacts:</label>
        <select
          name="artifact"
          value={formData.artifact}
          onChange={handleChange}
          required
          style={styles.input}
          disabled={loading}
        >
          <option value="">
            {loading ? "Loading artifacts..." : "Select an artifact set"}
          </option>
          {artifacts.map((artifact) => (
            <option key={artifact} value={artifact}>
              {artifact
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Notes:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          style={styles.textarea}
        />
      </div>

      <div style={styles.checkboxGroup}>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
            style={styles.checkbox}
          />
          Make this build public
        </label>
      </div>

      <button type="submit" style={styles.button}>
        {existingBuild ? "Update Build" : "Create Build"}
      </button>
    </form>
  );
}

const styles = {
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "2.5rem",
    borderRadius: "20px",
    maxWidth: "700px",
    margin: "0 auto",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    backdropFilter: "blur(10px)",
  },
  formGroup: {
    marginBottom: "1.75rem",
  },
  label: {
    display: "block",
    color: "#2c3e50",
    marginBottom: "0.5rem",
    fontWeight: "600",
    fontSize: "1rem",
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
  textarea: {
    width: "100%",
    padding: "0.9rem",
    borderRadius: "10px",
    border: "2px solid #e2e8f0",
    backgroundColor: "#ffffff",
    color: "#2c3e50",
    fontSize: "1rem",
    minHeight: "120px",
    resize: "vertical",
    transition: "border-color 0.3s",
    fontFamily: "inherit",
  },
  checkboxGroup: {
    marginBottom: "1.75rem",
  },
  checkboxLabel: {
    color: "#2c3e50",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "1rem",
    fontWeight: "500",
  },
  checkbox: {
    width: "22px",
    height: "22px",
    cursor: "pointer",
  },
  button: {
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1.05rem",
    fontWeight: "600",
    width: "100%",
    transition: "all 0.3s",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  },
};
