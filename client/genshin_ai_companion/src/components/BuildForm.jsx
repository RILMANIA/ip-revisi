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
    backgroundColor: "#34495e",
    padding: "2rem",
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    color: "#ecf0f1",
    marginBottom: "0.5rem",
    fontWeight: "500",
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
  textarea: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid #7f8c8d",
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    fontSize: "1rem",
    minHeight: "100px",
    resize: "vertical",
  },
  checkboxGroup: {
    marginBottom: "1.5rem",
  },
  checkboxLabel: {
    color: "#ecf0f1",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  checkbox: {
    width: "20px",
    height: "20px",
  },
  button: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "0.75rem 2rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    width: "100%",
  },
};
