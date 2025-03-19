'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const features = [
  { 
    title: 'Design Professionnel', 
    icon: '✨',
    description: 'Des designs modernes et élégants inspirés des dernières tendances web.'
  },
  { 
    title: 'Installation Incluse', 
    icon: '🚀',
    description: 'Nous nous occupons de tout : domaine, hébergement et mise en ligne.'
  },
  { 
    title: 'Formation Complète', 
    icon: '📚',
    description: 'Apprenez à gérer votre site facilement grâce à notre formation personnalisée.'
  },
  { 
    title: 'Prix Fixe', 
    icon: '💰',
    description: 'Un tarif unique de 200€, sans frais cachés ni surprises.'
  },
  { 
    title: 'Support Réactif', 
    icon: '🛠️',
    description: 'Une assistance technique disponible pour répondre à vos questions.'
  },
  { 
    title: 'Personnalisation', 
    icon: '🎨',
    description: 'Adaptez votre site à votre image de marque et à vos besoins spécifiques.'
  },
];

const WhyUsSection = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  return (
    <section 
      ref={sectionRef}
      id="pourquoi-nous" 
      className="relative min-h-screen py-20 overflow-hidden flex flex-col items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black z-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        </div>
      </div>
      
      <motion.div 
        className="container mx-auto px-6 relative z-10"
        style={{ scale, opacity }}
      >
        <motion.h2
          className="text-3xl font-extralight mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Pourquoi Nous Choisir
          </span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="aspect-square flex flex-col items-center justify-center rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }}
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="text-sm font-semibold text-white/90 mb-1">{feature.title}</h3>
              <p className="text-xs text-white/60 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-white/70 text-lg mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Nous proposons une solution complète et abordable pour votre présence en ligne. 
            Notre objectif est de vous offrir un site web professionnel sans les tracas techniques.
          </motion.p>
          
          <motion.p 
            className="text-white/70 text-lg mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-white font-semibold">Prêt à lancer votre site web professionnel ?</span>
          </motion.p>
          
          <motion.a
            href="/contact"
            className="inline-block px-8 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Commencer
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhyUsSection; 