// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_fAX2GSogSRGuxRzu7tSFagwlqf33TNI",
  authDomain: "finance-c67ef.firebaseapp.com",
  projectId: "finance-c67ef",
  storageBucket: "finance-c67ef.firebasestorage.app",
  messagingSenderId: "402009843185",
  appId: "1:402009843185:web:d0f322a3417d237ae75050"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);