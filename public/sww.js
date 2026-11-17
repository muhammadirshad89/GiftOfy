// Intentionally a no-op. Earlier versions of this file loaded a third-party advertising service worker (since
// removed). Browsers that registered the old worker re-fetch this file, install this version and unregister it,
// so no advertising worker can linger on a returning visitor's device. GiftOfy does not use service workers.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => { event.waitUntil(self.registration.unregister()); });
