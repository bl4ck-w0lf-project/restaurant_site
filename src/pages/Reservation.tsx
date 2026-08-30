import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, CalendarDays, Users, 
  Clock, PartyPopper, MessageSquare, ArrowRight 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ==========================================
// COMPOSANT RÉUTILISABLE POUR LES CHAMPS
// ==========================================
interface FormFieldProps {
  icon: React.ElementType;
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  isTextarea?: boolean;
  isSelect?: boolean;
  options?: string[];
}

const FormField: React.FC<FormFieldProps> = ({ 
  icon: Icon, label, name, type = 'text', value, onChange, 
  isTextarea = false, isSelect = false, options = [] 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseInputClasses = `w-full bg-stone-900/40 border border-stone-800 rounded-xl py-4 pl-12 pr-4 text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#FE652D]/60 focus:ring-1 focus:ring-[#FE652D]/30 transition-all duration-300`;
  const iconClasses = `absolute left-4 transition-colors duration-300 ${isFocused ? 'text-[#FE652D]' : 'text-stone-500'}`;

  return (
    <div className="relative group">
      <Icon 
        size={18} 
        className={`absolute top-1/2 -translate-y-1/2 ${isTextarea ? 'top-5' : ''} ${iconClasses}`} 
      />
      
      {isSelect ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${baseInputClasses} appearance-none cursor-pointer`}
        >
          <option value="" disabled>{label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-stone-900 text-stone-200">
              {opt}
            </option>
          ))}
        </select>
      ) : isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={label}
          rows={4}
          className={`${baseInputClasses} resize-none pt-5`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={label}
          className={baseInputClasses}
        />
      )}
      
      {isSelect && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">
          <ArrowRight size={16} className="rotate-90" />
        </div>
      )}
    </div>
  );
};

// ==========================================
// PAGE RÉSERVATION PRINCIPALE
// ==========================================
export default function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '2',
    time: '',
    occasion: '',
    requests: ''
  });

  const timeSlots = [
    "12:00", "12:30", "13:00", "13:30",
    "19:00", "19:30", "20:00", "20:30",
    "21:00", "21:30", "22:00", "22:30"
  ];

  const occasionOptions = [
    "Dîner romantique",
    "Anniversaire",
    "Déjeuner professionnel",
    "Réunion de famille",
    "Autre"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      
      {/* NOTE: Insère ton composant <Navbar /> ici si ce n'est pas géré par un layout global */}
     

      <main className="w-full">
        
       
        {/* NOUVELLE SECTION HERO AVEC IMAGE DE FOND */}
        {/* ========================================== */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
    
          <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1920"
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
                        Parlons-nous
                      </span>
                    </motion.div>
          
                    <h1 className="font-syne text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.95] tracking-tight">
                      Réserver  <br />
                      <span className="italic text-[#FE652D]">Votre table.</span>
                    </h1>
          
                    <p className="font-outfit text-stone-200 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                      Préparez-vous à vivre un moment unique autour d'une cuisine pensée avec passion, 
                      dans un cadre d'exception dédié à l'art de recevoir.
                    </p>
                  </motion.div>
        </section>

        {/* ========================================== */}
        {/* CONTENU PRINCIPAL (2 COLONNES) */}
        {/* ========================================== */}
        <div className="container mx-auto px-6 pb-24 pt-24 md:pb-32 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* ===== PARTIE GAUCHE : VISUEL & INFO ===== */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-8"
            >
              {/* 1. Image du Plat (Grande et immersive) */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000" 
                  alt="Plat signature du restaurant" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
              </div>

              {/* 2. Description */}
              <div>
                <h3 className="text-2xl font-serif text-white mb-3">L'Expérience</h3>
                <p className="text-stone-400 leading-relaxed font-light">
                  Une expérience pensée autour de produits soigneusement sélectionnés, 
                  d'une cuisine généreuse et d'une atmosphère chaleureuse. 
                  Chaque détail est orchestré pour faire de votre repas un souvenir impérissable.
                </p>
              </div>

              {/* 3. Informations Importantes */}
              <div className="bg-stone-900/30 border border-stone-800/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#FE652D] shrink-0 mt-1" />
                  <div className="text-sm text-stone-400 space-y-2">
                    <p>
                      <span className="text-stone-200 font-medium">Réservation au minimum 2 heures à l'avance.</span>
                    </p>
                    <p>
                      Après votre réservation en ligne, veuillez nous appeler pour toute modification de dernière minute.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ===== PARTIE DROITE : FORMULAIRE ===== */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full"
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                
                <FormField
                  icon={User} label="Nom complet" name="name" value={formData.name} onChange={handleChange}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    icon={Mail} label="Adresse email" name="email" type="email" value={formData.email} onChange={handleChange}
                  />
                  <FormField
                    icon={Phone} label="Numéro de téléphone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    icon={CalendarDays} label="Date de réservation" name="date" type="date" value={formData.date} onChange={handleChange}
                  />
                  <FormField
                    icon={Users} label="Nombre de personnes" name="guests" type="number" value={formData.guests} onChange={handleChange}
                  />
                </div>

                {/* Time Slots */}
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-4 text-stone-400">
                    <Clock size={18} className="text-stone-500" />
                    <span className="text-sm font-medium uppercase tracking-wider">Sélectionner un créneau</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData({ ...formData, time })}
                        className={`
                          py-3 px-2 rounded-lg text-sm font-medium transition-all duration-300 border
                          ${formData.time === time 
                            ? 'bg-[#FE652D] border-[#FE652D] text-white shadow-lg shadow-[#FE652D]/20' 
                            : 'bg-stone-900/40 border-stone-800 text-stone-400 hover:border-stone-600 hover:text-stone-200'
                          }
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <FormField
                  icon={PartyPopper} label="Type d'occasion" name="occasion" isSelect={true} options={occasionOptions} value={formData.occasion} onChange={handleChange}
                />

                <FormField
                  icon={MessageSquare} label="Demandes spéciales (allergies, anniversaire...)" name="requests" isTextarea={true} value={formData.requests} onChange={handleChange}
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#FE652D] text-white font-medium py-4 px-8 rounded-xl shadow-lg shadow-[#FE652D]/20 hover:shadow-[#FE652D]/40 hover:bg-[#e55520] transition-all duration-300 flex items-center justify-center gap-3 mt-8 group"
                >
                  <span className="tracking-wide">CONFIRMER LA RÉSERVATION</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>

              </form>
            </motion.div>

          </div>
        </div>
      </main>
     
    </div>
  );
}