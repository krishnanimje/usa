import Link from 'next/link';
import { Phone, MapPin, Clock, Mail, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/config';
import styles from './Contact.module.css';

export const metadata = {
  title: `Contact Us | ${SITE_CONFIG.shortName}`,
  description: `Contact ${SITE_CONFIG.shortName} for HVAC service in ${SITE_CONFIG.location}. Call ${SITE_CONFIG.phone.display} or request service online.`,
  alternates: {
    canonical: '/contact',
  },
};

export default function Contact() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <h1>Contact Corazon Air</h1>
          <p>We're here to help with all your heating and cooling needs.</p>
        </div>
      </div>

      <section className="section">
        <div className={`container ${styles.contactGrid}`}>
          
          <div className={styles.contactInfo}>
            <h2>Get In Touch</h2>
            <p className={styles.intro}>
              Whether you need emergency repairs, a quote for a new system, or just have a question about your HVAC unit, our team is ready to assist you.
            </p>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}><Phone size={24} /></div>
                <div>
                  <h3>Phone</h3>
                  <a href={SITE_CONFIG.phone.link} className={styles.linkText}>
                    {SITE_CONFIG.phone.display}
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}><Clock size={24} /></div>
                <div>
                  <h3>Hours</h3>
                  <p>{SITE_CONFIG.hours}</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}><MapPin size={24} /></div>
                <div>
                  <h3>Location</h3>
                  <p>{SITE_CONFIG.address.street}<br/>{SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}</p>
                  <a href={SITE_CONFIG.address.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={styles.directionsLink}>
                    Get Directions <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}><Mail size={24} /></div>
                <div>
                  <h3>Email</h3>
                  <p>Contact us via our <Link href="/request-service" className={styles.linkText}>secure online form</Link>.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actionCard}>
            <h3>Need Service Now?</h3>
            <p>Skip the wait and submit your service request directly to our dispatch team.</p>
            <div className={styles.actionButtons}>
              <Link href="/request-service" className="btn-action">
                Request Service Online
              </Link>
              <a href={SITE_CONFIG.phone.link} className="btn-primary">
                Call {SITE_CONFIG.phone.display}
              </a>
            </div>
            
            <div className={styles.mapPlaceholder}>
              {/* Google Maps Embed Placeholder */}
              <div className={styles.mapOverlay}>
                <MapPin size={32} style={{ marginBottom: '0.5rem' }} />
                <span>Interactive Map View</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
