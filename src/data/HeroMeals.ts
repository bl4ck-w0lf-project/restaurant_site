// src/data/HeroMeals.ts

export interface HeroMealItem {
    id: number;
    name: string;
    img: string;
    category: 'entree' | 'plat_principal' | 'dessert' | 'boisson';
    description: string;
}

export const HeroMeals: HeroMealItem[] = [
    // ==========================================
    // ENTRÉES (2)
    // ==========================================
    {
        id: 1,
        name: "Tartare de Saumon",
        img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600",
        category: "entree",
        description: "Saumon frais, avocat, mangue, vinaigrette yuzu"
    },
    {
        id: 2,
        name: "Foie Gras Mi-cuit",
        img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80&w=600",
        category: "entree",
        description: "Foie gras, chutney de figues, pain d'épices toasté"
    },

    // ==========================================
    // PLATS PRINCIPAUX (2)
    // ==========================================
    {
        id: 3,
        name: "Filet de Bœuf",
        img: "https://images.unsplash.com/photo-1666013942517-4e697f20e9ec?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "plat_principal",
        description: "Filet de bœuf maturé, sauce truffe noire, purée de céleri"
    },
    {
        id: 4,
        name: "Homard Bleu",
        img: "https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&q=80&w=600",
        category: "plat_principal",
        description: "Homard bleu, beurre blanc, légumes de saison"
    },

    // ==========================================
    // DESSERT (1)
    // ==========================================
    {
        id: 5,
        name: "Sphère Chocolat",
        img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=600",
        category: "dessert",
        description: "Chocolat grand cru, framboise, croustillant praliné"
    },

    // ==========================================
    // BOISSON (1)
    // ==========================================
    {
        id: 6,
        name: "Champagne Brut",
        img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600",
        category: "boisson",
        description: "Champagne Grand Cru, millésime 2015"
    }
];

// ==========================================
// UTILITAIRES
// ==========================================

export const getHeroEntrees = () => HeroMeals.filter(item => item.category === 'entree');
export const getHeroPlatsPrincipaux = () => HeroMeals.filter(item => item.category === 'plat_principal');
export const getHeroDesserts = () => HeroMeals.filter(item => item.category === 'dessert');
export const getHeroBoissons = () => HeroMeals.filter(item => item.category === 'boisson');

export default HeroMeals;