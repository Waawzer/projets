'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 50], [0.4, 1]);
  const headerBlur = useTransform(scrollY, [0, 50], [0, 8]);
  
  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 py-4 px-6"
        style={{ 
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBlur}px)`,
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          delay: 0.8
        }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <motion.div
              className="text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                WM
              </span>
            </motion.div>
          </Link>

          <motion.div
            className="cursor-pointer z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </motion.div>
        </div>
      </motion.header>

      {/* Full screen menu */}
      <motion.div 
        className="fixed inset-0 z-40 flex items-center justify-center"
        initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
        animate={{ 
          opacity: menuOpen ? 1 : 0,
          clipPath: menuOpen ? "circle(150% at top right)" : "circle(0% at top right)",
          pointerEvents: menuOpen ? "auto" : "none"
        }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl z-0"></div>
        <nav className="relative z-10">
          {['Accueil', 'Nos Réalisations', 'Pourquoi nous', 'Contact'].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 50 }}
              transition={{ delay: menuOpen ? 0.1 * index : 0 }}
              className="mb-8 text-center"
            >
              <Link 
                href={item === 'Accueil' 
                  ? '/' 
                  : item === 'Nos Réalisations' 
                    ? '/#realisations' 
                    : `/${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-4xl font-light text-white/80 hover:text-white transition-colors">
                  {item}
                </span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>
    </>
  );
};

export default Header; 