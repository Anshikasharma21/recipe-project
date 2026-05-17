import axios from "axios";

const API = axios.create({
  baseURL: "https://recipe-project-dsfy.onrender.com",
});

export default API;