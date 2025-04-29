// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADerJpxHxF8L1hxbFcLdJcJqKQYupCIco",
  authDomain: "facerecognition-c5582.firebaseapp.com",
  projectId: "facerecognition-c5582",
  storageBucket: "facerecognition-c5582.appspot.com",
  messagingSenderId: "294056318522",
  appId: "1:294056318522:web:efaebbfa3b1051d7094703",
  measurementId: "G-EXGYF2DQ2Z"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth=getAuth(app);
export const storage = getStorage(app);
