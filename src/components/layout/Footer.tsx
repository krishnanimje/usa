"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_CONFIG } from '@/data/config';
import styles from './Footer.module.css';
import { Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        
        {/* Brand & Contact Column */}
        <div className={styles.footerBrand}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>Corazon</span>
            <span className={styles.logoAccent}>Air</span>
          </Link>
          <p className={styles.tagline}>
            Professional HVAC services in Glendale, Arizona. Trusted, local, and reliable.
          </p>
          
          <div className={styles.contactInfo}>
            <a href={SITE_CONFIG.phone.link} className={styles.contactItem}>
              <div className={styles.iconCircle}><Phone size={16} /></div>
              <span>{SITE_CONFIG.phone.display}</span>
            </a>
            <a href={SITE_CONFIG.address.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
              <div className={styles.iconCircle}><MapPin size={16} /></div>
              <span>{SITE_CONFIG.address.street}, {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}</span>
            </a>
            <div className={styles.contactItem}>
              <div className={styles.iconCircle}><Clock size={16} /></div>
              <span>Available {SITE_CONFIG.hours}</span>
            </div>
          </div>
        </div>

        {/* Services Column */}
        <div className={styles.footerLinks}>
          <h3 className={styles.colTitle}>Services</h3>
          <ul>
            {SITE_CONFIG.services.slice(0, 5).map(service => (
              <li key={service.id}>
                <Link href={`/services/${service.id}`}>{service.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/services" className={styles.viewAll}>
                View All Services <ArrowRight size={14} />
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Column */}
        <div className={styles.footerLinks}>
          <h3 className={styles.colTitle}>Company</h3>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/areas">Service Areas</Link></li>
            <li><Link href="/reviews">Reviews</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* CTA Column */}
        <div className={styles.footerCta}>
          <h3 className={styles.colTitle}>Need HVAC Service?</h3>
          <p className={styles.ctaText}>
            Our experienced technicians are ready to restore your comfort.
          </p>
          <div className={styles.ctaButtons}>
            <a href={SITE_CONFIG.phone.link} className="btn-primary" style={{ width: '100%' }}>
              CALL NOW
            </a>
            <Link href="/request-service" className="btn-action" style={{ width: '100%' }}>
              REQUEST SERVICE
            </Link>
          </div>
        </div>

      </div>

      <div className={styles.footerBottom}>
        <div className={`container ${styles.footerBottomContainer}`}>
          <p>&copy; {currentYear} {SITE_CONFIG.businessName}. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/accessibility">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
