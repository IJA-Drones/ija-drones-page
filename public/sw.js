const CACHE_PREFIX = "ija-drones";
const CACHE_VERSION = "v1";
const STATIC_CACHE = `${CACHE_PREFIX}-static-${CACHE_VERSION}`;
const PAGE_CACHE = `${CACHE_PREFIX}-pages-${CACHE_VERSION}`;
const IS_LOCALHOST = self.location.hostname === "localhost" || self.location.hostname === "127.0.0.1";

const PRECACHE_URLS = [
  "/",
  "/manifest.webmanifest",
  "/pwa/icon-192.png",
  "/pwa/icon-512.png",
  "/pwa/maskable-512.png",
  "/pwa/apple-touch-icon.png",
  "/images/ija-drones-logo-transparent.png",
  "/media/ija-drone-spraying-f3d07e6f.jpeg",
];

self.addEventListener("install", (event) => {
  const prepareCache = IS_LOCALHOST
    ? Promise.resolve()
    : caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS));

  event.waitUntil(prepareCache.then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(CACHE_PREFIX) && ![STATIC_CACHE, PAGE_CACHE].includes(key))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

async function networkFirst(request) {
  const cache = await caches.open(PAGE_CACHE);

  try {
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch {
    return (await cache.match(request)) || (await caches.match("/"));
  }
}

async function staleWhileRevalidate(request, event) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  const networkResponse = fetch(request)
    .then(async (response) => {
      if (response.ok) await cache.put(request, response.clone());
      return response;
    })
    .catch(() => undefined);

  if (cachedResponse) {
    event.waitUntil(networkResponse);
    return cachedResponse;
  }

  return (await networkResponse) || Response.error();
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (IS_LOCALHOST || request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  const isStaticAsset =
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/_next/image") ||
    /\.(?:avif|css|gif|ico|jpe?g|js|png|svg|webp|woff2?)$/i.test(url.pathname);

  if (isStaticAsset) event.respondWith(staleWhileRevalidate(request, event));
});
