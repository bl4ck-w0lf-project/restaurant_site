import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import logo from '../assets/logo.png'; // Réutilisation de ton logo existant

export default function Footer() {
    const [email, setEmail] = useState('');

    const navLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'À propos', path: '/about' },
        { name: 'Menu', path: '/menu' },
        { name: 'Réservation', path: '/reservation' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <footer className="relative bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-stone-400 pt-24 pb-12 border border-l-0 border-b-0 border-r-0 border-4 border-[#FE652D] overflow-hidden">

            {/* DÉTAIL GRAPHIQUE SUBTIL : Halo orange très diffus en arrière-plan */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FE652D]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FE652D]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                {/* ========================================== */}
                {/* GRILLE PRINCIPALE (4 colonnes desktop, 2 tablet, 1 mobile) */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

                    {/* COLONNE 1 : BRAND */}
                    <div className="flex flex-col">
                        <img
                            src={logo}
                            alt="Logo du restaurant"
                            className="h-[130px] w-[200px]  mb-6 opacity-90 hover:opacity-100 transition-opacity duration-500"
                        />
                        <p className="text-stone-400 text-sm leading-relaxed mb-8 max-w-xs font-light">
                            Une cuisine sincère, des produits soigneusement sélectionnés et des moments pensés pour être partagés dans un cadre d'exception.
                        </p>

                        {/* Réseaux sociaux */}
                        <div className="flex items-center gap-4">
                            {[
                                { icon: FaInstagram, label: 'Instagram', href: '#' },
                                { icon: FaFacebook, label: 'Facebook', href: '#' }
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-500 hover:text-[#FE652D] hover:border-[#FE652D]/50 transition-all duration-300"
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* COLONNE 2 : NAVIGATION */}
                    <div>
                        <h4 className="text-white font-medium mb-6 tracking-[0.2em] text-xs uppercase">Navigation</h4>
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="group flex items-center gap-2 text-stone-400 hover:text-[#FE652D] transition-all duration-300 text-sm font-light"
                                    >
                                        <span>{link.name}</span>
                                        <ArrowRight
                                            size={14}
                                            className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#FE652D]"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLONNE 3 : HORAIRES */}
                    <div>
                        <h4 className="text-white font-medium mb-6 tracking-[0.2em] text-xs uppercase">Horaires</h4>
                        <div className="space-y-5 text-sm font-light">
                            <div className="flex flex-col gap-1">
                                <span className="text-stone-200 font-medium">Mardi — Vendredi</span>
                                <span className="text-stone-500">12:00 — 14:30 & 19:00 — 23:00</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-stone-200 font-medium">Samedi</span>
                                <span className="text-stone-500">12:00 — 00:00</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-stone-200 font-medium">Dimanche</span>
                                <span className="text-stone-500">12:00 — 22:00</span>
                            </div>
                            <div className="flex flex-col gap-1 pt-2 border-t border-stone-800/50">
                                <span className="text-stone-500 italic text-xs">Fermé le lundi</span>
                            </div>
                        </div>
                    </div>

                    {/* COLONNE 4 : NEWSLETTER */}
                    <div>
                        <h4 className="text-white font-medium mb-6 tracking-[0.2em] text-xs uppercase">Actualités</h4>
                        <p className="text-stone-400 text-sm mb-6 leading-relaxed font-light">
                            Recevez nos nouveautés, événements exclusifs et inspirations culinaires directement dans votre boîte mail.
                        </p>

                        <form onSubmit={(e) => e.preventDefault()} className="relative">
                            <div className="relative group">
                                <Mail
                                    size={16}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-[#FE652D] transition-colors duration-300"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="votre@email.com"
                                    className="w-full bg-stone-900/50 border border-stone-800 rounded-xl py-3.5 pl-11 pr-12 text-stone-200 text-sm placeholder-stone-600 focus:outline-none focus:border-[#FE652D]/60 focus:ring-1 focus:ring-[#FE652D]/30 transition-all duration-300"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-[#FE652D] text-white hover:bg-[#e55520] transition-all duration-300 group-focus-within:shadow-lg group-focus-within:shadow-[#FE652D]/20"
                                    aria-label="S'inscrire à la newsletter"
                                >
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

                {/* ========================================== */}
                {/* SÉPARATION ET BOTTOM FOOTER */}
                {/* ========================================== */}
                <div className="border-t border-stone-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500 font-light">

                    <p>© {new Date().getFullYear()} L'Art Culinaire. Tous droits réservés.</p>

                    <div className="flex items-center gap-6">
                        <a href="https://hounmenou-ricardo.vercel.app/" target="_blank" className="text-md transition-colors duration-300">
                            Fait par <span className='text-[#FE652D]'>Ricardo</span>
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
}