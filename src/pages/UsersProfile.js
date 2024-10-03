import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchUsers,
  followUser,
  unfollowUser,
} from "../features/user/userSlice";
import { useEffect } from "react";

const UsersProfile = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const userId = useParams().userId;

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const user = users?.users.find((usr) => usr._id === userId);
  const loginUser = users?.users.find(
    (usr) => usr._id === "66f64f5fd890c4a6b89aacf7"
  );

  const handlerForFollowBtn = (followId) => {
    const isFollow = loginUser.following.includes(followId);
    if (isFollow) {
      dispatch(
        unfollowUser({
          userId: "66f64f5fd890c4a6b89aacf7",
          followUserId: userId,
        })
      );
    } else {
      dispatch(
        followUser({ userId: "66f64f5fd890c4a6b89aacf7", followUserId: userId })
      );
    }
  };

  return (
    <div>
      {users && (
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
          </div>

          <div className="py-3">
            <h4>Bio</h4>
            <p>{user.bio}</p>
          </div>
          <button
            className="btn border-dark"
            onClick={() => handlerForFollowBtn(user._id)}
          >
            {loginUser.following.includes(user._id) ? "Following" : "Follow"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersProfile;
