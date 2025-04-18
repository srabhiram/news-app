// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/users/authSlice";
import newsReducer from "./features/news/news-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    news: newsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
