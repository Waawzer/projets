"use client";

import { useEffect, useState } from "react";

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
        <button
          key={index}
          className={`nav-dot ${active === index ? "active" : ""}`}
          onClick={() => onDotClick(index)}
          aria-label={`Aller à la section ${index + 1}`}
          style={{
            width: isMobile ? "8px" : "12px",
            height: isMobile ? "8px" : "12px",
          }}
        />
      ))}
    </div>
  );
};

export default NavDots;
