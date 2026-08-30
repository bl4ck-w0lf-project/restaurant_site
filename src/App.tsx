import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import Error404 from './pages/Error404';

import SearchOverlay from './components/SearchOverlay';
import CartDrawer, { type CartItem } from './components/CartDrawer';
import { MenuMeals, type MenuItem } from './data/MenuMeals';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 } as CartItem];
    });
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => setCartItems([]);

  return (
    <Router>
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      />

      {/*  SOLUTION RADICALE : Ce "pt-20" pousse le contenu sous la navbar fixe. Plus rien ne sera caché. */}
      <main className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu onAddToCart={handleAddToCart} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
        <Footer />
      </main>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => { setIsSearchOpen(false); setSearchValue(''); }}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        items={MenuMeals}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckout={() => { console.log('Passage à la caisse'); setIsCartOpen(false); }}
      />
    </Router>
  );
}

export default App;