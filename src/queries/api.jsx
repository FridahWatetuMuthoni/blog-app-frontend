import axios from "axios";

const BASE_URL = "https://blog-app-backend-c0fs.onrender.com/";
const axios_instance = axios.create({
  baseURL: BASE_URL,
});

//Dont Require Access Token
const registerUser = async (user) => {
  const response = await axios_instance.post("users/register/", user);
  return response.data;
};

const googleRegister = async (payload) => {
  const response = await axios_instance.post("users/google/", payload);
  return response.data;
};

const facebookRegister = async (payload) => {
  const response = await axios_instance.post("users/facebook/", payload);
  return response.data;
};

const loginUser = async (user) => {
  const response = await axios_instance.post("users/login/", user);
  return response.data;
};

export { registerUser, googleRegister, facebookRegister, loginUser };
