import firebase from "firebase/app";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyCFjkSZ8qPbjgVxq04geDFNRfdWXhrhV-w",
  authDomain: "acnapi-335c7.firebaseapp.com",
  databaseURL: "https://acnapi-335c7.firebaseio.com",
  projectId: "acnapi-335c7",
  storageBucket: "acnapi-335c7.appspot.com",
  messagingSenderId: "400592092212"
};
firebase.initializeApp(config);

const db = firebase.firestore();

export { db, firebase };
