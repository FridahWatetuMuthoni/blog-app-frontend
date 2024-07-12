import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { googleRegister } from "../../queries/api";

function Google({setLoading}) {
  const clientID =
    "1085618487417-27lqrukr7qc7mg5vng7upj9er8ksjbe7.apps.googleusercontent.com";
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken, setUserID } = useGlobalContext();

  const mutation = useMutation({
    mutationFn: (payload) => googleRegister(payload),
    onSuccess: (data) => {
      console.log('data returned')
      setLoading(false)
      setRefreshToken(data?.refresh);
      setAccessToken(data?.access);
      localStorage.setItem("access_token", data?.access);
      localStorage.setItem("refresh_token", data?.refresh);
      localStorage.setItem("userID", data.user.pk);
      setUserID(data.user.pk);
      navigate("/");
    },
  });

  const handleReject = (error) => {
    console.log(error);
  };
  const handleSuccess = (response) => {
    const access = response?.data?.access_token;
    console.log('google passed')
    if (access) {
      const payload = {
        access_token: access,
      };
      mutation.mutateAsync(payload);
    }
  };

  if(mutation.isPending){
    setLoading(true)
  }

  return (
    <div className="w-full">
      <LoginSocialGoogle
        client_id={clientID}
        onResolve={handleSuccess}
        onReject={handleReject}
        isOnlyGetToken={true}
      >
        <GoogleLoginButton
          text="Sign up with Google"
          style={{
            fontSize: "12px",
            width: "100%",
            height: "40px",
          }}
        />
      </LoginSocialGoogle>
    </div>
  );
}

export default Google;
