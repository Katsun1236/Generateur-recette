import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-functions.js";

// --- Éléments de la barre de navigation ---
const profileLink = document.getElementById('profile-link');
const profilePic = document.getElementById('profile-pic');
const authButtons = document.getElementById('auth-buttons');
const adminLink = document.getElementById('admin-link');
const ordersLink = document.getElementById('orders-link');
const myOrdersLink = document.getElementById('my-orders-link');

// --- Fonctions de mise à jour de la barre de navigation ---
function updateNavbarForUser(user, userData = {}) {
    if (profileLink && profilePic && authButtons) {
        const avatarUrl = userData.avatar || user.photoURL || `https://corsproxy.io/?https://mc-heads.net/avatar/${userData.minecraftUsername || 'Steve'}/64`;
        profilePic.src = avatarUrl;
        profilePic.onerror = () => { profilePic.src = `https://corsproxy.io/?https://mc-heads.net/avatar/Steve/64`; };
        profileLink.style.display = 'block';
        authButtons.style.display = 'none';
        if(myOrdersLink) myOrdersLink.style.display = 'block';
        if (userData.role === 'Admin') {
            if (adminLink) adminLink.style.display = 'block';
        }
        const marketStaffRoles = ['Admin', 'Leader', 'Officier', 'Vendeur'];
        if (marketStaffRoles.includes(userData.role)) {
            if (ordersLink) ordersLink.style.display = 'block';
            if(myOrdersLink) myOrdersLink.style.display = 'none';
        }
    }
};

function updateNavbarForGuest() {
    if (profileLink && authButtons) {
        profileLink.style.display = 'none';
        authButtons.style.display = 'flex';
        if (adminLink) adminLink.style.display = 'none';
        if (ordersLink) ordersLink.style.display = 'none';
        if (myOrdersLink) myOrdersLink.style.display = 'none';
    }
};

// --- Logique spécifique à la page de profil ---
function setupProfilePage(userData) {
    const profileContainer = document.getElementById('profile-container');
    if (!profileContainer) return; // Ne rien faire si on n'est pas sur la page de profil

    const usernameEl = document.getElementById('username');
    const userRoleEl = document.getElementById('user-role');
    const discordContentEl = document.getElementById('discord-content');
    const avatarImg = document.getElementById('avatar-img');
    const logoutBtn = document.getElementById('logout-btn');
    const editProfileBtn = document.getElementById('edit-profile-btn');

    // Remplir les informations
    usernameEl.textContent = userData.minecraftUsername || "Utilisateur";
    userRoleEl.textContent = userData.role || 'Membre';
    avatarImg.src = userData.avatar || `https://mc-heads.net/avatar/${userData.minecraftUsername}/120`;
    
    // Gérer l'affichage du statut Discord
    if (userData.discordId) {
        discordContentEl.innerHTML = `<h3 class="discord-linked">Lié</h3><p style="margin:0;">${userData.discordUsername}</p>`;
    } else {
        const discordClientId = "1407045715485786144";
        const redirectUri = "https://ratio-faction.netlify.app/pages/profile.html";
        const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify`;
        discordContentEl.innerHTML = `<h3>Non lié</h3><a href="${discordAuthUrl}" class="discord-link-btn">Lier mon compte</a>`;
    }
    
    profileContainer.classList.remove('loading');

    // Activer les boutons
    logoutBtn.addEventListener('click', () => {
        signOut(auth).catch(error => console.error("Logout Error:", error));
    });
    editProfileBtn.addEventListener('click', () => {
        alert("La fonctionnalité d'édition du profil sera bientôt disponible !");
    });
}

// --- Logique principale d'authentification ---
function initializeAuth() {
    onAuthStateChanged(auth, async (user) => {
        const currentPage = window.location.pathname.split('/').pop();
        const isAuthPage = ['login.html', 'register.html'].includes(currentPage);

        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists() && docSnap.data().onboardingComplete) {
                updateNavbarForUser(user, docSnap.data());
                // Si on est sur la page de profil, on la remplit
                if (currentPage === 'profile.html') {
                    setupProfilePage(docSnap.data());
                }
            } else {
                // Rediriger vers l'onboarding si le profil n'est pas complet
                const isSafePage = ['onboarding.html', 'login.html', 'register.html'].includes(currentPage);
                if (!isSafePage) {
                    const path = window.location.pathname.includes('/pages/') ? 'onboarding.html' : 'pages/onboarding.html';
                    window.location.href = path;
                }
            }
        } else {
            updateNavbarForGuest();
            // Si on n'est pas connecté et qu'on n'est pas sur une page d'authentification, rediriger vers login
            if (!isAuthPage && currentPage !== '' && currentPage !== 'index.html') {
                 const path = window.location.pathname.includes('/pages/') ? 'login.html' : 'pages/login.html';
                 // On exclut les pages publiques
                 if(!['market.html', 'recrutement.html'].includes(currentPage)){
                    window.location.href = path;
                 }
            }
        }
    });
}

// Lancement du script
document.addEventListener("DOMContentLoaded", initializeAuth);