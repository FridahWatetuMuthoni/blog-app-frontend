import { useNavigate, Link } from "react-router-dom";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useState } from "react";
import Google from "./Google";
import Facebook from "./Facebook";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../../queries/api";
import Loading from '../Utils/Loading'

function Login() {
  const { setAccessToken, setRefreshToken, setUserID } = useGlobalContext();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: (user) => loginUser(user),
    onSuccess: (data) => {
      setLoading(false)
      setRefreshToken(data?.refresh);
      setAccessToken(data?.access);
      localStorage.setItem("access_token", data?.access);
      localStorage.setItem("refresh_token", data?.refresh);
      const decoded_data = jwtDecode(data?.access);
      localStorage.setItem("userID", decoded_data.user_id);
      setUserID(decoded_data.user_id);
      navigate("/");
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.email.trim() && user.password.trim()) {
      setLoading(true)
      mutation.mutateAsync(user);
    }
  };

  
  if(loading){
    return <Loading/>
  }

  return (
    <section className="h-full">
      {/* <!-------------------------------------------------------------------------------> */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6  py-6 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* text-gray-900 */}
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight ">
            Sign In
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-lg ">
          <form
            className="space-y-6 md:px-8"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            {mutation.isError ? (
              <div className="bg-red-200 px-6 py-4  my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                <svg
                  viewBox="0 0 24 24"
                  className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                >
                  <path
                    fill="currentColor"
                    d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                  ></path>
                </svg>
                <span className="text-red-800 text-sm">
                  {" "}
                  {mutation?.error?.response?.status === 401
                    ? "Incorrect email or password"
                    : mutation?.error?.response?.status === 403
                    ? "Please make sure you have created an account"
                    : "Something went wrong, please try again"}
                </span>
              </div>
            ) : null}
            <div>
              {/* text-gray-900 */}
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 "
              >
                Email address
              </label>
              {/* text-gray-900 */}
              {/* placeholder:text-gray-400 */}
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                  className="block text-gray-900 w-full rounded-md border-0 py-1.5 px-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className=" block w-full rounded-md border-0 py-1.5 px-1.5 focus:outline-none  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-gray-900 "
                />
              </div>
            </div>
            <div className="text-sm flex items-center">
              <input
                type="checkbox"
                name="show_password"
                id="show_password"
                onClick={handleShowPassword}
              />
              <span className="ml-2">show password</span>
            </div>

            <div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {mutation.isPending ? "Submitting Form" : "Submit"}
              </button>
            </div>
            <section className="flex items-center justify-center text-content gap-2 w-full my-5 ">
              <hr className="w-26 md:w-32" />
              <p className=" text-sm">Or continue with </p>
              <hr className="w:26 md:w-32" />
            </section>
            <section className=" flex flex-col md:flex-row items-center justify-center gap-2 w-full md:justify-around">
              <Google setLoading = {setLoading} />
              <Facebook />
            </section>
          </form>
          {/* text-gray-500 */}

          <section className="flex items-center text-sm mt-10 justify-between md:px-8">
            <section className="flex items-center">
              <span>Dont have an account? </span>
              <Link
                to="/register/"
                className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1"
              >
                Register
              </Link>
            </section>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Login;
