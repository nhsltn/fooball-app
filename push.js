var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BO0fOWRW2NwhKGECuaFVCekpghXihTCPa-4F5t-2FECXGy5sGagl7FZntQJ78q9KOtTptSlQo9byrT0H4E63P5U",
    "privateKey": "WX2eGpc189Kr3CUuEtgiXiJZCcg98JFZo_IO-RSAZSA"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fQxGpeAtKvY:APA91bFa6SQkwy_Wlz4sr6uNXsI-aj_tizsH1H3aO93UCrVAx4U3uS0cfJK6OSlEBYIG-e76BD-ZK9SIq2eLK7I-tq5hVB0lwDTcV2ICf91MiXq-oRNXVMIN22HhbfqFWVk4SXzQBT2Y",
    "keys": {
        "p256dh": "BH97A20bGiGLSYgJePPiBqGLjv4UAIFLBvuo2jUA2adnT6QKOHdGjZS/nR76m9wTBtxRsKL6GvaBDNu6MHewfBA=",
        "auth": "J84NhzfMzMjijiyacoOTmQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '564047806914',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);