// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDklhkIcOX88eDi2N7LczDRIGBh7sasfn4",
  authDomain: "ecommerce-coder-41e78.firebaseapp.com",
  projectId: "ecommerce-coder-41e78",
  storageBucket: "ecommerce-coder-41e78.firebasestorage.app",
  messagingSenderId: "345510291543",
  appId: "1:345510291543:web:26036443b1b44abe35db12",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// exportar instancia de Firebase
export const db = getFirestore(app);
