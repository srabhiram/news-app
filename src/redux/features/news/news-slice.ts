/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface NewsArticle {
  _id: string;
  newsTitle: string;
  content: string;
  image: string;
  district: string;
  category:string;
  author: string;
  comments: string[];
  likes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface NewsState {
  generalNews: {
    loading: boolean;
    error: string | null;
    success: boolean;
    message: string;
    newsArticles: NewsArticle[];
  };
  districtNews: {
    loading: boolean;
    error: string | null;
    success: boolean;
    message: string;
    newsArticles: NewsArticle[];
  };
  singleNews:{
    loading: boolean;
    error: string | null;
    success: boolean;
    message: string;
    newsArticles: NewsArticle[];
  }
}

const initialState: NewsState = {
  generalNews: {
    loading: false,
    error: null,
    success: false,
    message: "",
    newsArticles: [],
  },
  districtNews: {
    loading: false,
    error: null,
    success: false,
    message: "",
    newsArticles: [],
  },
  singleNews:{
    loading: false,
    error: null,
    success: false,
    message: "",
    newsArticles: [],
  }
};
// Define the news slice
export const addNews = createAsyncThunk(
  "news/addNews",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/news/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(`Failed to add news. Server responded with an error.: ${response.data}`);
      }
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
        return rejectWithValue(data.error || "Something went wrong");
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
        return rejectWithValue(data.error || "Something went wrong");
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

export const getNewsByDistrict = createAsyncThunk(
  "news/getNewsByDistrict",
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
export const getNewsById = createAsyncThunk(
  "news/getNewsById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/news/${id}`, {
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
      state.generalNews.loading = false;
      state.generalNews.error = null;
      state.generalNews.success = false;
      state.generalNews.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNews.pending, (state) => {
        state.generalNews.loading = true;
      })
      .addCase(addNews.fulfilled, (state, action) => {
        state.generalNews.loading = false;
        state.generalNews.success = true;
        state.generalNews.message = action.payload.message;
        // state.newsArticles.push(action.payload.newsArticle);
      })
      .addCase(addNews.rejected, (state, action) => {
        state.generalNews.loading = false;
        state.generalNews.error = action.payload as string;
        state.generalNews.success = false;
        state.generalNews.message = "";
      })
      .addCase(getNews.pending, (state) => {
        state.generalNews.loading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.generalNews.loading = false;
        state.generalNews.success = true;
        state.generalNews.newsArticles = action.payload.newsArticles;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.generalNews.loading = false;
        state.generalNews.error = action.payload as string;
        state.generalNews.success = false;
        state.generalNews.message = "";
        state.generalNews.newsArticles = [];
      })  
      .addCase(getNewsByDistrict.pending, (state) => {
        state.districtNews.loading = true;
      })
      .addCase(getNewsByDistrict.fulfilled, (state, action) => {
        state.districtNews.loading = false;
        state.districtNews.success = true;
        state.districtNews.newsArticles = action.payload.newsArticles;
      })
      .addCase(getNewsByDistrict.rejected, (state, action) => {
        state.districtNews.loading = false;
        state.districtNews.error = action.payload as string;
        state.districtNews.success = false;
        state.districtNews.message = "";
        state.districtNews.newsArticles = [];
      })
      .addCase(getNewsById.pending, (state) => {
        state.singleNews.loading = true;
      })
      .addCase(getNewsById.fulfilled, (state, action) => {
        state.singleNews.loading = false;
        state.singleNews.success = true;
        state.singleNews.newsArticles = action.payload.newsArticles;
      })
      .addCase(getNewsById.rejected, (state, action) => {
        state.singleNews.loading = false;
        state.singleNews.error = action.payload as string;
        state.singleNews.success = false;
        state.singleNews.message = "";
        state.singleNews.newsArticles = [];
      })
      .addCase(updateNews.pending, (state) => {
        state.generalNews.loading = true;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.generalNews.loading = false;
        state.generalNews.success = true;
        state.generalNews.message = action.payload.message;
        // Update the news article in the list
        // state.newsArticles = action.payload.newsArticles;
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.generalNews.loading = false;
        state.generalNews.error = action.payload as string;
        state.generalNews.success = false;
        state.generalNews.message = "";
      })
      .addCase(deleteNews.pending, (state) => {
        state.generalNews.loading = true;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.generalNews.loading = false;
        state.generalNews.success = true;
        state.generalNews.message = action.payload.message;
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.generalNews.loading = false;
        state.generalNews.error = action.payload as string;
        state.generalNews.success = false;
        state.generalNews.message = "";
      });
  },
});
export const { clearNewsState } = newsSlice.actions;
export default newsSlice.reducer;
