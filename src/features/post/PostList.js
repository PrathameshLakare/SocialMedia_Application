import { useSelector, useDispatch } from "react-redux";
import { deletePost, likePost, dislikePost, setSortBy } from "./postSlice";
import {
  BsListUl,
  BsSuitHeart,
  BsBookmarkFill,
  BsBookmark,
  BsSuitHeartFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { addBookmarks, removeBookmarks } from "../user/userSlice";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, sortBy } = useSelector((state) => state.posts);
  const { bookmarks } = useSelector((state) => state.users);

  const filteredPosts = posts.filter(
    (post) => post.author._id === "66f64f5fd890c4a6b89aacf7"
  );

  const sortedPost = filteredPosts?.sort((a, b) => {
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
          const formattedDate = new Date(post.createdAt).toLocaleDateString();

          return (
            <div key={post._id} className="card my-3">
              <div className="card-header bg-white">
                {post.author ? (
                  <div>
                    <div className="row">
                      <div className="col-3 col-md-2">
                        <Link
                          to={
                            post.author._id === "66f64f5fd890c4a6b89aacf7"
                              ? "/myProfile"
                              : `/profile/${post.author._id}`
                          }
                        >
                          <img
                            src={post.author.avatar || "default-avatar.png"}
                            alt={`${post.author.username}'s avatar`}
                            className="img-fluid float-start rounded-circle w-50  "
                          />
                        </Link>
                      </div>

                      <div className="col-3 col-md-3">
                        <Link
                          to={
                            post.author._id === "66f64f5fd890c4a6b89aacf7"
                              ? "/myProfile"
                              : `/profile/${post.author._id}`
                          }
                        >
                          <span className="float-start text-secondary ">
                            {post.author.username}{" "}
                          </span>
                        </Link>
                      </div>
                      <div className="col-3 col-md-4 text-secondary">
                        <span className="ms-2 ps-2 float-start">
                          {formattedDate}
                        </span>
                      </div>

                      <div className="col-3 col-md-3 text-end">
                        {post.author._id === "66f64f5fd890c4a6b89aacf7" && (
                          <div className="dropdown">
                            <button
                              className="btn dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <BsListUl className="mb-3 " />
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
                                  onClick={() => dispatch(deletePost(post._id))}
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <span>Unknown User</span>
                )}
              </div>
              <div className="card-body ">
                <p>
                  <strong>{post.title}</strong>
                </p>
                <p>{post.content}</p>
                {post.media && (
                  <img src={post.media} className="img img-fluid rounded" />
                )}
              </div>
              <div className="card-footer ">
                <div className="row">
                  <div className="col-4">
                    {post.likes.includes("66f64f5fd890c4a6b89aacf7") ? (
                      <BsSuitHeartFill
                        onClick={() =>
                          dispatch(
                            dislikePost({
                              postId: post._id,
                              userId: "66f64f5fd890c4a6b89aacf7",
                            })
                          )
                        }
                      />
                    ) : (
                      <BsSuitHeart
                        onClick={() =>
                          dispatch(
                            likePost({
                              postId: post._id,
                              userId: "66f64f5fd890c4a6b89aacf7",
                            })
                          )
                        }
                      />
                    )}
                  </div>
                  <div className="col-4 text-center"></div>
                  <div className="col-4">
                    {bookmarks.includes(post._id) ? (
                      <BsBookmarkFill
                        className="float-end"
                        onClick={() =>
                          dispatch(
                            removeBookmarks({
                              userId: "66f64f5fd890c4a6b89aacf7",
                              postId: post._id,
                            })
                          )
                        }
                      />
                    ) : (
                      <BsBookmark
                        className="float-end"
                        onClick={() =>
                          dispatch(
                            addBookmarks({
                              userId: "66f64f5fd890c4a6b89aacf7",
                              postId: post._id,
                            })
                          )
                        }
                      />
                    )}
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
