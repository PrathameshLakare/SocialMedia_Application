import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../features/post/postSlice";
import userSlice from "../features/user/userSlice";

export default configureStore({
  reducer: {
    posts: postSlice,
    users: userSlice,
  },
});
