// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFaO_i1xV8PeMjfKqWh3crbVpzEHoouiY",
  authDomain: "image-gallery-34d8e.firebaseapp.com",
  projectId: "image-gallery-34d8e",
  storageBucket: "image-gallery-34d8e.appspot.com",
  messagingSenderId: "76823225529",
  appId: "1:76823225529:web:37860506969780ec65a768",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { auth, storage,  db };
