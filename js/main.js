import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const initializeAuth = () => {
    try {
        if (!auth) {
            throw new Error("Firebase Auth n'est pas initialisé.");
        }

        const profileLink = document.getElementById('profile-link');
        const profilePic = document.getElementById('profile-pic');
        const authButtons = document.getElementById('auth-buttons');

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Utilisateur connecté
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    // Utilise l'avatar de Google/Discord ou celui de la base de données, sinon un skin Minecraft
                    profilePic.src = user.photoURL || userData.avatar || `https://cravatar.eu/avatar/${user.uid}/32.png`;
                } else {
                    // Fallback si le document n'existe pas encore
                    profilePic.src = user.photoURL || `https://cravatar.eu/avatar/${user.uid}/32.png`;
                }
                
                profileLink.style.display = 'block';
                authButtons.style.display = 'none';

            } else {
                // Utilisateur déconnecté
                profilePic.src = `https://cravatar.eu/avatar/default/32.png`; // Affiche une tête de Steve par défaut
                profileLink.style.display = 'block'; // Assure que l'icône est toujours visible
                authButtons.style.display = 'flex';
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