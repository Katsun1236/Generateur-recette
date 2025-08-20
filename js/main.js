// ==========================================================================
// Imports
// ==========================================================================
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// ==========================================================================
// DOM Elements
// ==========================================================================
const profileLink = document.getElementById('profile-link');
const profilePic = document.getElementById('profile-pic');
const authButtons = document.getElementById('auth-buttons');
const logoutButton = document.getElementById('logout-btn');

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
        // Use the avatar from the database as the primary source of truth
        const avatarUrl = userData.avatar || user.photoURL || `https://corsproxy.io/?https://mc-heads.net/avatar/${userData.minecraftUsername || 'Steve'}/64`;
        
        profilePic.src = avatarUrl;
        profilePic.onerror = () => { profilePic.src = `https://corsproxy.io/?https://mc-heads.net/avatar/Steve/64`; };

        profileLink.style.display = 'block';
        authButtons.style.display = 'none';
    }
};

/**
 * Updates the UI when no user is logged in (guest state).
 */
const updateUIForGuest = () => {
    if (profileLink && authButtons) {
        profileLink.style.display = 'none';
        authButtons.style.display = 'flex';
    }
};

// ==========================================================================
// Main Authentication Logic
// ==========================================================================

/**
 * Determines the correct relative path for redirection.
 * @param {string} targetPage - The page to redirect to (e.g., 'onboarding.html').
 * @returns {string} The correct path.
 */
function getRedirectPath(targetPage) {
    // If the current URL is inside the '/pages/' directory, the path is direct.
    if (window.location.pathname.includes('/pages/')) {
        return targetPage;
    }
    // Otherwise (from index.html), we need to go into the 'pages' directory.
    return `pages/${targetPage}`;
}


/**
 * Initializes the authentication listener and updates the UI accordingly.
 */
const initializeAuth = () => {
    onAuthStateChanged(auth, async (user) => {
        try {
            if (user) {
                // User is signed in
                const userDocRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userDocRef);

                // **BUG FIX IS HERE**
                // We now check if the user has completed the onboarding process.
                if (docSnap.exists() && docSnap.data().onboardingComplete) {
                    // If onboarding is complete, display the UI normally.
                    updateUIForUser(user, docSnap.data());
                } else {
                    // If onboarding is NOT complete, redirect the user.
                    const currentPage = window.location.pathname.split('/').pop();
                    const isSafePage = ['onboarding.html', 'login.html', 'register.html'].includes(currentPage);
                    
                    // Only redirect if they are not already on a safe page, to prevent loops.
                    if (!isSafePage) {
                        window.location.href = getRedirectPath('onboarding.html');
                    }
                }
            } else {
                // User is signed out
                updateUIForGuest();
            }
        } catch (error) {
            console.error("Error during authentication state change:", error);
            updateUIForGuest(); // Fallback to guest view on error
        }
    });
};

// ==========================================================================
// Event Listeners
// ==========================================================================
const setupEventListeners = () => {
    // The logout button is on the profile page, so we check if it exists.
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            signOut(auth).catch(error => console.error("Error signing out:", error));
        });
    }
};

// ==========================================================================
// App Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    try {
        initializeAuth();
        setupEventListeners();
    } catch (error) {
        console.error("Critical error during app initialization:", error);
    }
});