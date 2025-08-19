import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const initializeAuth = () => {
    try {
        if (!auth) {
            throw new Error("Firebase Auth n'est pas initialisé.");
        }

        onAuthStateChanged(auth, async (user) => {
            const profileLink = document.getElementById('profile-link');
            const profilePic = document.getElementById('profile-pic');
            const authButtons = document.getElementById('auth-buttons');

            if (user) {
                if (!db) {
                    console.error("Firebase Firestore n'est pas initialisé.");
                    return;
                }
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (profilePic) {
                        profilePic.src = userData.avatar || '../images/pictures/Logo.png';
                    }
                    if (profileLink) profileLink.style.display = 'block';
                    if (authButtons) authButtons.style.display = 'none';
                }
            } else {
                if (profileLink) profileLink.style.display = 'none';
                if (authButtons) authButtons.style.display = 'flex';
            }
        });

    } catch (error) {
        console.error("Erreur critique lors de l'initialisation de l'authentification:", error);
        document.body.innerHTML = `<h1>Erreur critique: ${error.message}</h1><p>Veuillez vérifier votre configuration Firebase et recharger la page.</p>`;
    }
};

// S'assurer que le DOM est prêt avant d'exécuter le script
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAuth);
} else {
    initializeAuth();
}