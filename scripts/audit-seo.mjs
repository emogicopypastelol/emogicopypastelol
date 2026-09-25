async function analyzeSeo() {
  const pages = [
    { url: 'http://localhost:3000/', name: 'Homepage' },
    { url: 'http://localhost:3000/emoji/smileys-emotion', name: 'Emoji Category' },
    { url: 'http://localhost:3000/emoji/grinning-face', name: 'Emoji Detail' },
    { url: 'http://localhost:3000/symbols/arrows', name: 'Symbol Category' },
    { url: 'http://localhost:3000/kaomoji', name: 'Kaomoji Index' },
    { url: 'http://localhost:3000/search', name: 'Search Page' },
    { url: 'http://localhost:3000/about', name: 'About Page' },
    { url: 'http://localhost:3000/privacy', name: 'Privacy Page' },
    { url: 'http://localhost:3000/terms', name: 'Terms Page' }
  ];

  for (const page of pages) {
    try {
      const res = await fetch(page.url);
      const html = await res.text();
      console.log(`=== ${page.name} (${page.url}) ===`);
      console.log(`Status: ${res.status}`);

      // Title
      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      console.log(`Title: ${titleMatch ? titleMatch[1] : 'NONE'}`);

      // Canonical
      const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                             html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
      console.log(`Canonical: ${canonicalMatch ? canonicalMatch[1] : 'NONE'}`);

      // Meta Description
      const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
      console.log(`Description: ${descMatch ? descMatch[1] : 'NONE'}`);

      // Meta Robots
      const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
      console.log(`Robots: ${robotsMatch ? robotsMatch[1] : 'default (index, follow)'}`);

      // OpenGraph
      const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
      const ogImage = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i);
      console.log(`OG Title: ${ogTitle ? ogTitle[1] : 'NONE'}`);
      console.log(`OG Image: ${ogImage ? ogImage[1] : 'NONE'}`);

      // H1 Count & Content
      const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
      console.log(`H1 count: ${h1Matches.length} -> "${h1Matches.join(' | ')}"`);

      // JSON-LD
      const jsonLdMatches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
      console.log(`JSON-LD count: ${jsonLdMatches.length}`);
      jsonLdMatches.forEach((m, idx) => {
        try {
          const parsed = JSON.parse(m[1]);
          console.log(`  [Schema ${idx+1}] @type: ${parsed['@type'] || (Array.isArray(parsed) ? parsed.map(p => p['@type']).join(', ') : 'unknown')}`);
        } catch (e) {
          console.log(`  [Schema ${idx+1}] JSON parse error: ${e.message}`);
        }
      });
      console.log('');
    } catch (err) {
      console.log(`Error testing ${page.name}:`, err.message);
    }
  }
}

analyzeSeo();
