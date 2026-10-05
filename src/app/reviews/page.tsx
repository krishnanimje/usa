import Link from 'next/link';
import { Star, MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '@/data/config';
import styles from './Reviews.module.css';

export const metadata = {
  title: `Customer Reviews | ${SITE_CONFIG.shortName}`,
  description: `Read why ${SITE_CONFIG.location} homeowners trust ${SITE_CONFIG.shortName} with a 5.0 Google rating.`,
  alternates: {
    canonical: '/reviews',
  },
};

export default function Reviews() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <h1>Customer Reviews</h1>
          <p>See what your neighbors are saying about our service.</p>
        </div>
      </div>

      <section className="section">
        <div className={`container ${styles.reviewsContainer}`}>
          
          <div className={styles.summaryCard}>
            <div className={styles.ratingNumber}>{SITE_CONFIG.rating.score}</div>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={32} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
            <p>Based on {SITE_CONFIG.rating.count}+ Verified Google Reviews</p>
            <a 
              href="#" 
              className="btn-action" 
              style={{ marginTop: '1.5rem' }}
            >
              See More Reviews on Google
            </a>
          </div>

          <div className={styles.reviewsList}>
            {/* 
              Note: We do not invent fake testimonials as per requirements. 
              These are placeholders indicating where the business owner should paste their actual Google reviews,
              or integrate a Google Reviews API widget.
            */}
            
            <div className={styles.reviewNotice}>
              <MessageSquare size={32} />
              <h3>Actual Reviews Go Here</h3>
              <p>
                To maintain authenticity and trust, we do not generate fake testimonials. 
                Business owner: Please integrate your actual Google Review text or embed code here.
              </p>
            </div>

            <div className={styles.placeholderGrid}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={styles.placeholderReview}>
                  <div className={styles.placeholderHeader}>
                    <div className={styles.avatar}></div>
                    <div>
                      <div className={styles.placeholderName}></div>
                      <div className={styles.placeholderStars}></div>
                    </div>
                  </div>
                  <div className={styles.placeholderText}></div>
                  <div className={styles.placeholderText} style={{ width: '80%' }}></div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>
      
      <section className="section section-dark text-center">
        <div className="container">
          <h2 style={{ marginBottom: '1.5rem' }}>Experience 5-Star Service</h2>
          <Link href="/request-service" className="btn-action">
            Request Service Today
          </Link>
        </div>
      </section>
    </>
  );
}
