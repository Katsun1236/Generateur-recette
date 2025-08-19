// Importe les fonctions nécessaires depuis les SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

// Configuration de votre application web Firebase
// Assurez-vous que ces informations sont correctes et correspondent à votre projet Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBZMnlHt0TzR33sRVaGJ9HZLLZVzEGnu-k",
  authDomain: "ratio-faction.firebaseapp.com",
  projectId: "ratio-faction",
  storageBucket: "ratio-faction.firebasestorage.app",
  messagingSenderId: "402552344518",
  appId: "1:402552344518:web:cad898ebb7f701770cecc7",
  measurementId: "G-20WL3ZM0XJ"
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);

// Exporte les services Firebase pour les utiliser dans d'autres parties de votre application
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Ajout de l'exportation du service de stockage