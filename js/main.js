import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const profileLink = document.getElementById('profile-link');
const profilePic = document.getElementById('profile-pic');
const authButtons = document.getElementById('auth-buttons');
const adminLink = document.getElementById('admin-link');
const ordersLink = document.getElementById('orders-link');
const myOrdersLink = document.getElementById('my-orders-link');
const marketAdminLink = document.getElementById('market-admin-link');

function updateNavbarForUser(user, userData = {}) {
    if (profileLink && profilePic && authButtons) {
        const avatarUrl = userData.avatar || user.photoURL || `https://corsproxy.io/?https://mc-heads.net/avatar/${userData.minecraftUsername || 'Steve'}/64`;
        profilePic.src = avatarUrl;
        profilePic.onerror = () => { profilePic.src = `https://corsproxy.io/?https://mc-heads.net/avatar/Steve/64`; };
        profileLink.style.display = 'block';
        authButtons.style.display = 'none';

        const userRoles = userData.roles || [userData.role];
        const marketStaffRoles = ['Admin', 'Leader', 'Officier', 'Vendeur'];
        const marketManagerRoles = ['Admin', 'Leader', 'Officier', 'Responsable'];
        const isStaff = userRoles.some(role => marketStaffRoles.includes(role));
        const isManager = userRoles.some(role => marketManagerRoles.includes(role));

        if (isStaff) {
            if (ordersLink) ordersLink.style.display = 'block';
            if (myOrdersLink) myOrdersLink.style.display = 'none';
        } else if (userRoles.includes('Client')) {
            if (myOrdersLink) myOrdersLink.style.display = 'block';
        }

        if (isManager) {
            if (marketAdminLink) marketAdminLink.style.display = 'block';
        }

        if (userRoles.includes('Admin')) {
            if (adminLink) adminLink.style.display = 'block';
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
        if (marketAdminLink) marketAdminLink.style.display = 'none';
    }
};

function initializeAuth() {
    onAuthStateChanged(auth, async (user) => {
        const currentPage = window.location.pathname.split('/').pop();
        const path = (page) => window.location.pathname.includes('/pages/') ? page : `pages/${page}`;
        
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            let docSnap = await getDoc(userDocRef);

            if (!docSnap.exists()) {
                await setDoc(userDocRef, {
                    email: user.email,
                    displayName: user.displayName || user.email.split('@')[0],
                    avatar: user.photoURL || null,
                    createdAt: new Date().toISOString(),
                    onboardingComplete: false,
                    role: 'Visiteur',
                    roles: ['Visiteur']
                });
                docSnap = await getDoc(userDocRef);
            }

            const userData = docSnap.data();

            if (userData.onboardingComplete) {
                updateNavbarForUser(user, userData);
                if (['login.html', 'register.html', 'onboarding.html'].includes(currentPage)) {
                    window.location.href = '../index.html';
                }
            } else {
                if (currentPage !== 'onboarding.html') {
                    window.location.href = path('onboarding.html');
                }
            }
        } else {
            updateNavbarForGuest();
            const protectedPages = ['profile.html', 'admin.html', 'orders.html', 'checkout.html', 'market-admin.html'];
            if (protectedPages.includes(currentPage)) {
                window.location.href = path('login.html');
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", initializeAuth);