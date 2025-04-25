import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_SERVER_BASE_URL;

export const fetchUsers = createAsyncThunk("post/users", async () => {
  const response = await axios.get(`${url}/api/user`);
  return response.data;
});

export const updateUser = createAsyncThunk(
  "post/update/user",
  async ({ userData }) => {
    const response = await axios.post(`${url}/api/user/update`, userData, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const followUser = createAsyncThunk(
  "post/user/follow",
  async ({ followUserId }) => {
    const response = await axios.post(
      `${url}/api/users/follow/${followUserId}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const unfollowUser = createAsyncThunk(
  "post/user/unfollow",
  async ({ followUserId }) => {
    const response = await axios.post(
      `${url}/api/users/unfollow/${followUserId}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const fetchBookmarks = createAsyncThunk(
  "post/user/fetchBookmarks",
  async () => {
    const response = await axios.get(`${url}/api/users/bookmark`, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const addBookmarks = createAsyncThunk(
  "post/user/addBookmark",
  async ({ postId }) => {
    const response = await axios.post(
      `${url}/api/users/add-bookmark/${postId}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const removeBookmarks = createAsyncThunk(
  "post/user/removeBookmark",
  async ({ postId }) => {
    const response = await axios.post(
      `${url}/api/users/remove-bookmark/${postId}`,
      {},
      {
        withCredentials: true,
      }
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
      console.log(action.payload);
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      console.log(index);
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
