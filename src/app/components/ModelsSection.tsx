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

// Éléments décoratifs pour l'effet parallaxe
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
  
  // Transformations pour les éléments parallaxe
  const getParallaxY = (speed: number) => {
    return useTransform(scrollYProgress, [0, 1], [0, -200 * speed]);
  };
  
  return (
    <section 
      ref={sectionRef}
      id="realisations" 
      className="relative min-h-screen py-20 overflow-hidden"
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
            y: getParallaxY(el.speed),
            filter: 'blur(8px)',
            zIndex: 1
          }}
        />
      ))}
      
      {/* Grille décorative */}
      <div className="absolute inset-0 z-1" 
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.2
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

        {/* Menu déroulant pour sélectionner le modèle */}
        <div className="relative max-w-md mx-auto mb-10">
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

        {/* Affichage du modèle sélectionné */}
        <div className="w-full mx-auto mb-16">
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
          <Link href="/contact">
            <motion.button
              className="px-8 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Personnaliser
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ModelsSection; 