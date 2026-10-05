import { SITE_CONFIG } from '@/data/config';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Clock, ShieldCheck, Wrench } from 'lucide-react';
import styles from './ServiceDetail.module.css';

// Generate static params for all services in config
export function generateStaticParams() {
  return SITE_CONFIG.services.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const service = SITE_CONFIG.services.find((s) => s.id === params.id);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} in ${SITE_CONFIG.location} | ${SITE_CONFIG.shortName}`,
    description: service.description,
    alternates: {
      canonical: `/services/${service.id}`,
    },
  };
}

export default function ServicePage({ params }: { params: { id: string } }) {
  const service = SITE_CONFIG.services.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  // Common symptoms mapping for demonstration (this would normally be in the data config)
  const commonSymptoms = [
    "Unusual noises (banging, squealing, or rattling)",
    "Weak airflow or warm air blowing from vents",
    "Unexpected spike in energy bills",
    "System constantly cycling on and off"
  ];

  const processSteps = [
    { title: "Diagnosis", desc: "Thorough inspection to identify the root cause." },
    { title: "Transparent Quote", desc: "Clear, upfront pricing before any work begins." },
    { title: "Expert Service", desc: "Professional execution by certified technicians." },
    { title: "Final Testing", desc: "Ensuring your system runs perfectly before we leave." }
  ];

  return (
    <article className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <h1>{service.title}</h1>
            <p className={styles.heroDesc}>{service.description}</p>
            <div className={styles.heroActions}>
              <Link href={`/request-service?service=${service.id}`} className="btn-action">
                REQUEST THIS SERVICE <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className={styles.mainContent}>
        <div className={`container ${styles.contentGrid}`}>
          
          <div className={styles.leftCol}>
            <h2>Why Professional {service.title} Matters</h2>
            <p>
              Attempting to fix HVAC systems without professional training can lead to costly damage and safety hazards. 
              Our team in {SITE_CONFIG.location} is fully certified to handle {service.title.toLowerCase()} safely and efficiently, 
              ensuring your warranty remains intact and your home stays comfortable.
            </p>
            
            <div className={styles.symptomsBox}>
              <h3>Common Signs You Need This Service</h3>
              <ul className={styles.symptomsList}>
                {commonSymptoms.map((symptom, idx) => (
                  <li key={idx}><CheckCircle size={20} className={styles.checkIcon} /> {symptom}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3>Ready to restore your comfort?</h3>
              <p>Our dispatch team is standing by.</p>
              <Link href={`/request-service?service=${service.id}`} className="btn-action" style={{ width: '100%', marginBottom: '1rem' }}>
                SCHEDULE NOW
              </Link>
              <a href={SITE_CONFIG.phone.link} className="btn-outline" style={{ width: '100%' }}>
                CALL {SITE_CONFIG.phone.display}
              </a>
              
              <div className={styles.trustMini}>
                <div className={styles.trustItemMini}>
                  <Clock size={16} /> <span>Fast Response</span>
                </div>
                <div className={styles.trustItemMini}>
                  <ShieldCheck size={16} /> <span>Licensed & Insured</span>
                </div>
                <div className={styles.trustItemMini}>
                  <Wrench size={16} /> <span>Guaranteed Work</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className="container">
          <h2 className="text-center mb-8">Our Proven Process</h2>
          <div className={styles.processGrid}>
            {processSteps.map((step, idx) => (
              <div key={idx} className={styles.processStep}>
                <div className={styles.stepNumber}>{idx + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Placeholder */}
      <section className={styles.faqSection}>
        <div className="container">
          <h2 className="text-center mb-8">Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <h3>How long does {service.title.toLowerCase()} typically take?</h3>
              <p>Most standard appointments are completed within 1-2 hours, depending on the complexity of the job and access to the unit.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Do you offer warranties on your work?</h3>
              <p>Yes, we stand behind our workmanship with a satisfaction guarantee, and all new parts come with standard manufacturer warranties.</p>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
