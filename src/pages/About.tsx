import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, Calendar, Users, ShieldCheck, Utensils,
  Plus, Minus, ArrowRight
} from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { MenuMeals } from '../data/MenuMeals'; 
import WebThreads from '../components/WebThreads';

// ==========================================
// DONNÉES FAQ
// ==========================================
const faqData = [
  {
    id: 1,
    icon: Leaf,
    question: "Quels produits utilisez-vous ?",
    answer: "Nous travaillons exclusivement avec des producteurs locaux et de saison. Notre philosophie est de laisser la qualité brute des ingrédients s'exprimer, en minimisant les transformations inutiles."
  },
  {
    id: 2,
    icon: Calendar,
    question: "Le menu change-t-il selon les saisons ?",
    answer: "Absolument. Notre carte évolue au rythme des récoltes. Nous proposons une nouvelle dégustation tous les trois mois pour vous offrir une expérience toujours renouvelée."
  },
  {
    id: 3,
    icon: Utensils,
    question: "Proposez-vous des options végétariennes ?",
    answer: "Oui, nous concevons un menu végétarien complet avec la même exigence et la même créativité que notre carte traditionnelle, célébrant les légumes comme des stars à part entière."
  },
  {
    id: 4,
    icon: Users,
    question: "Peut-on organiser un événement privé ?",
    answer: "Nous disposons d'un salon privatif pouvant accueillir jusqu'à 20 personnes. Contactez-nous directement pour élaborer un menu sur mesure pour votre célébration."
  },
  {
    id: 5,
    icon: ShieldCheck,
    question: "Peut-on adapter un plat à une allergie ?",
    answer: "La sécurité et le confort de nos convives sont prioritaires. Veuillez nous signaler toute allergie ou intolérance lors de votre réservation, nous adapterons chaque plat avec le plus grand soin."
  }
];

// ==========================================
// COMPOSANT ACCORDÉON FAQ
// ==========================================
const FaqItem = ({ item, isOpen, onClick }: { item: any, isOpen: boolean, onClick: () => void }) => {
  const Icon = item.icon;
  return (
    <div className="border-b border-stone-800/50 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center gap-4 py-6 text-left group"
      >
        <Icon size={20} className="text-[#FE652D] shrink-0" />
        <span className={`flex-1 text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-white' : 'text-stone-300 group-hover:text-white'}`}>
          {item.question}
        </span>
        <div className={`w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-[#FE652D] bg-[#FE652D]/10 text-[#FE652D] rotate-180' : 'text-stone-400 group-hover:border-stone-500'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-12 text-stone-400 font-light leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// PAGE À PROPOS PRINCIPALE
// ==========================================
export default function About() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  // Récupération d'un plat pour l'image FAQ (ex: le premier plat principal ou signature)
  const signatureDish = MenuMeals.find(m => m.category === 'plat_principal') || MenuMeals[2];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-stone-200">
      {/* <Navbar /> */}

      {/* ========================================== */}
      {/* 1. HERO À PROPOS */}
      {/* ========================================== */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
       
        <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000"
          alt="Accueil du restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950/85 via-stone-900/80 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
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
              Notre Univers
          </span>
        </motion.div>

        <h1 className="font-syne text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.95] tracking-tight">
          L'histoire derrière chaque  <br />
          <span className="italic text-[#FE652D]">assiette.</span>
        </h1>

        <p className="font-outfit text-stone-200 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Plus qu'un restaurant, un lieu de rencontre entre la terre, le savoir-faire et l'émotion.
        </p>
      </motion.div>
      </section>

      <main className="container mx-auto px-6 py-24 md:py-32 max-w-7xl">

        {/* ========================================== */}
        {/* 2. NOTRE HISTOIRE (ASYMÉTRIQUE) */}
        {/* ========================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800"
              alt="Le Chef en cuisine"
              className="w-full h-[500px] md:h-[600px] object-cover rounded-2xl shadow-2xl shadow-black/50"
            />
            {/* Détail graphique subtil */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-[#FE652D]/30 rounded-br-2xl hidden md:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[#FE652D] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Notre Histoire</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
              Une passion devenue <br />une signature
            </h2>
            <div className="space-y-6 text-stone-400 font-light leading-relaxed text-lg">
              <p>
                Fondé en 2012, notre établissement est né d'une conviction simple : la grande cuisine doit être une émotion partagée. Notre chef, formé aux côtés des plus grands, a souhaité créer un lieu où la rigueur technique s'efface devant la générosité du goût.
              </p>
              <p>
                Nous entretenons des relations privilégiées avec une poignée de maraîchers, d'éleveurs et de pêcheurs locaux. Cette proximité nous permet de sublimater des produits d'une fraîcheur absolue, en respectant leur cycle naturel et leur identité profonde.
              </p>
              <p>
                Chaque assiette qui sort de notre cuisine est le reflet de cette quête d'excellence et d'authenticité. Nous ne cherchons pas à impressionner par la complexité, mais à émouvoir par la justesse.
              </p>
            </div>
          </motion.div>
        </section>

                {/* ========================================== */}
        {/* 3. STATISTIQUES (IMMERSIF PLEINE LARGEUR - SANS OVERLAY) */}
        {/* ========================================== */}
        <section className="relative w-full h-[35vh] min-h-[300px] flex items-center justify-center overflow-hidden my-16">
          
          {/* Arrière-plan animé WebThreads - Pleine largeur, opaque et visible */}
          <div className="absolute inset-0 z-0 w-full h-full">
            <WebThreads
              color1="#FE652D"
              color2="#FF8A5C"
              color3="#FFFFFF"
              speed={0.18}
              threadCount={10}
              frequency={5}
              spread={0.25}
              taper={1.2}
              position={0.5}
              fanMode="center"
              glow={0.05}
              falloff={0.5}
              thickness={1.2}
              brightness={0.3}
              opacity={1} /* ✅ 100% OPAQUE ET VISIBLE */
              mirror={true}
              shimmer={false}
              grain={true}
              grainIntensity={0.03}
              mouseInteraction={true}
              mouseStrength={0.2}
              backgroundColor="#ffffff" /* ✅ Fond sombre pour faire ressortir les fils orange */
            />
            {/* ✅ OVERLAY NOIR RETIRÉ COMME DEMANDÉ */}
          </div>

          {/* Contenu des statistiques par-dessus */}
          <div className="relative z-10 w-full  px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center ">
              {[
                { value: "12+", label: "Années d'existence" },
                { value: "48K", label: "Convives accueillis" },
                { value: "36", label: "Plats signature" },
                { value: "4.9", label: "Note moyenne" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col items-center group cursor-default"
                >
                  {/* Chiffre avec ombre portée pour rester lisible sans l'overlay noir */}
                  <div className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight group-hover:text-[#FE652D] transition-colors duration-500 drop-shadow-lg">
                    {stat.value}
                  </div>
                  
                  {/* Petite ligne décorative qui s'étend au survol */}
                  <div className="w-12 h-0.5 bg-[#FE652D]/70 mb-4 group-hover:w-20 group-hover:bg-[#FE652D] transition-all duration-500" />
                  
                  {/* Label avec ombre portée pour la lisibilité */}
                  <div className="text-stone-300 text-sm uppercase tracking-[0.2em] font-medium group-hover:text-white transition-colors duration-500 drop-shadow-md">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ========================================== */}
        {/* 4. NOTRE ÉQUIPE (PYRAMIDE 1+3 + CONNEXIONS SVG FLUIDES) */}
        {/* ========================================== */}
        <section className="mb-32 relative">
          <div className="text-center mb-16">
            <span className="text-[#FE652D] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Les Artisans du Goût</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Notre Équipe</h2>
          </div>

          <div className="relative max-w-6xl mx-auto pt-8 pb-8">

            {/* LIGNES DE CONNEXION SVG AVEC ANIMATION LENTE ET FLUIDE */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0"
              viewBox="0 0 900 420"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Pointe de flèche ORANGE bien visible */}
                <marker
                  id="arrowhead"
                  markerWidth="12"
                  markerHeight="12"
                  refX="10"
                  refY="6"
                  orient="auto"
                  markerUnits="userSpaceOnUse"
                >
                  <polygon points="0 0, 12 6, 0 12" fill="#FE652D" fillOpacity="0.9" />
                </marker>
              </defs>

              {/* Point de départ au niveau du Chef */}
              <motion.circle
                cx="450"
                cy="120"
                r="6"
                fill="#FE652D"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              />

              {/* Flèche Gauche - Chef vers Membre 1 (Sophie) - Animation lente et fluide */}
              <motion.path
                d="M 450 120 C 450 260, 150 260, 150 360"
                fill="none"
                stroke="#FE652D"
                strokeWidth="2.5"
                strokeOpacity="0.7"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, delay: 0.6, ease: "easeOut" }}
              />

              {/* Flèche Centre - Chef vers Membre 2 (Claire) - Ligne droite verticale fluide */}
              <motion.path
                d="M 450 120 L 450 360"
                fill="none"
                stroke="#FE652D"
                strokeWidth="2.5"
                strokeOpacity="0.7"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, delay: 1.0, ease: "easeOut" }}
              />

              {/* Flèche Droite - Chef vers Membre 3 (Marc) - Animation lente et fluide */}
              <motion.path
                d="M 450 120 C 450 260, 750 260, 750 360"
                fill="none"
                stroke="#FE652D"
                strokeWidth="2.5"
                strokeOpacity="0.7"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, delay: 1.4, ease: "easeOut" }}
              />

              {/* Points d'arrivée aux extrémités des 3 membres (apparaissent doucement à la fin du tracé) */}
              <motion.circle cx="150" cy="360" r="5" fill="#FE652D" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.9 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 2.8, ease: "easeOut" }} />
              <motion.circle cx="450" cy="360" r="5" fill="#FE652D" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.9 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 3.2, ease: "easeOut" }} />
              <motion.circle cx="750" cy="360" r="5" fill="#FE652D" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.9 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 3.6, ease: "easeOut" }} />
            </svg>

            {/* Mobile : Ligne verticale simple traversant tout */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#FE652D]/30 md:hidden -translate-x-1/2 z-0" />

            {/* CONTENEUR DES MEMBRES */}
            <div className="relative z-10 flex flex-col items-center gap-32 md:gap-40">

              {/* CHEF (HAUT) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-sm group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] shadow-2xl shadow-black/40">
                  <img src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=600" alt="Chef" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <h3 className="text-white font-serif text-2xl">Alexandre Martin</h3>
                    <p className="text-[#FE652D] text-sm uppercase tracking-wider mb-4">Chef Exécutif</p>
                    <div className="flex gap-3">
                      <a href="#" className="text-stone-300 hover:text-[#FE652D] transition-colors"><FaInstagram size={18} /></a>
                      <a href="#" className="text-stone-300 hover:text-[#FE652D] transition-colors"><FaFacebook size={18} /></a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* MEMBRES (BAS) - 3 COLONNES SUR DESKTOP */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full max-w-5xl">
                {[
                  { name: "Sophie Laurent", role: "Cheffe Pâtissière", img: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=600" },
                  { name: "Claire Rousseau", role: "Sous-Chef", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600" },
                  { name: "Marc Dubois", role: "Sommelier", img: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=600" }
                ].map((member, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (idx * 0.2), duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-sm mx-auto group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-2xl aspect-[3/4] shadow-2xl shadow-black/40">
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                        <h3 className="text-white font-serif text-xl">{member.name}</h3>
                        <p className="text-[#FE652D] text-sm uppercase tracking-wider mb-4">{member.role}</p>
                        <div className="flex gap-3">
                          <a href="#" className="text-stone-300 hover:text-[#FE652D] transition-colors"><FaInstagram size={18} /></a>
                          <a href="#" className="text-stone-300 hover:text-[#FE652D] transition-colors"><FaFacebook size={18} /></a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 5. FAQ & IMAGE PLAT */}
        {/* ========================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#FE652D] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Questions Fréquentes</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-10">Tout savoir <br />sur votre expérience</h2>

            <div className="flex flex-col">
              {faqData.map((item) => (
                <FaqItem
                  key={item.id}
                  item={item}
                  isOpen={openFaqId === item.id}
                  onClick={() => setOpenFaqId(openFaqId === item.id ? null : item.id)}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:sticky lg:top-32"
          >
            <img
              src={signatureDish.img}
              alt={signatureDish.name}
              className="w-full h-[500px] md:h-[600px] object-cover rounded-2xl shadow-2xl shadow-black/50"
            />
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-stone-950/80 backdrop-blur-md rounded-xl border border-stone-800/50">
              <p className="text-[#FE652D] text-xs font-bold uppercase tracking-wider mb-1">Le coup de cœur du Chef</p>
              <h3 className="text-white font-serif text-2xl">{signatureDish.name}</h3>
            </div>
          </motion.div>
        </section>

        {/* ========================================== */}
        {/* 6. CTA FINAL */}
        {/* ========================================== */}
        <section className="relative rounded-2xl overflow-hidden min-h-[400px] flex items-center justify-center text-center px-6">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1920"
            alt="Ambiance"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/70" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-3xl"
          >
            <span className="inline-block text-[#FE652D] text-xs font-bold tracking-[0.3em] uppercase mb-4">Une expérience à vivre</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Découvrez notre cuisine <br />et laissez-nous vous accueillir.</h2>
            <motion.a
              href="/reservation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-[#FE652D] text-white px-10 py-4 rounded-xl font-medium tracking-wide shadow-lg shadow-[#FE652D]/30 hover:shadow-[#FE652D]/50 hover:bg-[#e55520] transition-all duration-300 mt-4"
            >
              Réserver une table <ArrowRight size={18} />
            </motion.a>
          </motion.div>
        </section>

      </main>

      {/* <Footer /> */}
    </div>
  );
}