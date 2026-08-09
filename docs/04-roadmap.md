# Roadmap de adequação

Prioridade baseada na auditoria Playwright de 09/08/2026.

## P0 — Estrutura e documentação (feito nesta passagem)

- [x] Reorganizar raiz: `css/`, `js/`, `assets/brand/`, `docs/`
- [x] Atualizar paths em `index.html`
- [x] Documentar auditoria, estrutura, marca, mapa de portfólio

## P1 — Correções de produto

- [x] Header compacto — padding reduzido + colapso no scroll (`.is-compact`)
- [x] Wordmark — `GAME BOOK` em linha; min-size mobile ≥12px
- [x] A11y interativa — cartuchos e Insert Coin como `<button>`; skip link; boot skip
- [x] `prefers-reduced-motion` — desliga flicker/marquee/blink/float
- [x] WhatsApp — oculto até `CONFIG.whatsappNumber` válido (placeholder removido)

## P2 — SEO e publicação

- [x] Meta Open Graph + Twitter Cards
- [x] `theme-color`, `canonical`, JSON-LD Person/WebSite/WebPage
- [x] `robots.txt` + `sitemap.xml`
- [x] Asset `assets/social/og-image.png` (+ `og-image.svg`)
- [x] Doc [`06-seo.md`](./06-seo.md) com checklist de deploy

## P3 — UX / UI polish

- [x] Ícones SVG no setup (`assets/icons/`) — sem emojis
- [x] Boot: Pular intro desde o início, Esc, foco no skip, Tab preso no diálogo, foco em `#inicio` ao sair
- [x] Touch targets da nav ≥44px no mobile (incluindo header compacto)
- [x] Decisão `#marca`: **mantida no site público** (peça de portfólio/marca), copy e paleta refinadas; detalhes técnicos ficam em `docs/03`

## P4 — Engenharia

- [x] `package.json` com `serve`, `lint`, `ci`
- [x] Validação HTML/CSS/JS (`html-validate`, `stylelint`, `eslint`)
- [x] Check de SITE_URL (`scripts/check-site-url.mjs`)
- [x] GitHub Actions CI (`.github/workflows/ci.yml`)
- [x] Checklist pré-deploy no README + [`08-engenharia.md`](./08-engenharia.md)

## Critérios de pronto (definição)

| Critério | Meta |
|----------|------|
| Nota SEO | ≥ 7.0 |
| Header sticky mobile | ≤ 120px colapsado |
| Controles principais | 100% acionáveis por teclado |
| Reduced motion | Sem flicker/marquee quando preferido |
| Docs | Índice `docs/00` atualizado a cada release |
