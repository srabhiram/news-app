/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface NewsArticle {
  _id: string;
  newsTitle: string;
  content: string;
  image: string;
  district: string;
  author: string;
  comments: string[];
  likes: number;
  createdAt: string;
  updatedAt: string;
}
export interface NewsData {
  newsTitle: string;
  content: string;
  image: File | null;
  district: string;
  author: string;
}
export interface NewsState {
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string;
  newsArticles: NewsArticle[];
}

const initialState: NewsState = {
  loading: false,
  error: null,
  success: false,
  message: "",
  newsArticles: [],
};
// Define the news slice
export const addNews = createAsyncThunk(
  "news/addNews",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/news/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data; // Expecting { message: string, newsArticle: NewsArticle }
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
export const getNews = createAsyncThunk(
  "news/getNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/news/getNews", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch news articles");
      }
      return data; // Expecting { message: string, newsArticles: NewsArticle[] }
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
export const deleteNews = createAsyncThunk(
  "news/deleteNews",
  async (newsId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/news/delete/${newsId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete news article");
      }
      return data; // Expecting { message: string, newsId: string }
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
export const updateNews = createAsyncThunk(
  "news/updateNews",
  async (formData: FormData, { rejectWithValue }) => {
    const newsId = formData.get("id") as string;
    try {
      const response = await axios.put(`/api/news/update/${newsId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data; // Expecting { message: string, newsArticle: NewsArticle }
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const getNewsByParam = createAsyncThunk(
  "news/getNewsByParam",
  async (districtName: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/news/${districtName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data; // Expecting { message: string, newsArticles: NewsArticle[] }
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNewsState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNews.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        // state.newsArticles.push(action.payload.newsArticle);
      })
      .addCase(addNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
        state.message = "";
        state.newsArticles = [];
      })
      .addCase(getNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.newsArticles = action.payload.newsArticles;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
        state.message = "";
        state.newsArticles = [];
      })
      .addCase(getNewsByParam.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewsByParam.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.newsArticles = action.payload.newsArticles;
      })
      .addCase(getNewsByParam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
        state.message = "";
        state.newsArticles = [];
      })
      .addCase(updateNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        // Update the news article in the list
        // state.newsArticles = action.payload.newsArticles;
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
        state.message = "";
        state.newsArticles = [];
      })
      .addCase(deleteNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        // Remove the deleted news article from the list
        state.newsArticles = state.newsArticles.filter(
          (article) => article._id !== action.payload.newsId
        );
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
        state.message = "";
        state.newsArticles = [];
      });
  },
});
export const { clearNewsState } = newsSlice.actions;
export default newsSlice.reducer;
