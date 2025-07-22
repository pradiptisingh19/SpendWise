import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC_fAX2GSogSRGuxRzu7tSFagwlqf33TNI",
  authDomain: "finance-c67ef.firebaseapp.com",
  projectId: "finance-c67ef",
  storageBucket: "finance-c67ef.firebasestorage.app",
  messagingSenderId: "402009843185",
  appId: "1:402009843185:web:d0f322a3417d237ae75050"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);