// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSJv4wxNfr-s_I9n5Tc3EaVwrpQgj8bkw",
  authDomain: "food-app-ca243.firebaseapp.com",
  projectId: "food-app-ca243",
  storageBucket: "food-app-ca243.appspot.com",
  messagingSenderId: "434649626051",
  appId: "1:434649626051:web:55080d08fb6a7a88b97976",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;
