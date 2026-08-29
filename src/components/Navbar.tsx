import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { IoSearchSharp } from 'react-icons/io5';
import { MdRestaurantMenu } from 'react-icons/md';
import logo from '../assets/logo.png';
import StaggeredMenu from './StaggeredMenu';

const Navbar: React.FC = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);

    // Refs pour l'effet Gooey (Desktop uniquement)
    const navRef = useRef<HTMLUListElement>(null);
    const filterRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'À propos', path: '/about' },
        { name: 'Menu', path: '/menu' },
        { name: 'Réservation', path: '/reservation' },
        { name: 'Contact', path: '/contact' },
    ];

    const menuItems = [
        { label: 'Accueil', ariaLabel: 'Aller à la page d’accueil', link: '/' },
        { label: 'À propos', ariaLabel: 'Découvrir notre restaurant', link: '/about' },
        { label: 'Menu', ariaLabel: 'Découvrir notre menu', link: '/menu' },
        { label: 'Réservation', ariaLabel: 'Réserver une table', link: '/reservation' },
        { label: 'Contact', ariaLabel: 'Nous contacter', link: '/contact' }
    ];

    // Détection du scroll pour changer le style de la navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effet Gooey pour les liens desktop
    useEffect(() => {
        if (!navRef.current || !containerRef.current) return;
        const activeLi = navRef.current.querySelectorAll('li')[navLinks.findIndex(link => link.path === location.pathname)] as HTMLElement;
        if (activeLi && filterRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const pos = activeLi.getBoundingClientRect();
            Object.assign(filterRef.current.style, {
                left: `${pos.x - containerRect.x}px`,
                top: `${pos.y - containerRect.y}px`,
                width: `${pos.width}px`,
                height: `${pos.height}px`
            });
        }
    }, [location.pathname, navLinks]);

    const handleLinkHover = (e: React.MouseEvent<HTMLLIElement>) => {
        const liEl = e.currentTarget;
        if (!filterRef.current || !containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const pos = liEl.getBoundingClientRect();
        Object.assign(filterRef.current.style, {
            left: `${pos.x - containerRect.x}px`,
            top: `${pos.y - containerRect.y}px`,
            width: `${pos.width}px`,
            height: `${pos.height}px`
        });
        const particles = filterRef.current.querySelectorAll('.particle');
        particles.forEach(p => filterRef.current!.removeChild(p));
        makeParticles(filterRef.current);
    };

    const makeParticles = (element: HTMLElement) => {
        const particleCount = 12;
        const colors = [1, 2, 3, 1, 2, 3, 1, 4];
        const noise = (n = 1) => n / 2 - Math.random() * n;
        const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
            const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
            return [distance * Math.cos(angle), distance * Math.sin(angle)];
        };
        const d: [number, number] = [90, 10];
        const r = 100;
        const animationTime = 600;
        const timeVariance = 300;
        element.style.setProperty('--time', `${animationTime * 2 + timeVariance}ms`);

        for (let i = 0; i < particleCount; i++) {
            const t = animationTime * 2 + noise(timeVariance * 2);
            let rotate = noise(r / 10);
            const start = getXY(d[0], particleCount - i, particleCount);
            const end = getXY(d[1] + noise(7), particleCount - i, particleCount);
            const scale = 1 + noise(0.2);
            const color = colors[Math.floor(Math.random() * colors.length)];
            const rotateVal = rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10;

            setTimeout(() => {
                const particle = document.createElement('span');
                const point = document.createElement('span');
                particle.classList.add('particle');
                particle.style.setProperty('--start-x', `${start[0]}px`);
                particle.style.setProperty('--start-y', `${start[1]}px`);
                particle.style.setProperty('--end-x', `${end[0]}px`);
                particle.style.setProperty('--end-y', `${end[1]}px`);
                particle.style.setProperty('--time', `${t}ms`);
                particle.style.setProperty('--scale', `${scale}`);
                particle.style.setProperty('--color', `var(--color-${color}, #FE652D)`);
                particle.style.setProperty('--rotate', `${rotateVal}deg`);
                point.classList.add('point');
                particle.appendChild(point);
                element.appendChild(particle);
                requestAnimationFrame(() => element.classList.add('active'));
                setTimeout(() => { try { element.removeChild(particle); } catch { } }, t);
            }, 30);
        }
    };

    return (
        <>
            <style>{`
                :root { --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1); }
                .effect { position: absolute; opacity: 1; pointer-events: none; display: grid; place-items: center; z-index: 10; }
                .effect.filter { z-index: 10; }
                .effect.filter::before { content: ""; position: absolute; inset: -75px; z-index: -2; background: transparent; }
                .particle, .point { display: block; opacity: 0; width: 20px; height: 20px; border-radius: 9999px; transform-origin: center; }
                .particle { --time: 5s; position: absolute; top: calc(50% - 8px); left: calc(50% - 8px); animation: particle calc(var(--time)) ease 1 -350ms; z-index: 12; }
                .point { background: var(--color); opacity: 1; animation: point calc(var(--time)) ease 1 -350ms; }
                @keyframes particle { 0% { transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y))); opacity: 1; } 70% { transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2)); opacity: 1; } 100% { transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5)); opacity: 1; } }
                @keyframes point { 0% { transform: scale(0); opacity: 0; } 38% { opacity: 1; } 65% { transform: scale(var(--scale)); opacity: 1; } 100% { transform: scale(0); opacity: 0; } }
                .nav-link-active { color: #FE652D !important; }
                .nav-link-active .nav-dot, .nav-link-hover:hover .nav-dot { opacity: 1 !important; transform: translateX(-50%) scale(1) !important; }
                .nav-dot, .icon-dot { position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%) scale(0); width: 6px; height: 6px; border-radius: 50%; background: #FE652D; opacity: 0; transition: all 0.3s ease; }
                .icon-dot { bottom: 0; }
                .group:hover .icon-dot { opacity: 1; transform: translateX(-50%) scale(1); }
            `}</style>

            {/* ✅ NAVBAR FIXE AVEC TRANSITION DE BACKGROUND AU SCROLL */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/30 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'}`}>
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8 hidden lg:block" aria-label="Navigation principale">
                    <div className="flex items-center justify-between">
                        <div className="flex-shrink-0">
                            <Link to="/" className="block" aria-label="Page d'accueil">
                                <img src={logo} alt="Logo du restaurant" className={`h-14 w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-12' : 'h-16'}`} />
                            </Link>
                        </div>

                        <div className="flex items-center justify-center flex-1">
                            <div className="relative" ref={containerRef}>
                                <ul ref={navRef} className="flex items-center space-x-8 xl:space-x-10 list-none m-0 p-0 relative z-[3]">
                                    {navLinks.map((link) => (
                                        <li key={link.name} className="relative cursor-pointer transition-all duration-300 nav-link-hover" onMouseEnter={handleLinkHover}>
                                            <Link to={link.path} className={`relative py-2 text-sm  font-medium text-white transition-all duration-300 hover:text-[#FE652D] ${isActive(link.path) ? 'nav-link-active' : ''}`} aria-current={isActive(link.path) ? 'page' : undefined}>
                                                {link.name}
                                                <span className="nav-dot" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <span className="effect filter" ref={filterRef} />
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button className="relative p-2 text-white hover:text-[#FE652D] transition-all duration-300 rounded-full group" aria-label="Rechercher">
                                <IoSearchSharp className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                                <span className="icon-dot" />
                            </button>
                            <button className="relative p-2 text-white hover:text-[#FE652D] transition-all duration-300 rounded-full group" aria-label="Voir le panier">
                                <FaShoppingCart className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                                <span className="icon-dot" />
                            </button>
                            <Link to="/reservation" className="relative overflow-hidden bg-[#FE652D] text-white font-medium py-2.5 px-5 rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-sm tracking-wide group flex items-center gap-2">
                                <MdRestaurantMenu className="h-4 w-4" />
                                <span className="relative z-10">Réserver</span>
                                <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* MENU MOBILE (StaggeredMenu) */}
                <div className="lg:hidden">
                    <StaggeredMenu
                        position="right"
                        colors={['#FE652D', '#ff8a5c', '#ffffff']}
                        items={menuItems}
                        displaySocials={false}
                        displayItemNumbering={true}
                        logoUrl={logo}
                        menuButtonColor={isScrolled ? "#FE652D" : "#FE652D"}
                        openMenuButtonColor="#FE652D"
                        accentColor="#FE652D"
                        isFixed={true}
                        changeMenuColorOnOpen={true}
                        closeOnClickAway={true}
                    />
                </div>
            </header>
        </>
    );
};

export default Navbar;