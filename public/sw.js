/// <reference lib="webworker" /> //
// @ts-check

/** @type {ServiceWorkerGlobalScope} */

// @ts-expect-error because
const sw = self

self.addEventListener('install', () => {
  console.log('service worker installed')
})

self.addEventListener('activate', () => {
  console.log('service worker activated')
})
