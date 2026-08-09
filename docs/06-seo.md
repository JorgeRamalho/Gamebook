# SEO e publicação — GameBook

## SITE_URL (fonte da verdade)

URL canônica atual:

```
https://jorgeramalho.github.io/Projeto-gamebook/
```

Ao mudar o domínio (Netlify, Vercel, domínio próprio), atualize **todos** estes pontos:

| Arquivo | O quê |
|---------|--------|
| `index.html` | `canonical`, `og:url`, `og:image`, Twitter image, JSON-LD |
| `robots.txt` | comentário + `Sitemap:` |
| `sitemap.xml` | `<loc>` |
| `js/script.js` | `CONFIG.siteUrl` |

## Implementado (P2)

- Meta description, author, robots, keywords
- `theme-color` `#0A0814` + `color-scheme: dark`
- Open Graph completo (`og:locale`, type, image 1200×630)
- Twitter Card `summary_large_image`
- JSON-LD (`WebSite` + `Person` + `WebPage`)
- `robots.txt` + `sitemap.xml`
- Imagem social: `assets/social/og-image.png` (+ fonte SVG)

## Checklist pré-deploy

1. Confirmar `SITE_URL` nos 4 arquivos acima
2. Publicar `assets/social/og-image.png` acessível via HTTPS
3. Testar preview: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/), [Twitter/X Card Validator](https://cards-dev.twitter.com/validator), [Rich Results](https://search.google.com/test/rich-results)
4. Enviar `sitemap.xml` no Google Search Console (após o domínio estar no ar)
5. Verificar que `robots.txt` responde em `/robots.txt`

## GitHub Pages (sugestão)

No repositório `Projeto-gamebook`: Settings → Pages → Deploy from branch `master` / root.  
A URL padrão fica: `https://jorgeramalho.github.io/Projeto-gamebook/`
