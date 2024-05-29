import PropTypes from "prop-types";
import profile from "../../assets/default.jpg";
// import image from "../../assets/profile-background.jpg";
import { Link } from "react-router-dom";

function Blog({ blog }) {
  const date = new Date(blog.published);
  const options = { year: "numeric", month: "long", day: "numeric" };
  console.log(blog);
  return (
    <div className=" shadow-2xl rounded-md flex flex-col justify-between leading-normal">
      <Link to={`/blog/${blog.id}`} state={blog}>
        <img className="w-full mb-1 h-48" src={blog.image} />
      </Link>
      <div className="p-4 pt-2">
        <div className="mb-4">
          <Link
            to={`/blog/${blog.id}`}
            state={blog}
            className=" font-bold text-lg mb-2 hover:text-indigo-600 inline-block"
          >
            {blog.title.length > 60
              ? blog.title.slice(0, 60) + "..."
              : blog.title}
          </Link>
          <p className="text-muted text-sm">
            {blog.excerpt.length > 200
              ? blog.excerpt.slice(0, 200) + "..."
              : blog.excerpt}
          </p>
        </div>
        <div className="flex items-center">
          <Link to={`/blog/${blog.id}`} state={blog}>
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={profile}
              alt="Avatar of Jonathan Reinink"
            />
          </Link>
          <div className="text-sm">
            <a
              href="#"
              className=" font-semibold leading-none hover:text-indigo-600"
            >
              {blog.author_username}
            </a>
            <p className="text-muted">
              {date.toLocaleDateString("en-US", options)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.object,
};

export default Blog;
