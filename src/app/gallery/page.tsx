"use client";

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { SITE_CONFIG } from '@/data/config';
import styles from './Gallery.module.css';

const GALLERY_CATEGORIES = [
  'All',
  'AC Installations',
  'AC Repair',
  'Ductwork',
  'Commercial'
];

const IMAGES = [
  { id: 1, category: 'AC Installations', src: '/images/gallery/project-1.jpg', title: 'High-Efficiency Outdoor Condenser Installation' },
  { id: 2, category: 'AC Installations', src: '/images/gallery/project-2.jpg', title: 'Attic Air Handler & Heating System' },
  { id: 3, category: 'AC Installations', src: '/images/gallery/project-3.jpg', title: 'Trane High-Efficiency Heat Pump Unit' },
  { id: 4, category: 'AC Repair', src: '/images/gallery/project-4.jpg', title: 'Faulty AC Run Capacitor (Before Service)' },
  { id: 5, category: 'AC Repair', src: '/images/gallery/project-5.jpg', title: 'New Heavy-Duty Capacitor Replacement (After)' },
  { id: 6, category: 'AC Repair', src: '/images/gallery/project-6.jpg', title: 'Compressor & Wiring Electrical Diagnostics' },
  { id: 7, category: 'AC Repair', src: '/images/gallery/project-7.jpg', title: 'Precision Refrigerant Manifold Pressure Check' },
  { id: 8, category: 'Ductwork', src: '/images/gallery/project-8.jpg', title: 'R-8 Insulated Flexible Ductwork Line' },
  { id: 9, category: 'Ductwork', src: '/images/gallery/project-9.jpg', title: 'High-Powered Rotary Duct Vacuum Cleaning' },
  { id: 10, category: 'Ductwork', src: '/images/gallery/project-10.jpg', title: 'Ceiling Return Air Vent & Register Seal' },
  { id: 11, category: 'Commercial', src: '/images/gallery/project-11.jpg', title: 'Commercial Packaged Rooftop HVAC Units' },
  { id: 12, category: 'Commercial', src: '/images/gallery/project-12.jpg', title: 'Commercial Automation & Control Panel Audit' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = activeCategory === 'All' 
    ? IMAGES 
    : IMAGES.filter(img => img.category === activeCategory);

  const currentImage = lightboxIndex !== null && lightboxIndex < filteredImages.length 
    ? filteredImages[lightboxIndex] 
    : null;

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  }, [lightboxIndex]);

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null && lightboxIndex < filteredImages.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  }, [lightboxIndex, filteredImages.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <h1>Our Work Gallery</h1>
          <p>Professional HVAC installations, repairs, and maintenance across {SITE_CONFIG.location}.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          
          <div className={styles.filterNav}>
            {GALLERY_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.galleryGrid}>
            {filteredImages.map((img, index) => (
              <div 
                key={img.id} 
                className={styles.galleryItem}
                onClick={() => setLightboxIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightboxIndex(index);
                  }
                }}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.overlay}>
                  <ZoomIn size={32} />
                  <span>{img.title}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {currentImage && lightboxIndex !== null && (
        <div 
          className={styles.lightbox} 
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={currentImage.title}
        >
          <button 
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close preview"
          >
            <X size={32} />
          </button>
          
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxImageWrapper}>
              <Image
                src={currentImage.src}
                alt={currentImage.title}
                fill
                sizes="(max-width: 1024px) 95vw, 80vw"
                style={{ objectFit: 'contain' }}
              />
            </div>
            
            <div className={styles.lightboxInfo}>
              <h2>{currentImage.title}</h2>
              <span className={styles.categoryBadge}>{currentImage.category}</span>
            </div>

            <div className={styles.lightboxNav}>
              <button 
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                disabled={lightboxIndex === 0}
                aria-label="Previous image"
              >
                Prev
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                disabled={lightboxIndex === filteredImages.length - 1}
                aria-label="Next image"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
