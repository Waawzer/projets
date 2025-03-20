"use client";

import { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import ModelsSection from "./components/ModelsSection";
import WhyUsSection from "./components/WhyUsSection";
import Footer from "./components/Footer";
import NavDots from "./components/NavDots";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  const totalSections = 5;

  // Détecter les appareils mobiles
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Vérifier au chargement
    checkMobile();

    // Réagir au redimensionnement
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Fonction pour faire défiler vers une section avec une animation fluide
  const scrollToSection = (index: number) => {
    if (isScrolling.current) return;

    isScrolling.current = true;
    setActiveSection(index);

    // Appliquer la transformation pour défiler vers la section
    if (sectionsRef.current) {
      sectionsRef.current.style.transform = `translateY(-${index * 100}vh)`;
    }

    setTimeout(
      () => {
        isScrolling.current = false;
      },
      isMobile ? 800 : 1000
    ); // Durée de l'animation (doit correspondre à la durée dans CSS)
  };

  // Gestion du scroll avec la molette
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const newSection = Math.max(
        0,
        Math.min(activeSection + direction, totalSections - 1)
      );

      if (newSection !== activeSection) {
        scrollToSection(newSection);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [activeSection]);

  // Gestion du scroll avec les touches du clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling.current) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        const newSection = Math.min(activeSection + 1, totalSections - 1);
        if (newSection !== activeSection) {
          scrollToSection(newSection);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const newSection = Math.max(activeSection - 1, 0);
        if (newSection !== activeSection) {
          scrollToSection(newSection);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSection]);

  // Gestion des gestes tactiles pour les appareils mobiles
  const handlers = useSwipeable({
    onSwipedUp: () => {
      if (isScrolling.current) return;
      const newSection = Math.min(activeSection + 1, totalSections - 1);
      if (newSection !== activeSection) {
        scrollToSection(newSection);
      }
    },
    onSwipedDown: () => {
      if (isScrolling.current) return;
      const newSection = Math.max(activeSection - 1, 0);
      if (newSection !== activeSection) {
        scrollToSection(newSection);
      }
    },
    trackTouch: true,
    trackMouse: false,
    delta: 100,
  });

  // Fonction qui combine les refs
  const setRefs = (element: HTMLDivElement | null) => {
    // Mettre à jour notre ref
    containerRef.current = element;
    // Appliquer la ref de swipeable
    handlers.ref(element);
  };

  return (
    <>
      <Header />
      <NavDots
        total={totalSections}
        active={activeSection}
        onDotClick={scrollToSection}
      />

      <div ref={setRefs} className="fullpage-container">
        <div
          ref={sectionsRef}
          className="fullpage-sections"
          style={{ transform: `translateY(-${activeSection * 100}vh)` }}
        >
          <div className="fullpage-section bg-black">
            <Hero />
          </div>
          <div className="fullpage-section bg-black">
            <ServicesSection />
          </div>
          <div className="fullpage-section bg-black">
            <ModelsSection />
          </div>
          <div className="fullpage-section bg-black">
            <WhyUsSection />
          </div>
          <div className="fullpage-section bg-black">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
