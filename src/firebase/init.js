import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAh6rHlmSb3RlKfdMAaK23WpVYwpi01iAw",
  authDomain: "selfit-lp-64d05.firebaseapp.com",
  projectId: "selfit-lp-64d05",
  storageBucket: "selfit-lp-64d05.appspot.com",
  messagingSenderId: "865349640606",
  appId: "1:865349640606:web:b50ffe331a6fe17a83768f",
  measurementId: "G-3YQBSYHT8L"
};

const firestore = initializeApp(firebaseConfig);
const db = getFirestore(firestore);
getAnalytics(firestore);

export default db;
