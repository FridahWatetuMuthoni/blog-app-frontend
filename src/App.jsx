import { Route, BrowserRouter, Routes } from "react-router-dom";
import useGlobalContext from "./hooks/useGlobalContext";
import { Navbar } from "./components/Utils";
import { Home, Profile, UpdateProfile } from "./components/main";
import BlogDetail from "./components/Blog/BlogDetail";
import About from "./components/main/About";
import Contact from "./components/main/Contact";
import BlogDelete from "./components/Blog/BlogDelete";
import BlogUpdate from "./components/Blog/BlogUpdate";
import BlogCreate from "./components/Blog/BlogCreate";
import {
  Login,
  Logout,
  Register,
  RequireAuth,
} from "./components/Authentication";

function App() {
  const { mode, access_token: token } = useGlobalContext();

  return (
    <main
      className={`font-poppins bg-bkg text-content min-h-screen`}
      data-theme={mode}
    >
      <section className="container mx-auto">
        <BrowserRouter>
          {token && <Navbar />}
          <Routes>
            {/* public routes */}
            <Route exact path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* private routes */}
            <Route element={<RequireAuth />}>
              <Route exact path="/" element={<Home />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route path="/update/:id" element={<UpdateProfile />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/blog-update/:id" element={<BlogUpdate />} />
              <Route path="/blog-delete/:id" element={<BlogDelete />} />
              <Route path="/blog-create" element={<BlogCreate />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </section>
    </main>
  );
}

export default App;
