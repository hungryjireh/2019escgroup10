import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/messaging";

var config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${
    process.env.REACT_APP_FIREBASE_PROJECT_ID
  }.firebaseio.com`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

const db = firebase.firestore();

const messaging = firebase.messaging();

// messaging.onMessage(payload => {
//   const groups = localStorage.getItem("subscriptionGroups").split(", ");

//   console.log("onMessage: ", payload);
//   console.log(groups);
//   console.log(payload.data.group);
//   console.log(groups.includes(payload.data.group));
// });

export { db, messaging, firebase };
