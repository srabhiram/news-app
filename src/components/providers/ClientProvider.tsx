"use client";
import { registerServiceWorker } from "@/lib/registerServiceWorker";
import store from "@/redux/store";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import NotificationBanner from "../web-push-notification";
import GoogleAnalytics from "./GoogleAnalytics";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    registerServiceWorker();
  }, []);
  return (
    <Provider store={store}>
      <ErrorBoundary>{children}
        <GoogleAnalytics/>
        <NotificationBanner/>
      </ErrorBoundary>
    </Provider>
  );
}
