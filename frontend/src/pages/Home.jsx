import { useEffect, useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await API.get("/recipes");
        setRecipes(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <h2>Loading recipes...</h2>;

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <h1>Recipe Sharing Platform</h1>

  
        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <Link to="/create">
        <button style={styles.button}>+ Create Recipe</button>
      </Link>

      <div style={styles.grid}>
        {recipes.map((r) => (
          <div key={r._id} style={styles.card}>

            <h3>{r.title}</h3>

            <p style={styles.author}>
              by {r.createdBy?.username || "Anonymous"}
            </p>

            <Link to={`/recipe/${r._id}`}>
              <button style={styles.viewButton}>
                View Recipe
              </button>
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  button: {
    padding: "10px",
    background: "black",
    color: "white",
    border: "none",
    margin: "10px",
    cursor: "pointer",
    borderRadius: "5px",
  },

  logout: {
    padding: "8px 15px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    background: "#fff",
  },

  author: {
    color: "gray",
    fontSize: "14px",
    marginBottom: "10px",
  },

  viewButton: {
    padding: "8px 15px",
    background: "#444",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};