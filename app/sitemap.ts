import type { MetadataRoute } from 'next';

const SITE_URL = 'https://whatismyip.example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/ip-lookup',
    '/tools',
    '/whois-lookup',
    '/dns-lookup',
    '/reverse-dns',
    '/ssl-checker',
    '/about',
    '/privacy',
    '/terms',
    '/contact',
  ];

  const now = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
