"use client";
import React, { useEffect, useState } from "react";

export default function NotificationBanner() {
  const [isAllowed, setIsAllowed] = useState(false);
  const [isHide, setIsHide] = useState(true); // Start hidden until we know user's preference

  useEffect(() => {
    const storedPermission = localStorage.getItem("notificationPermission");
    if (storedPermission === "granted" || storedPermission === "denied") {
      setIsHide(true); // Don't show banner
    } else {
      setIsHide(false); // Show banner
    }
  }, []);

  if (isHide) return null;

  return (
    <div className="text-zinc-900 sticky bottom-0 gap-3 sm:gap-7 z-50 flex flex-wrap justify-center items-center bg-blue-100/90 backdrop-blur-sm p-4 sm:p-6 mx-auto animate-fade-in">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(20px);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        .animate-fade-out {
          animation: fadeOut 0.5s ease-in-out forwards;
        }
      `}</style>
      <p className="text-base sm:text-2xl ml-5 font-semibold">
        Please Allow Notification for latest updates
      </p>
      <button
        className="px-3 py-2 bg-transparent border border-zinc-500 rounded-md font-medium hover:bg-gray-700 transition-colors"
        onClick={() => {
          setIsHide(true);
          localStorage.setItem("notificationPermission", "denied");
        }}
      >
        Cancel
      </button>
      <button
        className="px-5 py-2 bg-blue-400 border border-zinc-300 rounded-md font-medium hover:bg-blue-700 transition-colors text-white"
        onClick={async () => {
          const permission = await Notification.requestPermission();
          setIsAllowed(permission === "granted");
          localStorage.setItem("notificationPermission", permission);
          setIsHide(true);
        }}
      >
        Allow
      </button>
    </div>
  );
}
