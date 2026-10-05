import Link from 'next/link';
import { Star, Clock, MapPin, ArrowRight, Phone } from 'lucide-react';
import styles from './page.module.css';
import { SITE_CONFIG } from '@/data/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `HVAC Services in ${SITE_CONFIG.location} | ${SITE_CONFIG.shortName}`,
  description: `Professional air conditioning and heating services for residential and commercial properties in ${SITE_CONFIG.location}. Top-rated HVAC repair, installation, and maintenance.`,
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          
          <div className={styles.heroLeft}>
            <span className={styles.eyebrow}>
              GLENDALE, ARIZONA HVAC SERVICE
            </span>
            <h1 className={styles.headline}>
              Comfort Starts With The Right HVAC Team.
            </h1>
            <p className={styles.subtitle}>
              Professional air conditioning and heating services for residential and commercial properties in {SITE_CONFIG.location}.
            </p>
            <div className={styles.heroActions}>
              <Link href="/request-service" className="btn-action">
                REQUEST SERVICE <ArrowRight size={18} />
              </Link>
              <a href={SITE_CONFIG.phone.link} className="btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                <Phone size={18} /> CALL {SITE_CONFIG.phone.display}
              </a>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.imagePlaceholder}>
              {/* This is a placeholder for a premium HVAC/home visual */}
              <div className={styles.imageOverlay}>Premium HVAC Imagery Here</div>
              
              {/* Floating Trust Panel */}
              <div className={styles.floatingTrustPanel}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <div className={styles.trustText}>
                  <strong>{SITE_CONFIG.rating.score} Google Rating</strong>
                  <span>{SITE_CONFIG.rating.count}+ Reviews</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Strip */}
      <section className={styles.trustStrip}>
        <div className={`container ${styles.trustStripContainer}`}>
          <div className={styles.trustItem}>
            <Star size={24} className={styles.trustIcon} />
            <div>
              <strong>{SITE_CONFIG.rating.score} Google Rating</strong>
              <span>Based on {SITE_CONFIG.rating.count}+ reviews</span>
            </div>
          </div>
          <div className={styles.trustDivider}></div>
          <div className={styles.trustItem}>
            <Clock size={24} className={styles.trustIcon} />
            <div>
              <strong>24/7 Availability</strong>
              <span>Emergency service when you need it</span>
            </div>
          </div>
          <div className={styles.trustDivider}></div>
          <div className={styles.trustItem}>
            <MapPin size={24} className={styles.trustIcon} />
            <div>
              <strong>Glendale, Arizona</strong>
              <span>Local experts serving the valley</span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Services Experience */}
      <section className={`section ${styles.servicesSection}`}>
        <div className={`container ${styles.sectionHeader}`}>
          <h2>Comprehensive HVAC Solutions</h2>
          <p>We provide professional diagnosis, repair, and installation to keep your property comfortable year-round.</p>
        </div>

        <div className="container">
          <div className={styles.editorialGrid}>
            
            {/* Service 1 */}
            <div className={styles.editorialCard}>
              <div className={styles.editorialImage}>AC Repair</div>
              <div className={styles.editorialContent}>
                <h3>AC Repair</h3>
                <p>Fast, reliable air conditioning repair services to restore your home&apos;s comfort when the Arizona heat hits hardest.</p>
                <div className={styles.editorialActions}>
                  <Link href="/services/ac-repair" className={styles.linkBold}>
                    Learn More <ArrowRight size={16} />
                  </Link>
                  <Link href="/request-service?service=ac-repair" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    Request Service
                  </Link>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className={styles.editorialCard}>
              <div className={styles.editorialImage}>AC Installation</div>
              <div className={styles.editorialContent}>
                <h3>AC Installation & Replacement</h3>
                <p>Professional installation of high-efficiency air conditioning systems designed to lower your energy bills and improve comfort.</p>
                <div className={styles.editorialActions}>
                  <Link href="/services/ac-installation" className={styles.linkBold}>
                    Learn More <ArrowRight size={16} />
                  </Link>
                  <Link href="/request-service?service=ac-installation" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    Get a Quote
                  </Link>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className={styles.editorialCard}>
              <div className={styles.editorialImage}>AC Maintenance</div>
              <div className={styles.editorialContent}>
                <h3>AC Maintenance</h3>
                <p>Preventative maintenance plans designed to extend the life of your equipment and prevent costly mid-summer breakdowns.</p>
                <div className={styles.editorialActions}>
                  <Link href="/services/ac-maintenance" className={styles.linkBold}>
                    Learn More <ArrowRight size={16} />
                  </Link>
                  <Link href="/request-service?service=ac-maintenance" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    Request Service
                  </Link>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div className={styles.editorialCard}>
              <div className={styles.editorialImage}>Heating Services</div>
              <div className={styles.editorialContent}>
                <h3>Heating Services</h3>
                <p>Dependable heating repair, maintenance, and installation for chilly Arizona winter nights.</p>
                <div className={styles.editorialActions}>
                  <Link href="/services/heating" className={styles.linkBold}>
                    Learn More <ArrowRight size={16} />
                  </Link>
                  <Link href="/request-service?service=heating" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    Request Service
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Service 5 */}
            <div className={styles.editorialCard}>
              <div className={styles.editorialImage}>Air Duct Cleaning</div>
              <div className={styles.editorialContent}>
                <h3>Air Duct Cleaning</h3>
                <p>Professional duct cleaning services to remove dust, debris, and improve system efficiency and airflow.</p>
                <div className={styles.editorialActions}>
                  <Link href="/services/duct-cleaning" className={styles.linkBold}>
                    Learn More <ArrowRight size={16} />
                  </Link>
                  <Link href="/request-service?service=duct-cleaning" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    Request Service
                  </Link>
                </div>
              </div>
            </div>

            {/* Service 6 */}
            <div className={styles.editorialCard}>
              <div className={styles.editorialImage}>Emergency HVAC</div>
              <div className={styles.editorialContent}>
                <h3>Emergency HVAC Service</h3>
                <p>24/7 rapid response for critical heating and cooling failures when you need immediate assistance.</p>
                <div className={styles.editorialActions}>
                  <Link href="/services/emergency" className={styles.linkBold}>
                    Learn More <ArrowRight size={16} />
                  </Link>
                  <a href={SITE_CONFIG.phone.link} className="btn-action" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    Call Now
                  </a>
                </div>
              </div>
            </div>

          </div>
          
          <div className="text-center" style={{ marginTop: '4rem' }}>
            <Link href="/services" className="btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className={`section section-light`}>
        <div className={`container ${styles.processContainer}`}>
          <div className={styles.processHeader}>
            <h2>Our Service Process</h2>
            <p>We&apos;ve streamlined our service to ensure a smooth, professional experience from your first call to job completion.</p>
          </div>
          
          <div className={styles.processGrid}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>01</div>
              <h3>Contact</h3>
              <p>Reach out via phone or our online form to schedule a convenient appointment time.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>02</div>
              <h3>Understand the Problem</h3>
              <p>Our technician arrives on time to listen to your concerns and assess the situation.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>03</div>
              <h3>Diagnose / Discuss Service</h3>
              <p>We thoroughly inspect your system, explain our findings, and provide clear options.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>04</div>
              <h3>Complete the Service</h3>
              <p>Upon your approval, we perform the necessary repairs or installation with precision.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`section section-dark ${styles.ctaSection}`}>
        <div className={`container ${styles.ctaContainer}`}>
          <h2>Ready to Restore Your Comfort?</h2>
          <p>Contact {SITE_CONFIG.shortName} today for reliable, fast HVAC service in Glendale.</p>
          <div className={styles.ctaActions}>
            <Link href="/request-service" className="btn-action">
              Request Service Now
            </Link>
            <a href={SITE_CONFIG.phone.link} className="btn-outline">
              <Phone size={18} />
              Call {SITE_CONFIG.phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
