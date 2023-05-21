// Push Notifications
self.addEventListener('push', event => {
  const title = 'New Notification';
  const options = {
    body: event.data.text(),
    icon: '/notification-icon.png',
    badge: '/notification-badge.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
})