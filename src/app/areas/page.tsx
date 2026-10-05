import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/config';
import styles from './Areas.module.css';

export const metadata = {
  title: `Service Areas | ${SITE_CONFIG.shortName}`,
  description: `Providing premium HVAC services in ${SITE_CONFIG.location} and surrounding areas.`,
  alternates: {
    canonical: '/areas',
  },
};

export default function Areas() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <h1>Service Areas</h1>
          <p>Local HVAC experts proudly serving the Valley.</p>
        </div>
      </div>

      <section className="section">
        <div className={`container ${styles.areasGrid}`}>
          
          <div className={styles.mainContent}>
            <h2>Proudly Serving {SITE_CONFIG.location}</h2>
            <p>
              {SITE_CONFIG.businessName} is headquartered in Glendale, Arizona. We are deeply committed to providing 
              fast, reliable, and honest HVAC services to our local community and the surrounding West Valley neighborhoods.
            </p>
            
            <div className={styles.primaryLocation}>
              <MapPin size={32} className={styles.icon} />
              <div className={styles.locationInfo}>
                <h3>Glendale, AZ (Primary Service Area)</h3>
                <p>
                  From historic downtown Glendale to Arrowhead Ranch, we offer rapid response times 
                  for all residential and commercial HVAC needs across the city.
                </p>
                <div className={styles.servicesList}>
                  <span className={styles.tag}>AC Repair</span>
                  <span className={styles.tag}>Installation</span>
                  <span className={styles.tag}>Maintenance</span>
                  <span className={styles.tag}>Heating</span>
                </div>
              </div>
            </div>

            <div className={styles.notice}>
              <strong>Note regarding surrounding areas:</strong>
              <p>
                As a commitment to truth in advertising, we only explicitly list {SITE_CONFIG.location} here. 
                If you are located in a neighboring city (e.g., Peoria, Phoenix, Sun City, Avondale), please 
                call our dispatch center to verify if your exact address falls within our service radius.
              </p>
              <a href={SITE_CONFIG.phone.link} className={styles.linkText}>Call {SITE_CONFIG.phone.display} to verify service area</a>
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapOverlay}>
                <MapPin size={32} style={{ marginBottom: '0.5rem' }} />
                <span>Service Radius Map</span>
              </div>
            </div>
            
            <div className={styles.sidebarCta}>
              <h3>Ready to Schedule?</h3>
              <p>Contact us today for fast service in your area.</p>
              <Link href="/request-service" className="btn-action" style={{ width: '100%', marginBottom: '1rem' }}>
                Request Service
              </Link>
              <a href={SITE_CONFIG.phone.link} className="btn-outline" style={{ width: '100%' }}>
                Call Now
              </a>
            </div>
          </aside>

        </div>
      </section>
    </>
  );
}
