// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config (replace with your values)
const firebaseConfig = {
    apiKey: "AIzaSyAW1ODSq9XhOyU1FJ7JCL029-BY6K6c2eg",
    authDomain: "admin-3f05f.firebaseapp.com",
    projectId: "admin-3f05f",
    storageBucket: "admin-3f05f.firebasestorage.app",
    messagingSenderId: "754608244794",
    appId: "1:754608244794:web:976459295660175f120d03",
    measurementId: "G-0Y6W4RJDJD"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
// Use in-memory persistence to avoid issues with unallowed storage contexts
const db = getFirestore(app);
const storage = getStorage(app);

// Export the needed Firebase services and providers
export { auth, db, storage, signInWithEmailAndPassword, signOut };


export default app;