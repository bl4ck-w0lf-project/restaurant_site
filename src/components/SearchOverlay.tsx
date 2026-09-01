import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Check } from 'lucide-react';
import type { MenuItem } from '../data/MenuMeals';
import { FaShoppingCart } from "react-icons/fa";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
   onOpenCart?: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  searchValue,
  onSearchChange,
  items,
  onAddToCart,
   onOpenCart,
}) => {
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus automatique sur l'input à l'ouverture
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Fermeture avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Filtrage des résultats
  const filteredItems = items.filter((item) => {
    const searchLower = searchValue.toLowerCase();
    const nameMatch = item.name.toLowerCase().includes(searchLower);
    const categoryMatch = item.category.toLowerCase().includes(searchLower);
    return nameMatch || categoryMatch;
  });

  const formatCategory = (category: string) => {
    const categories: Record<string, string> = {
      entree: 'Entrée',
      plat_principal: 'Plat Principal',
      dessert: 'Dessert',
      boisson: 'Boisson',
    };
    return categories[category] || category;
  };

  const handleAddToCart = (item: MenuItem) => {
    onAddToCart(item);

    // Feedback visuel
    setAddedItems(prev => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
      // OUVRE LE PANIER
      if (onOpenCart) {
        onOpenCart();
      }
    }, 1000); // 1.5 secondes pour voir "Ajouté"
  };
 

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-[9999] p-4 sm:p-6"
          >
            <div className="max-w-2xl mx-auto">
              {/* Input de recherche */}
              <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                <div className="flex items-center gap-3 p-4 border-b border-white/10">
                  <Search size={20} className="text-stone-400 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Rechercher un plat ou une catégorie..."
                    className="flex-1 bg-transparent text-white placeholder-stone-500 outline-none text-base"
                  />
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                    aria-label="Fermer la recherche"
                  >
                    <X size={18} className="text-stone-300" />
                  </button>
                </div>

                {/* Résultats */}
                {searchValue && (
                  <div className="max-h-[60vh] overflow-y-auto scrollbar-hide overscroll-contain">
                    {filteredItems.length === 0 ? (
                      <div className="p-8 text-center">
                        <p className="text-stone-400 text-sm">Aucun plat trouvé</p>
                      </div>
                    ) : (
                      <div className="p-2 space-y-2">
                        {filteredItems.map((item) => {
                          const isAdded = addedItems.has(item.id);

                          return (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl hover:bg-white/[0.07] transition-all duration-300"
                            >
                              {/* Image */}
                              <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-white/10">
                                <img
                                  src={item.img}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Informations */}
                              <div className="flex-1 min-w-0">
                                <p className="text-[#FE652D] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                                  {formatCategory(item.category)}
                                </p>
                                <h4 className="text-white font-serif text-base mb-1 truncate">
                                  {item.name}
                                </h4>
                                <p className="text-stone-400 text-xs line-clamp-1 mb-1">
                                  {item.description}
                                </p>
                                <p className="text-white font-medium text-sm">
                                  {item.price}
                                </p>
                              </div>

                              {/* Bouton Ajouter */}
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAddToCart(item)}
                                disabled={isAdded}
                                className={`shrink-0 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all duration-300 ${isAdded
                                    ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                                    : 'bg-[#FE652D] text-white hover:bg-[#e55520]'
                                  }`}
                              >
                                {isAdded ? (
                                  <>
                                    <Check size={16} />
                                    <span className="hidden sm:inline">Ajouté</span>
                                  </>
                                ) : (
                                  <>
                                    <FaShoppingCart size={16} />
                                    <span className="hidden sm:inline">Ajouter au panier</span>
                                  </>
                                )}
                              </motion.button>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;