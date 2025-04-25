import { useState, useEffect, useRef } from "react";
import { addPostData, editPost } from "../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const CreatePost = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [postContent, setPostContent] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
    }
  };

  useEffect(() => {
    if (location.state) {
      setPostContent(location.state.content);
      setTitleInput(location.state.title);
      setMediaFile(null);
    }
  }, [location.state]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", titleInput);
    formData.append("content", postContent);
    if (mediaFile) formData.append("media", mediaFile);

    if (location.state) {
      dispatch(editPost({ postId: location.state._id, postData: formData }));
      setSuccessMessage("Post data updated successfully.");
    } else {
      dispatch(addPostData(formData));
      setSuccessMessage("Post data saved successfully.");
    }

    setPostContent("");
    setTitleInput("");
    setMediaFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <h2 className="text-center mb-3 text-secondary">
        {location.state ? "Edit Post" : "Create New Post"}
      </h2>
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
            name="media"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <button type="submit" className="btn btn-success">
            {location.state ? "Update" : "Post"}
          </button>

          {successMessage && (
            <div className="alert alert-success mt-3">{successMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
