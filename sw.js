const C="life-shelf-3d7bd11e23",SHELL=["./", "index.html", "manifest.webmanifest", "icon-192-v2.png", "icon-512-v2.png", "apple-touch-icon.png", "fonts/allo-Regular.woff2", "fonts/allo-Medium.woff2", "fonts/allo-SemiBold.woff2"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
  // Page and data: network first (always the newest version when online), cache as the offline fallback.
  if(e.request.mode==="navigate"||u.pathname.includes("/data/")||u.pathname.endsWith("/sw.js")){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)));return}
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)))});
