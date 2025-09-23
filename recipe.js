// ===================================================================================
// BASE DE DONNÉES DES RECETTES
// C'est ici que tu ajoutes toutes les recettes.
//
// FORMATS À SUIVRE :
//
// --- Pour une recette SHAPED ---
// 'minecraft:nom_item_resultat': {
//   type: 'shaped',
//   grid: [
//     'item1', 'item2', 'item3',
//     'item4', 'item5', 'item6',
//     'item7', 'item8', 'item9'
//   ],
//   result: { item: 'minecraft:nom_item_resultat', count: 1 }
// },
// PS : Pour les cases vides, utilise `null`. Pour les variantes (ex: planches),
//      mets un nom de groupe comme 'planks' et définis-le dans `itemGroups`.
//
// --- Pour une recette SHAPELESS ---
// 'minecraft:nom_item_resultat': {
//   type: 'shapeless',
//   ingredients: ['minecraft:item1', 'minecraft:item2'],
//   result: { item: 'minecraft:nom_item_resultat', count: 2 }
// },
//
// --- Pour une recette de FOUR ---
// 'minecraft:nom_item_resultat': {
//   type: 'furnace',
//   input: 'minecraft:item_a_cuire',
//   output: 'minecraft:nom_item_resultat',
//   experience: 0.7,
//   tags: ["furnace", "smoker"]
// },
// ===================================================================================

export const recipes = {
    // --- RECETTES SHAPED ---
    'minecraft:crafting_table': {
        type: 'shaped',
        grid: [
            'planks', 'planks', null,
            'planks', 'planks', null,
            null, null, null
        ],
        result: { item: 'minecraft:crafting_table', count: 1 }
    },
    'minecraft:stick': {
        type: 'shaped',
        grid: [
            'planks', null, null,
            'planks', null, null,
            null, null, null
        ],
        result: { item: 'minecraft:stick', count: 4 }
    },
     'minecraft:torch': {
        type: 'shaped',
        grid: [
            'coal_or_charcoal', null, null,
            'minecraft:stick', null, null,
            null, null, null
        ],
        result: { item: 'minecraft:torch', count: 4 }
    },

    // --- RECETTES SHAPELESS ---
    'minecraft:blaze_powder': {
        type: 'shapeless',
        ingredients: ['minecraft:blaze_rod'],
        result: { item: 'minecraft:blaze_powder', count: 2 }
    },
    'minecraft:writable_book': {
        type: 'shapeless',
        ingredients: ['minecraft:book', 'minecraft:ink_sac', 'minecraft:feather'],
        result: { item: 'minecraft:writable_book', count: 1 }
    },

    // --- RECETTES DE FOUR ---
    'minecraft:glass': {
      type: 'furnace',
      input: 'minecraft:sand',
      output: 'minecraft:glass',
      experience: 0.1,
      tags: ["furnace"]
    },
    'minecraft:cooked_beef': {
      type: 'furnace',
      input: 'minecraft:beef',
      output: 'minecraft:cooked_beef',
      experience: 0.35,
      tags: ["furnace", "smoker", "campfire"]
    },
    'minecraft:iron_ingot': {
      type: 'furnace',
      input: 'minecraft:iron_ore',
      output: 'minecraft:iron_ingot',
      experience: 0.7,
      tags: ["furnace", "blast_furnace"]
    }
};

// Définit les groupes d'items pour les variantes
export const itemGroups = {
    'planks': [
        'minecraft:oak_planks', 'minecraft:spruce_planks', 'minecraft:birch_planks',
        'minecraft:jungle_planks', 'minecraft:acacia_planks', 'minecraft:dark_oak_planks',
        'minecraft:mangrove_planks', 'minecraft:cherry_planks', 'minecraft:bamboo_planks',
        'minecraft:crimson_planks', 'minecraft:warped_planks'
    ],
    'coal_or_charcoal': [
        'minecraft:coal',
        'minecraft:charcoal'
    ]
};