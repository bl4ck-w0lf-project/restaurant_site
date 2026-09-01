import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChefHat, Star, Check,
  Utensils, Soup, UtensilsCrossed, CakeSlice, Wine
} from 'lucide-react';
import { MenuMeals } from '../data/MenuMeals';
import type { MenuItem } from '../data/MenuMeals';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; 

// Configuration des catégories avec leurs icônes Lucide
const CATEGORY_CONFIG = [
  { key: 'Toutes', label: 'Toutes', icon: Utensils },
  { key: 'entree', label: 'Entrées', icon: Soup },
  { key: 'plat_principal', label: 'Plats', icon: UtensilsCrossed },
  { key: 'dessert', label: 'Desserts', icon: CakeSlice },
  { key: 'boisson', label: 'Boissons', icon: Wine },
];

interface MenuPageProps {
  onAddToCart: (item: MenuItem) => void;
  onOpenCart?: () => void;
}

export default function MenuPage({ onAddToCart, onOpenCart }: MenuPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Toutes');

  // Filtrage dynamique des plats
  const filteredMeals = useMemo(() => {
    if (activeCategory === 'Toutes') return MenuMeals;
    return MenuMeals.filter((meal: MenuItem) => meal.category === activeCategory);
  }, [activeCategory]);

  // Calcul dynamique du nombre de plats par catégorie
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Toutes: MenuMeals.length };
    CATEGORY_CONFIG.forEach(cat => {
      if (cat.key !== 'Toutes') {
        counts[cat.key] = MenuMeals.filter(m => m.category === cat.key).length;
      }
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-[#FE652D] selection:text-white">
      <main className="w-full">
        {/* ========================================== */}
        {/* 1. HERO MENU */}
        {/* ========================================== */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1920"
              alt="Composition culinaire premium"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-950/60" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative z-10 text-center text-white px-6 max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-[#FE652D]/40 bg-white/5 backdrop-blur-sm"
            >
              <span className="font-montserrat text-xs font-medium tracking-[0.3em] uppercase text-white/90">
                Notre Carte
              </span>
            </motion.div>

            <h1 className="font-syne text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.95] tracking-tight">
              Une cuisine pensée pour <br />
              <span className="italic text-[#FE652D]">éveiller les sens.</span>
            </h1>

            <p className="font-outfit text-stone-200 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Découvrez une sélection de créations imaginées autour des produits,
              des saisons et du savoir-faire de notre cuisine.
            </p>
          </motion.div>
        </section>

        {/* ========================================== */}
        {/* 2. SECTION FILTRE + GRILLE (STYLE HERO CORRIGÉ) */}
        {/* ========================================== */}
        <section className="relative px-4 sm:px-6 py-12 md:py-16 pb-32 overflow-hidden">
          
          {/* ===== FOND IMAGE + OVERLAY (Formule Hero) ===== */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://plus.unsplash.com/premium_photo-1673809798817-457be4736fa4?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Ambiance restaurant sombre"
              className="w-full h-full object-cover scale-105"
            />
            {/* Overlay identique au Hero pour que l'image ressorte bien */}
            <div className="absolute inset-0 bg-stone-950/80" />
            {/* Vignettage subtil pour focaliser l'attention au centre et faire "pop" le glassmorphism */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
          </div>

          {/* ===== CONTENU (z-10 pour être au-dessus du fond) ===== */}
          <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10">

            {/* ===== COLONNE GAUCHE : FILTRES ===== */}
                        {/* ===== COLONNE GAUCHE : FILTRES ===== */}
            <aside className="w-full lg:w-72 flex-shrink-0 self-start">
              <div className="sticky top-24 lg:top-28 bg-white/[0.05] backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-2xl shadow-black/40">
                
                <div className="mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
                  <span className="text-stone-400 text-xs uppercase tracking-widest font-medium">Total</span>
                  <span className="text-white font-serif text-xl">{MenuMeals.length} plats</span>
                </div>

                <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
                  {CATEGORY_CONFIG.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.key;
                    const count = categoryCounts[cat.key] || 0;

                    return (
                      <motion.button
                        key={cat.key}
                        onClick={() => setActiveCategory(cat.key)}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 whitespace-nowrap flex-1 lg:flex-none
                          ${isActive
                            ? 'bg-[#FE652D] text-white shadow-lg shadow-[#FE652D]/30'
                            : 'text-stone-400 hover:text-white hover:bg-white/10'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className={isActive ? 'text-white' : 'text-stone-500'} />
                          <span>{cat.label}</span>
                        </div>
                        <span className={`text-xs ${isActive ? 'text-white/80' : 'text-stone-600'}`}>
                          {count}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* ===== COLONNE DROITE : GRILLE DES PLATS ===== */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {filteredMeals.length > 0 ? (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  >
                    {filteredMeals.map((meal: MenuItem, index) => (
                      <MealCard 
                        key={meal.id} 
                        meal={meal} 
                        index={index} 
                        onAdd={onAddToCart} 
                         onOpenCart={onOpenCart} 
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-24 text-center bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <ChefHat size={32} className="text-stone-600" />
                    </div>
                    <h3 className="text-xl font-serif text-white mb-2">Aucun plat trouvé</h3>
                    <p className="text-stone-500">Essayez une autre catégorie ou revenez plus tard.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ==========================================
// COMPOSANT CARTE DE PLAT
// ==========================================
interface MealCardProps {
  meal: MenuItem;
  index: number;
  onAdd: (meal: MenuItem) => void;
  onOpenCart?: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, index, onAdd, onOpenCart }) => {
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate(); ;

  const categoryLabel = meal.category === 'entree' ? 'Entrées' :
    meal.category === 'plat_principal' ? 'Plats' :
      meal.category === 'dessert' ? 'Desserts' : 'Boissons';

  const handleAddClick = () => {
    onAdd(meal);
    setIsAdded(true);
     setTimeout(() => {
      setIsAdded(false);
      // OUVRE LE PANIER APRÈS AJOUT
      if (onOpenCart) {
        onOpenCart();
      }
    }, 1000);

  };
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="group relative flex flex-row overflow-hidden rounded-3xl border border-white/30 border-1 bg-white/[0.05] backdrop-blur-md shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/40 p-3 sm:p-4"
    >
      {meal.isChefSpecial && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-[#FE652D] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">
          <Star size={10} fill="currentColor" />
          <span>Chef's Choice</span>
        </div>
      )}

      <div className="relative shrink-0 w-[40%] sm:w-[45%] rounded-2xl border border-white/10 overflow-hidden bg-stone-900/30">
        <img
          src={meal.img}
          alt={meal.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex-1 flex flex-col pl-4 sm:pl-5">
        <span className="text-[#FE652D] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-2">
          {categoryLabel}
        </span>

        <h3 className="text-white font-serif text-lg sm:text-xl mb-2 leading-tight group-hover:text-[#FE652D] transition-colors duration-300">
          {meal.name}
        </h3>

        <p className="text-stone-400 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
          {meal.description}
        </p>

        <div className="mt-auto pt-2">
          <div className="text-white font-medium text-base sm:text-lg mb-3">
            {meal.price}
          </div>

          <motion.button
            whileHover={isAdded ? {} : { scale: 1.02 }}
            whileTap={isAdded ? {} : { scale: 0.98 }}
            onClick={handleAddClick}
            disabled={isAdded}
            className={`w-full sm:w-auto relative py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 ${
              isAdded
                ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                : 'bg-[#FE652D] text-white hover:bg-[#e55520]'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={16} />
                <span>Ajouté</span>
              </>
            ) : (
              <>
                <FaShoppingCart size={16} className="transition-transform duration-300 group-hover/btn:scale-125" />
                <span>Ajouter au panier</span>
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};