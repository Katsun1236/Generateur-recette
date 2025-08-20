const MARKET_SETTINGS = {
    defaultSellPriceModifier: 0.75,
};

const IMAGE_BASE_PATHS = {
    histeria: "../images/market-icon/histeria-icon/",
    minecraft: "../images/market-icon/"
};

const marketDataByCategory = {
    "Équipement Histeria": [
        { name: "Histerite Sword", buyPrice: 50000, img: "histerite-sword.png" },
        { name: "Histerite Pickaxe", buyPrice: 30000, img: "histerite-pickaxe.png" },
        { name: "Histerite Axe", buyPrice: 30000, img: "histerite-axe.png" },
        { name: "Histerite Shovel", buyPrice: 20000, img: "histerite-shovel.png" },
        { name: "Histerite Hoe", buyPrice: 20000, img: "histerite-hoe.png" },
        { name: "Histerite Helmet", buyPrice: 40000, img: "histerite-helmet.png" },
        { name: "Histerite Chestplate", buyPrice: 60000, img: "histerite-chestplate.png" },
        { name: "Histerite Leggings", buyPrice: 55000, img: "histerite-leggings.png" },
        { name: "Histerite Boots", buyPrice: 40000, img: "histerite-boots.png" },
        { name: "Nocturite Helmet", buyPrice: 25000, img: "nocturite-helmet.png" },
        { name: "Nocturite Chestplate", buyPrice: 40000, img: "nocturite-chestplate.png" },
        { name: "Nocturite Leggings", buyPrice: 35000, img: "nocturite-leggings.png" },
        { name: "Nocturite Boots", buyPrice: 25000, img: "nocturite-boots.png" },
        { name: "Hood Helmet", buyPrice: 15000, img: "hood-helmet.png" },
        { name: "Backpack", buyPrice: 10000, img: "backpack.png" },
    ],
    "Ressources Histeria": [
        { name: "Minerai d'Histerite", buyPrice: 10000, img: "histerite-ore.png" },
        { name: "Bloc d'Histerite", buyPrice: 90000, img: "histerite-block.png" },
        { name: "Histerite Ingot", buyPrice: 10000, img: "histerite-ingot.png" },
        { name: "Histerite Compress", buyPrice: 90000, img: "histerite-compress.png" },
        { name: "Nocturite Crystal", buyPrice: 5000, img: "nocturite-crystal.png" },
        { name: "Nocturite Block", buyPrice: 45000, img: "nocturite-block.png" },
        { name: "Nocturite Compress", buyPrice: 45000, img: "nocturite-compress.png" },
        { name: "Minerai Aléatoire", buyPrice: 20000, img: "random-ore.png" },
    ],
    "Objets Spéciaux": [
        { name: "Chest Finder", buyPrice: 15000, img: "chest-finder.png" },
        { name: "Fertilized Dirt", buyPrice: 200000, img: "fertilized-dirt.png" },
        { name: "Histerite Apple", buyPrice: 200000, img: "histerite-apple.png" },
        { name: "Dynamite", buyPrice: 600, img: "dynamite.png" },
        { name: "Sponger", buyPrice: 1000, img: "sponger.png" },
        { name: "Chest Explorer", buyPrice: 10000, img: "chest-explorer.png" },
        { name: "Hang Glider", buyPrice: 20000, img: "hang-glider.png" },
        { name: "Vote Key", buyPrice: 5000, img: "vote-key.png" },
        { name: "Vault", buyPrice: 25000, img: "vault.png" },
        { name: "Vault Breacher", buyPrice: 50000, img: "vault-breacher.png" },
        { name: "Thunderbolt", buyPrice: 15000, img: "thunderbolt.png" },
        { name: "Speed Stick", buyPrice: 5000, img: "speed-stick.png" },
        { name: "Lucky Block", buyPrice: 10000, img: "lucky-block.png" },
        { name: "Jump Stick", buyPrice: 5000, img: "jump-stick.png" },
        { name: "Histerite Totem", buyPrice: 100000, img: "histerite-totem.png" },
        { name: "Heal Stick", buyPrice: 7500, img: "heal-stick.png" },
    ],
    "Blocs de Construction": [
        { name: "Terre", buyPrice: 5, img: "minecraft_dirt.png", pathKey: "minecraft" },
        { name: "Roche", buyPrice: 15, img: "minecraft_stone.png", pathKey: "minecraft" },
        { name: "Pierre", buyPrice: 15, img: "minecraft_cobblestone.png", pathKey: "minecraft" },
        { name: "Planches de chêne", buyPrice: 15, img: "minecraft_oak_planks.png", pathKey: "minecraft" },
        { name: "Sable", buyPrice: 15, img: "minecraft_sand.png", pathKey: "minecraft" },
        { name: "Gravier", buyPrice: 15, img: "minecraft_gravel.png", pathKey: "minecraft" },
        { name: "Obsidienne", buyPrice: 500, img: "minecraft_obsidian.png", pathKey: "minecraft" },
    ],
    "Minerais": [
        { name: "Charbon", buyPrice: 200, img: "minecraft_coal.png", pathKey: "minecraft" },
        { name: "Lingot de fer", buyPrice: 200, img: "minecraft_iron_ingot.png", pathKey: "minecraft" },
        { name: "Lingot d'or", buyPrice: 500, img: "minecraft_gold_ingot.png", pathKey: "minecraft" },
        { name: "Diamant", buyPrice: 1000, img: "minecraft_diamond.png", pathKey: "minecraft" },
        { name: "Émeraude", buyPrice: 1500, img: "minecraft_emerald.png", pathKey: "minecraft" },
        { name: "Poussière de Redstone", buyPrice: 50, img: "minecraft_redstone.png", pathKey: "minecraft" },
        { name: "Lapis Lazuli", buyPrice: 100, img: "minecraft_lapis_lazuli.png", pathKey: "minecraft" },
    ],
    "Agriculture & Nature": [
        { name: "Blé", buyPrice: 50, img: "minecraft_wheat.png", pathKey: "minecraft" },
        { name: "Carotte", buyPrice: 50, img: "minecraft_carrot.png", pathKey: "minecraft" },
        { name: "Pomme de terre", buyPrice: 50, img: "minecraft_potato.png", pathKey: "minecraft" },
        { name: "Pousse de chêne", buyPrice: 100, img: "minecraft_oak_sapling.png", pathKey: "minecraft" },
        { name: "Canne à sucre", buyPrice: 75, img: "minecraft_sugar_cane.png", pathKey: "minecraft" },
        { name: "Cactus", buyPrice: 100, img: "minecraft_cactus.png", pathKey: "minecraft" },
    ],
    "Décoration": [
        { name: "Torche", buyPrice: 3, img: "minecraft_torch.png", pathKey: "minecraft" },
        { name: "Lanterne", buyPrice: 50, img: "minecraft_lantern.png", pathKey: "minecraft" },
        { name: "Table", buyPrice: 200, img: "table.png" },
        { name: "Chaise", buyPrice: 150, img: "chair.png" },
        { name: "Verre", buyPrice: 20, img: "minecraft_glass.png", pathKey: "minecraft" },
        { name: "Laine Blanche", buyPrice: 30, img: "minecraft_white_wool.png", pathKey: "minecraft" },
    ],
    "Utilitaires": [
        { name: "Table de Craft", buyPrice: 100, img: "minecraft_crafting_table.png", pathKey: "minecraft" },
        { name: "Four", buyPrice: 100, img: "minecraft_furnace.png", pathKey: "minecraft" },
        { name: "Coffre", buyPrice: 100, img: "minecraft_chest.png", pathKey: "minecraft" },
        { name: "Enclume", buyPrice: 1000, img: "minecraft_anvil.png", pathKey: "minecraft" },
        { name: "Table d'enchantement", buyPrice: 1000, img: "minecraft_enchanting_table.png", pathKey: "minecraft" },
    ]
};

export const marketItems = Object.entries(marketDataByCategory).flatMap(([category, items]) => {
    return items.map(item => {
        const basePathKey = item.pathKey || 'histeria';
        const basePath = IMAGE_BASE_PATHS[basePathKey];
        const sellPrice = item.sellPrice || Math.floor(item.buyPrice * MARKET_SETTINGS.defaultSellPriceModifier);

        return {
            ...item,
            category: category,
            img: `${basePath}${item.img}`,
            sellPrice: sellPrice
        };
    });
});