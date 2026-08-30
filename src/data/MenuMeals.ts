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
        img: "https://plus.unsplash.com/premium_photo-1664206964061-1ced4564c121?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        img: "https://images.unsplash.com/photo-1666013942517-4e697f20e9ec?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        img: "https://plus.unsplash.com/premium_photo-1719530305924-74a0118c0b7f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        img: "https://imgs.search.brave.com/KmjYpOkH9ItM7AtvJY_uEcGl0_qMyh9KMCWqgUTZ_cM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE1LzkyLzU4LzI0/LzM2MF9GXzE1OTI1/ODI0NzJfbW5RWkg3/TG1xdlRxM0REcm1N/ajZtTUJRMnJSYXFh/WTAuanBn",
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
        img: "https://imgs.search.brave.com/4BPoKKxPVSSQRytWD-6zyYC51HnpFlqqK1nZNcxHWr8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hdXZl/cnRhdmVjbGlsaS5m/ci93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8wNS9taWxsZWZl/dWlsbGUtbGVnZXIt/YXUtY2l0cm9uLWZy/YW1ib2lzZS1ldC1w/aXN0YWNoZS1sYS1y/ZWNldHRlLWlkZWFs/ZS5qcGc",
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
        img: "https://images.unsplash.com/photo-1534534358226-52672d8d2c0c?q=80&w=1196&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        img: "https://images.unsplash.com/photo-1562673478-900ecbd319cf?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        img: "https://imgs.search.brave.com/cMtJYMcN6wcK_t69Mx4ABdf6-2bJYad77PfQpvI_tP8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cGhvdG9zLWdyYXR1/aXRlL3Rvbm5lYXUt/Ym9pcy1ib3V0ZWls/bGUtdmVycmUtdmlu/XzIzLTIxNDgyMTQ5/NDAuanBnP3NlbXQ9/YWlzX2luY29taW5n/Jnc9NzQwJnE9ODA",
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
        img: "https://imgs.search.brave.com/4pRaxR0DyDuRcbja3RgbVgJlRyW9MqYYIV3BMOZRrP4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGF0b2Ntcy1hc3Nl/dHMuY29tLzg1NjIx/LzE3MjY1NjE3NTUt/dmlucy1kZS1ib3Vy/Z29nbmUtcXVlbHMt/YWNjb3Jkcy1hdmVj/LWxlLXNhbmNlcnJl/LndlYnA_Y3JvcD1m/b2NhbHBvaW50JmZp/dD1jcm9wJmZwLXg9/MC41JmZwLXk9MC41/JmF1dG89Y29tcHJl/c3Mmdz0xODAwJmg9/OTAwJTIwMXg",
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
        img: "https://plus.unsplash.com/premium_photo-1676642588287-ad44c524d3b6?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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