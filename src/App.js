import "./styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PostView from "./features/post/PostView";
import CreatePost from "./pages/CreatePost";
import MyProfile from "./features/user/MyProfile";
import UsersProfile from "./pages/UsersProfile";
import Users from "./features/user/Users";

export default function App() {
  return (
    <div>
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg bg-white">
            <div className="container ">
              <h3 className="navbar-brand text-danger fs-3" href="#">
                So<span className="text-primary">Media</span>
              </h3>
            </div>
          </nav>
          <div className="container py-3">
            <div className="row">
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
                      to="/"
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
                    <Link className="btn text-bg-danger" to={"/createPost"}>
                      Create New Post
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-5 py-3">
                <Routes>
                  <Route path="/" element={<PostView />} />
                  <Route path="/createPost" element={<CreatePost />} />
                  <Route path="/myProfile" element={<MyProfile />} />
                  <Route path="/profile/:userId" element={<UsersProfile />} />
                </Routes>
              </div>
              <div className="col-md-3">
                <Users />
              </div>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}
