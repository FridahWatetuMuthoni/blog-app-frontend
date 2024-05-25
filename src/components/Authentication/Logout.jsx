import { useNavigate } from "react-router-dom";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { Error, Loading } from "../Utils";

function Logout() {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { refresh_token, setAccessToken, setRefreshToken, setUserID } =
    useGlobalContext();

  const mutation = useMutation({
    mutationFn: async (refresh_token) => {
      const data = {
        refresh: refresh_token,
      };
      const response = await axiosInstance.post("users/logout/", data);
      if (response?.status === 200) {
        setAccessToken(null);
        setRefreshToken(null);
        setUserID(null);
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("userID");
        navigate("/login");
      }
      return response;
    },
  });

  const logout = async () => {
    if (refresh_token) {
      mutation.mutateAsync(refresh_token);
    } else {
      navigate("/login/");
    }
  };

  useEffect(() => {
    logout();
  }, [refresh_token]);

  if (mutation.isPending) {
    return <Loading />;
  }
  if (mutation.isError) {
    return <Error error={mutation.error} />;
  }
  if (mutation.isSuccess) {
    return <div>You have logged out of your account</div>;
  }
}

export default Logout;
