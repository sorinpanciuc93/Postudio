// Network-first for the app shell so your edits show on refresh; cache-first for icons.
const CACHE = "rose-studio-v4";
const ASSETS = ["./","./index.html","./firebase-config.js","./manifest.webmanifest","./icon-180.png","./icon-192.png","./icon-512.png"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return; // Firebase + fonts pass through
  const fresh = e.request.mode === "navigate" || url.pathname.endsWith(".html") || url.pathname.endsWith("firebase-config.js");
  if (fresh){
    e.respondWith(fetch(e.request).then(res=>{const c=res.clone();caches.open(CACHE).then(ca=>ca.put(e.request,c)).catch(()=>{});return res;})
      .catch(()=>caches.match(e.request).then(h=>h||caches.match("./index.html"))));
  } else {
    e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request).then(res=>{const c=res.clone();caches.open(CACHE).then(ca=>ca.put(e.request,c)).catch(()=>{});return res;})));
  }
});
