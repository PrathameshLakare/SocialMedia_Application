import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const response = await axios.get(
    "https://social-media-backend-rose.vercel.app/api/post"
  );
  return response.data;
});

export const addPostData = createAsyncThunk(
  "post/postPost",
  async (postData) => {
    const response = await axios.post(
      "https://social-media-backend-rose.vercel.app/api/user/post",
      postData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

export const likePost = createAsyncThunk(
  "post/likes",
  async ({ postId, userId }) => {
    const response = await axios.post(
      `https://social-media-backend-rose.vercel.app/api/posts/like/${postId}`,
      { userId: userId }
    );
    return response.data;
  }
);

export const dislikePost = createAsyncThunk(
  "post/dislike",
  async ({ postId, userId }) => {
    const response = await axios.post(
      `https://social-media-backend-rose.vercel.app/api/posts/dislike/${postId}`,
      { userId: userId }
    );
    return response.data;
  }
);

export const editPost = createAsyncThunk(
  "post/editPost",
  async ({ postId, postData }) => {
    const response = await axios.post(
      `https://social-media-backend-rose.vercel.app/api/posts/edit/${postId}`,
      postData
    );
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId) => {
    const response = await axios.delete(
      `https://social-media-backend-rose.vercel.app/api/user/posts/${postId}`
    );
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
      alert("Post saved successfully.");
    });

    builder.addCase(editPost.fulfilled, (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      state.posts[index] = action.payload;
      alert("Post updated successfully.");
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
