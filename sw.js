const PREFIX='sadooh-app-v1:'+new URL(self.registration.scope).pathname+':',CACHE=PREFIX+"sadooh-app-v1-a7310a7af8ae3935",FILES=["./index.html","./manifest.webmanifest","./assets/abu-fahad.svg","./assets/alkabeer.svg","./assets/card-back.svg","./assets/card-frame.svg","./assets/game-table.svg","./assets/index-D0fnFTUA.css","./assets/index-hZmaNRkj.js","./assets/logo-dark.svg","./assets/logo.svg","./assets/malqoof.svg","./assets/menu-background.svg","./assets/mokhabbes.svg","./assets/mosarref.svg","./assets/nashal.svg","./assets/sanad.svg","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key))))));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url),scope=new URL(self.registration.scope);
 if(request.method!=='GET'||url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
 if(request.mode==='navigate'){
  event.respondWith(fetch(request).catch(()=>caches.open(CACHE).then(cache=>cache.match(new URL('index.html',scope).href)).then(response=>response||Response.error())));return;
 }
 const relative='./'+url.pathname.slice(scope.pathname.length);
 if(!FILES.includes(relative))return;
 event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(request))||fetch(request)));
});
