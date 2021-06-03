import firebase from "firebase/app"
import 'firebase/firestore';
import "firebase/auth"
import "firebase/firebase-functions"
import dotenv from 'dotenv'

/*
File To Initialise the Firebase app according to credentials in the local.env file.
*/
dotenv.config();

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
    projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID ,
    storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ,
    appId: process.env.REACT_APP_FIREBASE_APP_ID ,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID ,

})
export const auth = app.auth()
export const firestore = app.firestore();
export const functions = app.functions();
export default app
