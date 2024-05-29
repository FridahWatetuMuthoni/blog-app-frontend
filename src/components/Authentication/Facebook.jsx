import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useCallback } from "react";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { facebookRegister } from "../../queries/api";

function Facebook() {
  const appId = "304717439171510";
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken, setUserID } = useGlobalContext();

  const mutation = useMutation({
    mutationFn: (payload) => facebookRegister(payload),
    onSuccess: (data) => {
      setRefreshToken(data?.refresh);
      setAccessToken(data?.access);
      localStorage.setItem("access_token", data?.access);
      localStorage.setItem("refresh_token", data?.refresh);
      localStorage.setItem("userID", data.user.pk);
      setUserID(data.user.pk);
      navigate("/");
    },
  });

  const handleSuccess = (response) => {
    const access = response?.data?.accessToken;
    if (access) {
      const payload = {
        access_token: access,
      };
      mutation.mutateAsync(payload);
    }
  };

  const handleReject = (error) => {
    console.log(error);
  };

  const LoginStart = useCallback(() => {
    alert("login start");
  }, []);

  return (
    <div className="w-full">
      <LoginSocialFacebook
        appId={appId}
        onResolve={handleSuccess}
        onReject={handleReject}
        onLoginStart={LoginStart}
        isOnlyGetToken={true}
      >
        <FacebookLoginButton
          text="Sign up with Facebook"
          className="rounded text-sm"
          style={{
            fontSize: "12px",
            width: "100%",
            height: "40px",
          }}
        />
      </LoginSocialFacebook>
    </div>
  );
}

export default Facebook;
