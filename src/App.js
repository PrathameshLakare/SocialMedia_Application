import "./styles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logout, logoutUser } from "./features/auth/authSlice";
import ProtectedRoute from "./pages/ProtectedRoute";

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/register";

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(logout());
  };

  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg bg-white">
          <div className="container ">
            <a className="navbar-brand text-danger fw-bold fs-2" href="/home">
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
                      to="/home"
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
                    <Link
                      className="link-dark link-underline link-underline-opacity-0"
                      to="/createPost"
                    >
                      Create New Post
                    </Link>
                  </li>
                  <li className="nav-item mb-3">
                    <button
                      className="btn btn-outline-danger w-50"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
            <div className={isAuthPage ? "col-md-12 py-3" : "col-md-5 py-3"}>
              <Routes>
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <PostView />
                    </ProtectedRoute>
                  }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route
                  path="/explore"
                  element={
                    <ProtectedRoute>
                      <ExplorePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/myProfile"
                  element={
                    <ProtectedRoute>
                      <MyProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile/:userId"
                  element={
                    <ProtectedRoute>
                      <UsersProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/createPost"
                  element={
                    <ProtectedRoute>
                      <CreatePost />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/bookmark"
                  element={
                    <ProtectedRoute>
                      <Bookmark />
                    </ProtectedRoute>
                  }
                />
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
