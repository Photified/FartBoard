const CACHE_NAME = 'fartboard-v4';

// The exact list of files your app needs to work completely offline
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
  './sounds/dry6.mp3',
  './sounds/dry7.mp3',
  './sounds/dry8.mp3',
  './sounds/dry9.mp3',

  // Wet Sounds
  './sounds/wet1.mp3',
  './sounds/wet2.mp3',
  './sounds/wet3.mp3',
  './sounds/wet4.mp3',
  './sounds/wet5.mp3',
  './sounds/wet6.mp3',
  './sounds/wet7.mp3',
  './sounds/wet8.mp3',
  './sounds/wet9.mp3'
];

// Install Event: Saves all the files to the device
self.addEventListener('install', event => {
  self.skipWaiting(); // Forces the waiting service worker to become active immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('FartBoard Cache v4 Opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Event: Cleans up old caches when the app updates
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim()); // Forces the service worker to take control of the page immediately
  
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
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
      }).catch(error => {
        console.error("Failed to fetch:", event.request.url, error);
      })
  );
});