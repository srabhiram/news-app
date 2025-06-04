export function registerServiceWorker() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        });
        console.log('Service Worker registered:', registration);

        // Check existing subscription
        const existingSubscription = await registration.pushManager.getSubscription();
        console.log('Existing subscription:', existingSubscription);
        if (existingSubscription) {
          console.log('Unsubscribing existing subscription...');
          await existingSubscription.unsubscribe();
        }

        const permission = await Notification.requestPermission();
        console.log('Notification permission:', permission);
        if (permission === 'granted') {
          await subscribeToPush(registration);
        } else {
          console.warn('Notification permission denied.');
        }

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New service worker available. Refresh to update.');
              }
            });
          }
        });
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    });
  } else {
    console.warn('Service workers or Push API not supported in this browser.');
  }
}

async function subscribeToPush(registration: ServiceWorkerRegistration) {
  try {
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    console.log('Raw VAPID public key:', vapidPublicKey);
    if (!vapidPublicKey) {
      throw new Error('VAPID public key not found.');
    }

    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
    console.log('Converted VAPID key:', convertedVapidKey, 'Length:', convertedVapidKey.length);

    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });
      console.log('Push subscription successful:', subscription.toJSON());

      const response = await fetch('/api/web-push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          deviceId: 'unique-device-id', // Replace with dynamic device ID
        }),
      });
      if (!response.ok) {
        console.error('Failed to save subscription:', await response.text());
      } else {
        console.log('Subscription saved to server.');
      }
    } catch (subError: any) {
      console.error('Push subscription error:', subError.name, subError.message, subError.stack);
      if (subError.name === 'AbortError') {
        console.error('AbortError: Possible causes:');
        console.error('- Invalid or malformed VAPID public key');
        console.error('- Network issues (e.g., blocked push service like fcm.googleapis.com)');
        console.error('- Browser restrictions (e.g., private mode, disabled push)');
      }
      throw subError;
    }
  } catch (error) {
    console.error('Push subscription failed:', error);
  }
}

function urlBase64ToUint8Array(base64String: string) {
  try {
    console.log('Converting VAPID key:', base64String);
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    console.log('Decoded base64 length:', rawData.length);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  } catch (error:any) {
    console.error('VAPID key conversion failed:', error);
    throw new Error(`Invalid VAPID key format: ${error.message}`);
  }
}