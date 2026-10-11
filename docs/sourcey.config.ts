export default {
  name: 'Qdrant API reference',
  siteUrl: process.env.SOURCEY_SITE_URL || undefined,
  baseUrl: process.env.SOURCEY_BASE_URL || '',
  favicon: './favicon.svg',
  theme: { name: 'api-first', colors: { primary: '#b6233b' }, fonts: { google: false }, css: ['./layout.css'] },
  repo: 'https://github.com/qdrant/qdrant',
  codeSamples: ['curl', 'javascript', 'python'],
  navigation: {
    tabs: [
      { tab: 'Guide', slug: '', groups: [
        { group: 'Start', pages: ['index', 'query', 'source'] },
      ] },
      { tab: 'API', slug: 'api', openapi: '../upstream/openapi.json' },
    ],
  },
  navbar: { links: [
    { type: 'link', label: 'Official docs', href: 'https://qdrant.tech/documentation/' },
    { type: 'github', href: 'https://github.com/qdrant/qdrant' },
  ] },
  search: { featured: ['index', 'query', 'source'] },
};
