import { SITE_CONFIG } from '@/data/config';
import Link from 'next/link';

export const metadata = {
  title: `Terms of Service | ${SITE_CONFIG.shortName}`,
  alternates: {
    canonical: '/terms',
  },
};

export default function Terms() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '2rem', color: 'var(--color-primary)' }}>Terms of Service</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--color-text-muted)' }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using the website of {SITE_CONFIG.businessName}, you accept and agree to be bound by these Terms of Service.
        </p>

        <h2>2. Service Requests</h2>
        <p>
          Submitting a service request through our website does not guarantee an immediate appointment or constitute a binding contract. A representative will contact you to confirm scheduling and availability.
        </p>

        <h2>3. Accuracy of Information</h2>
        <p>
          While we strive to provide accurate and up-to-date information regarding our services, areas served, and availability, we make no warranties or representations regarding the completeness or accuracy of the website content.
        </p>

        <h2>4. Limitation of Liability</h2>
        <p>
          {SITE_CONFIG.businessName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website.
        </p>

        <h2>5. Contact Information</h2>
        <p>
          If you have questions regarding these terms, please contact us via our <Link href="/contact" style={{ color: 'var(--color-secondary)', textDecoration: 'underline' }}>Contact Page</Link>.
        </p>
      </div>
    </div>
  );
}
