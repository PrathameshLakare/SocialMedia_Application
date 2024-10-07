import { useState, useEffect } from "react";
import { addPostData, editPost } from "../features/post/postSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const CreatePost = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [postContent, setPostContent] = useState("");
  const [titleInput, setTitleInput] = useState("");

  const handleFileChange = (e) => {};

  useEffect(() => {
    if (location.state) {
      setPostContent(location.state.content);
      setTitleInput(location.state.title);
    }
  }, [location.state]);
  const handlePostSubmit = (e) => {
    e.preventDefault();

    if (location.state) {
      dispatch(
        editPost({
          postId: location.state._id,
          postData: {
            title: titleInput,
            content: postContent,
          },
        })
      );

      setPostContent("");
      setTitleInput("");
      alert("Post updated successfully.");
    } else {
      dispatch(
        addPostData({
          title: titleInput,
          content: postContent,
          author: "66f64f5fd890c4a6b89aacf7",
        })
      );

      setPostContent("");
      setTitleInput("");
      alert("Post saved successfully.");
    }
  };

  return (
    <div>
      <h2 className="text-center mb-3 text-secondary">Create New Post</h2>
      <div className="card p-3">
        <form onSubmit={handlePostSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Title"
            value={titleInput}
            required
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <textarea
            className="form-control mb-3"
            rows="5"
            value={postContent}
            required
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Write something interesting..."
          ></textarea>
          <input
            type="file"
            className="form-control mb-3"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
          />
          <button type="submit" className="btn btn-success">
            {location.state ? "Update" : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
