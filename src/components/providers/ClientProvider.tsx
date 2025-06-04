"use client";
import { registerServiceWorker } from "@/lib/registerServiceWorker";
import store from "@/redux/store";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import GoogleAnalytics from "./GoogleAnalytics";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import NotificationBanner from "../web-push-notification";

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
      <GoogleAnalytics />
      <ErrorBoundary>{children}
        <NotificationBanner/>
      </ErrorBoundary>
    </Provider>
  );
}
