import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("post/users", async () => {
  const response = await axios.get(
    "https://social-media-backend-rose.vercel.app/api/user"
  );
  return response.data;
});

export const updateUser = createAsyncThunk(
  "post/update/user",
  async ({ userId, userData }) => {
    const response = await axios.post(
      `https://social-media-backend-rose.vercel.app/api/user/update/${userId}`,
      userData
    );
    return response.data;
  }
);

export const followUser = createAsyncThunk(
  "post/user/follow",
  async ({ userId, followUserId }) => {
    const response = await axios.post(
      `https://social-media-backend-rose.vercel.app/api/users/follow/${followUserId}`,
      { userId }
    );
    return response.data;
  }
);

export const unfollowUser = createAsyncThunk(
  "post/user/unfollow",
  async ({ userId, followUserId }) => {
    const response = await axios.post(
      `https://social-media-backend-rose.vercel.app/api/users/unfollow/${followUserId}`,
      { userId }
    );
    return response.data;
  }
);

export const fetchBookmarks = createAsyncThunk(
  "post/user/fetchBookmarks",
  async ({ userId }) => {
    const response = await axios.get(
      `https://social-media-backend-rose.vercel.app/api/users/bookmark/${userId}`
    );
    return response.data;
  }
);

export const addBookmarks = createAsyncThunk(
  "post/user/addBookmark",
  async ({ userId, postId }) => {
    const response = await axios.post(
      `https://social-media-backend-rose.vercel.app/api/users/add-bookmark/${postId}`,
      { userId }
    );
    return response.data;
  }
);

export const removeBookmarks = createAsyncThunk(
  "post/user/removeBookmark",
  async ({ userId, postId }) => {
    const response = await axios.post(
      `https://social-media-backend-rose.vercel.app/api/users/remove-bookmark/${postId}`,
      { userId }
    );
    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
    bookmarks: [],
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      if (index !== -1) state.users[index] = action.payload;
    });

    builder.addCase(followUser.fulfilled, (state, action) => {
      const updatedUser = action.payload.user;
      const loggedInUserIndex = state.users.findIndex(
        (user) => user._id === updatedUser._id
      );
      if (loggedInUserIndex !== -1) {
        state.users[loggedInUserIndex] = updatedUser;
      }
    });

    builder.addCase(unfollowUser.fulfilled, (state, action) => {
      const updatedUser = action.payload.user;
      const loggedInUserIndex = state.users.findIndex(
        (user) => user._id === updatedUser._id
      );
      if (loggedInUserIndex !== -1) {
        state.users[loggedInUserIndex] = updatedUser;
      }
    });

    builder.addCase(fetchBookmarks.fulfilled, (state, action) => {
      state.bookmarks = action.payload;
    });
    builder.addCase(addBookmarks.fulfilled, (state, action) => {
      state.bookmarks = action.payload;
    });
    builder.addCase(removeBookmarks.fulfilled, (state, action) => {
      state.bookmarks = action.payload;
    });
  },
});

export default userSlice.reducer;
