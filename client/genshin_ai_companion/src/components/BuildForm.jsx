import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBuild, updateBuild } from "../store/slices/buildsSlice";

export default function BuildForm({ existingBuild, onSuccess }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    character_name: existingBuild?.character_name || "",
    weapon: existingBuild?.weapon || "",
    artifacts: existingBuild?.artifacts || "",
    tips: existingBuild?.tips || "",
    isPublic: existingBuild?.isPublic || false,
  });

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
        <input
          type="text"
          name="character_name"
          value={formData.character_name}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Weapon:</label>
        <input
          type="text"
          name="weapon"
          value={formData.weapon}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Artifacts:</label>
        <textarea
          name="artifacts"
          value={formData.artifacts}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Tips:</label>
        <textarea
          name="tips"
          value={formData.tips}
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
