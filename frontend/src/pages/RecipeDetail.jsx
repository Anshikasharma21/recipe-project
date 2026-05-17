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
        headers: { Authorization: `Bearer ${token}` },
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

  if (!recipe) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        .rd-loading {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #faf8f4;
          font-family: 'DM Sans', sans-serif;
          color: #b5a898;
          font-size: 15px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
      `}</style>
      <div className="rd-loading">Loading recipe…</div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after {
          margin: 0; padding: 0; box-sizing: border-box;
        }

        .rd-page {
          min-height: 100vh;
          background: #faf8f4;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 60px 20px;
          font-family: 'DM Sans', sans-serif;
        }

        .rd-card {
          width: 100%;
          max-width: 620px;
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(0,0,0,0.08);
        }

        /* Hero strip */
        .rd-hero {
          background: linear-gradient(135deg, #2d2217 0%, #4a3728 100%);
          padding: 44px 44px 36px;
          position: relative;
          overflow: hidden;
        }

        .rd-hero::after {
          content: '🍽';
          position: absolute;
          right: 30px;
          bottom: -10px;
          font-size: 90px;
          opacity: 0.12;
          line-height: 1;
        }

        .rd-eyebrow {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c8a882;
          margin-bottom: 14px;
          font-weight: 500;
        }

        .rd-recipe-title {
          font-family: 'Fraunces', serif;
          font-size: 38px;
          font-weight: 600;
          color: #faf5ef;
          line-height: 1.15;
          margin-bottom: 12px;
        }

        .rd-author {
          font-size: 13px;
          color: rgba(200,168,130,0.75);
          font-weight: 300;
          font-style: italic;
        }

        /* Body */
        .rd-body {
          padding: 40px 44px 44px;
        }

        .rd-section {
          margin-bottom: 32px;
        }

        .rd-section-label {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #c8a882;
          font-weight: 500;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .rd-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #f0ece4;
        }

        .rd-text {
          font-size: 15px;
          color: #4a3d32;
          line-height: 1.75;
          font-weight: 300;
        }

        .rd-divider {
          height: 1px;
          background: #f0ece4;
          margin: 0 44px;
        }

        /* Buttons */
        .rd-actions {
          padding: 32px 44px 40px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .rd-btn-download {
          width: 100%;
          height: 52px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #2d2217, #4a3728);
          color: #faf5ef;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: opacity 0.2s, transform 0.15s;
        }

        .rd-btn-download:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        .rd-btn-download:active {
          transform: translateY(0);
        }

        .rd-btn-back {
          width: 100%;
          height: 52px;
          border: 1.5px solid #e8e0d4;
          border-radius: 14px;
          background: transparent;
          color: #7a6a58;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }

        .rd-btn-back:hover {
          background: #faf5ef;
          border-color: #c8a882;
          color: #4a3728;
        }
      `}</style>

      <div className="rd-page">
        <div className="rd-card">

          {/* Hero */}
          <div className="rd-hero">
            <p className="rd-eyebrow">Recipe Details</p>
            <h1 className="rd-recipe-title">{recipe.title}</h1>
            <p className="rd-author">by {recipe.createdBy?.username || "Anonymous"}</p>
          </div>

          {/* Body */}
          <div className="rd-body">

            <div className="rd-section">
              <p className="rd-section-label">Ingredients</p>
              <p className="rd-text">{recipe.ingredients}</p>
            </div>

            <div className="rd-section">
              <p className="rd-section-label">Instructions</p>
              <p className="rd-text">{recipe.instructions}</p>
            </div>

          </div>

          <div className="rd-divider" />

          {/* Actions */}
          <div className="rd-actions">
            <button onClick={handleDownload} className="rd-btn-download">
              ↓ &nbsp; Download PDF
            </button>
            <Link to="/home" style={{ display: "block" }}>
              <button className="rd-btn-back">← &nbsp; Go Back</button>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}