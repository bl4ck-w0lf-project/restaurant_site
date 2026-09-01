import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import type { MenuItem } from '../data/MenuMeals';
import logo from '../assets/logo.png';

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  cartCount?: number;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) => {
  const formatCategory = (category: string) => {
    const categories: Record<string, string> = {
      entree: 'Entrée',
      plat_principal: 'Plat Principal',
      dessert: 'Dessert',
      boisson: 'Boisson',
    };
    return categories[category] || category;
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/\D/g, ''));
    return sum + price * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay sombre */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 border-l border-white/10 z-[9999] flex flex-col"
          >
            {/* Header avec logo centré */}
            <header className="relative flex items-center justify-center p-6 border-b border-white/10">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
              <button
                onClick={onClose}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                aria-label="Fermer le panier"
              >
                <X size={20} className="text-stone-300" />
              </button>
            </header>

            {/* Liste des produits (scrollable) */}
            <div className="flex-1 overflow-y-auto scrollbar-hide overscroll-contain p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-stone-500" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-2">Votre panier est vide</h3>
                  <p className="text-stone-400 text-sm">
                    Ajoutez vos plats préférés pour les retrouver ici.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4 p-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl hover:bg-white/[0.07] transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-white/10">
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
                      <p className="text-stone-400 text-xs line-clamp-2 mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-white font-medium text-sm">
                          {item.price}
                        </p>
                        {item.quantity > 1 && (
                          <span className="text-stone-400 text-xs">
                            ×{item.quantity}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bouton supprimer */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="shrink-0 self-start p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300"
                      aria-label={`Supprimer ${item.name}`}
                    >
                      <Trash2 size={16} className="text-stone-400 hover:text-red-400" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer avec les deux boutons empilés */}
            {cartItems.length > 0 && (
              <footer className="shrink-0 p-6 border-t border-white/10 space-y-3">
                {/* Total */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                  <span className="text-stone-400 text-sm">Total</span>
                  <span className="text-white font-serif text-xl">
                    {totalPrice.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>

                {/* Bouton Passer la commande (principal) */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCheckout}
                  className="w-full relative bg-[#FE652D] text-white py-3.5 px-6 rounded-xl font-medium text-base flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 hover:bg-[#e55520] hover:shadow-lg hover:shadow-[#FE652D]/30"
                >
                  <span>Passer la commande</span>
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full hover:translate-x-0 transition-transform duration-500" />
                </motion.button>

                {/* Bouton Vider le panier (secondaire) */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClearCart}
                  className="w-full bg-white/5 border border-white/10 text-stone-300 py-3 px-6 rounded-xl font-medium text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  Vider le panier
                </motion.button>
              </footer>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;