import { Link, useLocation, useNavigate } from "react-router-dom";
import { QueryClient, useMutation } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";

function BlogUpdate() {
  const { state: blog } = useLocation();
  const navigate = useNavigate();
  const initialData = Object.freeze({
    title: blog?.title,
    excerpt: blog?.excerpt,
    content: blog?.content,
    category: blog?.category,
    image: null,
  });
  const [formData, setFormData] = useState(initialData);
  const axiosInstance = useAxios();

  const mutation = useMutation({
    mutationFn: async (post) => {
      const response = await axiosInstance.put(`blog/${blog.id}/`, post);
      console.log(response);
      if (response?.status === 200) {
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

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files[0],
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
      <section>
        <form
          className="md:col-span-8 p-10 shadow-2xl mt-3"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h1 className=" text-3xl text-center mb-5">Update Blog</h1>

          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-xs font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="title"
                type="text"
                name="title"
                placeholder="Enter your title ...."
                onChange={handleChange}
                value={formData.title}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-xs font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="category"
                type="text"
                name="category"
                placeholder="Enter your category ...."
                onChange={handleChange}
                value={formData.category}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide  text-xs font-bold mb-2"
                htmlFor="excerpt"
              >
                Excerpt
              </label>
              <textarea
                rows={10}
                name="excerpt"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={handleChange}
                value={formData.excerpt}
                id="excerpt"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide  text-xs font-bold mb-2"
                htmlFor="content"
              >
                Content
              </label>
              <textarea
                rows={10}
                name="content"
                id="content"
                onChange={handleChange}
                value={formData.content}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>

          <div className="mt-3 mb-6">
            <label htmlFor="image" className="mb-1 block text-sm font-medium ">
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              name="image"
              onChange={handleChange}
              className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-400 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
            />
          </div>

          <div className="">
            <button
              className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
              type="submit"
            >
              Update Blog
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default BlogUpdate;
