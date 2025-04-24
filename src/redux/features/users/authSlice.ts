/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

// Define the User interface for type safety
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string; // Password should be handled securely in production
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

// Define the auth state interface
export interface AuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string;
  user: User | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  message: "",
  user: null,
};

// Async thunk for signup
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to sign up user");
      }

      return data; // Expecting { message: string, user: User }
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to sign in user");
      }

      return data; // Expecting { message: string, user: User }
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Combined auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Signup cases
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = "";
        state.user = null;
      })
      .addCase(
        signupUser.fulfilled,
        (state, action: PayloadAction<{ message: string; user: User }>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.message = action.payload.message;
        }
      )
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
        state.message = "";
        state.user = null;
      });

    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = "";
        state.user = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ message: string; user: User }>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.message = action.payload.message;
          state.user = action.payload.user;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
        state.message = "";
        state.user = null;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;