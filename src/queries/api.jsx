import axios from "axios";
//Dont Require Access Token
const registerUser = async (user) => {
  const response = await axios.post(
    "https://blog-app-backend-8l7p.onrender.com/users/register/",
    user
  );
  return response.data;
};

export { registerUser };
