

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';  // <----
let firebaseApp;
SetupFirebase();

/**
* Firebase Initialization Function
* This must be called before any firebase query
*/
function SetupFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyAyF2gxUfMjzwDRWDcFGc9xgEw9J8xxKwI",
        authDomain: "decode-ecommerce-d9b20.firebaseapp.com",
        projectId: "decode-ecommerce-d9b20",
        storageBucket: "decode-ecommerce-d9b20.appspot.com",
        messagingSenderId: "636641895459",
        appId: "1:636641895459:web:d59950690d8908b104bd96",
        measurementId: "G-CZN2R5EZFP"
    };
    // Initialize Firebase
    firebaseApp = firebase.initializeApp(firebaseConfig);
}

export default firebaseApp;
