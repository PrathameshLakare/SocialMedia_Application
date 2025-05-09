import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_SERVER_BASE_URL;

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const response = await axios.get(`${url}/api/post`);
  return response.data;
});

export const addPostData = createAsyncThunk(
  "post/postPost",
  async (postData) => {
    const response = await axios.post(`${url}/api/user/post`, postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.data;
  }
);

export const likePost = createAsyncThunk("post/likes", async ({ postId }) => {
  const response = await axios.post(
    `${url}/api/posts/like/${postId}`,
    {},
    { withCredentials: true }
  );
  return response.data;
});

export const dislikePost = createAsyncThunk(
  "post/dislike",
  async ({ postId }) => {
    const response = await axios.post(
      `${url}/api/posts/dislike/${postId}`,
      {},
      { withCredentials: true }
    );
    return response.data;
  }
);

export const editPost = createAsyncThunk(
  "post/editPost",
  async ({ postId, postData }) => {
    const response = await axios.post(
      `${url}/api/posts/edit/${postId}`,
      postData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId) => {
    const response = await axios.delete(`${url}/api/user/posts/${postId}`, {
      withCredentials: true,
    });
    return postId;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
    sortBy: "none",
  },

  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(addPostData.fulfilled, (state, action) => {
      state.status = "success";
      state.posts.push(action.payload.post);
    });

    builder.addCase(editPost.fulfilled, (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      state.posts[index] = action.payload;
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    });

    builder.addCase(likePost.fulfilled, (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    });

    builder.addCase(dislikePost.fulfilled, (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    });
  },
});

export const { setSortBy } = postSlice.actions;

export default postSlice.reducer;
