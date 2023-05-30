// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvhxYW1XHOnJd6psJ36iZlUfB7yCOvpWA",
  authDomain: "spotify-app-b3d61.firebaseapp.com",
  projectId: "spotify-app-b3d61",
  storageBucket: "spotify-app-b3d61.appspot.com",
  messagingSenderId: "392807132182",
  appId: "1:392807132182:web:75fe46be83848fdacd5937"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;