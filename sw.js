const CACHE_NAME = 'fartboard-v2';

// Every single file your app needs to work offline goes in this list
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './images/icon-192.png',
  './images/icon-512.png',
  
  // Dry Sounds
  './sounds/dry1.mp3',
  './sounds/dry2.mp3',
  './sounds/dry3.mp3',
  './sounds/dry4.mp3',
  './sounds/dry5.mp3',

  // Wet Sounds
  './sounds/wet1.mp3',
  './sounds/wet2.mp3',
  './sounds/wet3.mp3',
  './sounds/wet4.mp3',
  './sounds/wet5.mp3',

  // Squeak Sounds
  './sounds/squeak1.mp3',
  './sounds/squeak2.mp3',
  './sounds/squeak3.mp3',
  './sounds/squeak4.mp3',
  './sounds/squeak5.mp3',

  // LOUD Sounds
  './sounds/loud1.mp3',
  './sounds/loud2.mp3',
  './sounds/loud3.mp3',
  './sounds/loud4.mp3',
  './sounds/loud5.mp3'
];

// Install Event: Saves all the files to the device
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('FartBoard Cache Opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event: Serves the files from the device cache so it works offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return the cached file if found, otherwise fetch from the network
        return response || fetch(event.request);
      })
  );
});

// Activate Event: Cleans up old caches if you ever update the app
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});