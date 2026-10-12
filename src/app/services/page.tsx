import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/data/config';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import styles from './Services.module.css';

export const metadata = {
  title: `Our Services | ${SITE_CONFIG.shortName}`,
  description: `Professional HVAC services including AC repair, installation, and heating service in ${SITE_CONFIG.location}.`,
  alternates: {
    canonical: '/services',
  },
};

const SERVICE_THUMBNAILS: Record<string, string> = {
  'ac-repair': '/images/services/ac-repair.jpg',
  'ac-service': '/images/services/ac-service.jpg',
  'ac-install': '/images/services/ac-install.jpg',
  'heating-service': '/images/services/heating-service.jpg',
  'hvac-repair': '/images/services/ac-repair.jpg',
  'hvac-maintenance': '/images/services/ac-service.jpg',
  'duct-cleaning': '/images/services/duct-cleaning.jpg',
  'thermostat': '/images/services/detail-thermostat.jpg',
  'emergency': '/images/services/emergency.jpg',
};

export default function Services() {
  return (
    <>
      <div className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <h1>Our HVAC Services</h1>
          <p>Comprehensive heating and cooling solutions for residential and commercial properties in {SITE_CONFIG.location}.</p>
        </div>
      </div>

      <div className={`container ${styles.servicesContainer}`}>
        <div className={styles.servicesGrid}>
          {SITE_CONFIG.services.map((service) => (
            <div key={service.id} id={service.id} className={styles.serviceCard}>
              <div className={styles.serviceCardInner}>
                <div className={styles.serviceCardImgWrapper}>
                  <Image
                    src={SERVICE_THUMBNAILS[service.id] || '/images/services/ac-repair.jpg'}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 240px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.serviceCardContent}>
                  <div className={styles.serviceHeader}>
                    <div className={styles.iconWrapper}>
                      <ShieldCheck size={24} />
                    </div>
                    <h2>{service.title}</h2>
                  </div>
                  <div className={styles.serviceBody}>
                    <p>{service.description}</p>
                    <Link href={`/services/${service.id}`} className={styles.serviceLink}>
                      Learn more <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.ctaSection}>
        <div className="container">
          <h2>Not sure what you need?</h2>
          <p>Our expert technicians can diagnose the problem and recommend the best solution.</p>
          <Link href="/request-service" className={styles.btnPrimary}>
            Schedule an Inspection
          </Link>
        </div>
      </div>
    </>
  );
}
