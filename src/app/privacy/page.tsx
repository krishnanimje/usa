import { SITE_CONFIG } from '@/data/config';
import Link from 'next/link';

export const metadata = {
  title: `Privacy Policy | ${SITE_CONFIG.shortName}`,
  alternates: {
    canonical: '/privacy',
  },
};

export default function Privacy() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '2rem', color: 'var(--color-primary)' }}>Privacy Policy</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--color-text-muted)' }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Information We Collect</h2>
        <p>
          When you request service or a quote through our website, we collect personal information you provide to us, including:
          your name, phone number, email address, property address, and details about your HVAC system.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>Respond to your service requests and inquiries</li>
          <li>Schedule and dispatch technicians to your property</li>
          <li>Communicate with you regarding appointments, estimates, and services</li>
          <li>Improve our website and customer service</li>
        </ul>

        <h2>3. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information. We do not sell or rent your personal information to third parties.
        </p>

        <h2>4. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at {SITE_CONFIG.phone.display} or visit our <Link href="/contact" style={{ color: 'var(--color-secondary)', textDecoration: 'underline' }}>Contact Page</Link>.
        </p>
      </div>
    </div>
  );
}
