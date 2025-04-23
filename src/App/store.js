import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../features/post/postSlice";
import userSlice from "../features/user/userSlice";
import authSlice from "../features/auth/authSlice";

export default configureStore({
  reducer: {
    posts: postSlice,
    users: userSlice,
    auth: authSlice,
  },
});
