"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// Services offerts
const services = [
  {
    id: "site-web",
    title: "Site Web et vitrine",
    description:
      "Des sites web modernes, réactifs et optimisés pour tous les appareils",
    icon: "🌐",
    features: [
      "Design responsive",
      "Interface moderne",
      "Performance optimisée",
      "SEO amélioré",
    ],
  },
  {
    id: "application-web",
    title: "Application Web",
    description:
      "Des applications web complètes avec fonctionnalités avancées et expérience utilisateur fluide",
    icon: "💻",
    features: [
      "Expérience utilisateur fluide",
      "Animations élégantes",
      "Fonctionnalités avancées",
      "Haute performance",
    ],
  },
  {
    id: "e-commerce",
    title: "E-Commerce",
    description:
      "Solutions e-commerce personnalisées avec gestion de produits et paiements sécurisés",
    icon: "🛒",
    features: [
      "Catalogue de produits",
      "Panier d'achat sécurisé",
      "Gestion des commandes",
      "Paiement en ligne",
    ],
  },
];

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Animations parallaxes
  const titleY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Animation des cartes (séquentielles)
  const cardContainerOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.3],
    [0, 1]
  );
  const cardContainerY = useTransform(scrollYProgress, [0.1, 0.5], [100, 0]);

  // Animation de l'arrière-plan
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Animation des particules pour effet "Apple"
  const particleCount = 30;
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.1,
    speed: Math.random() * 0.8 + 0.2,
  }));

  return (
    <div
      ref={sectionRef}
      className="w-full h-full flex items-center justify-center relative"
    >
      {/* Arrière-plan avec effet de parallaxe */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(25,25,80,0.5) 0%, rgba(10,10,30,0.8) 50%, rgba(0,0,0,1) 100%)",
          y: bgY,
          scale: bgScale,
        }}
      />

      {/* Grille décorative animée */}
      <motion.div
        className="absolute inset-0 z-1"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.2, 0.1]),
          y: useTransform(scrollYProgress, [0, 1], [0, -50]),
        }}
      />

      {/* Particules flottantes style Apple */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            zIndex: 1,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -100 * particle.speed],
            opacity: [particle.opacity, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Formes flottantes */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(80, 80, 255, 0.2) 0%, transparent 70%)",
          left: "10%",
          top: "30%",
          filter: "blur(40px)",
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.4, 0.2]),
          x: useTransform(scrollYProgress, [0, 1], [-50, 0]),
          y: useTransform(scrollYProgress, [0, 1], [50, -50]),
          zIndex: 1,
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255, 80, 180, 0.2) 0%, transparent 70%)",
          right: "10%",
          bottom: "20%",
          filter: "blur(50px)",
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0.1]),
          x: useTransform(scrollYProgress, [0, 1], [50, 0]),
          y: useTransform(scrollYProgress, [0, 1], [50, -50]),
          zIndex: 1,
        }}
      />

      {/* Contenu de la section */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          style={{
            y: titleY,
            opacity: titleOpacity,
          }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-extralight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Nos Services
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Des solutions digitales modernes et sur mesure pour votre entreprise
          </motion.p>
        </motion.div>

        {/* Cards container */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          style={{
            opacity: cardContainerOpacity,
            y: cardContainerY,
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="relative backdrop-blur-lg rounded-2xl border border-white/10 p-8 overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              onHoverStart={() => setHoveredService(service.id)}
              onHoverEnd={() => setHoveredService(null)}
              onClick={() =>
                setSelectedService(
                  selectedService === service.id ? null : service.id
                )
              }
            >
              {/* Carte avec effet de glow au survol */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
                initial={{ opacity: 0 }}
                animate={{
                  opacity:
                    hoveredService === service.id ||
                    selectedService === service.id
                      ? 0.2
                      : 0,
                  scale: selectedService === service.id ? 1 : 1,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Icône avec animation de morphing */}
              <motion.div
                className="text-5xl mb-5"
                initial={{ scale: 1, rotate: 0 }}
                whileHover={{
                  scale: [1, 1.2, 1.1],
                  rotate: [0, 5, 0],
                  transition: {
                    duration: 0.8,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                  },
                }}
                animate={{
                  y: selectedService === service.id ? -10 : 0,
                  scale: selectedService === service.id ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {service.icon}
              </motion.div>

              {/* Titre avec animation */}
              <motion.h3
                className="text-2xl font-light mb-3"
                animate={{
                  y: selectedService === service.id ? -5 : 0,
                  color: selectedService === service.id ? "#ffffff" : "#f8f8f8",
                }}
              >
                {service.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-white/60 mb-4"
                animate={{
                  opacity: selectedService === service.id ? 0.4 : 0.6,
                }}
              >
                {service.description}
              </motion.p>

              {/* Features qui apparaissent quand sélectionné */}
              <AnimatePresence>
                {selectedService === service.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center text-white/80"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 * i }}
                        >
                          <span className="mr-2 text-blue-400">✓</span>{" "}
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bouton "En savoir plus" */}
              <motion.button
                className="mt-4 text-sm py-1 px-3 rounded-full border border-white/20 bg-white/5 text-white/70"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  rotate: selectedService === service.id ? 45 : 0,
                  opacity: selectedService === service.id ? 1 : 0.7,
                }}
              >
                {selectedService === service.id ? "-" : "+"}
              </motion.button>

              {/* Effet visuel avec animation style Apple */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{
                  scaleX:
                    hoveredService === service.id ||
                    selectedService === service.id
                      ? 1
                      : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Effet de lumière dynamique */}
              <motion.div
                className="absolute -inset-20 rounded-full opacity-0 group-hover:opacity-20 bg-white pointer-events-none"
                style={{ filter: "blur(60px)" }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: hoveredService === service.id ? [0, 0.15, 0] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Ligne animée style Apple */}
        <motion.div
          className="flex justify-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative w-48 h-1 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesSection;
