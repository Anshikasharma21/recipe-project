import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await API.get(`/recipes/${id}`);
        setRecipe(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipe();
  }, [id]);


  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(`/recipes/download/${id}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${recipe.title}.pdf`);

      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      console.log(err);
      alert("Download failed");
    }
  };

  if (!recipe) return <h2>Loading...</h2>;

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Recipe Details
        </h1>

        <h2 style={styles.recipeTitle}>
          {recipe.title}
        </h2>

        <p style={styles.author}>
          by {recipe.createdBy?.username || "Anonymous"}
        </p>

    
        <div style={styles.section}>
          <h3>Ingredients:</h3>
          <ul>
            <li>{recipe.ingredients}</li>
          </ul>
        </div>

       
        <div style={styles.section}>
          <h3>Instructions:</h3>
          <ul>
            <li>{recipe.instructions}</li>
          </ul>
        </div>

        <button onClick={handleDownload} style={styles.downloadBtn}>
          Download Recipe PDF
        </button>

    
        <Link to="/home">
          <button style={styles.button}>
            Go Back
          </button>
        </Link>

      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f4f4f4",
  },

  card: {
    width: "500px",
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "left",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
  },

  recipeTitle: {
    marginBottom: "5px",
  },

  author: {
    color: "gray",
    marginBottom: "20px",
  },

  section: {
    marginBottom: "20px",
  },

  button: {
    padding: "10px 20px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },


  downloadBtn: {
    padding: "10px 20px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    marginBottom: "10px",
  },
};