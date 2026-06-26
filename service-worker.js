const CACHE_NAME = "audio-tune-web-v2";
const CORE_ASSETS = [
  "./",
  "index.html",
  "core.js",
  "manifest.webmanifest",
  "icon.svg",
  "privacy.html",
  "support.html",
  "licenses.html",
  "NOTICE.md"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches
      .match(event.request)
      .then((cached) => cached || fetch(event.request).catch(() => caches.match("index.html"))),
  );
});
