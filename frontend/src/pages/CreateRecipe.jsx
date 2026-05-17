import { useState } from "react";
import toast from "react-hot-toast"; // 🔥 ADDED
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

    const toastId = toast.loading("Publishing recipe..."); // 🔥 ADDED

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("ingredients", ingredients);
      formData.append("instructions", instructions);
      formData.append("image", image);

      const token = localStorage.getItem("token");

      await API.post("/api/recipes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Recipe Created Successfully", { id: toastId }); // 🔥 REPLACES alert

      navigate("/home");
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Error", {
        id: toastId,
      }); // 🔥 REPLACES alert
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after {
          margin: 0; padding: 0; box-sizing: border-box;
        }

        .cr-page {
          min-height: 100vh;
          background: #faf8f4;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px;
          font-family: 'DM Sans', sans-serif;
        }

        .cr-card {
          width: 100%;
          max-width: 540px;
          background: #fff;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(0,0,0,0.08);
        }

        /* Hero strip */
        .cr-hero {
          background: linear-gradient(135deg, #2d2217 0%, #4a3728 100%);
          padding: 36px 44px 30px;
          position: relative;
          overflow: hidden;
        }

        .cr-hero::after {
          content: '✍️';
          position: absolute;
          right: 28px;
          bottom: -8px;
          font-size: 80px;
          opacity: 0.13;
          line-height: 1;
        }

        .cr-eyebrow {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #c8a882;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .cr-heading {
          font-family: 'Fraunces', serif;
          font-size: 34px;
          font-weight: 600;
          color: #faf5ef;
          line-height: 1.1;
        }

        .cr-heading em {
          font-style: italic;
          color: #c8a882;
        }

        /* Body */
        .cr-body {
          padding: 36px 44px 44px;
        }

        .cr-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cr-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .cr-label {
          font-size: 10px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #c8a882;
          font-weight: 500;
        }

        .cr-input {
          width: 100%;
          height: 50px;
          background: #faf8f4;
          border: 1.5px solid #ede8e0;
          border-radius: 12px;
          padding: 0 16px;
          color: #2d2217;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .cr-input::placeholder { color: #c8b9ac; }

        .cr-input:focus {
          border-color: #4a3728;
          background: #fff;
        }

        .cr-textarea {
          width: 100%;
          background: #faf8f4;
          border: 1.5px solid #ede8e0;
          border-radius: 12px;
          padding: 14px 16px;
          color: #2d2217;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          min-height: 110px;
          resize: none;
          line-height: 1.6;
          transition: border-color 0.2s, background 0.2s;
        }

        .cr-textarea::placeholder { color: #c8b9ac; }

        .cr-textarea:focus {
          border-color: #4a3728;
          background: #fff;
        }

        /* File input */
        .cr-file-label {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 50px;
          background: #faf8f4;
          border: 1.5px dashed #d8cfC4;
          border-radius: 12px;
          padding: 0 16px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }

        .cr-file-label:hover {
          border-color: #4a3728;
          background: #f5f0ea;
        }

        .cr-file-icon {
          font-size: 18px;
          opacity: 0.6;
        }

        .cr-file-text {
          font-size: 13px;
          color: #9c8878;
          font-weight: 300;
        }

        .cr-file-input {
          display: none;
        }

        .cr-divider {
          height: 1px;
          background: #f0ece4;
          margin: 4px 0;
        }

        .cr-btn-submit {
          width: 100%;
          height: 52px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #2d2217, #4a3728);
          color: #faf5ef;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
        }

        .cr-btn-submit:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        .cr-btn-submit:active { transform: translateY(0); }

        @media (max-width: 560px) {
          .cr-hero { padding: 28px 28px 24px; }
          .cr-body { padding: 28px 28px 36px; }
        }
      `}</style>

      <div className="cr-page">
        <div className="cr-card">

          {/* Hero */}
          <div className="cr-hero">
            <p className="cr-eyebrow">New Recipe</p>
            <h2 className="cr-heading">Create a<br /><em>Recipe.</em></h2>
          </div>

          {/* Form */}
          <div className="cr-body">
            <form onSubmit={handleSubmit} className="cr-form">

              <div className="cr-field">
                <label className="cr-label">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Spaghetti Carbonara"
                  className="cr-input"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="cr-field">
                <label className="cr-label">Ingredients</label>
                <input
                  type="text"
                  placeholder="e.g. pasta, eggs, pancetta…"
                  className="cr-input"
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>

              <div className="cr-field">
                <label className="cr-label">Instructions</label>
                <textarea
                  placeholder="Describe the steps to make this recipe…"
                  className="cr-textarea"
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>

              <div className="cr-field">
                <label className="cr-label">Image</label>
                <label className="cr-file-label">
                  <span className="cr-file-icon">📷</span>
                  <span className="cr-file-text">
                    {image ? image.name : "Choose a photo…"}
                  </span>
                  <input
                    type="file"
                    className="cr-file-input"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              </div>

              <div className="cr-divider" />

              <button type="submit" className="cr-btn-submit">
                Publish Recipe
              </button>

            </form>
          </div>

        </div>
      </div>
    </>
  );
}