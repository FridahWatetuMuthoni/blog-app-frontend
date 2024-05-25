import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { QueryClient, useMutation } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useGlobalContext from "../../hooks/useGlobalContext";

function UpdateProfile() {
  const { state } = useLocation();
  const { userID } = useGlobalContext();
  const navigate = useNavigate();
  const initialData = Object.freeze({
    email: state?.email,
    username: state?.username,
    first_name: state?.first_name,
    last_name: state?.last_name,
    about: state?.about,
    profile_image: null,
  });
  const [formData, setFormData] = useState(initialData);
  const axiosInstance = useAxios();

  const mutation = useMutation({
    mutationFn: async (user) => {
      const response = await axiosInstance.put(`users/user/${userID}/`, user);
      console.log(response);
      if (response?.status === 200) {
        navigate("/profile/");
      }
      return response.data;
    },
    onSettled: async ({ error }) => {
      if (error) {
        console.log(error);
      } else {
        await QueryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });

  const handleChange = (e) => {
    if (e.target.name === "profile_image") {
      setFormData((prev) => ({
        ...prev,
        profile_image: e.target.files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutateAsync(formData);
  };

  if (mutation.isError) {
    console.log(mutation.error);
  }

  return (
    <>
      <button
        className=" ml-8 md:ml-0 py-1.5 px-1.5 mt-10 text-center text-sm border border-indigo-500 rounded-md text-content  hover:bg-indigo-400 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
        type="submit"
      >
        <Link to="/profile/"> Go back to profile</Link>
      </button>
      <div className="flex justify-center mt-10 px-8">
        <form
          className="max-w-2xl"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="flex flex-wrap border shadow rounded-lg p-3 ">
            <div className="py-5 w-full">
              <h2 className="text-3xl text-center ">Account settings</h2>
            </div>
            <div className="flex flex-col gap-2 w-full border-gray-400">
              <section className="flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium leading-6 "
                  >
                    First Name
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    onChange={handleChange}
                    value={formData.first_name}
                    autoComplete="first_name"
                    className="block text-gray-900 w-full rounded-md border-0 py-1.5 px-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium leading-6 "
                  >
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    onChange={handleChange}
                    value={formData.last_name}
                    type="text"
                    autoComplete="last_name"
                    className="block text-gray-900 w-full rounded-md border-0 py-1.5 px-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                  />
                </div>
              </section>

              <section className="flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 "
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    type="text"
                    autoComplete="username"
                    className="block text-gray-900 w-full rounded-md border-0 py-1.5 px-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 "
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={formData.email}
                    autoComplete="email"
                    className="block text-gray-900 w-full rounded-md border-0 py-1.5 px-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                  />
                </div>
              </section>
              <div>
                <label className="">Bio</label>
                <textarea
                  className="w-full py-3 border  text-gray-900 border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                  name="about"
                  onChange={handleChange}
                  value={formData.about}
                />
              </div>
              <div className="">
                <label
                  htmlFor="example1"
                  className="mb-1 block text-sm font-medium "
                >
                  Upload file
                </label>
                <input
                  id="example1"
                  type="file"
                  name="profile_image"
                  onChange={handleChange}
                  className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-400 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="py-1.5 px-3 m-1 text-center bg-indigo-500 border rounded-md text-white  hover:bg-indigo-400 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                  type="submit"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateProfile;
