/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface NewsArticle {
  id: string;
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
export interface NewsData{
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
      console.log("Fetched news articles:", data);
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch news articles");
      }
      return data // Expecting { message: string, newsArticles: NewsArticle[] }
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
  async (newsData: NewsArticle, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/news/update/${newsData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update news article");
      }
      return data; // Expecting { message: string, newsArticle: NewsArticle }
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
        state.newsArticles.push(action.payload.newsArticle);
      })
      .addCase(addNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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
          (article) => article.id !== action.payload.newsId
        );
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { clearNewsState } = newsSlice.actions;
export default newsSlice.reducer;