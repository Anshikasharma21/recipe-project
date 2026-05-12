import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      alert("Login Successful");

      navigate("/home");

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={styles.container}>

      {/* anti-autofill trick */}
      <input type="text" name="fakeuser" style={{ display: "none" }} />
      <input type="password" name="fakepass" style={{ display: "none" }} />

      <div style={styles.card}>

        <h2 style={styles.title}>Login</h2>

        <form
          onSubmit={handleLogin}
          style={styles.form}
          autoComplete="off"
        >

          <input
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="off"
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="new-password"
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button}>
            Login
          </button>

        </form>

        <p style={styles.text}>
          Don't have an account?
        </p>

        <Link to="/register">
          <button style={styles.signupButton}>
            Sign Up
          </button>
        </Link>

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
    width: "300px",
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

  button: {
    padding: "10px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  signupButton: {
    padding: "10px",
    background: "#555",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
  },

  text: {
    marginTop: "15px",
    fontSize: "14px",
  },
};