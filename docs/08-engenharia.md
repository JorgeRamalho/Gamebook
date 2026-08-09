# Engenharia — scripts, lint e CI

## Comandos npm

```bash
npm install          # dependências de desenvolvimento
npm run serve        # servidor local na porta 5502
npm run lint         # HTML + CSS + JS + check de SITE_URL
npm run lint:html    # html-validate
npm run lint:css     # stylelint
npm run lint:js      # eslint
npm run check:site-url
npm run ci           # alias de lint (usado no GitHub Actions)
```

## Ferramentas

| Ferramenta | Config |
|------------|--------|
| html-validate | `.htmlvalidate.json` |
| stylelint | `.stylelintrc.json` |
| ESLint 9 (flat) | `eslint.config.mjs` |
| Site URL check | `scripts/check-site-url.mjs` |
| CI | `.github/workflows/ci.yml` |

## CI

Em todo push/PR para `master` ou `main`, o workflow **CI** roda `npm ci` + `npm run ci`.

## Checklist pré-deploy

Ver também o README e [`06-seo.md`](./06-seo.md).

1. [ ] `npm run lint` passa localmente
2. [ ] `CONFIG.siteUrl` / canonical / robots / sitemap alinhados ao domínio real
3. [ ] `CONFIG.whatsappNumber` preenchido **ou** botão permanece oculto (ok)
4. [ ] `assets/social/og-image.png` acessível via HTTPS após o publish
5. [ ] GitHub Pages (ou host) apontando para a raiz do repo / `master`
6. [ ] Testar boot, nav mobile, cartuchos e Konami no ambiente publicado
7. [ ] (Opcional) Validar preview social nos debuggers do Facebook/X
