'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface BrowserPreviewProps {
  url: string;
  title: string;
  initialScale?: number;
  maxScale?: number;
}

const BrowserPreview = ({ url, title, initialScale = 0.7, maxScale = 0.9 }: BrowserPreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const scale = useMotionValue(initialScale);
  const borderRadius = useTransform(scale, [initialScale, maxScale], [12, 4]);
  const boxShadow = useTransform(
    scale, 
    [initialScale, maxScale], 
    ['0 10px 30px rgba(0,0,0,0.3)', '0 20px 60px rgba(0,0,0,0.5)']
  );
  
  // Set isMounted to true once component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Handle iframe load event
  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  
  // Toggle expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    scale.set(isExpanded ? initialScale : maxScale);
  };
  
  // Handle escape key to collapse
  useEffect(() => {
    if (!isMounted) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
        scale.set(initialScale);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, initialScale, scale, isMounted]);

  // Fonction sécurisée pour naviguer en arrière
  const goBack = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.history.back();
    }
  };

  // Fonction sécurisée pour naviguer en avant
  const goForward = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.history.forward();
    }
  };

  // Fonction sécurisée pour rafraîchir la page
  const refresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${isExpanded ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md' : 'h-full'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={(e) => {
        // Only toggle if clicking the container background when expanded
        if (isExpanded && e.target === containerRef.current) {
          toggleExpand();
        }
      }}
    >
      <motion.div 
        className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10"
        style={{ 
          scale,
          borderRadius,
          boxShadow,
          width: isExpanded ? '95vw' : '100%',
          height: isExpanded ? '90vh' : '100%',
          transformOrigin: 'center center'
        }}
        layout
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      >
        {/* Browser chrome */}
        <div className="h-10 bg-[#1a1a1a] flex items-center px-3 border-b border-white/10">
          {/* Window controls */}
          <div className="flex space-x-1.5 mr-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
            <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex items-center mr-3">
            <button 
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
              onClick={goBack}
            >
              ←
            </button>
            <button 
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
              onClick={goForward}
            >
              →
            </button>
            <button 
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
              onClick={refresh}
            >
              ↻
            </button>
          </div>
          
          {/* URL bar */}
          <div className="flex-1 bg-[#0d0d0d] rounded-md h-6 flex items-center px-3">
            <div className="w-4 h-4 mr-2 text-gray-400">🔒</div>
            <div className="text-xs text-gray-400 truncate">{url}</div>
          </div>
          
          {/* Expand/collapse button */}
          <button 
            className="ml-4 text-gray-400 hover:text-white transition-colors w-6 h-6 flex items-center justify-center"
            onClick={toggleExpand}
          >
            {isExpanded ? '⟨⟩' : '⟩⟨'}
          </button>
        </div>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Iframe content */}
        <div className="w-full h-[calc(100%-2.5rem)] bg-white">
          <iframe
            ref={iframeRef}
            src={url}
            title={title}
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            loading="lazy"
          />
        </div>
      </motion.div>
      
      {/* Instructions when expanded */}
      {isExpanded && (
        <motion.div 
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Appuyez sur ESC ou cliquez en dehors pour réduire
        </motion.div>
      )}
    </motion.div>
  );
};

export default BrowserPreview; 