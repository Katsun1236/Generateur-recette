// Import the necessary functions from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

// ==========================================================================
// IMPORTANT: SECURITY WARNING
// ==========================================================================
// This configuration object is visible to anyone inspecting your website's code.
// This is expected for web apps, but it means your application's security
// MUST rely on strong Firebase Security Rules (for Firestore and Storage)
// and NOT on hiding these keys.
// ==========================================================================

const firebaseConfig = {
  apiKey: "AIzaSyBZMnlHt0TzR33sRVaGJ9HZLLZVzEGnu-k",
  authDomain: "ratio-faction.firebaseapp.com",
  projectId: "ratio-faction",
  storageBucket: "ratio-faction.appspot.com",
  messagingSenderId: "402552344518",
  appId: "1:402552344518:web:cad898ebb7f701770cecc7",
  measurementId: "G-20WL3ZM0XJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the different Firebase services to be used throughout the app

// The Authentication service
export const auth = getAuth(app);

// The Firestore database service
export const db = getFirestore(app);

// The Cloud Storage service
export const storage = getStorage(app);