// script.js

// --- 1. On sélectionne tous les éléments importants de notre page ---
const items = document.querySelectorAll('.item');
const allSlots = document.querySelectorAll('.grid-slot');
const craftingGrid = document.getElementById('crafting-grid');
const resultSlot = document.getElementById('result-slot');
const generateBtn = document.getElementById('generate-btn');
const outputCode = document.getElementById('output-code');

let draggedItemId = null; // Variable pour stocker l'ID de l'item qu'on déplace

// --- 2. Logique du Glisser-Déposer (Drag and Drop) ---

// Pour chaque item de la liste de gauche...
items.forEach(item => {
    // ...quand on commence à le faire glisser...
    item.addEventListener('dragstart', () => {
        draggedItemId = item.getAttribute('data-item-id'); // On stocke son ID
    });
});

// Pour chaque case de la grille et du résultat...
allSlots.forEach(slot => {
    // ...quand un item est glissé au-dessus...
    slot.addEventListener('dragover', event => {
        event.preventDefault(); // On autorise le dépôt (comportement par défaut l'interdit)
    });

    // ...quand un item est lâché dans la case...
    slot.addEventListener('drop', () => {
        if (draggedItemId) {
            slot.innerHTML = ''; // On vide la case au cas où il y avait déjà un item
            const newItem = document.createElement('div'); // On crée un nouvel élément
            newItem.textContent = draggedItemId.split(':')[1]; // Affiche le nom de l'item (ex: "planks")
            newItem.setAttribute('data-item-id', draggedItemId); // On lui met l'ID
            slot.appendChild(newItem); // On l'ajoute à la case
        }
    });
});

// --- 3. Logique de la Génération du Code JSON ---

// Quand on clique sur le bouton "Générer"...
generateBtn.addEventListener('click', () => {
    const recipe = {
        "format_version": "1.20.0", // Version à jour
        "minecraft:recipe_shaped": {
            "description": {
                "identifier": "custom:my_recipe" // Nom unique de la recette
            },
            "tags": ["crafting_table"],
            "pattern": [],
            "key": {},
            "result": {}
        }
    };

    const keyMap = {}; // Pour associer un item unique (ex: "minecraft:stick") à une lettre ('A')
    let keyChar = 'A'; // On commence avec la lettre 'A'
    
    const gridSlots = craftingGrid.querySelectorAll('.grid-slot');
    let currentPatternRow = "";

    // On parcourt les 9 cases de la grille
    for (let i = 0; i < gridSlots.length; i++) {
        const slot = gridSlots[i];
        const itemInSlot = slot.querySelector('div'); // On regarde s'il y a un item dans la case

        if (itemInSlot) {
            const itemId = itemInSlot.getAttribute('data-item-id');
            // Si c'est la première fois qu'on voit cet item, on lui assigne une lettre
            if (!keyMap[itemId]) {
                keyMap[itemId] = keyChar;
                recipe["minecraft:recipe_shaped"].key[keyChar] = { "item": itemId };
                keyChar = String.fromCharCode(keyChar.charCodeAt(0) + 1); // Passe à la lettre suivante (B, C, ...)
            }
            currentPatternRow += keyMap[itemId]; // Ajoute la lettre à la ligne du pattern
        } else {
            currentPatternRow += " "; // Si la case est vide, on ajoute un espace
        }
        
        // Toutes les 3 cases, on a fini une ligne du pattern
        if ((i + 1) % 3 === 0) {
            recipe["minecraft:recipe_shaped"].pattern.push(currentPatternRow);
            currentPatternRow = "";
        }
    }

    // On récupère l'item dans la case de résultat
    const resultItem = resultSlot.querySelector('div');
    if (resultItem) {
        recipe["minecraft:recipe_shaped"].result = {
            "item": resultItem.getAttribute('data-item-id'),
            "count": 1 // Par défaut on met 1, tu pourras le changer à la main
        };
    } else {
        // S'il n'y a pas de résultat, on affiche une erreur
        outputCode.textContent = "Erreur : Veuillez placer un item dans la case de résultat.";
        return;
    }

    // On affiche le JSON final, joliment formaté
    outputCode.textContent = JSON.stringify(recipe, null, 2);
});