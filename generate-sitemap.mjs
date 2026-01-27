#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://comnectar.manus.space';

// Todas as rotas do site
const routes = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/sobre', changefreq: 'monthly', priority: 0.8 },
  { path: '/servicos', changefreq: 'monthly', priority: 0.8 },
  { path: '/servicos/trafego-pago', changefreq: 'monthly', priority: 0.7 },
  { path: '/servicos/instagram', changefreq: 'monthly', priority: 0.7 },
  { path: '/servicos/auditoria', changefreq: 'monthly', priority: 0.7 },
  { path: '/portfolio', changefreq: 'weekly', priority: 0.8 },
  { path: '/blog', changefreq: 'weekly', priority: 0.8 },
  { path: '/blog/estrategia-marketing-digital', changefreq: 'monthly', priority: 0.6 },
  { path: '/blog/otimizacao-google-ads', changefreq: 'monthly', priority: 0.6 },
  { path: '/blog/crescimento-instagram', changefreq: 'monthly', priority: 0.6 },
  { path: '/blog/roi-marketing-digital', changefreq: 'monthly', priority: 0.6 },
  { path: '/blog/auditoria-campanhas', changefreq: 'monthly', priority: 0.6 },
  { path: '/contato', changefreq: 'monthly', priority: 0.7 },
];

const generateSitemap = () => {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  routes.forEach((route) => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}${route.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>\n';
  
  return xml;
};

const sitemapPath = path.join(process.cwd(), 'client/public/sitemap.xml');
const sitemapContent = generateSitemap();

fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
console.log(`✓ Sitemap gerado com sucesso: ${sitemapPath}`);
console.log(`✓ Total de URLs: ${routes.length}`);
