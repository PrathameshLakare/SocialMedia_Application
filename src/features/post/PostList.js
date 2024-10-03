import { useSelector, useDispatch } from "react-redux";
import { deletePost, increaseLikeCount, setSortBy } from "./postSlice";
import {
  BsListUl,
  BsSuitHeart,
  BsChatLeftDots,
  BsBookmarkFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import Users from "../user/Users";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, sortBy } = useSelector((state) => state.posts);
  const { users } = useSelector((state) => state.users);

  const sortedPost = [...posts]?.sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === "trending") {
      return b.likes - a.likes;
    }
    return 0;
  });

  const handleSortBy = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <div>
      <h2>Latest Posts</h2>
      <button
        className="btn btn-outline-dark me-3"
        onClick={handleSortBy}
        value={"trending"}
      >
        Trending
      </button>
      <button
        className="btn btn-outline-dark me-3"
        onClick={handleSortBy}
        value={"date"}
      >
        Date
      </button>
      {sortedPost &&
        sortedPost.map((post) => {
          const user = users?.find((user) => user._id === post.author);
          const formattedDate = new Date(post.createdAt).toLocaleDateString();

          return (
            <div key={post._id} className="card my-3">
              <div className="card-header bg-white">
                {user ? (
                  <div>
                    <Link
                      to={
                        user._id === "66f64f5fd890c4a6b89aacf7"
                          ? "/myProfile"
                          : `/profile/${user._id}`
                      }
                    >
                      <div className="row">
                        <div className="col-3 col-md-2">
                          <img
                            src={user.avatar || "default-avatar.png"}
                            alt={`${user.username}'s avatar`}
                            className="img-fluid float-start rounded-circle w-50  "
                          />
                        </div>

                        <div className="col-3 col-md-2">
                          <span className="float-start text-secondary me-2">
                            {" "}
                            {user.username}
                          </span>
                        </div>
                        <div className="col-2 col-md-5 text-secondary">
                          <span className="ms-2 ps-2 float-start">
                            {formattedDate}
                          </span>
                        </div>

                        <div className="col-4 col-md-3 text-end">
                          {user._id === "66f64f5fd890c4a6b89aacf7" && (
                            <div className="dropdown">
                              <button
                                className="btn dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <BsListUl />
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <li>
                                  <Link
                                    className="btn dropdown-item"
                                    to={"/createPost"}
                                    state={post}
                                  >
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() =>
                                      dispatch(deletePost(post._id))
                                    }
                                  >
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ) : (
                  <span>Unknown User</span>
                )}
              </div>
              <div className="card-body ">
                <p>{post.title}</p>
                <p>{post.content}</p>
              </div>
              <div className="card-footer ">
                <div className="row">
                  <div className="col-4">
                    <BsSuitHeart
                      onClick={() => dispatch(increaseLikeCount(post._id))}
                    />
                  </div>
                  <div className="col-4 text-center">
                    <BsChatLeftDots />
                  </div>
                  <div className="col-4">
                    <BsBookmarkFill className="float-end" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PostList;
