"use strict";var precacheConfig=[["/sacrifice/index.html","d54e92c4620b8e4a46ccb9293e932f1e"],["/sacrifice/static/css/main.5d7f8e81.css","e658f2f28734064cb6f687f257fb17b5"],["/sacrifice/static/js/main.832cc019.js","9d5e75f3bf7442b88df99730255b8443"],["/sacrifice/static/media/Bulle.ac78a148.png","ac78a1480e19ca7091f20458b11b8401"],["/sacrifice/static/media/Texture_1.b096fada.png","b096fada97c419aa13444de3e6aa6a6a"],["/sacrifice/static/media/Texture_2.70b7916a.png","70b7916a0bcd5f9cdb29363172fd8730"],["/sacrifice/static/media/Texture_3.43998ba3.png","43998ba38135ee8fc5d69d7ca1eba5f7"],["/sacrifice/static/media/Texture_4.88e81ae0.png","88e81ae02d19ee2c052d9c8a72f5b67d"],["/sacrifice/static/media/background.90a820be.png","90a820bee3b46dfd7c7129b445502344"],["/sacrifice/static/media/bigPancarte.363f045e.png","363f045eb0bd1efebf8a20b7013dcd56"],["/sacrifice/static/media/faith-bad.e980b755.png","e980b755b3a33fcddc5ac2b52c7bb0d8"],["/sacrifice/static/media/faith-chaotic.c198927f.png","c198927fe8aefd06229f1e8490b61beb"],["/sacrifice/static/media/faith-good.76b9aa45.png","76b9aa45a0e4a71bd5b289cc84e47df5"],["/sacrifice/static/media/faith-loyal.ee3a7520.png","ee3a7520072ca75fc25ade60d5a3dd42"],["/sacrifice/static/media/hublot.f0511b46.png","f0511b46e55fd9b4c556f30c6185bb6b"],["/sacrifice/static/media/pancarte.39519ebd.png","39519ebd0abf9c0de8b810b57ca02281"],["/sacrifice/static/media/pancarteButton.037c5e66.png","037c5e66e482d8e7b49f16ebe410f61b"],["/sacrifice/static/media/pancartedead.aa809ca9.png","aa809ca907b11ce3e0e52129d82e38e7"],["/sacrifice/static/media/plumeleft.869d4df6.png","869d4df6c28329f2adf8303b10defc53"],["/sacrifice/static/media/plumeright.e48b5ace.png","e48b5aceb9aef27fe76919256105cc60"],["/sacrifice/static/media/trust-bad.7eb9bf27.png","7eb9bf27b58b4280f8fee58d5733bdb1"],["/sacrifice/static/media/trust-chaotic.bc33eb2c.png","bc33eb2c05df59dac3e07016f145677d"],["/sacrifice/static/media/trust-good.23e7af8a.png","23e7af8a8e9fe69f8a41790a46ac9961"],["/sacrifice/static/media/trust-loyal.c0bd8e3a.png","c0bd8e3a9a9d59232b1e886bdea3390c"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),n=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),e=urlsToCacheKeys.has(t));var n="/sacrifice/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});