// Service Worker: sw.js
const OFFLINE_PAGE = "/offline";

// Install event: Do nothing, as no caching is required
self.addEventListener("install", (event) => {
  self.skipWaiting(); // Activate the new service worker immediately
});

// Activate event: Clean up any old caches (none in this case)
self.addEventListener("activate", (event) => {
  self.clients.claim(); // Take control of clients immediately
});

// Fetch event: Serve offline page for navigation requests when offline
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(
          `
            <!DOCTYPE html>
            <html lang="te">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>ఆఫ్‌లైన్ - SRS News</title>
                <style>
                  body {
                    font-family: system-ui, sans-serif;
                    text-align: center;
                    padding: 2rem;
                    background-color: #f0f0f0;
                    color: #333;
                  }
                  h1 {
                    font-size: 2rem;
                    margin-bottom: 1rem;
                  }
                  p {
                    font-size: 1rem;
                  }
                </style>
              </head>
              <body>
                <h1>ఆఫ్‌లైన్</h1>
                <p>మీరు ప్రస్తుతం ఆఫ్‌లైన్‌లో ఉన్నారు. దయచేసి మీ ఇంటర్నెట్ కనెక్షన్‌ని తనిఖీ చేయండి.</p>
              </body>
            </html>
          `,
          {
            headers: { "Content-Type": "text/html" },
          }
        );
      })
    );
  }
});

// Push event: Handle incoming push notifications
self.addEventListener("push", (event) => {
  console.log("Push event received:", event);
  let data;
  try {
    data = event.data.json();
  } catch (error) {
    console.error("Invalid push data:", error);
    return;
  }
  const { title, body, icon, url } = data;

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: icon || "/icon-192x192.png",
      data: { url },
      lang: "te", // Set language for Telugu notifications
    }).catch((error) => {
      console.error("Notification display failed:", error);
    })
  );
});

// Notification click event: Navigate to the specified URL
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      const url = event.notification.data.url || "/";
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});