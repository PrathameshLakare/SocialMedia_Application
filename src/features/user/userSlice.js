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

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
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
      const { userId, followUserId } = action.payload;
      const loggedInUser = state.users.find((user) => user._id === userId);
      if (loggedInUser && !loggedInUser.following.includes(followUserId)) {
        loggedInUser.following.push(followUserId);
      }
    });

    builder.addCase(unfollowUser.fulfilled, (state, action) => {
      const { userId, followUserId } = action.payload;
      const loggedInUser = state.users.find((user) => user._id === userId);
      if (loggedInUser) {
        loggedInUser.following = loggedInUser.following.filter(
          (id) => id !== followUserId
        );
      }
    });
  },
});

export default userSlice.reducer;
