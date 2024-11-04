// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlBW_s7esk1EIaEPYnOiqOSLL1vrCRJtc",
  authDomain: "tournify-74249.firebaseapp.com",
  projectId: "tournify-74249",
  storageBucket: "tournify-74249.appspot.com",
  messagingSenderId: "619741257103",
  appId: "1:619741257103:web:90a609078c9f20d0a9bffa",
  measurementId: "G-LTP570C5PR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
