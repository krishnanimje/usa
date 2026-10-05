import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/data/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.businessName,
    short_name: SITE_CONFIG.shortName,
    description: `Premium HVAC services in ${SITE_CONFIG.location}`,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0b1528',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/api/icon/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/api/icon/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
