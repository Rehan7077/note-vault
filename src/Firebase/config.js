import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIbiRScD8fsOcmGqwN4-IsCKx8APN5kN4",
  authDomain: "notevault-abee5.firebaseapp.com",
  projectId: "notevault-abee5",
  storageBucket: "notevault-abee5.firebasestorage.app",
  messagingSenderId: "250969772505",
  appId: "1:250969772505:web:c705ddc961f5f0fd0c09c8",
  measurementId: "G-B7EY4NPZJJ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
