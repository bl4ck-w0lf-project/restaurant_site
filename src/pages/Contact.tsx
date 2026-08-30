import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, MessageCircle, MessageSquare, ArrowRight, 
  MapPin, Phone, Clock, Star 
} from 'lucide-react';



const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
  };

  const inputFields = [
    { 
      id: 'name', 
      name: 'name', 
      label: 'Nom & prénom', 
      icon: User, 
      type: 'text',
      placeholder: 'Jean Dupont'
    },
    { 
      id: 'email', 
      name: 'email', 
      label: 'Email', 
      icon: Mail, 
      type: 'email',
      placeholder: 'jean@email.com'
    },
    { 
      id: 'subject', 
      name: 'subject', 
      label: 'Sujet', 
      icon: MessageCircle, 
      type: 'text',
      placeholder: 'Réservation de groupe'
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-white font-sans antialiased selection:bg-[#FE652D] selection:text-white">
      

      {/* ========================================== */}
      {/* HERO CONTACT */}
      {/* ========================================== */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1920"
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
            Une question ? <br />
            <span className="italic text-[#FE652D]">Écrivons-nous.</span>
          </h1>

          <p className="font-outfit text-stone-200 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Une question, une demande particulière ou simplement envie d'échanger ? 
            Notre équipe est à votre écoute.
          </p>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* FORMULAIRE CONTACT */}
      {/* ========================================== */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

            {/* ===== PARTIE GAUCHE : INTRODUCTION ===== */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <span className="text-[#FE652D] font-montserrat text-xs font-medium tracking-[0.3em] uppercase">
                Nous sommes à votre écoute
              </span>
              <h2 className="font-syne text-4xl md:text-5xl font-bold leading-[1.05]">
                Parlons de votre <br />
                <span className="italic text-[#FE652D]">prochaine expérience.</span>
              </h2>
              <p className="font-outfit text-stone-400 text-lg leading-relaxed">
                Que ce soit pour une question, une demande particulière ou 
                simplement un échange, notre équipe est là pour vous accompagner.
              </p>
              
              <div className="pt-6 space-y-4 text-stone-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-800/50 flex items-center justify-center text-[#FE652D]">
                    <Clock size={18} />
                  </div>
                  <span className="font-outfit text-sm">Réponse sous 24h</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-800/50 flex items-center justify-center text-[#FE652D]">
                    <Star size={18} />
                  </div>
                  <span className="font-outfit text-sm">Service personnalisé</span>
                </div>
              </div>
            </motion.div>

            {/* ===== PARTIE DROITE : FORMULAIRE ===== */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* NOM & PRÉNOM */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-sm font-medium text-stone-400">
                    Nom & prénom
                  </label>
                  <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${
                    focusedField === 'name' 
                      ? 'border-[#FE652D]' 
                      : 'border-white/10 hover:border-white/20'
                  }`}>
                    <User size={16} className={`absolute left-4 transition-colors duration-300 ${
                      focusedField === 'name' ? 'text-[#FE652D]' : 'text-stone-500'
                    }`} />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Jean Dupont"
                      className="w-full bg-transparent py-3.5 pl-11 pr-4 text-white placeholder-stone-500 outline-none rounded-xl font-outfit"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-sm font-medium text-stone-400">
                    Email
                  </label>
                  <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${
                    focusedField === 'email' 
                      ? 'border-[#FE652D]' 
                      : 'border-white/10 hover:border-white/20'
                  }`}>
                    <Mail size={16} className={`absolute left-4 transition-colors duration-300 ${
                      focusedField === 'email' ? 'text-[#FE652D]' : 'text-stone-500'
                    }`} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="jean@email.com"
                      className="w-full bg-transparent py-3.5 pl-11 pr-4 text-white placeholder-stone-500 outline-none rounded-xl font-outfit"
                    />
                  </div>
                </div>

                {/* SUJET */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-sm font-medium text-stone-400">
                    Sujet
                  </label>
                  <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${
                    focusedField === 'subject' 
                      ? 'border-[#FE652D]' 
                      : 'border-white/10 hover:border-white/20'
                  }`}>
                    <MessageCircle size={16} className={`absolute left-4 transition-colors duration-300 ${
                      focusedField === 'subject' ? 'text-[#FE652D]' : 'text-stone-500'
                    }`} />
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Réservation de groupe"
                      className="w-full bg-transparent py-3.5 pl-11 pr-4 text-white placeholder-stone-500 outline-none rounded-xl font-outfit"
                    />
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-sm font-medium text-stone-400">
                    Votre message
                  </label>
                  <div className={`relative flex items-start rounded-xl border transition-all duration-300 ${
                    focusedField === 'message' 
                      ? 'border-[#FE652D]' 
                      : 'border-white/10 hover:border-white/20'
                  }`}>
                    <MessageSquare size={16} className={`absolute left-4 top-4 transition-colors duration-300 ${
                      focusedField === 'message' ? 'text-[#FE652D]' : 'text-stone-500'
                    }`} />
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Votre message..."
                      className="w-full bg-transparent py-3.5 pl-11 pr-4 text-white placeholder-stone-500 outline-none rounded-xl font-outfit resize-none"
                    />
                  </div>
                </div>

                {/* BOUTON ENVOYER */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#FE652D] text-white px-8 py-4 rounded-xl font-outfit font-bold text-base tracking-wide shadow-xl shadow-[#FE652D]/30 hover:bg-[#e0551e] hover:shadow-[#FE652D]/50 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <span>Envoyer le message</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>

                {/* TEXTE SOUS LE BOUTON */}
                <p className="text-center font-outfit text-stone-500 text-sm mt-4">
                  Nous vous répondrons dans les meilleurs délais.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
{/* CARTE INTERACTIVE */}
{/* ========================================== */}
{/* <section className="py-16 md:py-20">
  <div className="container mx-auto px-6 max-w-6xl">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="space-y-6 text-center mb-10"
    >
      <span className="text-[#FE652D] font-montserrat text-xs font-medium tracking-[0.3em] uppercase">
        Nous trouver
      </span>
      <h2 className="font-syne text-3xl md:text-4xl font-bold">
        Où nous <span className="italic text-[#FE652D]">trouver</span>
      </h2>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10"
      style={{ height: '400px' }}
    > */}
      {/* Iframe Google Maps */}
      {/* <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991441025335!2d2.292292315674156!3d48.85837360871587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1695123456789!5m2!1sfr!2sfr"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Carte du restaurant"
        className="w-full h-full"
      /> */}
      
      {/* Overlay subtil en bas pour le texte */}
      {/* <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="flex flex-wrap items-center justify-center gap-6 text-white/80">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#FE652D]" />
            <span className="font-outfit text-sm">12 Avenue de la Gastronomie, 75008 Paris</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-white/20" />
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-[#FE652D]" />
            <span className="font-outfit text-sm">+33 1 23 45 67 89</span>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section> */}

{/* ========================================== */}
{/* CARTE INTERACTIVE - PLEINE LARGEUR */}
{/* ========================================== */}
<section className="relative w-full h-[700px] overflow-hidden">
  
  

  <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="space-y-6 text-center mb-10"
    >
      <span className="text-[#FE652D] font-montserrat text-xs font-medium tracking-[0.3em] uppercase bg-black/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/10">
        Nous trouver
      </span>
      <h2 className="font-syne text-3xl md:text-4xl font-bold">
        Où nous <span className="italic text-[#FE652D]">trouver</span>
      </h2>
    </motion.div>

  {/* Iframe Google Maps - Pleine largeur */}
  <motion.iframe
    initial={{ opacity: 0, scale: 1.05 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991441025335!2d2.292292315674156!3d48.85837360871587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1695123456789!5m2!1sfr!2sfr"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Carte du restaurant"
    className="w-full h-full"
  />
</section>

    
    </main>
  );
};

export default Contact;