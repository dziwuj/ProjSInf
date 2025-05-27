/// <reference lib="webworker" />
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

let allowlist: RegExp[] | undefined;
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV) allowlist = [/^\/$/];

// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist }),
);

// Receive push notifications
self.addEventListener("push", event => {
  if (!event.data) return;
  const data = event.data.json(); // Assuming the payload is in JSON format

  const options = {
    body: data.body,
    icon: "/path/to/your/icon.png",
    data: {
      url: data.link, // Customize the link to open when the notification is clicked
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Click push notifications
self.addEventListener("notificationclick", event => {
  const notificationData = event.notification.data;

  if (notificationData.url) {
    self.clients.openWindow(notificationData.url);
  }

  event.notification.close();
});

self.skipWaiting();
clientsClaim();
