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
  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);
  const user = users?.users?.find((usr) => usr._id === userId);

  // Hardcoded loginUser ID
  const loginUserId = "66f64f5fd890c4a6b89aacf7";
  const loginUser = users?.users?.find((usr) => usr._id === loginUserId);

  const handlerForFollowBtn = (followId) => {
    const isFollow = loginUser.following.includes(followId);

    if (isFollow) {
      dispatch(
        unfollowUser({
          userId: loginUser._id,
          followUserId: followId,
        })
      );
    } else {
      dispatch(
        followUser({
          userId: loginUser._id,
          followUserId: followId,
        })
      );
    }
  };

  const isFollowing = loginUser?.following.includes(userId);

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
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersProfile;
