import { db } from './firebase-config.js';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

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
const toastContainer = document.getElementById('toast-container');
const imageSelectorModal = document.getElementById('image-selector-modal');
const openImageSelectorBtn = document.getElementById('open-image-selector');
const closeImageSelectorBtn = document.getElementById('close-image-selector');
const imageGrid = document.getElementById('image-selector-grid');
const imageSearchBar = document.getElementById('image-search-bar');

// --- Firestore References ---
const itemsCollectionRef = collection(db, 'marketItems');
const configDocRef = doc(db, 'marketConfig', 'featured');

// --- Liste des images disponibles (générée depuis ton market-config.js) ---
const availableImages = [
    "../images/market-icon/histeria-icon/histerite-sword.png",
    "../images/market-icon/histeria-icon/histerite-pickaxe.png",
    "../images/market-icon/histeria-icon/histerite-axe.png",
    "../images/market-icon/histeria-icon/histerite-shovel.png",
    "../images/market-icon/histeria-icon/histerite-hoe.png",
    "../images/market-icon/histeria-icon/histerite-helmet.png",
    "../images/market-icon/histeria-icon/histerite-chestplate.png",
    "../images/market-icon/histeria-icon/histerite-leggings.png",
    "../images/market-icon/histeria-icon/histerite-boots.png",
    "../images/market-icon/histeria-icon/nocturite-helmet.png",
    "../images/market-icon/histeria-icon/nocturite-chestplate.png",
    "../images/market-icon/histeria-icon/nocturite-leggings.png",
    "../images/market-icon/histeria-icon/nocturite-boots.png",
    "../images/market-icon/histeria-icon/hood-helmet.png",
    "../images/market-icon/histeria-icon/backpack.png",
    "../images/market-icon/histeria-icon/histerite-ore.png",
    "../images/market-icon/histeria-icon/histerite-block.png",
    "../images/market-icon/histeria-icon/histerite-ingot.png",
    "../images/market-icon/histeria-icon/histerite-compress.png",
    "../images/market-icon/histeria-icon/nocturite-crystal.png",
    "../images/market-icon/histeria-icon/nocturite-block.png",
    "../images/market-icon/histeria-icon/nocturite-compress.png",
    "../images/market-icon/histeria-icon/random-ore.png",
    "../images/market-icon/histeria-icon/chest-finder.png",
    "../images/market-icon/histeria-icon/fertilized-dirt.png",
    "../images/market-icon/histeria-icon/histerite-apple.png",
    "../images/market-icon/histeria-icon/dynamite.png",
    "../images/market-icon/histeria-icon/sponger.png",
    "../images/market-icon/histeria-icon/chest-explorer.png",
    "../images/market-icon/histeria-icon/hang-glider.png",
    "../images/market-icon/histeria-icon/vote-key.png",
    "../images/market-icon/histeria-icon/vault.png",
    "../images/market-icon/histeria-icon/vault-breacher.png",
    "../images/market-icon/histeria-icon/thunderbolt.png",
    "../images/market-icon/histeria-icon/speed-stick.png",
    "../images/market-icon/histeria-icon/lucky-block.png",
    "../images/market-icon/histeria-icon/jump-stick.png",
    "../images/market-icon/histeria-icon/histerite-totem.png",
    "../images/market-icon/histeria-icon/heal-stick.png",
    "../images/market-icon/minecraft_dirt.png",
    "../images/market-icon/minecraft_stone.png",
    "../images/market-icon/minecraft_cobblestone.png",
    "../images/market-icon/minecraft_oak_planks.png",
    "../images/market-icon/minecraft_sand.png",
    "../images/market-icon/minecraft_gravel.png",
    "../images/market-icon/minecraft_obsidian.png",
    "../images/market-icon/minecraft_coal.png",
    "../images/market-icon/minecraft_iron_ingot.png",
    "../images/market-icon/minecraft_gold_ingot.png",
    "../images/market-icon/minecraft_diamond.png",
    "../images/market-icon/minecraft_emerald.png",
    "../images/market-icon/minecraft_redstone.png",
    "../images/market-icon/minecraft_lapis_lazuli.png",
    "../images/market-icon/minecraft_wheat.png",
    "../images/market-icon/minecraft_carrot.png",
    "../images/market-icon/minecraft_potato.png",
    "../images/market-icon/minecraft_oak_sapling.png",
    "../images/market-icon/minecraft_sugar_cane.png",
    "../images/market-icon/minecraft_cactus.png",
    "../images/market-icon/minecraft_torch.png",
    "../images/market-icon/minecraft_lantern.png",
    "../images/market-icon/histeria-icon/table.png",
    "../images/market-icon/histeria-icon/chair.png",
    "../images/market-icon/minecraft_glass.png",
    "../images/market-icon/minecraft_white_wool.png",
    "../images/market-icon/minecraft_crafting_table.png",
    "../images/market-icon/minecraft_furnace.png",
    "../images/market-icon/minecraft_chest.png",
    "../images/market-icon/minecraft_anvil.png",
    "../images/market-icon/minecraft_enchanting_table.png"
];

// --- Functions ---

/** Affiche une notification toast */
function showToast(message, isError = false) {
    const toast = document.createElement('div');
    toast.className = `toast ${isError ? 'error' : 'success'}`;
    const icon = isError ? 'fa-times-circle' : 'fa-check-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i> <p>${message}</p>`;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// --- Image Selector Logic ---
function populateImageSelector(filter = '') {
    imageGrid.innerHTML = '';
    const filteredImages = availableImages.filter(img => img.toLowerCase().includes(filter.toLowerCase()));
    
    if (filteredImages.length === 0) {
        imageGrid.innerHTML = `<p style="color: var(--text-medium); text-align: center; grid-column: 1 / -1;">Aucune image trouvée.</p>`;
        return;
    }

    filteredImages.forEach(imgPath => {
        const imageName = imgPath.split('/').pop();
        const preview = document.createElement('div');
        preview.className = 'image-preview';
        preview.innerHTML = `<img src="${imgPath}" alt="${imageName}"><p>${imageName}</p>`;
        preview.addEventListener('click', () => {
            itemImgInput.value = imgPath;
            imageSelectorModal.classList.remove('show');
        });
        imageGrid.appendChild(preview);
    });
}

openImageSelectorBtn.addEventListener('click', () => {
    imageSelectorModal.classList.add('show');
    imageSearchBar.value = '';
    populateImageSelector();
});
closeImageSelectorBtn.addEventListener('click', () => imageSelectorModal.classList.remove('show'));
imageSearchBar.addEventListener('input', () => populateImageSelector(imageSearchBar.value));

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
            allItemsList.innerHTML = `<p>Aucun objet dans le marché. Utilisez le formulaire ci-dessus pour en ajouter.</p>`;
        }

        const items = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        items.forEach(item => {
            const isFeatured = featuredNames.includes(item.name);
            
            const cardHtml = `
                <div class="item-admin-card" id="card-${item.id}">
                    <h4>${item.name}</h4>
                    <p><strong>Prix:</strong> ${item.buyPrice}$</p>
                    <p><strong>Catégorie:</strong> ${item.category}</p>
                    <div class="actions">
                        <button onclick="window.setupEdit('${item.id}', \`${encodeURIComponent(JSON.stringify(item))}\`)">Modifier</button>
                        <button onclick="window.deleteItem('${item.id}')" class="danger">Supprimer</button>
                        <button onclick="window.toggleFeatured('${item.name}')">
                            ${isFeatured ? '<i class="fas fa-star"></i> Retirer' : '<i class="far fa-star"></i> Afficher'}
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
        showToast("Impossible de charger les objets.", true);
    }
}

/** Prépare le formulaire pour l'édition d'un objet */
window.setupEdit = (id, itemDataString) => {
    const item = JSON.parse(decodeURIComponent(itemDataString));
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
        showToast("Objet mis à jour avec succès !");
    } else { // Ajout
        await addDoc(itemsCollectionRef, itemData);
        showToast("Objet ajouté avec succès !");
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
        showToast("Objet supprimé.");
        loadItems();
    }
};

/** Ajoute ou retire un objet de la liste "À l'affiche" */
window.toggleFeatured = async (itemName) => {
    const featuredSnap = await getDoc(configDocRef);
    const isFeatured = featuredSnap.exists() && featuredSnap.data().items.includes(itemName);

    try {
        if (isFeatured) {
            await updateDoc(configDocRef, { items: arrayRemove(itemName) });
            showToast(`${itemName} retiré de l'affiche.`);
        } else {
            // S'assure que le document existe avant de l'updater
            if (featuredSnap.exists()) {
                await updateDoc(configDocRef, { items: arrayUnion(itemName) });
            } else {
                await setDoc(configDocRef, { items: [itemName] });
            }
            showToast(`${itemName} mis à l'affiche.`);
        }
        loadItems();
    } catch (error) {
        console.error("Erreur lors de la mise à jour des objets à l'affiche:", error);
        showToast("Erreur lors de la mise à jour.", true);
    }
};

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', loadItems);