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
        img: "/saumon.png",
        category: "entree",
        description: "Saumon frais, avocat, mangue, vinaigrette yuzu"
    },
    {
        id: 2,
        name: "Foie Gras Mi-cuit",
        img: "/salade.png",
        category: "entree",
        description: "Foie gras, chutney de figues, pain d'épices toasté"
    },

    // ==========================================
    // PLATS PRINCIPAUX (2)
    // ==========================================
    {
        id: 3,
        name: "Filet de Bœuf",
        img: "/filetmeat.png",
        category: "plat_principal",
        description: "Filet de bœuf maturé, sauce truffe noire, purée de céleri"
    },
    {
        id: 4,
        name: "Homard Bleu",
        img: "/homardblue.png",
        category: "plat_principal",
        description: "Homard bleu, beurre blanc, légumes de saison"
    },

    // ==========================================
    // DESSERT (1)
    // ==========================================
    {
        id: 5,
        name: "Sphère Chocolat",
        img: "/dessert.png",
        category: "dessert",
        description: "Chocolat grand cru, framboise, croustillant praliné"
    },

    // ==========================================
    // BOISSON (1)
    // ==========================================
    {
        id: 6,
        name: "Champagne Brut",
        img: "/montagnecake.png",
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