import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./postSlice";
import PostList from "./PostList";
import { fetchUsers } from "../user/userSlice";

const PostView = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="container">
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error: {error}</p>}
      <PostList />
    </div>
  );
};

export default PostView;
