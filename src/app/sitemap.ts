import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/data/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.corazonair.com';

  const baseRoutes = [
    '',
    '/about',
    '/services',
    '/areas',
    '/reviews',
    '/gallery',
    '/faq',
    '/contact',
    '/request-service',
    '/privacy',
    '/terms',
    '/accessibility'
  ];

  const serviceRoutes = SITE_CONFIG.services.map(service => `/services/${service.id}`);
  const allRoutes = [...baseRoutes, ...serviceRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
