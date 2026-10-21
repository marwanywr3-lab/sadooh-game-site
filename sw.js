const PREFIX='sadooh-app-v1:'+new URL(self.registration.scope).pathname+':',CACHE=PREFIX+"sadooh-app-v1-031197df259b8718",FILES=["./index.html","./manifest.webmanifest","./fonts.css","./assets/abu-fahad.svg","./assets/alkabeer.svg","./assets/audio/casino-LICENSE.txt","./assets/audio/flip.wav","./assets/audio/interface-LICENSE.txt","./assets/audio/jingles-LICENSE.txt","./assets/audio/paper-flip.wav","./assets/audio/paper-pop.wav","./assets/audio/paper-reveal.wav","./assets/audio/paper-turn.wav","./assets/audio/paper-victory.wav","./assets/audio/paper-whoosh.wav","./assets/audio/pop.wav","./assets/audio/reveal.wav","./assets/audio/sources.json","./assets/audio/turn.wav","./assets/audio/victory.wav","./assets/audio/whoosh.wav","./assets/card-back.svg","./assets/card-frame.svg","./assets/fonts/baloo-bhaijaan-2-arabic.woff2","./assets/fonts/baloo-bhaijaan-2-latin.woff2","./assets/fonts/OFL.txt","./assets/fonts/sources.json","./assets/game-table.svg","./assets/index-Bu4bmKGc.js","./assets/index-CoZ6SUV8.css","./assets/logo-dark.svg","./assets/logo.svg","./assets/malqoof.svg","./assets/menu-background.svg","./assets/mokhabbes.svg","./assets/mosarref.svg","./assets/nashal.svg","./assets/sanad.svg","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png"],REQUIRED=["./index.html","./manifest.webmanifest","./fonts.css","./assets/abu-fahad.svg","./assets/alkabeer.svg","./assets/card-back.svg","./assets/card-frame.svg","./assets/fonts/baloo-bhaijaan-2-arabic.woff2","./assets/fonts/baloo-bhaijaan-2-latin.woff2","./assets/fonts/OFL.txt","./assets/fonts/sources.json","./assets/game-table.svg","./assets/index-Bu4bmKGc.js","./assets/index-CoZ6SUV8.css","./assets/logo-dark.svg","./assets/logo.svg","./assets/malqoof.svg","./assets/menu-background.svg","./assets/mokhabbes.svg","./assets/mosarref.svg","./assets/nashal.svg","./assets/sanad.svg","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(REQUIRED))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key))))));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url),scope=new URL(self.registration.scope);
 if(request.method!=='GET'||url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
 if(request.mode==='navigate'){
  event.respondWith(fetch(request).catch(()=>caches.open(CACHE).then(cache=>cache.match(new URL('index.html',scope).href)).then(response=>response||Response.error())));return;
 }
 const relative='./'+url.pathname.slice(scope.pathname.length);
 if(!FILES.includes(relative))return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
  const saved=await cache.match(request);if(saved)return saved;
  const response=await fetch(request);if(response.ok&&relative.startsWith('./assets/audio/'))void cache.put(request,response.clone()).catch(()=>{});return response;
 }));
});
