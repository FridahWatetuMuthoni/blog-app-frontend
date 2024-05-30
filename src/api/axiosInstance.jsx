import axios from "axios";

// const BASE_URL =
//   "https://social-authentication-system-backend.onrender.com/users/";
// const BASE_URL = "http://localhost:8000";
const BASE_URL = "https://core-tjnk.onrender.com/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
});

export default axiosInstance;
