"use client";

import { useState } from 'react';
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

// Placeholders for real images
const IMAGES = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  category: GALLERY_CATEGORIES[(i % 4) + 1],
  src: `placeholder`,
  title: `HVAC Project ${i + 1}`,
}));

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = activeCategory === 'All' 
    ? IMAGES 
    : IMAGES.filter(img => img.category === activeCategory);

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
                onClick={() => setActiveCategory(cat)}
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
              >
                <div className={styles.imagePlaceholder}>
                  <span>{img.category} Photo</span>
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
      {lightboxIndex !== null && (
        <div className={styles.lightbox}>
          <button 
            className={styles.closeBtn}
            onClick={() => setLightboxIndex(null)}
          >
            <X size={32} />
          </button>
          
          <div className={styles.lightboxContent}>
            <div className={styles.lightboxPlaceholder}>
              <h2>{filteredImages[lightboxIndex].title}</h2>
              <p>{filteredImages[lightboxIndex].category}</p>
            </div>
            
            <div className={styles.lightboxNav}>
              <button 
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(Math.max(0, lightboxIndex - 1)) }}
                disabled={lightboxIndex === 0}
              >
                Prev
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(Math.min(filteredImages.length - 1, lightboxIndex + 1)) }}
                disabled={lightboxIndex === filteredImages.length - 1}
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
