import image from "../../assets/profile-background.jpg";
import { Link, useLocation } from "react-router-dom";

const BlogDetail = () => {
  const { state: blog } = useLocation();
  return (
    <>
      <Link
        to="/"
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

      <main className="container mx-auto mt-8 shadow-2xl">
        <div className="">
          <div className="w-full  mb-2">
            <img
              src={blog.image}
              fixed={{
                width: 800,
                height: 500,
              }}
              alt="Featured Image"
              className="w-full h-64 object-cover rounded"
            />
            <div className="relative p-6">
              <div className="max-w-3xl mx-auto">
                <div className="mt-3 rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                  <div className="">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-gray-700 transition duration-500 ease-in-out text-sm"
                    >
                      Election
                    </a>
                    <h1 href="#" className="font-bold text-4xl">
                      {blog.title}
                    </h1>
                    <div className="py-5 text-sm font-regular flex">
                      <span className="mr-3 flex flex-row items-center">
                        <svg
                          className="text-indigo-600"
                          fill="currentColor"
                          height="13px"
                          width="13px"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 512 512"
                          style={{ enableBackground: "new 0 0 512 512" }}
                          xmlSpace="preserve"
                        >
                          <g>
                            <g>
                              <path
                                d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256
			c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128
		                   	c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"
                              />
                            </g>
                          </g>
                        </svg>
                        <span className="ml-1">6 mins ago</span>
                      </span>
                      <a
                        href="#"
                        className="flex flex-row items-center hover:text-indigo-600  mr-3"
                      >
                        <svg
                          className="text-indigo-600"
                          fill="currentColor"
                          height="16px"
                          aria-hidden="true"
                          role="img"
                          focusable="false"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="currentColor"
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                          ></path>
                          <path d="M0 0h24v24H0z" fill="none" />
                        </svg>
                        <span className="ml-1">{blog.author_username}</span>
                      </a>
                    </div>
                    <hr />
                    <p className="text-base leading-8 my-5">{blog.excerpt}</p>
                    <h3 className="text-2xl font-bold my-5">Content</h3>
                    <p className="text-base leading-8 mt-5">{blog.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 pb-4">
          <Link
            to={`/blog-update/${blog.id}`}
            state={blog}
            className="inline-flex items-center border border-green-400 px-3 py-1.5 rounded-md text-green-600 hover:text-green-500"
          >
            <span className="ml-1 font-bold text-lg">Update</span>
          </Link>
          <Link
            to={`/blog-delete/${blog.id}`}
            state={blog}
            className="inline-flex items-center border border-red-400 px-3 py-1.5 rounded-md text-red-600 hover:text-red-500"
          >
            <span className="mr-1 font-bold text-lg">Delete</span>
          </Link>
        </div>
      </main>
      <footer className="bg-gray-800 flex items-center justify-center  h-20">
        <p className="text-center text-white">
          Copyright {new Date().getFullYear()}{" "}
        </p>
      </footer>
      <section className="pb-8"></section>
    </>
  );
};
export default BlogDetail;
