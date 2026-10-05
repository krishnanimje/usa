import { Metadata } from 'next';
import { SITE_CONFIG } from '@/data/config';

export const metadata: Metadata = {
  title: `FAQ | ${SITE_CONFIG.shortName}`,
  description: `Frequently asked questions about HVAC repair, installation, and maintenance in ${SITE_CONFIG.location}.`,
  alternates: {
    canonical: '/faq',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
