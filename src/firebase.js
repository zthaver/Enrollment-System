import firebase from "firebase/app"
import 'firebase/firestore';
import "firebase/auth"
import "firebase/firebase-functions"

const app = firebase.initializeApp({
    apiKey: "AIzaSyBt4JvUhj7-M7Zn0VCqGOlROYd25nIBUvQ",
    authDomain: "enrollment-system-cdad7.firebaseapp.com",
    projectId: "enrollment-system-cdad7",
    storageBucket: "enrollment-system-cdad7.appspot.com",
    messagingSenderId: "616434913177",
    appId: "1:616434913177:web:55bf51fbf15914bdea8d08",
    measurementId: "G-Q0V1TT414F"

})
export const auth = app.auth()
export const firestore = app.firestore();
export const functions = app.functions();
export default app
