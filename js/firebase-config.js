// ../js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBZMnlHt0TzR33sRVaGJ9HZLLZVzEGnu-k",
  authDomain: "ratio-faction.firebaseapp.com",
  projectId: "ratio-faction",
  storageBucket: "ratio-faction.appspot.com",   // 👈 correction ici
  messagingSenderId: "402552344518",
  appId: "1:402552344518:web:cad898ebb7f701770cecc7",
  measurementId: "G-20WL3ZM0XJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);