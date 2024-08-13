// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh6rHlmSb3RlKfdMAaK23WpVYwpi01iAw",
  authDomain: "selfit-lp-64d05.firebaseapp.com",
  projectId: "selfit-lp-64d05",
  storageBucket: "selfit-lp-64d05.appspot.com",
  messagingSenderId: "865349640606",
  appId: "1:865349640606:web:b50ffe331a6fe17a83768f",
  measurementId: "G-3YQBSYHT8L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db;
