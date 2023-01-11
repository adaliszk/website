import { setupServiceWorker } from '@builder.io/qwik-city/service-worker'
import type { ServiceWorkerGlobalScope } from '@types/serviceworker'

declare const self: ServiceWorkerGlobalScope


setupServiceWorker()
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', () => self.clients.claim())
