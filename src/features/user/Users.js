import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "./userSlice";

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const { users, status, error } = useSelector((state) => state.users);
  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error: {error}</p>}
      <div className="bg-white p-3 ms-2">
        <h4>who to follow ?</h4>
        <hr />
        <ul className="list-group">
          {users &&
            users.map((user) => (
              <li key={user._id} className="list-group-item py-2">
                <Link
                  to={
                    user._id === "66f64f5fd890c4a6b89aacf7"
                      ? "/myProfile"
                      : `/profile/${user._id}`
                  }
                  className=" link-secondary link-offset-2 link-underline link-underline-opacity-0"
                >
                  <div className="row">
                    <div className="col-3 col-md-3">
                      <img
                        src={user.avatar || "default-avatar.png"}
                        alt={`${user.username}'s avatar`}
                        className="img-fluid float-start rounded-circle w-50  "
                      />
                    </div>
                    <div className="col-9 col-md-9">
                      <p>{user.username}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
