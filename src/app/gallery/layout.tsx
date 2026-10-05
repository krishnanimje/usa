import { Metadata } from 'next';
import { SITE_CONFIG } from '@/data/config';

export const metadata: Metadata = {
  title: `Gallery | ${SITE_CONFIG.shortName}`,
  description: `View our past HVAC installations, repairs, and commercial projects in ${SITE_CONFIG.location}.`,
  alternates: {
    canonical: '/gallery',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
