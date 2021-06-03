import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import "firebase/firebase-functions"

const firebaseConfig = {
    apiKey: "AIzaSyBt4JvUhj7-M7Zn0VCqGOlROYd25nIBUvQ",
    authDomain: "enrollment-system-cdad7.firebaseapp.com",
    databaseURL: "https://enrollment-system-cdad7-default-rtdb.firebaseio.com",
    projectId: "enrollment-system-cdad7",
    storageBucket: "enrollment-system-cdad7.appspot.com",
    messagingSenderId: "616434913177",
    appId: "1:616434913177:web:55bf51fbf15914bdea8d08",
    measurementId: "G-Q0V1TT414F"
  };

  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const functions = firebase.functions();

  //code

export default firebase;