import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDiz-EZJEh-LVb4GVHLPG--WnpuQOlEWAE",
    authDomain: "photo-gallery-10575.firebaseapp.com",
    projectId: "photo-gallery-10575",
    storageBucket: "photo-gallery-10575.appspot.com",
    messagingSenderId: "887252851122",
    appId: "1:887252851122:web:238b197026df0e00ed2cab",
    measurementId: "G-S136EVFLTJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { db, auth, storage, timestamp };