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
        const { data } = await API.get("/api/recipes");
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

  if (loading) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        .hm-loading {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #faf8f4;
          font-family: 'DM Sans', sans-serif;
          color: #b5a898;
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
      `}</style>
      <div className="hm-loading">Loading recipes…</div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after {
          margin: 0; padding: 0; box-sizing: border-box;
        }

        .hm-page {
          min-height: 100vh;
          background: #faf8f4;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Navbar ── */
        .hm-nav {
          background: #fff;
          border-bottom: 1px solid #ede8e0;
          padding: 0 48px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .hm-nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hm-nav-logo {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #2d2217, #4a3728);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .hm-nav-title {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          color: #2d2217;
          font-weight: 600;
        }

        .hm-nav-title em {
          font-style: italic;
          color: #c8a882;
        }

        .hm-nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hm-btn-create {
          height: 40px;
          padding: 0 20px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #2d2217, #4a3728);
          color: #faf5ef;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: opacity 0.2s, transform 0.15s;
        }

        .hm-btn-create:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }

        .hm-btn-logout {
          height: 40px;
          padding: 0 18px;
          border: 1.5px solid #e8e0d4;
          border-radius: 10px;
          background: transparent;
          color: #7a6a58;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }

        .hm-btn-logout:hover {
          border-color: #c8a882;
          color: #4a3728;
          background: #faf5ef;
        }

        /* ── Hero strip ── */
        .hm-hero {
          padding: 52px 48px 40px;
          border-bottom: 1px solid #ede8e0;
          background: #fff;
        }

        .hm-hero-eyebrow {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #c8a882;
          font-weight: 500;
          margin-bottom: 10px;
        }

        .hm-hero-heading {
          font-family: 'Fraunces', serif;
          font-size: 48px;
          font-weight: 600;
          color: #2d2217;
          line-height: 1.1;
        }

        .hm-hero-heading em {
          font-style: italic;
          color: #c8a882;
        }

        .hm-hero-sub {
          margin-top: 10px;
          font-size: 15px;
          color: #9c8878;
          font-weight: 300;
        }

        /* ── Grid ── */
        .hm-body {
          padding: 40px 48px 64px;
        }

        .hm-count {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #b5a898;
          margin-bottom: 24px;
        }

        .hm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 22px;
        }

        .hm-card {
          background: #fff;
          border: 1px solid #ede8e0;
          border-radius: 20px;
          padding: 28px 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: box-shadow 0.2s, transform 0.2s;
        }

        .hm-card:hover {
          box-shadow: 0 12px 40px rgba(45,34,23,0.10);
          transform: translateY(-3px);
        }

        .hm-card-icon {
          font-size: 28px;
          margin-bottom: 4px;
        }

        .hm-card-title {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 600;
          color: #2d2217;
          line-height: 1.2;
        }

        .hm-card-author {
          font-size: 12px;
          color: #b5a898;
          font-weight: 300;
          font-style: italic;
          flex: 1;
        }

        .hm-card-divider {
          height: 1px;
          background: #f0ece4;
          margin: 4px 0;
        }

        .hm-btn-view {
          align-self: flex-start;
          height: 38px;
          padding: 0 18px;
          border: 1.5px solid #e8e0d4;
          border-radius: 10px;
          background: transparent;
          color: #4a3728;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }

        .hm-btn-view:hover {
          background: #2d2217;
          border-color: #2d2217;
          color: #faf5ef;
        }

        .hm-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 0;
          color: #b5a898;
          font-size: 14px;
          font-weight: 300;
          font-style: italic;
        }

        @media (max-width: 600px) {
          .hm-nav { padding: 0 20px; }
          .hm-hero { padding: 36px 20px 28px; }
          .hm-hero-heading { font-size: 34px; }
          .hm-body { padding: 28px 20px 48px; }
        }
      `}</style>

      <div className="hm-page">

        {/* Navbar */}
        <nav className="hm-nav">
          <div className="hm-nav-brand">
            <div className="hm-nav-logo">🍽</div>
            <span className="hm-nav-title">Recipe <em>Share</em></span>
          </div>
          <div className="hm-nav-actions">
            <Link to="/create">
              <button className="hm-btn-create">+ Create Recipe</button>
            </Link>
            <button className="hm-btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        </nav>

        {/* Hero */}
        <div className="hm-hero">
          <p className="hm-hero-eyebrow">Community Kitchen</p>
          <h1 className="hm-hero-heading">Recipe Sharing<br /><em>Platform.</em></h1>
          <p className="hm-hero-sub">Discover and share recipes from the community.</p>
        </div>

        {/* Grid */}
        <div className="hm-body">
          <p className="hm-count">{recipes.length} recipe{recipes.length !== 1 ? "s" : ""} found</p>

          <div className="hm-grid">
            {recipes.length === 0 && (
              <p className="hm-empty">No recipes yet — be the first to create one.</p>
            )}
            {recipes.map((r) => (
              <div key={r._id} className="hm-card">
                <div className="hm-card-icon">🥘</div>
                <h3 className="hm-card-title">{r.title}</h3>
                <p className="hm-card-author">by {r.createdBy?.username || "Anonymous"}</p>
                <div className="hm-card-divider" />
                <Link to={`/recipe/${r._id}`}>
                  <button className="hm-btn-view">View Recipe →</button>
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}