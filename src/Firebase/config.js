// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDGvVahxoFz11qaScpNW84msloeXQYImbI",
    authDomain: "surf-score-demo-project.firebaseapp.com",
    databaseURL: "https://surf-score-demo-project-default-rtdb.firebaseio.com",
    projectId: "surf-score-demo-project",
    storageBucket: "surf-score-demo-project.appspot.com",
    messagingSenderId: "785369531801",
    appId: "1:785369531801:web:a3676dbc7f66b8b1eabf08",
    measurementId: "G-GX62ZVSLCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };