// src/data/MenuMeals.ts

export interface MenuItem {
    id: number;
    name: string;
    img: string;
    category: 'entree' | 'plat_principal' | 'dessert' | 'boisson';
    price: string;
    description: string;
    ingredients?: string[];
    isChefSpecial?: boolean;
    isSeasonal?: boolean;
    allergens?: string[];
}

export const MenuMeals: MenuItem[] = [
    // ==========================================
    // ENTRÉES
    // ==========================================
    {
        id: 1,
        name: "Tartare de Saumon",
        img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
        category: "entree",
        price: "12 000 FCFA",
        description: "Saumon frais coupé au couteau, avocat, mangue, vinaigrette yuzu",
        ingredients: ["Saumon", "Avocat", "Mangue", "Yuzu", "Sésame"],
        isChefSpecial: true,
        allergens: ["Poisson", "Sésame"]
    },
    {
        id: 2,
        name: "Foie Gras Mi-cuit",
        img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80&w=800",
        category: "entree",
        price: "14 000 FCFA",
        description: "Foie gras mi-cuit, chutney de figues, pain d'épices toasté",
        ingredients: ["Foie gras", "Figues", "Pain d'épices", "Vinaigre balsamique"],
        isChefSpecial: false,
        allergens: ["Œufs", "Gluten"]
    },
    {
        id: 3,
        name: "Escargots de Bourgogne",
        img: "https://images.unsplash.com/photo-1591696204402-7f9c3a0e5e5c?auto=format&fit=crop&q=80&w=800",
        category: "entree",
        price: "11 000 FCFA",
        description: "Escargots, beurre persillé, ail, chapelure, herbes de Provence",
        ingredients: ["Escargots", "Beurre", "Persil", "Ail", "Chapelure"],
        isChefSpecial: false,
        allergens: ["Gluten", "Lactose"]
    },
    {
        id: 4,
        name: "Burrata Crémeuse",
        img: "https://images.unsplash.com/photo-1600628421066-f6bda6a7b976?auto=format&fit=crop&q=80&w=800",
        category: "entree",
        price: "9 000 FCFA",
        description: "Burrata, tomates anciennes, basilic, huile d'olive, fleur de sel",
        ingredients: ["Burrata", "Tomates", "Basilic", "Huile d'olive", "Fleur de sel"],
        isChefSpecial: false,
        isSeasonal: true,
        allergens: ["Lactose"]
    },

    // ==========================================
    // PLATS PRINCIPAUX
    // ==========================================
    {
        id: 5,
        name: "Filet de Bœuf",
        img: "https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&q=80&w=800",
        category: "plat_principal",
        price: "21 000 FCFA",
        description: "Filet de bœuf maturé, sauce truffe noire, purée de céleri-rave",
        ingredients: ["Bœuf", "Truffe noire", "Céleri-rave", "Beurre", "Échalotes"],
        isChefSpecial: true,
        allergens: ["Lactose"]
    },
    {
        id: 6,
        name: "Homard Bleu",
        img: "https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&q=80&w=800",
        category: "plat_principal",
        price: "32 500 FCFA",
        description: "Homard bleu, beurre blanc, légumes de saison, fenouil confit",
        ingredients: ["Homard", "Beurre blanc", "Fenouil", "Légumes", "Citron"],
        isChefSpecial: true,
        allergens: ["Crustacés", "Lactose"]
    },
    {
        id: 7,
        name: "Agneau de Lait",
        img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
        category: "plat_principal",
        price: "19 000 FCFA",
        description: "Carré d'agneau de lait, gratin dauphinois, thym, jus de cuisson",
        ingredients: ["Agneau", "Pommes de terre", "Thym", "Ail", "Crème"],
        isChefSpecial: false,
        allergens: ["Lactose"]
    },
    {
        id: 8,
        name: "Poulpe Grillé",
        img: "https://images.unsplash.com/photo-1534685784101-03a1af4d5f22?auto=format&fit=crop&q=80&w=800",
        category: "plat_principal",
        price: "17 000 FCFA",
        description: "Poulpe grillé, écrasé de pommes de terre, romesco, pistou",
        ingredients: ["Poulpe", "Pommes de terre", "Romesco", "Pistou", "Ail"],
        isChefSpecial: false,
        allergens: ["Ail"]
    },
    {
        id: 9,
        name: "Risotto aux Cèpes",
        img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800",
        category: "plat_principal",
        price: "16 000 FCFA",
        description: "Risotto crémeux aux cèpes, Parmesan 24 mois, huile de truffe",
        ingredients: ["Riz", "Cèpes", "Parmesan", "Truffe", "Vin blanc"],
        isChefSpecial: false,
        isSeasonal: true,
        allergens: ["Lactose", "Gluten"]
    },

    // ==========================================
    // DESSERTS
    // ==========================================
    {
        id: 10,
        name: "Sphère Chocolat",
        img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800",
        category: "dessert",
        price: "9 000 FCFA",
        description: "Sphère chocolat grand cru, framboise, croustillant praliné",
        ingredients: ["Chocolat", "Framboise", "Praliné", "Beurre", "Sucre"],
        isChefSpecial: true,
        allergens: ["Lactose", "Fruits à coque"]
    },
    {
        id: 11,
        name: "Tarte Tatin",
        img: "https://images.unsplash.com/photo-1623329876302-2d6e8d3dd9b7?auto=format&fit=crop&q=80&w=800",
        category: "dessert",
        price: "8 000 FCFA",
        description: "Tarte Tatin aux pommes, caramel beurre salé, glace vanille",
        ingredients: ["Pommes", "Caramel", "Beurre salé", "Vanille", "Pâte feuilletée"],
        isChefSpecial: false,
        allergens: ["Gluten", "Lactose"]
    },
    {
        id: 12,
        name: "Millefeuille Pistache",
        img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800",
        category: "dessert",
        price: "8 500 FCFA",
        description: "Millefeuille, crème pistache, framboises fraîches",
        ingredients: ["Pâte feuilletée", "Pistache", "Framboises", "Sucre", "Œufs"],
        isChefSpecial: false,
        allergens: ["Gluten", "Lactose", "Œufs", "Fruits à coque"]
    },
    {
        id: 13,
        name: "Cœur Fondant Chocolat",
        img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800",
        category: "dessert",
        price: "7 500 FCFA",
        description: "Cœur fondant au chocolat noir, glace vanille, coulis framboise",
        ingredients: ["Chocolat noir", "Beurre", "Œufs", "Vanille", "Framboise"],
        isChefSpecial: false,
        allergens: ["Lactose", "Œufs"]
    },

    // ==========================================
    // BOISSONS
    // ==========================================
    {
        id: 14,
        name: "Champagne Brut",
        img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800",
        category: "boisson",
        price: "22 500 FCFA",
        description: "Champagne Grand Cru, millésime 2015",
        ingredients: ["Champagne"],
        isChefSpecial: false,
        allergens: ["Sulfites"]
    },
    {
        id: 15,
        name: "Vin Rouge - Bordeaux",
        img: "https://images.unsplash.com/photo-1506377247377-2a5e3b4f8c1a?auto=format&fit=crop&q=80&w=800",
        category: "boisson",
        price: "19 000 FCFA",
        description: "Château Margaux, Grand Cru Classé 2018",
        ingredients: ["Vin rouge"],
        isChefSpecial: false,
        allergens: ["Sulfites"]
    },
    {
        id: 16,
        name: "Vin Blanc - Sancerre",
        img: "https://images.unsplash.com/photo-1567201528256-cb5d0d5d40a0?auto=format&fit=crop&q=80&w=800",
        category: "boisson",
        price: "16 000 FCFA",
        description: "Sancerre, Domaine Vacheron 2021",
        ingredients: ["Vin blanc"],
        isChefSpecial: false,
        allergens: ["Sulfites"]
    },
    {
        id: 17,
        name: "Cocktail Signature",
        img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
        category: "boisson",
        price: "8 000 FCFA",
        description: "Cocktail maison : gin, basilic, citron, miel, eau pétillante",
        ingredients: ["Gin", "Basilic", "Citron", "Miel", "Eau pétillante"],
        isChefSpecial: true,
        allergens: []
    },
    {
        id: 18,
        name: "Jus de Fruits Pressés",
        img: "https://images.unsplash.com/photo-1556679343-c7309271ae28?auto=format&fit=crop&q=80&w=800",
        category: "boisson",
        price: "4 000 FCFA",
        description: "Jus d'orange, citron, carotte et gingembre frais pressés",
        ingredients: ["Orange", "Citron", "Carotte", "Gingembre"],
        isChefSpecial: false,
        allergens: []
    }
];

// ==========================================
// UTILITAIRES POUR FILTRER
// ==========================================

export const getEntrees = () => MenuMeals.filter(item => item.category === 'entree');
export const getPlatsPrincipaux = () => MenuMeals.filter(item => item.category === 'plat_principal');
export const getDesserts = () => MenuMeals.filter(item => item.category === 'dessert');
export const getBoissons = () => MenuMeals.filter(item => item.category === 'boisson');
export const getChefSpecials = () => MenuMeals.filter(item => item.isChefSpecial === true);
export const getSeasonalItems = () => MenuMeals.filter(item => item.isSeasonal === true);

export default MenuMeals;