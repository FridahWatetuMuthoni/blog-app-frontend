import PropTypes from "prop-types";
import Blog from "./Blog";

function Blogs({ blogs }) {
  return (
    <div className="flex flex-wrap -m-4 item-center justify-center ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

Blogs.propTypes = {
  blogs: PropTypes.array,
};
export default Blogs;
