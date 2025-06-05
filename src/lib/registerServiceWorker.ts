import { v7 as uuid } from "uuid";

export function registerServiceWorker() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });

        // Check existing push subscription
        const existingSubscription =
          await registration.pushManager.getSubscription();

        if (!existingSubscription) {
          const permission = await Notification.requestPermission();

          if (permission === "granted") {
            await subscribeToPush(registration);
          } else {
            console.warn("Notification permission denied.");
          }
        }

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                console.log("New service worker available. Refresh to update.");
              }
            });
          }
        });
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    });
  } else {
    console.warn("Service workers or Push API not supported in this browser.");
  }
}

async function subscribeToPush(registration: ServiceWorkerRegistration) {
  try {
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

    if (!vapidPublicKey) {
      throw new Error("VAPID public key not found.");
    }

    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });

    const deviceId = getOrCreateDeviceId();

    const response = await fetch("/api/web-push/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subscription: subscription.toJSON(),
        deviceId,
      }),
    });

    if (!response.ok) {
      console.error("Failed to save subscription:", await response.text());
    }
  } catch (error: any) {
    console.error(
      "Push subscription failed:",
      error.name,
      error.message,
      error.stack
    );
    if (error.name === "AbortError") {
      console.error("AbortError: Possible causes:");
      console.error("- Invalid or malformed VAPID public key");
      console.error(
        "- Network issues (e.g., blocked push service like fcm.googleapis.com)"
      );
      console.error(
        "- Browser restrictions (e.g., private mode, disabled push)"
      );
    }
  }
}

function urlBase64ToUint8Array(base64String: string) {
  try {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  } catch (error: any) {
    console.error("VAPID key conversion failed:", error);
    throw new Error(`Invalid VAPID key format: ${error.message}`);
  }
}

function getOrCreateDeviceId(): string {
  const localStorageKey = "deviceId";
  let deviceId = localStorage.getItem(localStorageKey);
  if (!deviceId) {
    deviceId = uuid();
    localStorage.setItem(localStorageKey, deviceId);
  }
  return deviceId;
}
