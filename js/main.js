// ==========================================================================
// Imports
// ==========================================================================
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// ==========================================================================
// DOM Elements
// ==========================================================================
// It's a good practice to get all your elements once and store them in constants.
const profileLink = document.getElementById('profile-link');
const profilePic = document.getElementById('profile-pic');
const authButtons = document.getElementById('auth-buttons');
const logoutButton = document.getElementById('logout-btn'); // Assuming you have a logout button

// ==========================================================================
// UI Update Functions
// ==========================================================================

/**
 * Updates the UI when a user is successfully logged in.
 * @param {object} user - The user object from Firebase Auth.
 * @param {object} userData - The user data from Firestore.
 */
const updateUIForUser = (user, userData = {}) => {
    if (profileLink && profilePic && authButtons) {
        // Determine the avatar URL with a clear fallback chain
        const avatarFromProvider = user.photoURL;
        const avatarFromDb = userData.avatar;
        const avatarFallback = `https://cravatar.eu/avatar/${user.uid}/64.png`; // Increased size for better quality

        profilePic.src = avatarFromProvider || avatarFromDb || avatarFallback;
        
        // Show profile picture and hide login/register buttons
        profileLink.style.display = 'block';
        authButtons.style.display = 'none';
    }
};

/**
 * Updates the UI when no user is logged in (guest state).
 */
const updateUIForGuest = () => {
    if (profileLink && profilePic && authButtons) {
        // Use a default avatar for guests
        profilePic.src = `https://cravatar.eu/avatar/default/64.png`;
        
        // Hide the profile link and show login/register buttons
        profileLink.style.display = 'none'; // <-- LOGIC FIX: Hide this when logged out
        authButtons.style.display = 'flex';
    }
};

// ==========================================================================
// Main Authentication Logic
// ==========================================================================

/**
 * Initializes the authentication listener and updates the UI accordingly.
 */
const initializeAuth = () => {
    // Check if essential elements are on the page before proceeding
    if (!profileLink || !authButtons) {
        console.warn("Auth UI elements not found on this page. Skipping auth listener setup.");
        return;
    }

    onAuthStateChanged(auth, async (user) => {
        try {
            if (user) {
                // User is signed in
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    updateUIForUser(user, userDocSnap.data());
                } else {
                    // Handle case where user is authenticated but has no Firestore document yet
                    console.log("User document not found, using basic auth info.");
                    updateUIForUser(user); 
                }
            } else {
                // User is signed out
                updateUIForGuest();
            }
        } catch (error) {
            console.error("Error during authentication state change:", error);
            // Optionally, show an error message to the user
        }
    });
};

// ==========================================================================
// Event Listeners
// ==========================================================================
const setupEventListeners = () => {
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            signOut(auth).catch(error => console.error("Error signing out:", error));
        });
    }
};


// ==========================================================================
// App Initialization
// ==========================================================================

// Run the setup code once the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", () => {
    try {
        initializeAuth();
        setupEventListeners();
    } catch (error) {
        console.error("Critical error during app initialization:", error);
        document.body.innerHTML = `<h1>Erreur critique: ${error.message}</h1><p>Veuillez vérifier votre configuration et recharger la page.</p>`;
    }
});
