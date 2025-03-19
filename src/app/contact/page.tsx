'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const models = [
  { id: 'studio-enregistrement', name: 'Studio d\'Enregistrement' },
  { id: 'studio-tatouage', name: 'Studio de Tatouage' },
  { id: 'vente-artisanale', name: 'Vente Artisanale' },
  { id: 'boulangerie', name: 'Boulangerie' },
  { id: 'autre', name: 'Autre / Personnalisé' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    model: '',
    message: '',
    customization: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Ici, nous simulons l'envoi du formulaire
      // Dans une implémentation réelle, vous enverriez les données à votre API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        model: '',
        message: '',
        customization: '',
      });
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Contactez-Nous</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Vous avez des questions ou vous souhaitez personnaliser un modèle ? 
                Nous sommes là pour vous aider.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Formulaire de contact */}
              <motion.div
                className="card p-8 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {isSubmitted ? (
                  <motion.div
                    className="text-center py-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold mb-2 text-white">Message Envoyé !</h3>
                    <p className="text-gray-300 mb-6">
                      Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.
                    </p>
                    <motion.button
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsSubmitted(false)}
                    >
                      Envoyer un autre message
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-white mb-2">Nom</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent-primary transition-colors"
                        placeholder="Votre nom"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-white mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent-primary transition-colors"
                        placeholder="votre@email.com"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="model" className="block text-white mb-2">Modèle de site</label>
                      <select
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent-primary transition-colors"
                      >
                        <option value="">Sélectionnez un modèle</option>
                        {models.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-white mb-2">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent-primary transition-colors"
                        placeholder="Votre message"
                      ></textarea>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="customization" className="block text-white mb-2">Personnalisations souhaitées (optionnel)</label>
                      <textarea
                        id="customization"
                        name="customization"
                        value={formData.customization}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent-primary transition-colors"
                        placeholder="Décrivez les personnalisations que vous souhaitez"
                      ></textarea>
                    </div>
                    
                    {error && (
                      <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                        {error}
                      </div>
                    )}
                    
                    <motion.button
                      type="submit"
                      className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </motion.button>
                  </form>
                )}
              </motion.div>
              
              {/* Informations de contact */}
              <motion.div
                className="flex flex-col justify-between"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Informations de Contact</h3>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start space-x-3">
                      <span className="text-accent-primary text-xl">📧</span>
                      <a href="mailto:contact@webmodels.fr" className="text-gray-300 hover:text-white transition-colors">
                        contact@webmodels.fr
                      </a>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-accent-primary text-xl">📱</span>
                      <a href="tel:+33600000000" className="text-gray-300 hover:text-white transition-colors">
                        +33 6 00 00 00 00
                      </a>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-accent-primary text-xl">📍</span>
                      <span className="text-gray-300">
                        Paris, France
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="card p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-white">Pourquoi nous choisir ?</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <span className="mr-2 text-accent-primary">✓</span> Prix fixe de 200€, tout inclus
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-accent-primary">✓</span> Installation et configuration
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-accent-primary">✓</span> Formation personnalisée
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-accent-primary">✓</span> Support technique
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 