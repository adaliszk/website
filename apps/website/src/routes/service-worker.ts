import { setupServiceWorker } from '@builder.io/qwik-city/service-worker'

// eslint-disable-next-line no-undef
declare const self: ServiceWorkerGlobalScope


setupServiceWorker()
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', () => self.clients.claim())
