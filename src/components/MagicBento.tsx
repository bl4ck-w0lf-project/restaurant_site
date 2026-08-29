import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { MenuMeals } from '../data/MenuMeals';
import type { MenuItem } from '../data/MenuMeals';

export interface BentoCardProps {
    color?: string;
    title?: string;
    description?: string;
    label?: string;
    price?: string;
    img?: string;
    category?: string;
    textAutoHide?: boolean;
    disableAnimations?: boolean;
}

export interface BentoProps {
    items?: MenuItem[];
    textAutoHide?: boolean;
    enableStars?: boolean;
    enableSpotlight?: boolean;
    enableBorderGlow?: boolean;
    disableAnimations?: boolean;
    spotlightRadius?: number;
    particleCount?: number;
    enableTilt?: boolean;
    glowColor?: string;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '254, 101, 45';
const MOBILE_BREAKPOINT = 768;

// Fonction pour obtenir la catégorie en français
const getCategoryLabel = (category: string) => {
    switch (category) {
        case 'entree': return 'Entrée';
        case 'plat_principal': return 'Plat Principal';
        case 'dessert': return 'Dessert';
        case 'boisson': return 'Boisson';
        default: return '';
    }
};

// ===== CRÉATION DES PARTICULES =====
const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
    return el;
};

// ===== CALCUL SPOTLIGHT =====
const calculateSpotlightValues = (radius: number) => ({
    proximity: radius * 0.5,
    fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
    const rect = card.getBoundingClientRect();
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;

    card.style.setProperty('--glow-x', `${relativeX}%`);
    card.style.setProperty('--glow-y', `${relativeY}%`);
    card.style.setProperty('--glow-intensity', glow.toString());
    card.style.setProperty('--glow-radius', `${radius}px`);
};

// ===== PARTICLE CARD =====
const ParticleCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    disableAnimations?: boolean;
    style?: React.CSSProperties;
    particleCount?: number;
    glowColor?: string;
    enableTilt?: boolean;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
}> = ({
    children,
    className = '',
    disableAnimations = false,
    style,
    particleCount = DEFAULT_PARTICLE_COUNT,
    glowColor = DEFAULT_GLOW_COLOR,
    enableTilt = true,
    clickEffect = true,
    enableMagnetism = true
}) => {
        const cardRef = useRef<HTMLDivElement>(null);
        const particlesRef = useRef<HTMLDivElement[]>([]);
        const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
        const isHoveredRef = useRef(false);
        const memoizedParticles = useRef<HTMLDivElement[]>([]);
        const particlesInitialized = useRef(false);
        const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

        const initializeParticles = useCallback(() => {
            if (particlesInitialized.current || !cardRef.current) return;

            const { width, height } = cardRef.current.getBoundingClientRect();
            memoizedParticles.current = Array.from({ length: particleCount }, () =>
                createParticleElement(Math.random() * width, Math.random() * height, glowColor)
            );
            particlesInitialized.current = true;
        }, [particleCount, glowColor]);

        const clearAllParticles = useCallback(() => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
            magnetismAnimationRef.current?.kill();

            particlesRef.current.forEach(particle => {
                gsap.to(particle, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'back.in(1.7)',
                    onComplete: () => {
                        particle.parentNode?.removeChild(particle);
                    }
                });
            });
            particlesRef.current = [];
        }, []);

        const animateParticles = useCallback(() => {
            if (!cardRef.current || !isHoveredRef.current) return;

            if (!particlesInitialized.current) {
                initializeParticles();
            }

            memoizedParticles.current.forEach((particle, index) => {
                const timeoutId = setTimeout(() => {
                    if (!isHoveredRef.current || !cardRef.current) return;

                    const clone = particle.cloneNode(true) as HTMLDivElement;
                    cardRef.current.appendChild(clone);
                    particlesRef.current.push(clone);

                    gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

                    gsap.to(clone, {
                        x: (Math.random() - 0.5) * 100,
                        y: (Math.random() - 0.5) * 100,
                        rotation: Math.random() * 360,
                        duration: 2 + Math.random() * 2,
                        ease: 'none',
                        repeat: -1,
                        yoyo: true
                    });

                    gsap.to(clone, {
                        opacity: 0.3,
                        duration: 1.5,
                        ease: 'power2.inOut',
                        repeat: -1,
                        yoyo: true
                    });
                }, index * 100);

                timeoutsRef.current.push(timeoutId);
            });
        }, [initializeParticles]);

        useEffect(() => {
            if (disableAnimations || !cardRef.current) return;

            const element = cardRef.current;

            const handleMouseEnter = () => {
                isHoveredRef.current = true;
                animateParticles();

                if (enableTilt) {
                    gsap.to(element, {
                        rotateX: 5,
                        rotateY: 5,
                        duration: 0.3,
                        ease: 'power2.out',
                        transformPerspective: 1000
                    });
                }
            };

            const handleMouseLeave = () => {
                isHoveredRef.current = false;
                clearAllParticles();

                if (enableTilt) {
                    gsap.to(element, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }

                if (enableMagnetism) {
                    gsap.to(element, {
                        x: 0,
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            };

            const handleMouseMove = (e: MouseEvent) => {
                if (!enableTilt && !enableMagnetism) return;

                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                if (enableTilt) {
                    const rotateX = ((y - centerY) / centerY) * -10;
                    const rotateY = ((x - centerX) / centerX) * 10;

                    gsap.to(element, {
                        rotateX,
                        rotateY,
                        duration: 0.1,
                        ease: 'power2.out',
                        transformPerspective: 1000
                    });
                }

                if (enableMagnetism) {
                    const magnetX = (x - centerX) * 0.05;
                    const magnetY = (y - centerY) * 0.05;

                    magnetismAnimationRef.current = gsap.to(element, {
                        x: magnetX,
                        y: magnetY,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            };

            const handleClick = (e: MouseEvent) => {
                if (!clickEffect) return;

                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const maxDistance = Math.max(
                    Math.hypot(x, y),
                    Math.hypot(x - rect.width, y),
                    Math.hypot(x, y - rect.height),
                    Math.hypot(x - rect.width, y - rect.height)
                );

                const ripple = document.createElement('div');
                ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

                element.appendChild(ripple);

                gsap.fromTo(
                    ripple,
                    {
                        scale: 0,
                        opacity: 1
                    },
                    {
                        scale: 1,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        onComplete: () => ripple.remove()
                    }
                );
            };

            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
            element.addEventListener('mousemove', handleMouseMove);
            element.addEventListener('click', handleClick);

            return () => {
                isHoveredRef.current = false;
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
                element.removeEventListener('mousemove', handleMouseMove);
                element.removeEventListener('click', handleClick);
                clearAllParticles();
            };
        }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

        return (
            <div
                ref={cardRef}
                className={`${className} relative overflow-hidden`}
                style={{ ...style, position: 'relative', overflow: 'hidden' }}
            >
                {children}
            </div>
        );
    };

// ===== GLOBAL SPOTLIGHT =====
const GlobalSpotlight: React.FC<{
    gridRef: React.RefObject<HTMLDivElement | null>;
    disableAnimations?: boolean;
    enabled?: boolean;
    spotlightRadius?: number;
    glowColor?: string;
}> = ({
    gridRef,
    disableAnimations = false,
    enabled = true,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    glowColor = DEFAULT_GLOW_COLOR
}) => {
        const spotlightRef = useRef<HTMLDivElement | null>(null);
        const isInsideSection = useRef(false);

        useEffect(() => {
            if (disableAnimations || !gridRef?.current || !enabled) return;

            const spotlight = document.createElement('div');
            spotlight.className = 'global-spotlight';
            spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
            document.body.appendChild(spotlight);
            spotlightRef.current = spotlight;

            const handleMouseMove = (e: MouseEvent) => {
                if (!spotlightRef.current || !gridRef.current) return;

                const section = gridRef.current.closest('.bento-section');
                const rect = section?.getBoundingClientRect();
                const mouseInside =
                    rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

                isInsideSection.current = mouseInside || false;
                const cards = gridRef.current.querySelectorAll('.card');

                if (!mouseInside) {
                    gsap.to(spotlightRef.current, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    cards.forEach(card => {
                        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
                    });
                    return;
                }

                const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
                let minDistance = Infinity;

                cards.forEach(card => {
                    const cardElement = card as HTMLElement;
                    const cardRect = cardElement.getBoundingClientRect();
                    const centerX = cardRect.left + cardRect.width / 2;
                    const centerY = cardRect.top + cardRect.height / 2;
                    const distance =
                        Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
                    const effectiveDistance = Math.max(0, distance);

                    minDistance = Math.min(minDistance, effectiveDistance);

                    let glowIntensity = 0;
                    if (effectiveDistance <= proximity) {
                        glowIntensity = 1;
                    } else if (effectiveDistance <= fadeDistance) {
                        glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
                    }

                    updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
                });

                gsap.to(spotlightRef.current, {
                    left: e.clientX,
                    top: e.clientY,
                    duration: 0.1,
                    ease: 'power2.out'
                });

                const targetOpacity =
                    minDistance <= proximity
                        ? 0.8
                        : minDistance <= fadeDistance
                            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
                            : 0;

                gsap.to(spotlightRef.current, {
                    opacity: targetOpacity,
                    duration: targetOpacity > 0 ? 0.2 : 0.5,
                    ease: 'power2.out'
                });
            };

            const handleMouseLeave = () => {
                isInsideSection.current = false;
                gridRef.current?.querySelectorAll('.card').forEach(card => {
                    (card as HTMLElement).style.setProperty('--glow-intensity', '0');
                });
                if (spotlightRef.current) {
                    gsap.to(spotlightRef.current, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseleave', handleMouseLeave);
                spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
            };
        }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

        return null;
    };

// ===== MOBILE DETECTION =====
const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};

//===== MAGIC BENTO PRINCIPAL - TAILLE RÉDUITE =====
const MagicBento: React.FC<BentoProps> = ({
    items,
    textAutoHide = true,
    enableStars = true,
    enableSpotlight = true,
    enableBorderGlow = true,
    disableAnimations = false,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    particleCount = DEFAULT_PARTICLE_COUNT,
    enableTilt = false,
    glowColor = DEFAULT_GLOW_COLOR,
    clickEffect = true,
    enableMagnetism = true
}) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const isMobile = useMobileDetection();
    const shouldDisableAnimations = disableAnimations || isMobile;

    // Si des items sont passés en props, on les utilise, sinon on prend les 6 premiers de MenuMeals
    const bentoItems = items && items.length > 0
        ? items
        : [
            ...MenuMeals.filter(item => item.category === 'entree').slice(0, 2),
            ...MenuMeals.filter(item => item.category === 'plat_principal').slice(0, 2),
            ...MenuMeals.filter(item => item.category === 'dessert').slice(0, 1),
            ...MenuMeals.filter(item => item.category === 'boisson').slice(0, 1),
        ];

    // Organisation des cartes : Card 1 (grande), Card 2, Card 3 (petites) à gauche
    // Card 4 (grande), Card 5, Card 6 (petites) à droite
    const leftItems = bentoItems.slice(0, 3); // Card 1, 2, 3
    const rightItems = bentoItems.slice(3, 6); // Card 4, 5, 6

    return (
        <>
            <style>
                {`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${glowColor};
            --border-color: #2F293A;
            --background-dark: #120F17;
           
            --white: hsl(0, 0%, 100%);
            --purple-primary: rgba(132, 0, 255, 1);
            --purple-glow: rgba(132, 0, 255, 0.2);
            --purple-border: rgba(132, 0, 255, 0.8);
           
           
          }
          
          .bento-grid-container {
            display: flex;
            flex-direction: column;
            gap: 0.75rem; /* ← RÉDUIT de 1rem à 0.75rem */
            width: 100%;
            margin-inline: auto;
            
            
            
          }
          
          .bento-row {
            display: flex;
            flex-direction: column;
            gap: 0.75rem; /* ← RÉDUIT de 1rem à 0.75rem */
          }
          
          @media (min-width: 1024px) {
            .bento-grid-container {
              flex-direction: row;
              gap: 1rem; /* ← RÉDUIT de 1.5rem à 1rem */
            }
            
            .bento-row {
              flex: 1;
              display: flex;
              flex-direction: column;
              gap: 0.75rem; /* ← RÉDUIT de 1rem à 0.75rem */
            }
          }
          
          /* Layout GAUCHE : Card 1 en bas, Card 2 + Card 3 en haut */
          .bento-left-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 0.75rem; /* ← RÉDUIT de 1rem à 0.75rem */
            flex: 1;
          }
          
          .bento-left-grid .card-big {
            grid-column: 1 / -1;
            grid-row: 2;
          }
          
          .bento-left-grid .card-small-2 {
            grid-column: 1;
            grid-row: 1;
          }
          
          .bento-left-grid .card-small-3 {
            grid-column: 2;
            grid-row: 1;
          }
          
          /* Layout DROITE : Card 4 en haut, Card 5 + Card 6 en bas */
          .bento-right-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 0.75rem; /* ← RÉDUIT de 1rem à 0.75rem */
            flex: 1;
          }
          
          .bento-right-grid .card-big {
            grid-column: 1 / -1;
            grid-row: 1;
          }
          
          .bento-right-grid .card-small-5 {
            grid-column: 1;
            grid-row: 2;
          }
          
          .bento-right-grid .card-small-6 {
            grid-column: 2;
            grid-row: 2;
          }
          
          /* Mobile */
          @media (max-width: 1023px) {
            .bento-left-grid,
            .bento-right-grid {
              display: flex;
              flex-direction: column;
              gap: 0.75rem; /* ← RÉDUIT de 1rem à 0.75rem */
            }
            
            .bento-left-grid .card-big,
            .bento-right-grid .card-big {
              order: 1;
            }
            
            .bento-left-grid .card-small-2,
            .bento-left-grid .card-small-3,
            .bento-right-grid .card-small-5,
            .bento-right-grid .card-small-6 {
              order: 0;
            }
            
            .bento-left-grid .card-small-2,
            .bento-left-grid .card-small-3,
            .bento-right-grid .card-small-5,
            .bento-right-grid .card-small-6 {
              flex: 1;
              min-height: 150px; /* ← RÉDUIT de 200px à 150px */
            }
            
            .bento-left-grid .card-big,
            .bento-right-grid .card-big {
              flex: 1;
              min-height: 220px; /* ← RÉDUIT de 300px à 220px */
            }
          }
          
          
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .card--border-glow:hover::after {
            opacity: 1;
          }
          
          .card--border-glow:hover {
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(${glowColor}, 0.2);
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${glowColor}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }
          
          .text-clamp-1 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .text-clamp-2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .card .card__image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.7s ease-out;
          }
          
          .card:hover .card__image {
            transform: scale(1.05);
          }
          
          /* Glassmorphism sur le contenu */
          .card__content-glass {
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        `}
            </style>

            {enableSpotlight && (
                <GlobalSpotlight
                    gridRef={gridRef}
                    disableAnimations={shouldDisableAnimations}
                    enabled={enableSpotlight}
                    spotlightRadius={spotlightRadius}
                    glowColor={glowColor}
                />
            )}

            <div className="bento-section relative" ref={gridRef}>
                <div className="bento-grid-container">
                    {/* ===== BLOC GAUCHE ===== */}
                    <div className="bento-row">
                        <div className="bento-left-grid">
                            {/* CARD 1 - GRANDE EN BAS */}
                            {leftItems[0] && (
                                <div className="card-big">
                                    {createCard(leftItems[0], true, enableBorderGlow, shouldDisableAnimations, particleCount, glowColor, enableTilt, clickEffect, enableMagnetism, textAutoHide)}
                                </div>
                            )}
                            {/* CARD 2 - PETITE EN HAUT GAUCHE */}
                            {leftItems[1] && (
                                <div className="card-small-2">
                                    {createCard(leftItems[1], false, enableBorderGlow, shouldDisableAnimations, particleCount, glowColor, enableTilt, clickEffect, enableMagnetism, textAutoHide)}
                                </div>
                            )}
                            {/* CARD 3 - PETITE EN HAUT DROITE */}
                            {leftItems[2] && (
                                <div className="card-small-3">
                                    {createCard(leftItems[2], false, enableBorderGlow, shouldDisableAnimations, particleCount, glowColor, enableTilt, clickEffect, enableMagnetism, textAutoHide)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ===== BLOC DROITE ===== */}
                    <div className="bento-row">
                        <div className="bento-right-grid">
                            {/* CARD 4 - GRANDE EN HAUT */}
                            {rightItems[0] && (
                                <div className="card-big">
                                    {createCard(rightItems[0], true, enableBorderGlow, shouldDisableAnimations, particleCount, glowColor, enableTilt, clickEffect, enableMagnetism, textAutoHide)}
                                </div>
                            )}
                            {/* CARD 5 - PETITE EN BAS GAUCHE */}
                            {rightItems[1] && (
                                <div className="card-small-5">
                                    {createCard(rightItems[1], false, enableBorderGlow, shouldDisableAnimations, particleCount, glowColor, enableTilt, clickEffect, enableMagnetism, textAutoHide)}
                                </div>
                            )}
                            {/* CARD 6 - PETITE EN BAS DROITE */}
                            {rightItems[2] && (
                                <div className="card-small-6">
                                    {createCard(rightItems[2], false, enableBorderGlow, shouldDisableAnimations, particleCount, glowColor, enableTilt, clickEffect, enableMagnetism, textAutoHide)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


// ===== FONCTION DE CRÉATION DE CARD =====
const createCard = (
    item: MenuItem,
    isBig: boolean,
    enableBorderGlow: boolean,
    shouldDisableAnimations: boolean,
    particleCount: number,
    glowColor: string,
    enableTilt: boolean,
    clickEffect: boolean,
    enableMagnetism: boolean,
    textAutoHide: boolean
) => {
    const baseClassName = `card flex flex-col justify-end relative w-full rounded-[16px] border border-solid font-light overflow-hidden transition-colors duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] ${
        enableBorderGlow ? 'card--border-glow' : ''
    } ${isBig ? 'aspect-[4/3] min-h-[240px]' : 'aspect-[4/3] min-h-[150px]'}`; 
    // ← RÉDUIT : big 320px→240px, small 200px→150px

    const cardStyle = {
        backgroundColor: 'var(--background-dark)',
        borderColor: 'var(--border-color)',
        color: 'var(--white)',
        '--glow-x': '50%',
        '--glow-y': '50%',
        '--glow-intensity': '0',
        '--glow-radius': '200px',
        backgroundImage: `url(${item.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    } as React.CSSProperties;

    return (
        <ParticleCard
            key={item.id}
            className={baseClassName}
            style={cardStyle}
            disableAnimations={shouldDisableAnimations}
            particleCount={particleCount}
            glowColor={glowColor}
            enableTilt={enableTilt}
            clickEffect={clickEffect}
            enableMagnetism={enableMagnetism}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="card__content flex flex-col relative z-10 text-white p-4"> {/* ← RÉDUIT p-5 à p-4 */}
                <span className="text-[#FE652D] text-[10px] font-bold tracking-[0.2em] uppercase mb-0.5">
                    {getCategoryLabel(item.category)}
                </span>
                <h3 className={`card__title font-serif text-base md:text-lg m-0 mb-0.5 ${textAutoHide ? 'text-clamp-1' : ''}`}>
                    {/* ← RÉDUIT text-xl md:text-2xl à text-base md:text-lg */}
                    {item.name}
                </h3>
                <div className="flex items-center justify-between">
                    <p className={`card__description text-xs leading-4 opacity-90 ${textAutoHide ? 'text-clamp-2' : ''}`}>
                        {/* ← RÉDUIT text-sm à text-xs */}
                        {item.description}
                    </p>
                    <span className="text-[#FE652D] font-medium text-xs md:text-sm whitespace-nowrap ml-2">
                        {/* ← RÉDUIT text-sm md:text-base à text-xs md:text-sm */}
                        {item.price}
                    </span>
                </div>
            </div>
        </ParticleCard>
    );
};

export default MagicBento;