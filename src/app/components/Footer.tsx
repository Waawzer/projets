"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Animation de l'arrière-plan
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Animation des particules pour effet "Apple"
  const particleCount = 20;
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.3 + 0.1,
    speed: Math.random() * 0.8 + 0.2,
  }));

  return (
    <div
      ref={sectionRef}
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
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
          left: "5%",
          top: "30%",
          filter: "blur(40px)",
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0.1]),
          x: useTransform(scrollYProgress, [0, 1], [-30, 0]),
          y: useTransform(scrollYProgress, [0, 1], [30, -30]),
          zIndex: 1,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center">
          <Link href="/" className="inline-block mb-6">
            <motion.div
              className="text-xl font-light"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                WebModels
              </span>
            </motion.div>
          </Link>

          <div className="flex space-x-6 mb-6">
            {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
              <motion.a
                key={social}
                href={`https://${social}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white/90 transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {social[0].toUpperCase()}
              </motion.a>
            ))}
          </div>

          <div className="text-center text-white/40 text-xs">
            <p>© {currentYear} WebModels</p>
            <p className="mt-1">contact@webmodels.fr • +33 6 00 00 00 00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
