// Ce fichier contient les recettes de craft.
// Pour ajouter une recette, suivez le format existant.
// Pour les ingrédients acceptant plusieurs variantes (ex: tous les types de planches),
// listez-les dans le tableau de la clé correspondante.

export const recipes = {
    // --- RECETTES SHAPED ---
    'minecraft:crafting_table': {
        type: 'shaped',
        pattern: [
            "##",
            "##"
        ],
        key: {
            '#': [
                { item: 'minecraft:oak_planks' },
                { item: 'minecraft:spruce_planks' },
                { item: 'minecraft:birch_planks' },
                { item: 'minecraft:jungle_planks' },
                { item: 'minecraft:acacia_planks' },
                { item: 'minecraft:dark_oak_planks' },
                { item: 'minecraft:mangrove_planks' },
                { item: 'minecraft:cherry_planks' },
                { item: 'minecraft:bamboo_planks' },
                { item: 'minecraft:crimson_planks' },
                { item: 'minecraft:warped_planks' }
            ]
        },
        result: { item: 'minecraft:crafting_table', count: 1 }
    },
    'minecraft:stick': {
        type: 'shaped',
        pattern: [
            "#",
            "#"
        ],
        key: {
            '#': [
                { item: 'minecraft:oak_planks' },
                { item: 'minecraft:spruce_planks' },
                 // ... et toutes les autres planches
            ]
        },
        result: { item: 'minecraft:stick', count: 4 }
    },
     'minecraft:torch': {
        type: 'shaped',
        pattern: [
            "C",
            "S"
        ],
        key: {
            'C': [
                { item: 'minecraft:coal' },
                { item: 'minecraft:charcoal' }
            ],
            'S': [
                { item: 'minecraft:stick' }
            ]
        },
        result: { item: 'minecraft:torch', count: 4 }
    },

    // --- RECETTES SHAPELESS ---
    'minecraft:blaze_powder': {
        type: 'shapeless',
        ingredients: [
            { "item": "minecraft:blaze_rod" }
        ],
        result: { "item": "minecraft:blaze_powder", "count": 2 }
    },
    'minecraft:writable_book': {
        type: 'shapeless',
        ingredients: [
            { "item": "minecraft:book" },
            { "item": "minecraft:ink_sac" },
            { "item": "minecraft:feather" }
        ],
        result: { "item": "minecraft:writable_book", "count": 1 }
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
