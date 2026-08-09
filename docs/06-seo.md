# SEO e publicação — GameBook

## SITE_URL (fonte da verdade)

URL canônica de produção:

```
https://gamebook-one.vercel.app/
```

| Ambiente | URL |
|----------|-----|
| Produção (canônica) | https://gamebook-one.vercel.app/ |
| Espelho GitHub Pages | https://jorgeramalho.github.io/Gamebook/ |
| Código | https://github.com/JorgeRamalho/Gamebook |

Ao mudar o domínio, atualize **todos** estes pontos:

| Arquivo | O quê |
|---------|--------|
| `index.html` | `canonical`, `og:url`, `og:image`, Twitter image, JSON-LD |
| `robots.txt` | comentário + `Sitemap:` |
| `sitemap.xml` | `<loc>` |
| `js/script.js` | `CONFIG.siteUrl` |
| `scripts/check-site-url.mjs` | constante `SITE_URL` |
| `package.json` | `homepage` |

## Implementado (P2)

- Meta description, author, robots, keywords
- `theme-color` `#0A0814` + `color-scheme: dark`
- Open Graph completo (`og:locale`, type, image 1200×630)
- Twitter Card `summary_large_image`
- JSON-LD (`WebSite` + `Person` + `WebPage`)
- `robots.txt` + `sitemap.xml`
- Imagem social: `assets/social/og-image.png` (+ fonte SVG)

## Checklist pré-deploy

1. Confirmar `SITE_URL` nos arquivos da tabela acima
2. Publicar `assets/social/og-image.png` acessível via HTTPS
3. Testar preview: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/), [Twitter/X Card Validator](https://cards-dev.twitter.com/validator), [Rich Results](https://search.google.com/test/rich-results)
4. Enviar `sitemap.xml` no Google Search Console
5. Verificar `https://gamebook-one.vercel.app/robots.txt`

## Publicação

- **Vercel** — deploy automático a partir de `master` (URL canônica).
- **GitHub Pages** — espelho opcional em `https://jorgeramalho.github.io/Gamebook/` (branch `master` / root).
