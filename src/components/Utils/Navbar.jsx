import { Link } from "react-router-dom";
import useGlobalContext from "../../hooks/useGlobalContext";
import { FaSun } from "react-icons/fa6";
import { MdNightlight } from "react-icons/md";

function Navbar() {
  const { mode, setMode } = useGlobalContext();

  const handleModeChange = () => {
    let new_mode = mode === "dark" ? "light" : "dark";
    setMode(new_mode);
  };

  return (
    <header className="">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center  mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl">Blog</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center gap-y-4 md:gap-y-0">
          <Link to="/" className="mr-5 hover:text-muted">
            Home
          </Link>
          <Link to="/profile" className="mr-5 hover:text-muted">
            Profile
          </Link>
          <Link to="/about" className="mr-5 hover:text-muted">
            About
          </Link>
          <Link to="/contact" className="mr-5 hover:text-muted">
            Contact
          </Link>
          <Link to="/blog-create" className="mr-5 hover:text-muted">
            Create New Blog
          </Link>
        </nav>
        <section
          className="text-2xl mr-3 hover:cursor-pointer mt-3 md:mt-0"
          onClick={handleModeChange}
        >
          {mode === "dark" ? <FaSun /> : <MdNightlight />}
        </section>
        <button className="inline-flex items-center border-0 py-1 px-3 text-white bg-indigo-500 focus:outline-none hover:bg-indigo-400 rounded text-base mt-4 md:mt-0">
          <Link to="logout">Logout</Link>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
