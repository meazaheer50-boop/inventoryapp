const V = "ev-v67", SHELL = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-512-maskable.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
// Network first for the app page so updates arrive straight away; cache as the offline fallback.
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin || r.url.includes("version.json")) return;
  const page = r.mode === "navigate" || /index\.html$/.test(new URL(r.url).pathname);
  const save = res => { if (res && res.ok) { const c = res.clone(); caches.open(V).then(k => k.put(page ? "index.html" : r, c)); } return res; };
  if (page) { e.respondWith(Promise.race([fetch(r).then(save), new Promise((_, no) => setTimeout(no, 4000))]).catch(() => caches.match("index.html").then(h => h || caches.match("./")))); return; }
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(hit => hit || fetch(r).then(save)));
});
