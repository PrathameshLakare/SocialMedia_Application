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
  const { user } = useSelector((state) => state.auth);
  const myUser = users?.users?.find((usr) => usr._id === userId);

  const loginUserId = user._id;
  const loginUser = users?.users?.find((usr) => usr._id === loginUserId);

  const handlerForFollowBtn = (followId) => {
    const isFollow = loginUser.following.includes(followId);

    if (isFollow) {
      dispatch(
        unfollowUser({
          followUserId: followId,
        })
      );
    } else {
      dispatch(
        followUser({
          followUserId: followId,
        })
      );
    }
  };

  const isFollowing = loginUser?.following?.includes(userId);

  return (
    <div>
      {myUser && (
        <div className="profile-container text-center">
          <h2>User Profile</h2>
          <div>
            <img
              src={myUser.avatar}
              alt="Profile Avatar"
              className="profile-avatar img-fluid rounded-circle w-50"
            />
            <p className="fs-4">
              <strong>{myUser.username}</strong>
            </p>
          </div>
          <div className="py-3">
            <h4>Bio</h4>
            <p>{myUser.bio}</p>
          </div>
          <button
            className="btn border-dark"
            onClick={() => handlerForFollowBtn(myUser._id)}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersProfile;
