import { SITE_CONFIG } from '@/data/config';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Accessibility Statement | ${SITE_CONFIG.businessName}`,
  description: `Accessibility Statement for ${SITE_CONFIG.businessName}, providing HVAC services in ${SITE_CONFIG.location}.`,
  alternates: {
    canonical: '/accessibility',
  },
};

export default function Accessibility() {
  return (
    <div className="container" style={{ padding: '6rem 1.5rem', maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '2rem' }}>Accessibility Statement</h1>
      
      <div className="prose" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <p>
          <strong>{SITE_CONFIG.businessName}</strong> is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to our website.
        </p>

        <h2>Conformance Status</h2>
        <p>
          The <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-blue)', textDecoration: 'underline' }}>Web Content Accessibility Guidelines (WCAG)</a> defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
          Our website targets conformance with WCAG 2.2 Level AA.
        </p>

        <h2>Feedback</h2>
        <p>
          We welcome your feedback on the accessibility of {SITE_CONFIG.businessName}. Please let us know if you encounter accessibility barriers on our website:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem' }}>
          <li><strong>Phone:</strong> <a href={SITE_CONFIG.phone.link} style={{ color: 'var(--color-accent-blue)', textDecoration: 'underline' }}>{SITE_CONFIG.phone.display}</a></li>
          <li><strong>Email:</strong> <a href={`mailto:accessibility@corazonair.com`} style={{ color: 'var(--color-accent-blue)', textDecoration: 'underline' }}>accessibility@corazonair.com</a></li>
          <li><strong>Postal Address:</strong> {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}</li>
        </ul>
        <p>We try to respond to feedback within 2 business days.</p>

        <h2>Technical Specifications</h2>
        <p>
          Accessibility of this website relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem' }}>
          <li>HTML</li>
          <li>WAI-ARIA</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>
        <p>These technologies are relied upon for conformance with the accessibility standards used.</p>

        <div style={{ marginTop: '2rem' }}>
          <Link href="/" className="btn-outline">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
