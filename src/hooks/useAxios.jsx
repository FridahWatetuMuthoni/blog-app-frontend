import axiosInstance from "../api/axiosInstance";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useGlobalContext from "./useGlobalContext";

function useAxios() {
  const refresh = useRefreshToken();
  const { access_token } = useGlobalContext();

  useEffect(() => {
    const request_interceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `JWT ${access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const response_interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error?.config;
        if (
          error?.response?.status === 401 ||
          error?.response?.statusText === "Unauthorized" ||
          !originalRequest?.sent
        ) {
          originalRequest.sent = true;
          const new_access_token = await refresh();
          originalRequest.headers["Authorization"] = `JWT ${new_access_token}`;
          return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      //removing the interceptors  to avoid interceptors pileup
      axiosInstance.interceptors.request.eject(request_interceptor);
      axiosInstance.interceptors.response.eject(response_interceptor);
    };
  }, [refresh, access_token]);

  return axiosInstance;
}

export default useAxios;
