importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyArrdwOQZ311v086QXzsGGcUiGif1SO1Pc",
  authDomain: "econtact-notification-47333.firebaseapp.com",
  projectId: "econtact-notification-47333",
  storageBucket: "econtact-notification-47333.appspot.com",
  messagingSenderId: "598284073777",
  appId: "1:598284073777:web:0a15a48107e4363ddf4e10",
});
self.addEventListener('notificationclick', function (event) {
  console.log(event)
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.FCM_MSG.data.click_action));
});
const messaging = firebase.messaging();
