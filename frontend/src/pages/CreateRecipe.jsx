import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("ingredients", ingredients);
      formData.append("instructions", instructions);
      formData.append("image", image);

      const token = localStorage.getItem("token");

      await API.post("/recipes", formData, {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Recipe Created Successfully");
      navigate("/home");

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h2 style={styles.title}>Create Recipe</h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          <input
            type="text"
            placeholder="Title"
            style={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Ingredients"
            style={styles.input}
            onChange={(e) => setIngredients(e.target.value)}
          />

          <textarea
            placeholder="Instructions"
            style={styles.textarea}
            onChange={(e) => setInstructions(e.target.value)}
          />

          <input
            type="file"
            style={styles.input}
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit" style={styles.button}>
            Create
          </button>

        </form>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f2f2f2",
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "320px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  title: {
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },

  textarea: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    minHeight: "80px",
    resize: "none",
  },

  button: {
    padding: "10px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};