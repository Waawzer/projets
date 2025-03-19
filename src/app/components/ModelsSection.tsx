'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ModelCard from './ModelCard';
import Link from 'next/link';

// Données des modèles avec URLs de démo
const models = [
  {
    id: 'studio-enregistrement',
    title: 'Studio d\'Enregistrement',
    description: 'Site web professionnel pour studio d\'enregistrement avec réservation en ligne et présentation des équipements.',
    features: [
      'Réservation en ligne',
      'Galerie des équipements',
      'Tarifs personnalisables',
      'Témoignages clients'
    ],
    imageSrc: '/images/recording-studio.jpg',
    demoUrl: 'https://projetk.vercel.app/'
  },
  {
    id: 'studio-tatouage',
    title: 'Studio de Tatouage',
    description: 'Vitrine élégante pour studio de tatouage avec portfolio des artistes et prise de rendez-vous.',
    features: [
      'Portfolio des artistes',
      'Galerie de réalisations',
      'Système de rendez-vous',
      'Blog intégré'
    ],
    imageSrc: '/images/tattoo-studio.jpg',
    demoUrl: 'https://devexp.vercel.app/'
  },
  {
    id: 'vente-artisanale',
    title: 'Vente Artisanale',
    description: 'Boutique en ligne pour artisans avec présentation des produits et système de commande simplifié.',
    features: [
      'Catalogue de produits',
      'Panier d\'achat',
      'Paiement sécurisé',
      'Gestion des stocks'
    ],
    imageSrc: '/images/craft-shop.jpg',
    demoUrl: 'https://projetk.vercel.app/'
  },
  {
    id: 'boulangerie',
    title: 'Boulangerie',
    description: 'Site vitrine pour boulangerie avec présentation des produits et informations pratiques.',
    features: [
      'Catalogue de produits',
      'Horaires d\'ouverture',
      'Commande en ligne',
      'Actualités et promotions'
    ],
    imageSrc: '/images/bakery.jpg',
    demoUrl: 'https://boulangerie-sand.vercel.app/'
  }
];

// Éléments décoratifs pour l'effet parallaxe - limiting to 6 for simplicity
const parallaxElements = [
  { size: 80, x: '10%', y: '20%', opacity: 0.05, speed: 0.5 },
  { size: 120, x: '85%', y: '15%', opacity: 0.07, speed: 0.7 },
  { size: 60, x: '75%', y: '60%', opacity: 0.04, speed: 0.3 },
  { size: 100, x: '25%', y: '80%', opacity: 0.06, speed: 0.6 },
  { size: 40, x: '60%', y: '40%', opacity: 0.03, speed: 0.4 },
  { size: 150, x: '5%', y: '65%', opacity: 0.08, speed: 0.8 },
];

const ModelsSection = () => {
  const sectionRef = useRef(null);
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const selectedModel = models[selectedModelIndex];
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Create individual parallax transforms
  const parallaxY0 = useTransform(scrollYProgress, [0, 1], [0, -200 * parallaxElements[0].speed]);
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -200 * parallaxElements[1].speed]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -200 * parallaxElements[2].speed]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -200 * parallaxElements[3].speed]);
  const parallaxY4 = useTransform(scrollYProgress, [0, 1], [0, -200 * parallaxElements[4].speed]);
  const parallaxY5 = useTransform(scrollYProgress, [0, 1], [0, -200 * parallaxElements[5].speed]);
  
  // Collection of parallax values
  const parallaxYValues = [parallaxY0, parallaxY1, parallaxY2, parallaxY3, parallaxY4, parallaxY5];
  
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
  
  return (
    <div 
      ref={sectionRef}
      className="w-full h-full flex flex-col justify-center lg:justify-center relative py-12 lg:py-0"
    >
      {/* Parallax background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          background: 'linear-gradient(to bottom, #000000, #0a0a20)',
          y
        }}
      />
      
      {/* Éléments parallaxe décoratifs */}
      {parallaxElements.map((el, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: el.size,
            height: el.size,
            left: el.x,
            top: el.y,
            background: 'radial-gradient(circle at center, rgba(100, 100, 255, 0.3) 0%, transparent 70%)',
            opacity: el.opacity,
            y: parallaxYValues[index],
            filter: 'blur(8px)',
            zIndex: 1
          }}
        />
      ))}
      
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
      
      {/* Formes flottantes additionnelles */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(80, 80, 255, 0.2) 0%, transparent 70%)',
          left: '15%',
          top: '20%',
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
          right: '15%',
          bottom: '10%',
          filter: 'blur(50px)',
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0.1]),
          x: useTransform(scrollYProgress, [0, 1], [50, 0]),
          y: useTransform(scrollYProgress, [0, 1], [50, -50]),
          zIndex: 1
        }}
      />
      
      {/* Content */}
      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{ opacity }}
      >
        <motion.h2
          className="text-3xl font-extralight mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Nos Réalisations
          </span>
        </motion.h2>

        {/* Nouvelle disposition en deux colonnes */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Colonne gauche: Menu déroulant et description */}
          <div className="w-full lg:w-1/3 order-2 lg:order-1">
            {/* Menu déroulant pour sélectionner le modèle */}
            <div className="relative mb-6">
              <select 
                className="w-full py-3 px-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/20 text-white appearance-none cursor-pointer"
                value={selectedModelIndex}
                onChange={(e) => setSelectedModelIndex(Number(e.target.value))}
              >
                {models.map((model, index) => (
                  <option key={model.id} value={index} className="bg-[#0a0a20] text-white">
                    {model.title}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-white/70">
                ▼
              </div>
            </div>
            
            {/* Description du modèle sélectionné */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={selectedModel.id}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-xl font-light text-white mb-3">{selectedModel.title}</h3>
              <p className="text-white/60 mb-6">{selectedModel.description}</p>
              
              <h4 className="text-sm text-white/80 uppercase tracking-wider mb-3">Fonctionnalités</h4>
              <ul className="space-y-2 mb-8">
                {selectedModel.features.map((feature, i) => (
                  <li 
                    key={i}
                    className="flex items-center text-white/70"
                  >
                    <span className="mr-2 text-blue-400">✓</span> {feature}
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={selectedModel.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-colors w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Voir démo
                  </motion.button>
                </a>
                
                <Link href="/contact">
                  <motion.button
                    className="px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Personnaliser
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Colonne droite: Prévisualisation */}
          <div className="w-full lg:w-2/3 h-[300px] sm:h-[400px] lg:h-[500px] order-1 lg:order-2 mb-8 lg:mb-0">
            <ModelCard
              key={selectedModel.id}
              id={selectedModel.id}
              title={selectedModel.title}
              description={selectedModel.description}
              features={selectedModel.features}
              imageSrc={selectedModel.imageSrc}
              demoUrl={selectedModel.demoUrl}
              index={0}
              fullSize={true}
            />
          </div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-white/60 text-lg mb-6">
            Tous nos sites sont disponibles pour seulement <span className="text-white font-semibold">200€</span>, installation et formation incluses.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModelsSection; 