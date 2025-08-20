import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const profileLink = document.getElementById('profile-link');
const profilePic = document.getElementById('profile-pic');
const authButtons = document.getElementById('auth-buttons');
const logoutButton = document.getElementById('logout-btn');
const adminLink = document.getElementById('admin-link');

function updateUIForUser(user, userData = {}) {
    if (profileLink && profilePic && authButtons) {
        const avatarUrl = userData.avatar || user.photoURL || `https://corsproxy.io/?https://mc-heads.net/avatar/${userData.minecraftUsername || 'Steve'}/64`;
        
        profilePic.src = avatarUrl;
        profilePic.onerror = () => { profilePic.src = `https://corsproxy.io/?https://mc-heads.net/avatar/Steve/64`; };

        profileLink.style.display = 'block';
        authButtons.style.display = 'none';

        if (adminLink && userData.role === 'Admin') {
            adminLink.style.display = 'block';
        }
    }
};

function updateUIForGuest() {
    if (profileLink && authButtons) {
        profileLink.style.display = 'none';
        authButtons.style.display = 'flex';
        if (adminLink) {
            adminLink.style.display = 'none';
        }
    }
};

function getRedirectPath(targetPage) {
    if (window.location.pathname.includes('/pages/')) {
        return targetPage;
    }
    return `pages/${targetPage}`;
}

function initializeAuth() {
    onAuthStateChanged(auth, async (user) => {
        try {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists() && docSnap.data().onboardingComplete) {
                    updateUIForUser(user, docSnap.data());
                } else {
                    const currentPage = window.location.pathname.split('/').pop();
                    const isSafePage = ['onboarding.html', 'login.html', 'register.html'].includes(currentPage);
                    
                    if (!isSafePage) {
                        window.location.href = getRedirectPath('onboarding.html');
                    }
                }
            } else {
                updateUIForGuest();
            }
        } catch (error) {
            console.error("Error during authentication state change:", error);
            updateUIForGuest();
        }
    });
};

function setupEventListeners() {
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            signOut(auth).catch(error => console.error("Error signing out:", error));
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    try {
        initializeAuth();
        setupEventListeners();
    } catch (error) {
        console.error("Critical error during app initialization:", error);
    }
});