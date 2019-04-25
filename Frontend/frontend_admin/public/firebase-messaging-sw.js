// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");

var config = {
  messagingSenderId: "400592092212"
};
firebase.initializeApp(config);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  const title = payload.data.title;
  var body = "";

  let idb;
  let idbReq = indexedDB.open("myIndexedDB", 3);
  idbReq.onsuccess = function(event) {
    idb = event.target.result;

    // Start a database transaction and get the groups object store
    let tx = idb.transaction(["groupsStore"], "readonly");
    let store = tx.objectStore("groupsStore");

    // Get the groups from the groups object store
    var getReq = store.get("groups");

    // Wait for the database transaction to complete
    getReq.onsuccess = function(event) {
      const groups = getReq.result;
      console.log(payload.data.type);
      console.log(payload.data.type === "client-update");
      switch (payload.data.type) {
        case "client-update":
          break;
        case "admin-update":
          console.log("ENTERED ADMIN UPDATE!");
          body = `Admin ${
            payload.data.requester
          } has just replied to a ticket.`;
          const options = {
            body
          };
          return self.registration.showNotification(title, options);
          break;
        default:
          console.log("ENTERED DEFAULT!");
          if (groups.includes(payload.data.group)) {
            body = `Client ${
              payload.data.requester
            } has just submitted a ticket.`;
            const options = {
              body
            };
            return self.registration.showNotification(title, options);
          }
          break;
      }
    };
    tx.onerror = function(event) {
      return self.registration.showNotification(
        "FAILURE AT GET",
        "FAILURE AT GET"
      );
    };
  };
  idbReq.onerror = function(event) {
    return self.registration.showNotification(
      "FAILURE AT INIT",
      "FAILURE AT INIT"
    );
  };
});
