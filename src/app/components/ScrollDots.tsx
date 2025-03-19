'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScrollDotsProps {
  sections: string[];
  activeSection?: number;
  onNavigate?: (index: number) => void;
}

const ScrollDots = ({ sections, activeSection: externalActiveSection, onNavigate }: ScrollDotsProps) => {
  const [internalActiveSection, setInternalActiveSection] = useState(0);
  
  // Utiliser soit la valeur externe (contrôlée) soit interne (non contrôlée)
  const activeSection = externalActiveSection !== undefined ? externalActiveSection : internalActiveSection;

  useEffect(() => {
    // Si pas de contrôle externe, on utilise le défilement pour déterminer la section active
    if (externalActiveSection === undefined) {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const index = Math.round(scrollTop / windowHeight);
        
        if (index >= 0 && index < sections.length) {
          setInternalActiveSection(index);
        }
      };

      window.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [sections, externalActiveSection]);

  const scrollToSection = (index: number) => {
    // Si une fonction de navigation externe est fournie, l'utiliser
    if (onNavigate) {
      onNavigate(index);
    } else {
      // Sinon, utiliser la méthode par défaut
      const element = document.getElementById(sections[index]);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-6">
      {sections.map((_, index) => (
        <motion.button
          key={index}
          className={`w-4 h-4 rounded-full bg-white/20 relative cursor-pointer transition-all duration-300 ${activeSection === index ? 'scale-110' : 'scale-100'}`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection(index)}
          aria-label={`Aller à la section ${index + 1}`}
        >
          {activeSection === index && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 scroll-dot-active"
              layoutId="activeDot"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default ScrollDots; 