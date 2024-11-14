import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks, fetchUsers, updateUser } from "./userSlice";
import { fetchPosts } from "../post/postSlice";

const MyProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
    dispatch(fetchBookmarks({ userId: "66f64f5fd890c4a6b89aacf7" }));
  }, []);

  const users = useSelector((state) => state.users);
  const { posts } = useSelector((state) => state.posts);

  const totalPosts =
    posts.filter((post) => post.author._id === "66f64f5fd890c4a6b89aacf7")
      .length || 0;

  const user = users?.users?.find(
    (usr) => usr._id === "66f64f5fd890c4a6b89aacf7"
  );

  const [bio, setBio] = useState(user?.bio);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar);

  const avatarOptions = [
    "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833554.jpg?size=626&ext=jpg&ga=GA1.1.1278706250.1727432548&semt=ais_hybrid",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.1278706250.1727432548&semt=ais_hybrid",
    "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg&ga=GA1.1.1278706250.1727432548&semt=ais_hybrid",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?size=626&ext=jpg&ga=GA1.1.1278706250.1727432548&semt=ais_hybrid",
    "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611716.jpg?size=626&ext=jpg&ga=GA1.1.1278706250.1727432548&semt=ais_hybrid",
    "https://img.freepik.com/free-psd/3d-illustration-with-online-avatar_23-2151303097.jpg?size=626&ext=jpg&ga=GA1.1.1278706250.1727432548&semt=ais_hybrid",
  ];

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleSave = () => {
    setBio(bio);
    setIsEditing(false);

    dispatch(
      updateUser({
        userId: user._id,
        userData: { avatar: selectedAvatar, bio },
      })
    );
  };

  return (
    <div>
      {users.status === "loading" && <p>Loading...</p>}
      {user && (
        <div className="profile-container text-center">
          <h2>User Profile</h2>
          <div>
            <img
              src={user.avatar}
              alt="Profile Avatar"
              className="profile-avatar img-fluid rounded-circle w-50"
            />

            <p className="fs-4">
              <strong>{user.username}</strong>
            </p>
            <button
              className="btn border-dark"
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit Profile
            </button>
          </div>
          {isEditing && (
            <div className="p-3 my-3">
              <h3>Choose an Avatar</h3>
              <div className="avatar-options">
                {avatarOptions.map((avatarOption, index) => (
                  <img
                    key={`${avatarOption}${index}`}
                    src={avatarOption}
                    alt="Avatar Option"
                    className="img-fluid rounded-circle w-25"
                    onClick={() => handleAvatarSelect(avatarOption)}
                  />
                ))}
              </div>
              <h3 className="mt-4">Edit Bio</h3>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Add your bio..."
                className="form-control my-2"
              ></textarea>
              <button className="btn border-dark me-3" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn border-dark"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          )}
          <div className="py-3">
            <h4>Bio</h4>
            <p>{user.bio}</p>
          </div>
          <div className="py-1 m-3 bg-white">
            <div className="row">
              <div className="col">
                <p>{user?.following.length}</p>
                <p>Following</p>
              </div>

              <div className="col">
                <p>{totalPosts}</p>
                <p>Posts</p>
              </div>
              <div className="col">
                <p>{users.bookmarks.length}</p>
                <p>Bookmarks</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
