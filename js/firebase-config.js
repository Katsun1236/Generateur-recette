// Importe les fonctions nécessaires du SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Votre configuration d'application web Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBZMnlHt0TzR33sRVaGJ9HZLLZVzEGnu-k",
  authDomain: "ratio-faction.firebaseapp.com",
  projectId: "ratio-faction",
  storageBucket: "ratio-faction.appspot.com", // J'ai corrigé une petite erreur ici, c'est généralement .appspot.com
  messagingSenderId: "402552344518",
  appId: "1:402552344518:web:cad898ebb7f701770cecc7",
  measurementId: "G-20WL3ZM0XJ"
};

// Initialise l'application Firebase
const app = initializeApp(firebaseConfig);

// Initialise les services Firestore et Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Exporte les services pour les utiliser dans d'autres fichiers
export { db, auth };