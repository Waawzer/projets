'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 overflow-hidden">
      <div className="absolute inset-0 bg-black z-0"></div>
      
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
            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
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
    </footer>
  );
};

export default Footer; 