import Link from 'next/link';
import { ShieldCheck, Users, Target, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/config';
import styles from './About.module.css';

export const metadata = {
  title: `About Us | ${SITE_CONFIG.shortName}`,
  description: `Learn more about ${SITE_CONFIG.businessName}, Glendale's premier HVAC service provider.`,
  alternates: {
    canonical: '/about',
  },
};

export default function About() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <h1>About Corazon Air</h1>
          <p>Professional HVAC Services in Glendale, Arizona</p>
        </div>
      </div>

      <section className="section">
        <div className={`container ${styles.aboutGrid}`}>
          
          <div className={styles.imageCol}>
            {/* Placeholder for real company/team photo */}
            <div className={styles.imagePlaceholder}>
              <span>Company / Team Photo</span>
            </div>
            <div className={styles.imagePlaceholder} style={{ marginTop: '2rem', height: '300px' }}>
              <span>Service Van Photo</span>
            </div>
          </div>

          <div className={styles.contentCol}>
            <h2>Local Experts. Reliable Comfort.</h2>
            <p>
              Located in the heart of Glendale, Arizona, <strong>{SITE_CONFIG.businessName}</strong> is dedicated to providing 
              top-tier heating, ventilation, and air conditioning services to our local community. We understand that in the 
              Valley of the Sun, reliable air conditioning is not a luxury—it is an absolute necessity.
            </p>
            <p>
              We built this company on a simple professional philosophy: provide honest diagnostics, upfront pricing, 
              and precision technical work. When you invite us into your home, you can expect our technicians to be 
              respectful, clean, and highly trained.
            </p>

            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <ShieldCheck size={28} className={styles.valueIcon} />
                <h3>Integrity</h3>
                <p>We don&apos;t sell you what you don&apos;t need. We provide facts so you can make informed decisions.</p>
              </div>
              <div className={styles.valueCard}>
                <Target size={28} className={styles.valueIcon} />
                <h3>Precision</h3>
                <p>HVAC is a technical trade. We focus on exact measurements, proper charges, and correct airflow.</p>
              </div>
              <div className={styles.valueCard}>
                <Users size={28} className={styles.valueIcon} />
                <h3>Community</h3>
                <p>We are a local Glendale business proud to serve our neighbors across the valley.</p>
              </div>
            </div>

            <div className={styles.ctaBox}>
              <h3>Experience the Corazon Air Difference</h3>
              <p>Contact us today for your repair, maintenance, or installation needs.</p>
              <Link href="/request-service" className="btn-action">
                Request Service <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4-Step Process (Reused from Home, structurally) */}
      <section className="section section-light">
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2>Our Service Process</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>What you can expect when you hire Corazon Air.</p>
          </div>
          
          <div className={styles.processGrid}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>01</div>
              <h3>Contact & Scheduling</h3>
              <p>Reach out to us. We prioritize emergencies and work to find a time that fits your schedule.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>02</div>
              <h3>Thorough Diagnosis</h3>
              <p>Our technician will arrive, listen to your concerns, and perform a comprehensive system check.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>03</div>
              <h3>Clear Options</h3>
              <p>We explain the problem in plain English and provide you with clear, upfront repair or replacement options.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>04</div>
              <h3>Professional Execution</h3>
              <p>Once you approve, we complete the work with precision, clean up our workspace, and ensure the system is running perfectly.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
