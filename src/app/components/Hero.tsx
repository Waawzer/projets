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
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const springConfig = { stiffness: 100, damping: 30 };
  const springY = useSpring(y, springConfig);
  const springOpacity = useSpring(opacity, springConfig);
  
  // Set isMounted to true on client-side
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }, []);
  
  useEffect(() => {
    if (!isMounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
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
  
  const glowX = useTransform(mouseX, (val) => (val - (windowSize.width / 2)) * 0.05);
  const glowY = useTransform(mouseY, (val) => (val - (windowSize.height / 2)) * 0.05);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(10,10,40,0.8) 0%, rgba(0,0,0,1) 70%)',
          x: glowX,
          y: glowY
        }}
      />
      
      {/* Floating particles - only render on client-side */}
      {isMounted && Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/30"
          initial={{ 
            x: Math.random() * windowSize.width, 
            y: Math.random() * windowSize.height,
            scale: Math.random() * 3
          }}
          animate={{ 
            x: [null, Math.random() * windowSize.width],
            y: [null, Math.random() * windowSize.height],
          }}
          transition={{ 
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ opacity: 0.1 + Math.random() * 0.3 }}
        />
      ))}
      
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
    </section>
  );
};

export default Hero; 