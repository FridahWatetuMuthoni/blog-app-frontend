import { Link, useLocation, useNavigate } from "react-router-dom";
import { QueryClient, useMutation } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

function BlogDelete() {
  const { state: blog } = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(`blog/${blog.id}/`);
      if (response?.status === 204) {
        navigate("/");
      }
      return response.data;
    },
    onSettled: async ({ error }) => {
      if (error) {
        console.log(error);
      } else {
        await QueryClient.invalidateQueries({ queryKey: ["blogs"] });
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutateAsync();
  };

  return (
    <div>
      <Link
        to={`/blog/${blog.id}`}
        state={blog}
        className=" ml-8 md:ml-6 mt-4 inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          ></path>
        </svg>
        <span className="ml-1 font-bold text-sm  md:text-lg">Go Back</span>
      </Link>
      <>
        <div className="flex items-center justify-center h-fit mt-8">
          <div className="container">
            <div className="rounded-lg shadow-2xl p-5 md:p-10 mx-2">
              <div className="text-center">
                <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-content sm:text-5xl sm:leading-none md:text-6xl">
                  Delete<span className="text-indigo-600"> Blog</span>
                </h2>
                <h3 className="text-xl md:text-3xl mt-10">{blog.title}</h3>
                <p className="text-md md:text-xl mt-10">
                  Are you sure you want do delete this blog?
                </p>
              </div>
              <form
                className="flex flex-wrap mt-10 justify-center"
                onSubmit={handleSubmit}
              >
                <div className="m-3">
                  <button
                    type="submit"
                    className=" bg-white tracking-wide text-red-600 font-bold rounded border-2 border-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  >
                    <span className="mx-auto">Delete Blog</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* https://gist.github.com/MrFluffycloud/20db5c6075fca09d4d05335442ef2b90 */}
      </>
    </div>
  );
}

export default BlogDelete;
