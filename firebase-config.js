// Importez les fonctions nécessaires depuis les SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

// Configuration de votre application web Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBZMnlHt0TzR33sRVaGJ9HZLLZVzEGnu-k",
  authDomain: "ratio-faction.firebaseapp.com",
  projectId: "ratio-faction",
  storageBucket: "ratio-faction.appspot.com", // J'ai corrigé une petite erreur ici, il manquait .appspot
  messagingSenderId: "402552344518",
  appId: "1:402552344518:web:cad898ebb7f701770cecc7",
  measurementId: "G-20WL3ZM0XJ"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter les services Firebase pour les utiliser dans d'autres fichiers
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);