importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  // workbox.routing.registerRoute(
  //   new RegExp('.*\.js'),
  //   workbox.strategies.networkFirst()
  // );

  // workbox.routing.registerRoute(
  //   // Cache CSS files
  //   /.*\.css/,
  //   // Use cache but update in the background ASAP
  //   workbox.strategies.staleWhileRevalidate({
  //     // Use a custom cache name
  //     cacheName: 'css-cache',
  //   })
  // );
  
  // workbox.routing.registerRoute(
  //   // Cache image files
  //   /.*\.(?:png|jpg|jpeg|svg|gif)/,
  //   // Use the cache if it's available
  //   workbox.strategies.cacheFirst({
  //     // Use a custom cache name
  //     cacheName: 'image-cache',
  //     plugins: [
  //       new workbox.expiration.Plugin({
  //         // Cache only 20 images
  //         maxEntries: 20,
  //         // Cache for a maximum of a week
  //         maxAgeSeconds: 7 * 24 * 60 * 60,
  //       })
  //     ],
  //   })
  // );

  // workbox.core.setCacheNameDetails({
  //     prefix: 'my-app',
  //     suffix: 'v1',
  //     precache: 'custom-precache-name',// 不设置的话默认值为 'precache'
  //     runtime: 'custom-runtime-name' // 不设置的话默认值为 'runtime'
  // });

  workbox.setConfig({debug: true});

  workbox.precaching.precacheAndRoute([]);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}