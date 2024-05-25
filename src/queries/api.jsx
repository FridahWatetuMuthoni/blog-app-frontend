import axios from "axios";
//Dont Require Access Token
const registerUser = async (user) => {
  const response = await axios.post(
    "http://localhost:8000/users/register/",
    user
  );
  return response.data;
};

export { registerUser };
