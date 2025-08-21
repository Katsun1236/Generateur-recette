import { db } from './firebase-config.js';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove, runTransaction } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// --- DOM Elements ---
const form = document.getElementById('item-form');
const formTitle = document.getElementById('form-title');
const itemIdInput = document.getElementById('item-id');
const itemNameInput = document.getElementById('item-name');
const itemPriceInput = document.getElementById('item-buy-price');
const itemImgInput = document.getElementById('item-img');
const itemCategoryInput = document.getElementById('item-category');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const allItemsList = document.getElementById('all-items-list');
const featuredItemsList = document.getElementById('featured-items-list');
const notification = document.getElementById('notification');

// --- Firestore References ---
const itemsCollectionRef = collection(db, 'marketItems');
const configDocRef = doc(db, 'marketConfig', 'featured');

// --- Functions ---

/** Affiche une notification à l'écran */
function showNotification(message, isError = false) {
    notification.textContent = message;
    notification.className = isError ? 'error' : '';
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}

/** Charge et affiche tous les objets depuis Firestore */
async function loadItems() {
    allItemsList.innerHTML = `<p>Chargement des objets...</p>`;
    featuredItemsList.innerHTML = `<p>Chargement...</p>`;

    try {
        const [itemsSnapshot, featuredSnap] = await Promise.all([
            getDocs(itemsCollectionRef),
            getDoc(configDocRef)
        ]);

        const featuredNames = featuredSnap.exists() ? featuredSnap.data().items : [];
        
        allItemsList.innerHTML = '';
        featuredItemsList.innerHTML = '';
        
        if (itemsSnapshot.empty) {
            allItemsList.innerHTML = `<p>Aucun objet dans le marché.</p>`;
        }

        itemsSnapshot.forEach(doc => {
            const item = { id: doc.id, ...doc.data() };
            const isFeatured = featuredNames.includes(item.name);
            
            const cardHtml = `
                <div class="item-admin-card" id="card-${item.id}">
                    <h4>${item.name}</h4>
                    <p><strong>Prix:</strong> ${item.buyPrice}$</p>
                    <p><strong>Catégorie:</strong> ${item.category}</p>
                    <div class="actions">
                        <button onclick="window.setupEdit('${item.id}')">Modifier</button>
                        <button onclick="window.deleteItem('${item.id}')" class="danger">Supprimer</button>
                        <button onclick="window.toggleFeatured('${item.name}')">
                            ${isFeatured ? '<i class="fas fa-star"></i> Retirer' : '<i class="far fa-star"></i> Mettre en affiche'}
                        </button>
                    </div>
                </div>`;

            allItemsList.innerHTML += cardHtml;
            if (isFeatured) {
                featuredItemsList.innerHTML += cardHtml;
            }
        });

        if (featuredItemsList.innerHTML === '') {
            featuredItemsList.innerHTML = `<p>Aucun objet à l'affiche.</p>`;
        }

    } catch (error) {
        console.error("Erreur de chargement des objets:", error);
        showNotification("Impossible de charger les objets.", true);
    }
}

/** Prépare le formulaire pour l'édition d'un objet */
window.setupEdit = async (id) => {
    const itemRef = doc(db, 'marketItems', id);
    const itemSnap = await getDoc(itemRef);
    if (!itemSnap.exists()) return;

    const item = itemSnap.data();
    formTitle.textContent = "Modifier l'Objet";
    itemIdInput.value = id;
    itemNameInput.value = item.name;
    itemPriceInput.value = item.buyPrice;
    itemImgInput.value = item.img;
    itemCategoryInput.value = item.category;
    cancelEditBtn.style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

/** Gère la soumission du formulaire (ajout ou modification) */
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const itemId = itemIdInput.value;
    const itemData = {
        name: itemNameInput.value,
        buyPrice: Number(itemPriceInput.value),
        img: itemImgInput.value,
        category: itemCategoryInput.value,
    };

    if (itemId) { // Modification
        await updateDoc(doc(db, 'marketItems', itemId), itemData);
        showNotification("Objet mis à jour avec succès !");
    } else { // Ajout
        await addDoc(itemsCollectionRef, itemData);
        showNotification("Objet ajouté avec succès !");
    }
    form.reset();
    formTitle.textContent = "Ajouter un Nouvel Objet";
    itemIdInput.value = '';
    cancelEditBtn.style.display = 'none';
    loadItems();
});

/** Annule l'édition */
cancelEditBtn.addEventListener('click', () => {
    form.reset();
    formTitle.textContent = "Ajouter un Nouvel Objet";
    itemIdInput.value = '';
    cancelEditBtn.style.display = 'none';
});

/** Supprime un objet */
window.deleteItem = async (id) => {
    if (confirm("Es-tu sûr de vouloir supprimer cet objet ? L'action est irréversible.")) {
        await deleteDoc(doc(db, 'marketItems', id));
        showNotification("Objet supprimé.");
        loadItems();
    }
};

/** Ajoute ou retire un objet de la liste "À l'affiche" */
window.toggleFeatured = async (itemName) => {
    const featuredSnap = await getDoc(configDocRef);
    const isFeatured = featuredSnap.exists() && featuredSnap.data().items.includes(itemName);

    if (isFeatured) {
        await updateDoc(configDocRef, { items: arrayRemove(itemName) });
        showNotification(`${itemName} retiré de l'affiche.`);
    } else {
        await updateDoc(configDocRef, { items: arrayUnion(itemName) });
        showNotification(`${itemName} mis à l'affiche.`);
    }
    loadItems();
};

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', loadItems);