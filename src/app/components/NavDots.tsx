"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface NavDotsProps {
  total: number;
  active: number;
  onDotClick: (index: number) => void;
}

const NavDots = ({ total, active, onDotClick }: NavDotsProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  // Détecter les appareils mobiles et l'orientation
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
      setIsLandscape(window.innerHeight < 500);
    };

    // Vérifier au chargement
    checkDevice();

    // Réagir au redimensionnement
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  // Ne pas afficher les points de navigation en mode paysage sur mobile
  if (isMobile && isLandscape) {
    return null;
  }

  return (
    <div className="nav-dots">
      {Array.from({ length: total }).map((_, index) => (
        <div key={index} className="relative flex items-center justify-center">
          {active === index && (
            <motion.div
              className="absolute rounded-full"
              layoutId="activeDot"
              style={{
                width: isMobile ? "8px" : "12px",
                height: isMobile ? "8px" : "12px",
                background:
                  "linear-gradient(to right, var(--accent-primary), var(--accent-secondary))",
                boxShadow: "0 0 10px rgba(0, 112, 243, 0.5)",
                zIndex: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          )}
          <button
            className={`relative nav-dot ${
              active === index ? "opacity-0" : "opacity-100"
            }`}
            onClick={() => onDotClick(index)}
            aria-label={`Aller à la section ${index + 1}`}
            style={{
              width: isMobile ? "8px" : "12px",
              height: isMobile ? "8px" : "12px",
              zIndex: 2,
              transition: "opacity 0.3s ease",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default NavDots;
