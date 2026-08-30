import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChefHat, Wine, UtensilsCrossed, MapPin, Phone,
  Clock, ArrowRight, Star, Award, Fish, Coffee,
  Cake, Martini,
} from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

import EchoText from '../components/EchoText';
import MagicBento from '../components/MagicBento';
import { HeroMeals } from '../data/HeroMeals';
import { Link } from 'react-router-dom';
import { MenuMeals } from '../data/MenuMeals';



// ==========================================
// HERO - ORBITAL COMPOSITION (DARK MODE PREMIUM & RESPONSIVE)
// ==========================================
const OrbitalHero = () => {
  const [activeId, setActiveId] = useState(HeroMeals[0]?.id || 1);
  const [rotation, setRotation] = useState(0);
  const activeDish = HeroMeals.find(d => d.id === activeId) || HeroMeals[0];

  //  1. RAYON D'ORBITE DYNAMIQUE (Sécurisé et corrigé)
  const [orbitRadius, setOrbitRadius] = useState(130); // Valeur par défaut safe (mobile)

  useEffect(() => {
    // Fonction qui met à jour le rayon selon la taille de l'écran
    const updateRadius = () => {
      if (window.innerWidth < 360) {
        setOrbitRadius(130); // Mobile : rayon serré mais visible
      } else if (window.innerWidth < 640) {
        setOrbitRadius(180); // Tablette : rayon moyen (corrigé de 30 à 200)
      }
      else if (window.innerWidth < 1024) {
        setOrbitRadius(300); // Tablette : rayon moyen (corrigé de 30 à 200)
      } else {
        setOrbitRadius(350); // Desktop : rayon large
      }
    };

    updateRadius(); // Calcul immédiat et sécurisé au montage du composant
    window.addEventListener('resize', updateRadius);

    // Rotation automatique
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.2) % 360);
    }, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateRadius);
    };
  }, []);

  const handleDishClick = (id: number) => {
    if (id !== activeId) setActiveId(id);
  };

  const orbitalDishes = HeroMeals.filter(d => d.id !== activeId);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      {/* ===== BACKGROUND DÉTAILS CULINAIRES (BLANC SUBTIL) ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 rotate-12 text-white/10"><UtensilsCrossed size={140} strokeWidth={1} /></div>
        <div className="absolute bottom-40 right-20 -rotate-12 text-white/10"><Wine size={120} strokeWidth={1} /></div>
        <div className="absolute top-1/3 left-1/4 rotate-45 text-white/10"><ChefHat size={100} strokeWidth={1} /></div>
        <div className="absolute top-20 right-1/3 -rotate-12 text-white/10"><Fish size={90} strokeWidth={1} /></div>
        <div className="absolute bottom-1/3 left-1/5 rotate-12 text-white/10"><Coffee size={80} strokeWidth={1} /></div>
        <div className="absolute top-1/2 right-10 rotate-45 text-white/10"><Martini size={110} strokeWidth={1} /></div>
        <div className="absolute bottom-20 left-1/3 -rotate-12 text-white/10"><Cake size={85} strokeWidth={1} /></div>
      </div>

      {/* ===== LIGNE DIAGONALE ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-px h-[120%] bg-gradient-to-b from-transparent via-[#FE652D]/30 to-transparent rotate-12 origin-top" />
        <div className="absolute top-[15%] right-[22%] w-8 h-8 rounded-full bg-[#FE652D]/10 blur-sm" />
        <div className="absolute bottom-[20%] left-[30%] w-6 h-6 rounded-full bg-[#FE652D]/10 blur-sm" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ===== PARTIE GAUCHE : ÉDITORIAL ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left w-full"
          >
            <div className="inline-block mb-6 px-4 py-1.5 border border-[#FE652D]/30 rounded-full bg-white/5 backdrop-blur-sm">
              <span className="text-[#FE652D] text-xs font-medium tracking-[0.3em] uppercase">Gastronomie étoilée</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-montserrat text-white leading-[1.1] lg:leading-[0.95] mb-6 lg:mb-8">
              L'ART DE LA <br />
              <span className="inline-block mt-1 lg:mt-2">
                <EchoText
                  text="PASSION"
                  color="#FE652D"
                  tint="#FFD8C8"
                  mode="both"
                  direction="right"
                  echoes={4}
                  lag={0.3}
                  offset={20}
                  fontSize="inherit"
                  className="italic"
                />
              </span>
              <br /> CULINAIRE
            </h1>

            <p className="text-stone-400 text-base sm:text-lg md:text-xl max-w-md mx-auto lg:mx-0 mb-8 lg:mb-10 text-syne font-light">
              Une expérience gastronomique contemporaine où chaque ingrédient raconte une histoire, dans un cadre d'exception.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/reservation" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#FE652D] text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-medium tracking-wide shadow-lg shadow-[#FE652D]/30 hover:shadow-[#FE652D]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Réserver une table <ArrowRight size={18} />
                </motion.div>
              </Link>

              <Link to="/menu" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/20 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-medium tracking-wide hover:bg-white/5 hover:border-[#FE652D] hover:text-[#FE652D] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Découvrir le menu <ArrowRight size={18} />
                </motion.div>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 lg:mt-10 justify-center lg:justify-start text-xs sm:text-sm text-stone-400">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#FE652D] fill-[#FE652D]" />
                <span>Étoilé Michelin</span>
              </div>
              <div className="w-px h-4 bg-stone-700 hidden sm:block" />
              <div className="flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-[#FE652D]" />
                <span>Chef étoilé</span>
              </div>
            </div>
          </motion.div>

          {/* ===== PARTIE DROITE : ORBITAL INTERACTIF ===== */}
          {/*  2. CONTENEUR STABLE : min-h garantit que l'orbite ne s'écrase pas sur mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl aspect-square min-h-[400px] sm:min-h-[500px] flex items-center justify-center"
          >
            {/* Orbites adaptées au dark mode */}
            <div className="absolute inset-0 border border-white/10 rounded-full scale-[0.95] opacity-50" />
            <div className="absolute inset-0 border border-dashed border-white/20 rounded-full scale-[0.75] opacity-60 animate-[spin_80s_linear_infinite]" />

            {/* ===== PLAT CENTRAL ===== */}
            {/*  3. TAILLES RESPONSIVES : Plus petit sur mobile, progressif vers desktop */}
            <motion.div
              key={`center-${activeId}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-20 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 overflow-hidden rounded-2xl cursor-default group shadow-2xl shadow-black/50"
            >
              <img
                src={activeDish.img}
                alt={activeDish.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Cadre de texte (Glassmorphism Dark) */}
              <div className="hidden md:block absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 p-2 sm:p-4 bg-stone-900/80 backdrop-blur-md rounded-lg sm:rounded-xl border border-white/10 shadow-lg">
                <h3 className="text-white font-serif text-sm sm:text-xl md:text-2xl leading-none">{activeDish.name}</h3>
                <p className="text-stone-400 text-[10px] sm:text-sm mt-1 sm:mt-2 font-light line-clamp-2">{activeDish.description}</p>
              </div>
            </motion.div>

            {/* ===== PLATS ORBITAUX ===== */}
            {orbitalDishes.map((dish, index) => {
              const angle = (index / orbitalDishes.length) * 2 * Math.PI + (rotation * Math.PI / 180);
              const x = Math.cos(angle) * orbitRadius;
              const y = Math.sin(angle) * orbitRadius;

              return (
                <motion.div
                  key={dish.id}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ x, y, scale: 0.7, opacity: 0.9 }} // Scale de base plus petit pour mobile
                  whileHover={{ scale: 0.9, opacity: 1, zIndex: 30 }}
                  onClick={() => handleDishClick(dish.id)}
                  //  4. TAILLES DES SPLATS RESPONSIVES
                  className="absolute w-[150px] h-[150px] sm:w-40 sm:h-40 md:w-50 md:h-50 lg:w-42 lg:h-42 rounded-xl overflow-hidden shadow-xl cursor-pointer z-10 border border-white/20 sm:border-2"
                >
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 hover:bg-black/0 transition-all duration-300" />
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
// ABOUT SECTION - DARK MODE
// ==========================================
const AboutSection = () => (
  <section className="py-24 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
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
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800"
            alt="Plat gastronomique"
            className="w-full h-[500px] object-cover rounded-2xl shadow-2xl shadow-black/40"
          />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#FE652D]" />
          <div className="absolute -bottom-6 -left-6 bg-stone-800/90 backdrop-blur-sm shadow-xl rounded-xl p-4 flex items-center gap-3 border border-white/10">
            <div className="w-12 h-12 rounded-full bg-[#FE652D]/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-[#FE652D]" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Étoile Michelin</p>
              <p className="text-xs text-stone-400">2024</p>
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
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
            Un héritage de <br />saveurs authentiques
          </h2>
          <p className="text-stone-300 text-lg leading-relaxed mb-6 font-light">
            Fondé sur la conviction que la grande cuisine est un art de l'équilibre, notre restaurant célèbre les produits du terroir sublimés par des techniques contemporaines. Chaque assiette est une toile, chaque bouchée une émotion.
          </p>
          <a href="/about" className="inline-flex items-center gap-2 mt-8 text-[#FE652D] font-medium border-b border-[#FE652D] pb-1 hover:text-white hover:border-white transition-colors">
            En savoir plus <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);


// ==========================================
// MENU SECTION
// ==========================================
const MenuSection = () => {
  const bentoItems = [
    ...MenuMeals.filter(item => item.category === 'entree').slice(0, 2),
    ...MenuMeals.filter(item => item.category === 'plat_principal').slice(0, 2),
    ...MenuMeals.filter(item => item.category === 'dessert').slice(0, 1),
    ...MenuMeals.filter(item => item.category === 'boisson').slice(0, 1),
  ];

  const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
    <div className="mb-12 text-center">
      {subtitle && <span className="text-[#FE652D] font-medium tracking-[0.3em] text-sm uppercase mb-4 block">{subtitle}</span>}
      <h2 className="text-4xl md:text-5xl font-serif text-[#FE652D]">{children}</h2>
      <div className="w-16 h-0.5 bg-[#FE652D] mx-auto mt-6" />
    </div>
  );

  return (
    <section className="py-16 bg-[#120F17]">
      <div className="container mx-auto px-6 py-10 ">
        <SectionTitle subtitle="Nos Créations">La Carte</SectionTitle>

        <MagicBento
          items={bentoItems}
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={700}
          particleCount={100}
          glowColor="254, 101, 45"
          disableAnimations={false}
        />

        <div className="mt-16 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-3 bg-[#FE652D] text-white px-10 py-4 rounded-xl font-bold text-base tracking-wide shadow-xl shadow-[#FE652D]/30 hover:bg-[#e55520] hover:shadow-[#FE652D]/50 hover:-translate-y-1 transition-all duration-300"
          >
            <span>Voir le menu complet</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
};


// ==========================================
// RESERVATION SECTION (VERSION PREMIUM)
// ==========================================
const ReservationSection = () => (
  <section className="relative py-32 flex items-center justify-center overflow-hidden">

    {/* ===== IMAGE DE FOND : VRAI PLAT GASTRONOMIQUE ===== */}
    <div className="absolute inset-0 z-0">
      {/* Photo d'un plat gastronomique premium (bien visible) */}
      <img
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1920"
        alt="Plat gastronomique"
        className="w-full h-full object-cover scale-105"
      />
      {/* Overlay sombre élégant pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-500/85 via-stone-800/75 to-black/20" />
      {/* Texture subtile en plus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>

    {/* ===== CONTENU ===== */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative z-10 text-center text-white px-6 max-w-4xl"
    >

      {/* Badge "Expérience Signature" en Montserrat */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-[#FE652D]/40 bg-white/5 backdrop-blur-sm"
      >
        <Star className="w-4 h-4 text-[#FE652D] fill-[#FE652D]" />
        <span className="font-montserrat text-xs font-medium tracking-[0.3em] uppercase text-white/90">
          Expérience Signature
        </span>
      </motion.div>

      {/* Titre principal en Syne (très éditorial) */}
      <h2 className="font-syne text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.95] tracking-tight">
        Réservez votre <br />
        <span className="italic text-[#FE652D]">table</span>
      </h2>

      {/* Description en Outfit (lisible et contemporaine) */}
      <p className="font-outfit text-stone-200 text-lg md:text-xl mb-12 font-light leading-relaxed max-w-2xl mx-auto">
        Plongez dans un univers où chaque détail est pensé pour éveiller vos sens.
        Notre chef et son équipe vous accueillent dans un cadre d'exception pour une
        <span className="text-[#FE652D] font-medium"> soirée gastronomique inoubliable</span>,
        sublimée par des produits de saison et un service attentionné.
      </p>

      {/* Infos pratiques en Montserrat (technique et premium) */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12 font-montserrat text-sm text-stone-300">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#FE652D]" />
          <span>Mardi - Samedi</span>
        </div>
        <div className="hidden md:block w-px h-4 bg-stone-600" />
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="w-4 h-4 text-[#FE652D]" />
          <span>Dîner 19h - 23h</span>
        </div>
        <div className="hidden md:block w-px h-4 bg-stone-600" />
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-[#FE652D]" />
          <span>+33 1 23 45 67 89</span>
        </div>
      </div>

      {/*  BOUTON CORRIGÉ : 100% VISIBLE ET REDIRECTION ACTIVE */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="./reservation"
          className="group relative inline-flex  items-center justify-center gap-3 bg-[#FE652D] text-white px-10 py-4 rounded-xl font-montserrat font-bold tracking-wide shadow-2xl shadow-[#FE652D]/40 hover:bg-[#e55520] hover:shadow-[#FE652D]/70 transition-all duration-300"
        >
          <span className="relative z-10 text-base">Réserver maintenant</span>
          <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>

      {/* Petit texte d'invitation en Outfit */}
      <p className="font-outfit text-stone-400 text-sm mt-8 italic">
        Confirmation immédiate · Annulation gratuite jusqu'à 24h avant
      </p>
    </motion.div>
  </section>
);

// ==========================================
// CONTACT SECTION - DARK MODE
// ==========================================
const ContactSection = () => (
  <section className="py-24 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <span className="text-[#FE652D] font-medium tracking-[0.3em] text-sm uppercase mb-4 block">Contact</span>
          <h2 className="text-4xl font-serif text-white mb-8">Nous trouver</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-stone-800/50 flex items-center justify-center text-[#FE652D] shrink-0 group-hover:bg-[#FE652D] group-hover:text-white transition-all duration-300">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Adresse</h4>
                <p className="text-stone-400">12 Avenue de la Gastronomie<br />75008 Paris, France</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-stone-800/50 flex items-center justify-center text-[#FE652D] shrink-0 group-hover:bg-[#FE652D] group-hover:text-white transition-all duration-300">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Téléphone</h4>
                <p className="text-stone-400">+33 1 23 45 67 89</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <a href="#" className="w-12 h-12 rounded-xl bg-stone-800/50 flex items-center justify-center text-stone-400 hover:bg-[#FE652D] hover:text-white transition-all duration-300">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-xl bg-stone-800/50 flex items-center justify-center text-stone-400 hover:bg-[#FE652D] hover:text-white transition-all duration-300">
              <FaFacebook size={20} />
            </a>
          </div>
        </div>
        <div className="bg-stone-800/50 rounded-2xl h-[450px] flex items-center justify-center relative overflow-hidden border border-white/5">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800"
            alt="Carte"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="relative z-10 bg-stone-900/90 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center max-w-xs border border-white/10">
            <MapPin className="w-6 h-6 text-[#FE652D] mx-auto mb-2" />
            <p className="font-serif text-xl text-white mb-2">Au cœur de Paris</p>
            <p className="text-stone-400 text-sm">À 2 min du métro Concorde</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);


// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================
export default function Home() {
  return (
    <main className=" text-stone-900 font-sans antialiased selection:bg-[#FE652D] selection:text-white">

      <OrbitalHero />
      <AboutSection />
      <MenuSection />
      <ReservationSection />
      <ContactSection />
    </main>
  );
}