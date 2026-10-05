import { Metadata } from 'next';
import { SITE_CONFIG } from '@/data/config';

export const metadata: Metadata = {
  title: `Request HVAC Service in ${SITE_CONFIG.location} | ${SITE_CONFIG.shortName}`,
  description: `Schedule a service visit, request a free quote, or get emergency HVAC repair in ${SITE_CONFIG.location}.`,
  alternates: {
    canonical: '/request-service',
  },
};

export default function RequestServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
