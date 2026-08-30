import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { IoSearchSharp } from 'react-icons/io5';
import logoUrl from '../assets/logo.png';

export interface StaggeredMenuItem {
    label: string;
    ariaLabel: string;
    link: string;
}

export interface StaggeredMenuProps {
    position?: 'left' | 'right';
    colors?: string[];
    items?: StaggeredMenuItem[];
    displaySocials?: boolean;
    displayItemNumbering?: boolean;
    className?: string;
    logoUrl?: string;
    menuButtonColor?: string;
    openMenuButtonColor?: string;
    accentColor?: string;
    isFixed?: boolean;
    changeMenuColorOnOpen?: boolean;
    closeOnClickAway?: boolean;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
    onOpenCart?: () => void;       // ✅ AJOUTÉ
    onOpenSearch?: () => void;     // ✅ AJOUTÉ
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
    position = 'right',
    colors = ['#FE652D', '#ff8a5c', '#ffffff'],
    items = [],
    displaySocials = false,
    displayItemNumbering = true,
    className,
    logoUrl = '',
    menuButtonColor = '#FE652D',
    openMenuButtonColor = '#FE652D',
    changeMenuColorOnOpen = true,
    accentColor = '#FE652D',
    isFixed = false,
    closeOnClickAway = true,
    onMenuOpen,
    onMenuClose,
    onOpenCart,       // ✅ AJOUTÉ
    onOpenSearch      // ✅ AJOUTÉ
}: StaggeredMenuProps) => {
    const [open, setOpen] = useState(false);
    const openRef = useRef(false);

    // ✅ AJOUT : Gestion du scroll pour le header
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const panelRef = useRef<HTMLDivElement | null>(null);
    const preLayersRef = useRef<HTMLDivElement | null>(null);
    const preLayerElsRef = useRef<HTMLElement[]>([]);

    const plusHRef = useRef<HTMLSpanElement | null>(null);
    const plusVRef = useRef<HTMLSpanElement | null>(null);
    const iconRef = useRef<HTMLSpanElement | null>(null);

    const textInnerRef = useRef<HTMLSpanElement | null>(null);
    const textWrapRef = useRef<HTMLSpanElement | null>(null);
    const [textLines, setTextLines] = useState<string[]>(['Menu', 'Fermer']);

    const openTlRef = useRef<gsap.core.Timeline | null>(null);
    const closeTweenRef = useRef<gsap.core.Tween | null>(null);
    const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
    const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
    const colorTweenRef = useRef<gsap.core.Tween | null>(null);

    const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
    const busyRef = useRef(false);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const panel = panelRef.current;
            const preContainer = preLayersRef.current;
            const plusH = plusHRef.current;
            const plusV = plusVRef.current;
            const icon = iconRef.current;
            const textInner = textInnerRef.current;

            if (!panel || !plusH || !plusV || !icon || !textInner) return;

            let preLayers: HTMLElement[] = [];
            if (preContainer) {
                preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
            }
            preLayerElsRef.current = preLayers;

            const offscreen = position === 'left' ? -100 : 100;
            gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
            if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });

            gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
            gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
            gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
            gsap.set(textInner, { yPercent: 0 });

            if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: '#FE652D' });
        });
        return () => ctx.revert();
    }, [position]);

    const buildOpenTimeline = useCallback(() => {
        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return null;

        openTlRef.current?.kill();
        if (closeTweenRef.current) { closeTweenRef.current.kill(); closeTweenRef.current = null; }

        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')) as HTMLElement[];

        const offscreen = position === 'left' ? -100 : 100;
        const layerStates = layers.map(el => ({ el, start: offscreen }));

        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });

        const tl = gsap.timeline({ paused: true });

        layerStates.forEach((ls, i) => {
            tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
        });

        const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
        const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
        const panelDuration = 0.65;

        tl.fromTo(panel, { xPercent: offscreen }, { xPercent: 0, duration: panelDuration, ease: 'power4.out' }, panelInsertTime);

        if (itemEls.length) {
            const itemsStart = panelInsertTime + panelDuration * 0.15;
            tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } }, itemsStart);
            if (numberEls.length) {
                tl.to(numberEls, { duration: 0.6, ease: 'power2.out', ['--sm-num-opacity' as any]: 1, stagger: { each: 0.08, from: 'start' } }, itemsStart + 0.1);
            }
        }

        openTlRef.current = tl;
        return tl;
    }, [position]);

    const playOpen = useCallback(() => {
        if (busyRef.current) return;
        busyRef.current = true;
        const tl = buildOpenTimeline();
        if (tl) {
            tl.eventCallback('onComplete', () => { busyRef.current = false; });
            tl.play(0);
        } else {
            busyRef.current = false;
        }
    }, [buildOpenTimeline]);

    const playClose = useCallback(() => {
        openTlRef.current?.kill();
        openTlRef.current = null;

        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return;

        const all: HTMLElement[] = [...layers, panel];
        closeTweenRef.current?.kill();
        const offscreen = position === 'left' ? -100 : 100;

        closeTweenRef.current = gsap.to(all, {
            xPercent: offscreen,
            duration: 0.32,
            ease: 'power3.in',
            overwrite: 'auto',
            onComplete: () => {
                const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
                if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
                const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')) as HTMLElement[];
                if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });
                busyRef.current = false;
            }
        });
    }, [position]);

    const animateIcon = useCallback((opening: boolean) => {
        const icon = iconRef.current;
        const h = plusHRef.current;
        const v = plusVRef.current;
        if (!icon || !h || !v) return;
        spinTweenRef.current?.kill();

        if (opening) {
            gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
            spinTweenRef.current = gsap.timeline({ defaults: { ease: 'power4.out' } }).to(h, { rotate: 45, duration: 0.5 }, 0).to(v, { rotate: -45, duration: 0.5 }, 0);
        } else {
            spinTweenRef.current = gsap.timeline({ defaults: { ease: 'power3.inOut' } }).to(h, { rotate: 0, duration: 0.35 }, 0).to(v, { rotate: 90, duration: 0.35 }, 0).to(icon, { rotate: 0, duration: 0.001 }, 0);
        }
    }, []);

    const animateColor = useCallback((opening: boolean) => {
        const btn = toggleBtnRef.current;
        if (!btn) return;
        colorTweenRef.current?.kill();
        const targetColor = '#FE652D';
        colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });
    }, []);

    const animateText = useCallback((opening: boolean) => {
        const inner = textInnerRef.current;
        if (!inner) return;
        textCycleAnimRef.current?.kill();

        const currentLabel = opening ? 'Menu' : 'Fermer';
        const targetLabel = opening ? 'Fermer' : 'Menu';
        const seq: string[] = [currentLabel];
        let last = currentLabel;
        for (let i = 0; i < 3; i++) {
            last = last === 'Menu' ? 'Fermer' : 'Menu';
            seq.push(last);
        }
        if (last !== targetLabel) seq.push(targetLabel);
        seq.push(targetLabel);

        setTextLines(seq);
        gsap.set(inner, { yPercent: 0 });

        const finalShift = ((seq.length - 1) / seq.length) * 100;
        textCycleAnimRef.current = gsap.to(inner, {
            yPercent: -finalShift,
            duration: 0.5 + seq.length * 0.07,
            ease: 'power4.out'
        });
    }, []);

    const toggleMenu = useCallback(() => {
        const target = !openRef.current;
        openRef.current = target;
        setOpen(target);

        if (target) {
            onMenuOpen?.();
            playOpen();
        } else {
            onMenuClose?.();
            playClose();
        }

        animateIcon(target);
        animateColor(target);
        animateText(target);
    }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

    const closeMenu = useCallback(() => {
        if (openRef.current) {
            openRef.current = false;
            setOpen(false);
            onMenuClose?.();
            playClose();
            animateIcon(false);
            animateColor(false);
            animateText(false);
        }
    }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

    React.useEffect(() => {
        if (!closeOnClickAway || !open) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node) && toggleBtnRef.current && !toggleBtnRef.current.contains(event.target as Node)) {
                closeMenu();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [closeOnClickAway, open, closeMenu]);

    return (
        // ✅ CORRECTION : suppression de 'overflow-hidden' et 'fixed' agressif qui cachait la page
        <div className="sm-scope fixed top-0 left-0 inset-0 z-[9999]  pointer-events-none">
            <div
                className={(className ? className + ' ' : '') + 'staggered-menu-wrapper pointer-events-none relative w-full h-full z-40'}
                style={{ '--sm-accent': accentColor } as React.CSSProperties}
                data-position={position}
                data-open={open || undefined}
            >
                <div className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]" aria-hidden="true">
                    {colors.map((c, i) => (
                        <div
                            key={i}
                            className="sm-prelayer absolute top-0 right-0 h-full w-full"
                            style={{ background: c }}
                        />
                    ))}
                </div>

                <header
                    className={`staggered-menu-header fixed right-0 top-0 left-0 w-full flex items-center justify-between px-5 py-3 md:p-[1em] transition-all duration-300 pointer-events-none z-50 ${isScrolled
                            ? 'bg-stone-800/90 backdrop-blur-md shadow-lg'
                            : ' backdrop-blur-sm'
                        }`}
                    aria-label="Main navigation header"
                >  <div className="sm-logo flex items-center select-none pointer-events-auto" aria-label="Logo">
                        <img src="src/assets/logo.png" alt="Logo" className="sm-logo-img block h-20 md:h-20 w-auto object-contain" draggable={false} />
                    </div>

                    <div className="flex items-center gap-3 md:gap-4 pointer-events-auto">
                        <button
                            ref={toggleBtnRef}
                            className="sm-toggle relative inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer font-medium leading-none overflow-visible pointer-events-auto transition-colors duration-300"
                            style={{ color: '#FE652D' }}
                            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                            aria-expanded={open}
                            onClick={toggleMenu}
                            type="button"
                        >
                            <span ref={textWrapRef} className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap min-w-[3rem]" aria-hidden="true">
                                <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
                                    {textLines.map((l, i) => (
                                        <span className="sm-toggle-line block h-[1em] leading-none" key={i}>{l}</span>
                                    ))}
                                </span>
                            </span>
                            <span ref={iconRef} className="sm-icon relative w-[14px] h-[14px] shrink-0 inline-flex items-center justify-center" aria-hidden="true">
                                <span ref={plusHRef} className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2" />
                                <span ref={plusVRef} className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2" />
                            </span>
                        </button>
                    </div>
                </header>

                <aside
                    id="staggered-menu-panel"
                    ref={panelRef}
                    className="staggered-menu-panel absolute top-0 right-0 h-full bg-white flex flex-col p-[5em_1.5em_2em_1.5em] md:p-[6em_2em_2em_2em] overflow-y-auto z-10 backdrop-blur-[12px] pointer-events-auto"
                    style={{ WebkitBackdropFilter: 'blur(12px)' }}
                    aria-hidden={!open}
                >
                    <div className="sm-panel-inner flex-1 flex flex-col gap-5">
                        <ul className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2" role="list" data-numbering={displayItemNumbering || undefined}>
                            {items && items.length > 0 ? (
                                items.map((it, idx) => (
                                    <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                                        <Link
                                            to={it.link}
                                            onClick={closeMenu}
                                            className="sm-panel-item relative text-[#111111] my-5 font-semibold text-[2.5rem] md:text-[4rem] cursor-pointer leading-none tracking-[-1px] md:tracking-[-2px] uppercase transition-colors duration-150 ease-linear inline-block no-underline pr-[1.4em] hover:text-[#FE652D] focus:outline-none focus:text-[#FE652D]"
                                            aria-label={it.ariaLabel}
                                            data-index={idx + 1}
                                        >
                                            <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                                                {it.label}
                                            </span>
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li className="sm-panel-itemWrap relative overflow-hidden leading-none">
                                    <span className="sm-panel-item relative text-[#111111] font-semibold text-[2.5rem] md:text-[4rem] leading-none tracking-[-1px] md:tracking-[-2px] uppercase inline-block pr-[1.4em]">
                                        <span className="sm-panel-itemLabel inline-block">Aucun lien</span>
                                    </span>
                                </li>
                            )}
                        </ul>

                        {/* ✅ BOUTONS CONNECTÉS AUX COMPOSANTS GLOBAUX */}
                        <div className="mt-auto pt-8 flex flex-col gap-4 border-t border-stone-200">
                            <button
                                onClick={() => {
                                    closeMenu();
                                    onOpenSearch?.();
                                }}
                                className="relative overflow-hidden bg-stone-100 text-stone-800 font-medium py-3.5 px-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-base tracking-wide group flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#FE652D] focus:ring-offset-2"
                            >
                                <IoSearchSharp className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                                <span className="relative z-10 font-semibold">Rechercher</span>
                            </button>

                            <button
                                onClick={() => {
                                    closeMenu();
                                    onOpenCart?.();
                                }}
                                className="relative overflow-hidden bg-[#FE652D] text-white font-medium py-3.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-base tracking-wide group flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#FE652D] focus:ring-offset-2"
                            >
                                <FaShoppingCart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                                <span className="relative z-10 font-semibold">Mon Panier</span>
                                <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>
                </aside>
            </div>

            <style>{`
                .sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 40; pointer-events: none; }
                .sm-scope .staggered-menu-header { pointer-events: none; z-index: 20; }
                .sm-scope .staggered-menu-header > * { pointer-events: auto; }
                .sm-scope .sm-logo-img { display: block; width: auto; object-fit: contain; }
                
                .sm-scope .sm-toggle { 
                    position: relative; 
                    display: inline-flex; 
                    align-items: center; 
                    gap: 0.3rem; 
                    background: transparent; 
                    border: none; 
                    cursor: pointer; 
                    font-weight: 500; 
                    line-height: 1; 
                    overflow: visible; 
                    color: #FE652D !important;
                }
                .sm-scope .sm-toggle:focus-visible { outline: 2px solid #FE652D; outline-offset: 4px; border-radius: 4px; }
                .sm-scope .sm-toggle-textWrap { position: relative; margin-right: 0.5em; display: inline-block; height: 1em; overflow: hidden; white-space: nowrap; min-width: 3rem; }
                .sm-scope .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; }
                .sm-scope .sm-toggle-line { display: block; height: 1em; line-height: 1; }
                .sm-scope .sm-icon { position: relative; width: 14px; height: 14px; flex: 0 0 14px; display: inline-flex; align-items: center; justify-content: center; }
                .sm-scope .sm-icon-line { position: absolute; left: 50%; top: 50%; width: 100%; height: 2px; background: currentColor; border-radius: 2px; transform: translate(-50%, -50%); }
                
                .sm-scope .staggered-menu-panel { 
                    position: fixed; /* <-- CHANGÉ EN FIXED */
                    top: 0; 
                    right: 0; 
                    width: clamp(260px, 85vw, 420px); 
                    height: 100vh; /* <-- CHANGÉ EN 100vh (HAUTEUR ÉCRAN) */
                    background: white; 
                    backdrop-filter: blur(12px); 
                    -webkit-backdrop-filter: blur(12px); 
                    display: flex; 
                    flex-direction: column; 
                    overflow-y: auto; 
                    z-index: 10; 
                    pointer-events: auto; 
                }

                .sm-scope .sm-prelayers { 
                    position: fixed; /* <-- CHANGÉ EN FIXED */
                    top: 0; 
                    right: 0; 
                    bottom: 0; 
                    width: clamp(260px, 85vw, 420px); 
                    pointer-events: none; 
                    z-index: 5; 
                }
                .sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }
                .sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
                .sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
                .sm-scope .sm-panel-item { position: relative; color: #111111; font-weight: 600; font-size: 2.5rem; cursor: pointer; line-height: 1; letter-spacing: -1px; text-transform: uppercase; transition: color 0.25s; display: inline-block; text-decoration: none; padding-right: 1.4em; }
                @media (min-width: 768px) { .sm-scope .sm-panel-item { font-size: 4rem; letter-spacing: -2px; } }
                .sm-scope .sm-panel-item:hover { color: var(--sm-accent, #FE652D); }
                .sm-scope .sm-panel-item:focus-visible { color: #FE652D; outline: none; }
                .sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
                .sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
                .sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.1em; right: 3.2em; font-size: 18px; font-weight: 400; color: var(--sm-accent, #FE652D); pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
                @media (max-width: 1024px) { .sm-scope .staggered-menu-panel, .sm-scope .sm-prelayers { width: 100%; left: 0; right: 0; } }
            `}</style>
        </div>
    );
};

export default StaggeredMenu;