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
  signin:{
    loading: boolean;
  error: string | null;
  success: boolean;
  message: string;
  user: User | null;
  },
  signup:{
    loading: boolean;
  error: string | null;
  success: boolean;
  message: string;
  user: User | null;
  }
}

const initialState: AuthState = {
 signup:{
  loading: false,
  error: null,
  success: false,
  message: "",
  user: null,
 },
 signin:{
  loading: false,
  error: null,
  success: false,
  message: "",
  user: null,
 }
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
        return rejectWithValue(data.error || "Failed to sign up user");
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
        return rejectWithValue (data.error || "Failed to sign in user");
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
      state.signin.loading = false;
      state.signin.error = null;
      state.signin.success = false;
      state.signin.message = "";
      state.signin.user = null;
    },
  },
  extraReducers: (builder) => {
    // Signup cases
    builder
      .addCase(signupUser.pending, (state) => {
        state.signup.loading = true;
        state.signup.error = null;
        state.signup.success = false;
        state.signup.message = "";
        state.signup.user = null;
      })
      .addCase(
        signupUser.fulfilled,
        (state, action: PayloadAction<{ message: string; user: User }>) => {
          state.signup.loading = false;
          state.signup.success = true;
          state.signup.error = null;
          state.signup.message = action.payload.message;
        }
      )
      .addCase(signupUser.rejected, (state, action) => {
        state.signup.loading = false;
        state.signup.success = false;
        state.signup.error = action.payload as string;
        state.signup.message = "";
        state.signup.user = null;
      });

    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.signin.loading = true;
        state.signin.error = null;
        state.signin.success = false;
        state.signin.message = "";
        state.signin.user = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ message: string; user: User }>) => {
          state.signin.loading = false;
          state.signin.success = true;
          state.signin.error = null;
          state.signin.message = action.payload.message;
          state.signin.user = action.payload.user;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.signin.loading = false;
        state.signin.success = false;
        state.signin.error = action.payload as string;
        state.signin.message = "";
        state.signin.user = null;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;