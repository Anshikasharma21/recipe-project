import toast from "react-hot-toast";
import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creating account...");
    try {
      await API.post("/api/auth/register", { username, email, password });
      toast.success("Register Successful", { id: toastId });
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error", { id: toastId });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after {
          margin: 0; padding: 0; box-sizing: border-box;
        }

        .rg-page {
          min-height: 100vh;
          width: 100%;
          background: #0a0a0f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .rg-page::before {
          content: '';
          position: absolute;
          width: 640px;
          height: 640px;
          background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
          top: -160px;
          right: -160px;
          pointer-events: none;
        }

        .rg-page::after {
          content: '';
          position: absolute;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%);
          bottom: -100px;
          left: -120px;
          pointer-events: none;
        }

        .rg-card {
          position: relative;
          z-index: 1;
          width: 420px;
          max-width: 94vw;
          background: #111118;
          border-radius: 28px;
          padding: 48px 44px 44px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06);
        }

        .rg-top {
          margin-bottom: 36px;
        }

        .rg-eyebrow {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #6366f1;
          font-weight: 500;
          margin-bottom: 10px;
        }

        .rg-heading {
          font-family: 'DM Serif Display', serif;
          font-size: 36px;
          color: #f9fafb;
          line-height: 1.1;
          margin-bottom: 6px;
        }

        .rg-heading em {
          font-style: italic;
          color: #a5b4fc;
        }

        .rg-sub {
          font-size: 13px;
          color: #4b5563;
          font-weight: 300;
        }

        .rg-form {
          display: flex;
          flex-direction: column;
          gap: 13px;
          margin-bottom: 24px;
        }

        .rg-field {
          position: relative;
        }

        .rg-icon {
          position: absolute;
          left: 17px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 15px;
          color: #374151;
          pointer-events: none;
          transition: color 0.2s;
        }

        .rg-field:focus-within .rg-icon {
          color: #6366f1;
        }

        .rg-input {
          width: 100%;
          height: 52px;
          background: #1a1a24;
          border: 1.5px solid #1f2937;
          border-radius: 14px;
          padding: 0 18px 0 46px;
          color: #f3f4f6;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .rg-input::placeholder {
          color: #374151;
        }

        .rg-input:focus {
          border-color: #4f46e5;
          background: #1e1e2e;
        }

        .rg-btn-submit {
          width: 100%;
          height: 52px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 4px;
          position: relative;
          overflow: hidden;
          transition: opacity 0.2s, transform 0.15s;
        }

        .rg-btn-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .rg-btn-submit:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .rg-btn-submit:hover::before { opacity: 1; }
        .rg-btn-submit:active { transform: translateY(0); }

        .rg-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .rg-divider-line {
          flex: 1;
          height: 1px;
          background: #1f2937;
        }

        .rg-divider-text {
          font-size: 11px;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .rg-signin-label {
          text-align: center;
          font-size: 13px;
          color: #4b5563;
          margin-bottom: 12px;
          font-weight: 300;
        }

        .rg-btn-signin {
          width: 100%;
          height: 52px;
          border: 1.5px solid #1f2937;
          border-radius: 14px;
          background: transparent;
          color: #6b7280;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }

        .rg-btn-signin:hover {
          border-color: #4f46e5;
          color: #a5b4fc;
          background: rgba(79,70,229,0.06);
        }
      `}</style>

      <div className="rg-page">
        <div className="rg-card">

          <div className="rg-top">
            <p className="rg-eyebrow">Get started</p>
            <h2 className="rg-heading">Create an<br /><em>account.</em></h2>
            <p className="rg-sub">Fill in the details below to join.</p>
          </div>

          <form onSubmit={handleRegister} className="rg-form" autoComplete="off">

            <div className="rg-field">
              <input
                type="text"
                placeholder="Username"
                className="rg-input"
                autoComplete="new-password"
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="rg-icon">👤</span>
            </div>

            <div className="rg-field">
              <input
                type="email"
                placeholder="Email address"
                className="rg-input"
                autoComplete="new-password"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="rg-icon">✉</span>
            </div>

            <div className="rg-field">
              <input
                type="password"
                placeholder="Password"
                className="rg-input"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="rg-icon">🔒</span>
            </div>

            <button type="submit" className="rg-btn-submit">
              Sign Up
            </button>

          </form>

          <div className="rg-divider">
            <div className="rg-divider-line" />
            <span className="rg-divider-text">or</span>
            <div className="rg-divider-line" />
          </div>

          <p className="rg-signin-label">Already have an account?</p>

          <Link to="/">
            <button className="rg-btn-signin">Sign In</button>
          </Link>

        </div>
      </div>
    </>
  );
}