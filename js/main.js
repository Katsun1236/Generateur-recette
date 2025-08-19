import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const profileLink = document.getElementById('profile-link');
const profilePic = document.getElementById('profile-pic');
const authButtons = document.getElementById('auth-buttons');

onAuthStateChanged(auth, async (user) => {
    if (user) {
        if(authButtons) authButtons.style.display = 'none';
        if(profileLink) profileLink.style.display = 'block';

        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            const currentUserData = docSnap.data();
            const photo = currentUserData.photoURL || `https://corsproxy.io/?https://mc-heads.net/avatar/${currentUserData.username}/45`;
            if(profilePic) profilePic.src = photo;
        } else {
            if(profilePic) profilePic.src = `https://corsproxy.io/?https://mc-heads.net/avatar/Steve/45`;
        }
    } else {
        if(authButtons) authButtons.style.display = 'flex';
        if(profileLink) profileLink.style.display = 'none';
    }
});
