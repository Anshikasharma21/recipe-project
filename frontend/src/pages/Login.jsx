import toast from "react-hot-toast";
import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing in...");
    try {
      const { data } = await API.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      toast.success("Login Successful", { id: toastId });
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error", { id: toastId });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .lp-root {
          min-height: 100vh;
          width: 100%;
          background: #0a0a0f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .lp-root::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
          top: -100px;
          left: -150px;
          pointer-events: none;
        }

        .lp-root::after {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%);
          bottom: -80px;
          right: -100px;
          pointer-events: none;
        }

        .lp-card {
          position: relative;
          z-index: 1;
          width: 920px;
          max-width: 96vw;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06);
        }

        .lp-left {
          background: linear-gradient(145deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%);
          padding: 56px 44px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .lp-left::after {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .lp-brand {
          position: relative;
          z-index: 1;
        }

        .lp-logo {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #818cf8, #c084fc);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 28px;
        }

        .lp-heading {
          font-family: 'DM Serif Display', serif;
          font-size: 42px;
          line-height: 1.1;
          color: #fff;
          margin-bottom: 14px;
        }

        .lp-heading em {
          font-style: italic;
          color: #a5b4fc;
        }

        .lp-tagline {
          font-size: 14px;
          color: rgba(199,210,254,0.7);
          font-weight: 300;
          line-height: 1.6;
          max-width: 220px;
        }

        .lp-decoration {
          position: relative;
          z-index: 1;
        }

        .lp-stat-row {
          display: flex;
          gap: 20px;
          margin-top: 48px;
        }

        .lp-stat {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 16px 20px;
          flex: 1;
          backdrop-filter: blur(10px);
        }

        .lp-stat-num {
          font-family: 'DM Serif Display', serif;
          font-size: 26px;
          color: #a5b4fc;
          margin-bottom: 2px;
        }

        .lp-stat-label {
          font-size: 11px;
          color: rgba(199,210,254,0.55);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .lp-right {
          background: #111118;
          padding: 56px 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .lp-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
        }

        .lp-section-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #6b7280;
        }

        .lp-signup-link {
          font-size: 13px;
          color: #6366f1;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .lp-signup-link:hover {
          color: #818cf8;
        }

        .lp-form-title {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          color: #f9fafb;
          margin-bottom: 6px;
        }

        .lp-form-sub {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 36px;
          font-weight: 300;
        }

        .lp-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .lp-field {
          position: relative;
        }

        .lp-field-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #4b5563;
          font-size: 16px;
          pointer-events: none;
          transition: color 0.2s;
        }

        .lp-input {
          width: 100%;
          height: 54px;
          background: #1a1a24;
          border: 1.5px solid #1f2937;
          border-radius: 14px;
          padding: 0 18px 0 48px;
          color: #f3f4f6;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .lp-input::placeholder {
          color: #374151;
        }

        .lp-input:focus {
          border-color: #4f46e5;
          background: #1e1e2e;
        }

        .lp-field:focus-within .lp-field-icon {
          color: #6366f1;
        }

        .lp-btn {
          height: 54px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 6px;
          position: relative;
          overflow: hidden;
          transition: opacity 0.2s, transform 0.15s;
        }

        .lp-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .lp-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .lp-btn:hover::before {
          opacity: 1;
        }

        .lp-btn:active {
          transform: translateY(0);
        }

        .lp-terms {
          margin-top: 28px;
          font-size: 11.5px;
          color: #374151;
          line-height: 1.6;
          text-align: center;
        }

        @media (max-width: 680px) {
          .lp-card {
            grid-template-columns: 1fr;
            border-radius: 20px;
          }
          .lp-left {
            padding: 36px 32px;
          }
          .lp-stat-row {
            display: none;
          }
          .lp-right {
            padding: 36px 32px;
          }
        }
      `}</style>

      <div className="lp-root">
        <div className="lp-card">

          {/* LEFT */}
          <div className="lp-left">
            <div className="lp-brand">
              <div className="lp-logo">📱</div>
              <h1 className="lp-heading">
                Welcome<br /><em>back.</em>
              </h1>
              <p className="lp-tagline">
                Sign in to pick up right where you left off.
              </p>
            </div>

            <div className="lp-decoration">
              <div className="lp-stat-row">
                <div className="lp-stat">
                  <div className="lp-stat-num">99%</div>
                  <div className="lp-stat-label">Uptime</div>
                </div>
                <div className="lp-stat">
                  <div className="lp-stat-num">256-bit</div>
                  <div className="lp-stat-label">Encrypted</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lp-right">

            <div className="lp-top-row">
              <span className="lp-section-label">Secure login</span>
              <Link to="/register" className="lp-signup-link">
                Create account →
              </Link>
            </div>

            <h2 className="lp-form-title">Sign in</h2>
            <p className="lp-form-sub">Enter your credentials to continue.</p>

            <form onSubmit={handleLogin} autoComplete="off" className="lp-form">

              <div className="lp-field">
                <input
                  type="email"
                  placeholder="Email address"
                  className="lp-input"
                  autoComplete="new-password"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="lp-field-icon">✉</span>
              </div>

              <div className="lp-field">
                <input
                  type="password"
                  placeholder="Password"
                  className="lp-input"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="lp-field-icon">🔒</span>
              </div>

              <button type="submit" className="lp-btn">
                Sign In
              </button>

            </form>

            <p className="lp-terms">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>

          </div>

        </div>
      </div>
    </>
  );
}