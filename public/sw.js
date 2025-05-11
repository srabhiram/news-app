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
  // Only handle navigation requests (page loads)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        // When offline, return the offline page
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