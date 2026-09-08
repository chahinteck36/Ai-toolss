import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://adawatai.online';

function extractToolsAndCategories() {
  const toolsDataPath = path.join(rootDir, 'src', 'data', 'toolsData.ts');
  const content = fs.readFileSync(toolsDataPath, 'utf8');

  // Slice CATEGORIES block
  const catStartIndex = content.indexOf('CATEGORIES: Category[] = [');
  const catEndIndex = content.indexOf('];', catStartIndex);
  const catBlock = catStartIndex !== -1 && catEndIndex !== -1 
    ? content.slice(catStartIndex, catEndIndex) 
    : '';

  const categoryIds = [];
  const catMatches = catBlock.matchAll(/id:\s*['"]([a-z0-9_-]+)['"]/g);
  for (const m of catMatches) {
    if (m[1] !== 'all' && !categoryIds.includes(m[1])) {
      categoryIds.push(m[1]);
    }
  }

  // Slice INITIAL_TOOLS block
  const toolsStartIndex = content.indexOf('INITIAL_TOOLS: AiTool[] = [');
  const toolsEndIndex = content.lastIndexOf('];');
  const toolsBlock = toolsStartIndex !== -1 && toolsEndIndex !== -1
    ? content.slice(toolsStartIndex, toolsEndIndex)
    : '';

  const tools = [];
  const toolChunks = toolsBlock.split(/\{\s*id:\s*['"]/);
  for (const chunk of toolChunks.slice(1)) {
    const idMatch = chunk.match(/^([a-z0-9_-]+)['"]/);
    const dateMatch = chunk.match(/addedDate:\s*['"]([^'"]+)['"]/);
    if (idMatch) {
      const id = idMatch[1];
      const addedDate = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
      if (!tools.some(t => t.id === id)) {
        tools.push({ id, addedDate });
      }
    }
  }

  return { categoryIds, tools };
}

function extractDigitalTools() {
  const registryPath = path.join(rootDir, 'src', 'data', 'digitalToolsRegistry.ts');
  if (!fs.existsSync(registryPath)) return [];
  const content = fs.readFileSync(registryPath, 'utf8');

  const tools = [];
  const slugMatches = content.matchAll(/slug:\s*['"]([a-z0-9_-]+)['"]/g);
  for (const m of slugMatches) {
    const slug = m[1];
    if (!tools.includes(slug)) {
      tools.push(slug);
    }
  }
  return tools;
}

function extractKnowledgeArticles() {
  const articlesPath = path.join(rootDir, 'src', 'articles', 'articleData.ts');
  if (!fs.existsSync(articlesPath)) return [];
  const content = fs.readFileSync(articlesPath, 'utf8');

  const articles = [];
  const slugMatches = content.matchAll(/slug:\s*['"]([a-z0-9_-]+)['"]/g);
  for (const m of slugMatches) {
    const slug = m[1];
    if (!articles.some(a => a.slug === slug)) {
      // Find date near slug
      const idx = content.indexOf(m[0]);
      const chunk = content.slice(idx, idx + 600);
      const updatedMatch = chunk.match(/updatedAt:\s*['"]([^'"]+)['"]/);
      const publishedMatch = chunk.match(/publishedAt:\s*['"]([^'"]+)['"]/);
      const date = updatedMatch ? updatedMatch[1] : (publishedMatch ? publishedMatch[1] : new Date().toISOString().split('T')[0]);
      articles.push({ slug, date });
    }
  }
  return articles;
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split('T')[0];
    }
  } catch (e) {}
  return new Date().toISOString().split('T')[0];
}

function generateSitemapXml() {
  const { categoryIds, tools } = extractToolsAndCategories();
  const digitalTools = extractDigitalTools();
  const articles = extractKnowledgeArticles();
  const today = new Date().toISOString().split('T')[0];

  const urls = [];

  // 1. Homepage
  urls.push(`  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`);

  // 2. Knowledge Center Hub
  urls.push(`  <url>
    <loc>${BASE_URL}/knowledge</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`);

  // 3. Knowledge Articles
  for (const article of articles) {
    const lastmod = formatDate(article.date);
    urls.push(`  <url>
    <loc>${BASE_URL}/knowledge/${encodeURIComponent(article.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);
  }

  // 4. Categories
  for (const catId of categoryIds) {
    urls.push(`  <url>
    <loc>${BASE_URL}/category/${catId}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  // 5. Digital Tools
  for (const slug of digitalTools) {
    urls.push(`  <url>
    <loc>${BASE_URL}/tools/${encodeURIComponent(slug)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`);
  }

  // 6. General Tools (exclude if already included via digital tools)
  for (const tool of tools) {
    if (!digitalTools.includes(tool.id)) {
      const lastmod = formatDate(tool.addedDate);
      urls.push(`  <url>
    <loc>${BASE_URL}/tools/${encodeURIComponent(tool.id)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    }
  }

  // 7. Core Static Pages
  const staticPages = ['prompts', 'about', 'privacy', 'contact'];
  for (const sp of staticPages) {
    urls.push(`  <url>
    <loc>${BASE_URL}/${sp}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
  }

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('\n')}
</urlset>
`;

  // Write to public/sitemap.xml
  const publicPath = path.join(rootDir, 'public', 'sitemap.xml');
  fs.writeFileSync(publicPath, xmlContent, 'utf8');
  console.log(`Successfully generated public/sitemap.xml with ${urls.length} URLs.`);

  // If dist/ exists, also write to dist/sitemap.xml
  const distDir = path.join(rootDir, 'dist');
  if (fs.existsSync(distDir)) {
    const distPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distPath, xmlContent, 'utf8');
    console.log(`Successfully synced dist/sitemap.xml with ${urls.length} URLs.`);
  }
}

generateSitemapXml();
