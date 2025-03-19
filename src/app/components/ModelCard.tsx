'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import BrowserPreview from './BrowserPreview';

interface ModelCardProps {
  id: string;
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
  demoUrl: string; // URL de la démo du site
  index: number;
  fullSize?: boolean; // Propriété optionnelle pour afficher en grand format
}

const ModelCard = ({ 
  title, 
  // Retirer de la déstructuration les props non utilisées
  // description, 
  // features, 
  demoUrl, 
  index, 
  fullSize = false 
}: ModelCardProps) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  const [isExpanded, setIsExpanded] = useState(false);

  // Gérer l'expansion de la carte
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Variantes d'animation pour l'apparition en cascade
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95,
      rotateX: 5
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative w-full ${isExpanded ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4' : fullSize ? 'h-full' : 'h-[550px]'}`}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onClick={(e) => {
        // Fermer la carte agrandie si on clique en dehors
        if (isExpanded && e.target === e.currentTarget) {
          setIsExpanded(false);
        }
      }}
    >
      <motion.div
        className={`relative overflow-hidden rounded-xl ${isExpanded ? 'w-[90vw] h-[85vh] max-w-6xl mx-auto' : 'h-full w-full'}`}
        style={{
          boxShadow: isExpanded ? '0 20px 60px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.3)'
        }}
        layout
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        whileHover={{ 
          y: isExpanded ? 0 : -5,
          boxShadow: isExpanded ? '0 20px 60px rgba(0,0,0,0.5)' : '0 15px 40px rgba(0,0,0,0.4)',
          transition: { duration: 0.3 }
        }}
      >
        {/* Prévisualisation du site (occupe toute la carte) */}
        <div className="w-full h-full">
          <div className="relative w-full h-full">
            {/* Bouton d'expansion en haut à droite */}
            <motion.button
              className="absolute top-4 right-4 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 hover:text-white transition-colors"
              onClick={toggleExpand}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isExpanded ? '−' : '+'} 
            </motion.button>
            
            <BrowserPreview 
              url={demoUrl} 
              title={title} 
              initialScale={fullSize ? 1 : 0.8} 
              maxScale={1}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Instructions quand agrandi */}
      {isExpanded && (
        <motion.div 
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Cliquez en dehors ou sur le bouton − pour réduire
        </motion.div>
      )}
    </motion.div>
  );
};

export default ModelCard; 