import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchUsers,
  followUser,
  unfollowUser,
} from "../features/user/userSlice";
import { useEffect, useState } from "react";

const UsersProfile = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const user = users?.users?.find((usr) => usr._id === userId);
  const loginUser = users?.users?.find(
    (usr) => usr._id === "66f64f5fd890c4a6b89aacf7"
  );

  useEffect(() => {
    if (loginUser && userId) {
      setFollow(loginUser.following.includes(userId));
    }
  }, []);

  const [follow, setFollow] = useState(false);

  const handlerForFollowBtn = (followId) => {
    const isFollow = loginUser.following.includes(followId);
    if (isFollow) {
      dispatch(
        unfollowUser({
          userId: loginUser._id,
          followUserId: followId,
        })
      );
      setFollow(false);
    } else {
      dispatch(
        followUser({
          userId: loginUser._id,
          followUserId: followId,
        })
      );
      setFollow(true);
    }
  };

  return (
    <div>
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
          </div>

          <div className="py-3">
            <h4>Bio</h4>
            <p>{user.bio}</p>
          </div>

          <button
            className="btn border-dark"
            onClick={() => handlerForFollowBtn(user._id)}
          >
            {follow ? "Following" : "Follow"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersProfile;
