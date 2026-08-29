import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChefHat, Wine, UtensilsCrossed, MapPin, Phone, Mail,
  Clock, ArrowRight, Star, Award, Users, Fish, Coffee, Pizza
} from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import EchoText from '../components/EchoText';

// ==========================================
// DONNÉES - PLATS AVEC VRAIES PHOTOS
// ==========================================
const ORBITAL_DISHES = [
  { id: 1, name: "Filet de Bœuf", desc: "Sauce truffe noire, purée de céleri", img: "https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "Saint-Jacques", desc: "Émulsion de chou-fleur, noisettes torréfiées", img: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "Risotto aux Cèpes", desc: "Parmesan 24 mois, huile de truffe", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Dessert Signature", desc: "Chocolat grand cru, framboise, croustillant", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600" },
  { id: 5, name: "Homard Bleu", desc: "Beurre blanc, légumes de saison", img: "https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&q=80&w=600" },
  { id: 6, name: "Agneau de Lait", desc: "Gratin dauphinois, thym", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600" },
];

const BENTO_MENU = [
  { id: 1, title: "Tartare de Saumon", category: "Entrée", price: "24€", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800", size: "large" },
  { id: 2, title: "Foie Gras Mi-cuit", category: "Entrée", price: "28€", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80&w=800", size: "small" },
  { id: 3, title: "Homard Bleu", category: "Plat", price: "65€", img: "https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&q=80&w=800", size: "medium" },
  { id: 4, title: "Agneau de Lait", category: "Plat", price: "42€", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", size: "tall" },
  { id: 5, title: "Sphère Chocolat", category: "Dessert", price: "18€", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800", size: "small" },
  { id: 6, title: "Poulpe Grillé", category: "Plat", price: "38€", img: "https://images.unsplash.com/photo-1534685784101-03a1af4d5f22?auto=format&fit=crop&q=80&w=800", size: "medium" },
];

// ==========================================
// COMPOSANTS
// ==========================================

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12 text-center">
    {subtitle && <span className="text-[#FE652D] font-medium tracking-[0.3em] text-sm uppercase mb-4 block">{subtitle}</span>}
    <h2 className="text-4xl md:text-5xl font-serif text-stone-900">{children}</h2>
    <div className="w-16 h-0.5 bg-[#FE652D] mx-auto mt-6" />
  </div>
);

// ==========================================
// HERO - ORBITAL COMPOSITION (MODIFIÉE)
// ==========================================
const OrbitalHero = () => {
  const [activeId, setActiveId] = useState(1);
  const [rotation, setRotation] = useState(0);
  const activeDish = ORBITAL_DISHES.find(d => d.id === activeId) || ORBITAL_DISHES[0];

  // Rotation automatique lente
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.15) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleDishClick = (id: number) => {
    if (id !== activeId) setActiveId(id);
  };

  const orbitalDishes = ORBITAL_DISHES.filter(d => d.id !== activeId);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#FDFBF7]">
      {/* ===== BACKGROUND PATTERN ===== */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-20 left-10 rotate-12"><UtensilsCrossed size={120} strokeWidth={1} /></div>
        <div className="absolute bottom-40 right-20 -rotate-12"><Wine size={100} strokeWidth={1} /></div>
        <div className="absolute top-1/2 left-1/4 rotate-45"><ChefHat size={80} strokeWidth={1} /></div>
      </div>

      {/* ===== LIGNE DIAGONALE ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-px h-[120%] bg-gradient-to-b from-transparent via-[#FE652D]/20 to-transparent rotate-12 origin-top" />
        <div className="absolute top-[15%] right-[22%] w-8 h-8 rounded-full bg-[#FE652D]/10 blur-sm" />
        <div className="absolute bottom-[20%] left-[30%] w-6 h-6 rounded-full bg-[#FE652D]/10 blur-sm" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ===== PARTIE GAUCHE : ÉDITORIAL AVEC ECHO TEXT ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-block mb-6 px-4 py-1.5 border border-[#FE652D]/20 rounded-full">
              <span className="text-[#FE652D] text-xs font-medium tracking-[0.3em] uppercase">Gastronomie étoilée</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-stone-900 leading-[0.95] mb-8">
              L'ART DE LA
             <br />
              <span className="inline-block mt-2">
                <EchoText
                  text="PASSION"
                  color="#FE652D"
                  tint="#FFD8C8" // Orange très clair pour l'effet d'écho
                  mode="both"
                  direction="diagonal" // Effet dynamique et élégant
                  echoes={6} // Nombre d'échos (subtil)
                  lag={0.3}
                  offset={56} // Distance de l'écho
                  fontSize="inherit" // S'adapte à la taille du h1
                  className="italic"
                />
              </span>
              <br /> CULINAIRE
            </h1>

            <p className="text-stone-600 text-lg md:text-xl max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
              Une expérience gastronomique contemporaine où chaque ingrédient raconte une histoire, dans un cadre d'exception.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FE652D] text-white px-8 py-4 rounded-xl font-medium tracking-wide shadow-lg shadow-[#FE652D]/30 hover:shadow-[#FE652D]/50 transition-all flex items-center justify-center gap-2"
              >
                Réserver une table <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(254, 101, 45, 0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-stone-900 text-stone-900 px-8 py-4 rounded-xl font-medium tracking-wide hover:border-[#FE652D] hover:text-[#FE652D] transition-all"
              >
                Découvrir le menu
              </motion.button>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-10 justify-center lg:justify-start text-sm text-stone-500">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#FE652D] fill-[#FE652D]" />
                <span>Étoilé Michelin</span>
              </div>
              <div className="w-px h-4 bg-stone-300" />
              <div className="flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-[#FE652D]" />
                <span>Chef étoilé</span>
              </div>
            </div>
          </motion.div>

          {/* ===== PARTIE DROITE : ORBITAL INTERACTIF (CADRES CARRÉS) ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 relative w-full max-w-2xl aspect-square flex items-center justify-center"
          >
            {/* Orbites décoratives */}
            <div className="absolute inset-0 border border-stone-200/30 rounded-full scale-[0.95] opacity-50" />
            <div className="absolute inset-0 border border-dashed border-stone-300/40 rounded-full scale-[0.75] opacity-60 animate-[spin_80s_linear_infinite]" />

            {/* ===== PLAT CENTRAL (CADRE CARRÉ + TEXTE SÉPARÉ) ===== */}
            <motion.div
              key={`center-${activeId}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-20 w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl shadow-stone-900/20 cursor-default group"
            >
              <img src={activeDish.img} alt={activeDish.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
              {/* CADRE DE TEXTE SÉPARÉ EN BAS DE L'IMAGE */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-stone-900/80 backdrop-blur-md border-t border-white/10">
                <h3 className="text-white font-serif text-2xl leading-none">{activeDish.name}</h3>
                <p className="text-stone-300 text-sm mt-2 font-light">{activeDish.desc}</p>
              </div>
            </motion.div>

            {/* ===== PLATS ORBITAUX (CADRES CARRÉS) ===== */}
            {orbitalDishes.map((dish, index) => {
              const orbitRadius = 320; // Rayon ajusté pour les carrés
              const angle = (index / orbitalDishes.length) * 2 * Math.PI + (rotation * Math.PI / 180);
              const x = Math.cos(angle) * orbitRadius;
              const y = Math.sin(angle) * orbitRadius;

              return (
                <motion.div
                  key={dish.id}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ x, y, scale: 0.65, opacity: 0.9 }}
                  whileHover={{ scale: 0.8, opacity: 1, zIndex: 30 }}
                  onClick={() => handleDishClick(dish.id)}
                  className="absolute w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-xl cursor-pointer z-10 border-2 border-white"
                >
                  <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-all duration-300" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// ABOUT SECTION
// ==========================================
const AboutSection = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative"
        >
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#FE652D]" />
          <img
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800"
            alt="Intérieur du restaurant"
            className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
          />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#FE652D]" />
          <div className="absolute -bottom-6 -left-6 bg-white shadow-xl rounded-xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#FE652D]/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-[#FE652D]" />
            </div>
            <div>
              <p className="text-sm font-medium text-stone-900">Étoile Michelin</p>
              <p className="text-xs text-stone-500">2024</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1"
        >
          <span className="text-[#FE652D] font-medium tracking-[0.3em] text-sm uppercase mb-4 block">Notre Histoire</span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 leading-tight">
            Un héritage de <br />saveurs authentiques
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed mb-6 font-light">
            Fondé sur la conviction que la grande cuisine est un art de l'équilibre, notre restaurant célèbre les produits du terroir sublimés par des techniques contemporaines. Chaque assiette est une toile, chaque bouchée une émotion.
          </p>
          <a href="/about" className="inline-flex items-center gap-2 mt-8 text-[#FE652D] font-medium border-b border-[#FE652D] pb-1 hover:text-stone-900 hover:border-stone-900 transition-colors">
            En savoir plus <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

// ==========================================
// BENTO MENU SECTION
// ==========================================
const BentoMenu = () => (
  <section className="py-24 bg-[#FDFBF7]">
    <div className="container mx-auto px-6">
      <SectionTitle subtitle="Nos Créations">La Carte</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-4 gap-4 md:h-[700px]">
        {BENTO_MENU.map((item, index) => {
          const sizeClasses = {
            large: "md:col-span-2 md:row-span-2",
            small: "md:col-span-1 md:row-span-1",
            medium: "md:col-span-2 md:row-span-1",
            tall: "md:col-span-1 md:row-span-2",
          }[item.size] || "md:col-span-1 md:row-span-1";

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${sizeClasses}`}
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[#FE652D] text-xs font-bold tracking-[0.2em] uppercase mb-1 block">{item.category}</span>
                <h3 className="text-white font-serif text-xl md:text-2xl mb-1">{item.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-stone-300 font-medium">{item.price}</span>
                  <div className="w-8 h-8 rounded-full bg-[#FE652D] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <ArrowRight size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="text-center mt-12">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="border-2 border-stone-900 text-stone-900 px-10 py-3 rounded-xl font-medium tracking-wide hover:bg-stone-900 hover:text-white transition-all duration-300">
          Voir la carte complète
        </motion.button>
      </div>
    </div>
  </section>
);

// ==========================================
// RESERVATION SECTION
// ==========================================
const ReservationSection = () => (
  <section className="relative py-32 flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1920" alt="Ambiance" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-stone-900/70" />
    </div>
    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10 text-center text-white px-6 max-w-3xl">
      <Star className="w-10 h-10 text-[#FE652D] mx-auto mb-6 fill-[#FE652D]" />
      <h2 className="text-4xl md:text-6xl font-serif mb-6">Réservez votre table</h2>
      <p className="text-stone-300 text-lg md:text-xl mb-10 font-light leading-relaxed">
        Offrez-vous une expérience gastronomique inoubliable. <br className="hidden md:block" />
        Notre équipe se tient à votre disposition pour préparer votre soirée.
      </p>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-[#FE652D] text-white px-10 py-4 rounded-xl font-medium tracking-wide shadow-lg shadow-[#FE652D]/40 hover:shadow-[#FE652D]/60 transition-all text-lg">
        Réserver maintenant
      </motion.button>
    </motion.div>
  </section>
);

// ==========================================
// CONTACT SECTION
// ==========================================
const ContactSection = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <span className="text-[#FE652D] font-medium tracking-[0.3em] text-sm uppercase mb-4 block">Contact</span>
          <h2 className="text-4xl font-serif text-stone-900 mb-8">Nous trouver</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-[#FE652D] shrink-0 group-hover:bg-[#FE652D] group-hover:text-white transition-all duration-300">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-medium text-stone-900 mb-1">Adresse</h4>
                <p className="text-stone-600">12 Avenue de la Gastronomie<br />75008 Paris, France</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-[#FE652D] shrink-0 group-hover:bg-[#FE652D] group-hover:text-white transition-all duration-300">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-medium text-stone-900 mb-1">Téléphone</h4>
                <p className="text-stone-600">+33 1 23 45 67 89</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <a href="#" className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-[#FE652D] hover:text-white transition-all duration-300">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-[#FE652D] hover:text-white transition-all duration-300">
              <FaFacebook size={20} />
            </a>
          </div>
        </div>
        <div className="bg-stone-100 rounded-2xl h-[450px] flex items-center justify-center relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800" alt="Carte" className="absolute inset-0 w-full h-full object-cover opacity-80" />
          <div className="relative z-10 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center max-w-xs">
            <MapPin className="w-6 h-6 text-[#FE652D] mx-auto mb-2" />
            <p className="font-serif text-xl text-stone-900 mb-2">Au cœur de Paris</p>
            <p className="text-stone-600 text-sm">À 2 min du métro Concorde</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ==========================================
// FOOTER
// ==========================================
const Footer = () => (
  <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-1">
          <h3 className="text-2xl font-serif text-white mb-4">L'Art Culinaire</h3>
          <p className="text-sm leading-relaxed mb-6">Une expérience gastronomique contemporaine où la passion du goût rencontre l'élégance du service.</p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-[#FE652D] transition-colors">Accueil</a></li>
            <li><a href="/about" className="hover:text-[#FE652D] transition-colors">À propos</a></li>
            <li><a href="/menu" className="hover:text-[#FE652D] transition-colors">La Carte</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Légal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#FE652D] transition-colors">Mentions légales</a></li>
            <li><a href="#" className="hover:text-[#FE652D] transition-colors">CGV</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Newsletter</h4>
          <div className="flex">
            <input type="email" placeholder="Votre email" className="bg-stone-800 border-none text-white px-4 py-2 rounded-l-xl w-full focus:ring-1 focus:ring-[#FE652D] outline-none text-sm" />
            <button className="bg-[#FE652D] text-white px-4 py-2 rounded-r-xl hover:bg-[#e55a25] transition-colors">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>&copy; {new Date().getFullYear()} L'Art Culinaire. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
);

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================
export default function Home() {
  return (
    <main className="bg-[#FDFBF7] text-stone-900 font-sans antialiased selection:bg-[#FE652D] selection:text-white">
      <Navbar />
      <OrbitalHero />
      <AboutSection />
      <BentoMenu />
      <ReservationSection />
      <ContactSection />
      <Footer />
    </main>
  );
}