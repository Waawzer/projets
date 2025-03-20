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
  const isScrolling = useRef(false);

  const totalSections = 5;

  const handleSectionChange = (index: number) => {
    if (isScrolling.current) return;

    isScrolling.current = true;
    setActiveSection(index);

    setTimeout(() => {
      isScrolling.current = false;
    }, 800); // Durée de l'animation
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
        handleSectionChange(newSection);
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
          handleSectionChange(newSection);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const newSection = Math.max(activeSection - 1, 0);
        if (newSection !== activeSection) {
          handleSectionChange(newSection);
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
        handleSectionChange(newSection);
      }
    },
    onSwipedDown: () => {
      if (isScrolling.current) return;
      const newSection = Math.max(activeSection - 1, 0);
      if (newSection !== activeSection) {
        handleSectionChange(newSection);
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
        onDotClick={handleSectionChange}
      />

      <div ref={setRefs} className="fullpage-container">
        <div className="fullpage-sections">
          <div
            className="fullpage-section bg-black"
            style={{
              zIndex: activeSection === 0 ? 5 : 1,
              opacity: activeSection === 0 ? 1 : 0,
            }}
          >
            <Hero />
          </div>
          <div
            className="fullpage-section bg-black"
            style={{
              zIndex: activeSection === 1 ? 5 : 1,
              opacity: activeSection === 1 ? 1 : 0,
            }}
          >
            <ServicesSection />
          </div>
          <div
            className="fullpage-section bg-black"
            style={{
              zIndex: activeSection === 2 ? 5 : 1,
              opacity: activeSection === 2 ? 1 : 0,
            }}
          >
            <ModelsSection />
          </div>
          <div
            className="fullpage-section bg-black"
            style={{
              zIndex: activeSection === 3 ? 5 : 1,
              opacity: activeSection === 3 ? 1 : 0,
            }}
          >
            <WhyUsSection />
          </div>
          <div
            className="fullpage-section bg-black"
            style={{
              zIndex: activeSection === 4 ? 5 : 1,
              opacity: activeSection === 4 ? 1 : 0,
            }}
          >
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
