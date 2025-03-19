'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["Remis au goût du jour", "Avec un design élégant", "Pour une image professionnelle", "A prix abordable"];
  const [isMounted, setIsMounted] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Animation de l'arrière-plan
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  const springConfig = { stiffness: 100, damping: 30 };
  const springY = useSpring(y, springConfig);
  const springOpacity = useSpring(opacity, springConfig);
  
  // Animation des particules pour effet "Apple"
  const particleCount = 30;
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.1,
    speed: Math.random() * 0.8 + 0.2
  }));
  
  // Set isMounted to true on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (!isMounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, isMounted]);
  
  // Effet de défilement des mots avec fondu
  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [words.length, isMounted]);
  
  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
    >
      {/* Arrière-plan avec effet de parallaxe */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, rgba(25,25,80,0.5) 0%, rgba(10,10,30,0.8) 50%, rgba(0,0,0,1) 100%)',
          y: bgY,
          scale: bgScale
        }}
      />
      
      {/* Grille décorative animée */}
      <motion.div 
        className="absolute inset-0 z-1"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.2, 0.1]),
          y: useTransform(scrollYProgress, [0, 1], [0, -50])
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
            filter: 'blur(1px)',
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
          background: 'radial-gradient(circle at center, rgba(80, 80, 255, 0.2) 0%, transparent 70%)',
          left: '10%',
          top: '30%',
          filter: 'blur(40px)',
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.4, 0.2]),
          x: useTransform(scrollYProgress, [0, 1], [-50, 0]),
          y: useTransform(scrollYProgress, [0, 1], [50, -50]),
          zIndex: 1
        }}
      />
      
      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 80, 180, 0.2) 0%, transparent 70%)',
          right: '10%',
          bottom: '20%',
          filter: 'blur(50px)',
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0.1]),
          x: useTransform(scrollYProgress, [0, 1], [50, 0]),
          y: useTransform(scrollYProgress, [0, 1], [50, -50]),
          zIndex: 1
        }}
      />
      
      {/* Main content */}
      <motion.div
        className="container relative z-10 px-6 text-center"
        style={{ y: springY, opacity: springOpacity }}
      >
        <motion.h1 
          className="text-5xl md:text-8xl font-thin mb-6 tracking-tighter"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Votre site web
          </span>
        </motion.h1>
        
        <div className="h-24 md:h-32 mb-8 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWordIndex}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.5,
                ease: "easeInOut"
              }}
            >
              <span className="text-4xl md:text-7xl font-extralight">
                {words[currentWordIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <motion.p 
          className="text-lg md:text-xl text-white/60 mb-12 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          200€ tout inclus
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link href="/modeles">
            <motion.button
              className="px-8 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Découvrir
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center">
          <motion.div 
            className="w-1 h-2 bg-white/50 rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero; 