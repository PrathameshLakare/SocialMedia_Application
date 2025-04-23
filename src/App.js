import "./styles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import PostView from "./features/post/PostView";
import CreatePost from "./pages/CreatePost";
import MyProfile from "./features/user/MyProfile";
import UsersProfile from "./pages/UsersProfile";
import Users from "./features/user/Users";
import ExplorePage from "./pages/ExplorePage";
import Bookmark from "./pages/Bookmark";
import Register from "./pages/Register";
import Login from "./pages/Login";

function Layout() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg bg-white">
          <div className="container ">
            <a className="navbar-brand text-danger fw-bold fs-2" href="/">
              So<span className="text-primary">Media</span>
            </a>
          </div>
        </nav>
        <div className="container py-3">
          <div className="row">
            {!isAuthPage && (
              <div className="col-md-3">
                <ul className="nav flex-column">
                  <li className="nav-item mb-3">
                    <Link
                      to="/"
                      className="link-dark link-underline link-underline-opacity-0"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item mb-3">
                    <Link
                      to="/explore"
                      className="link-dark link-underline link-underline-opacity-0"
                    >
                      Explore
                    </Link>
                  </li>
                  <li className="nav-item mb-3">
                    <Link
                      to="/myProfile"
                      className="link-dark link-underline link-underline-opacity-0"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item mb-3">
                    <Link
                      to="/bookmark"
                      className="link-dark link-underline link-underline-opacity-0"
                    >
                      Bookmark
                    </Link>
                  </li>
                  <li className="nav-item mb-3">
                    <Link className="btn text-bg-danger" to={"/createPost"}>
                      Create New Post
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            <div className={isAuthPage ? "col-md-12 py-3" : "col-md-5 py-3"}>
              <Routes>
                <Route path="/" element={<PostView />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/myProfile" element={<MyProfile />} />
                <Route path="/profile/:userId" element={<UsersProfile />} />
                <Route path="/createPost" element={<CreatePost />} />
                <Route path="/bookmark" element={<Bookmark />} />
              </Routes>
            </div>
            {!isAuthPage && (
              <div className="col-md-3">
                <Users />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
