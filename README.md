# GameBook — Jorge · Gamer das Old School

> **Slogan:** Onde cada save vira história  
> **Mascote:** BitBook — invader pixel abraçando um livro aberto

Site retro com identidade visual arcade e a alma dos fliperamas e consoles das décadas de 80, 90 e 2000.

## Documentação

Comece por [`docs/00-indice.md`](docs/00-indice.md).

| Doc | Assunto |
|-----|---------|
| [Auditoria](docs/01-auditoria.md) | SEO, UX/UI, responsividade (Playwright) |
| [Estrutura](docs/02-estrutura.md) | Pastas e convenções |
| [Identidade visual](docs/03-identidade-visual.md) | Marca, paleta, tipografia |
| [Roadmap](docs/04-roadmap.md) | Plano de adequação |
| [Portfólio](docs/05-mapeamento-portfolio.md) | Contexto em `Fron_End/Projetos` |
| [SEO](docs/06-seo.md) | Canonical, OG/Twitter, deploy |
| [Decisão marca](docs/07-decisao-marca.md) | Por que `#marca` fica no site |
| [Engenharia](docs/08-engenharia.md) | npm, lint, CI |

## Estrutura

```
Projeto-Gamebook/
├── index.html
├── robots.txt
├── sitemap.xml
├── package.json
├── css/styles.css
├── js/script.js
├── assets/brand/
├── assets/icons/
├── assets/social/
├── scripts/check-site-url.mjs
├── .github/workflows/ci.yml
├── docs/
└── README.md
```

## Como abrir

```bash
npm install
npm run serve
# → http://localhost:5502
```

Alternativa: Live Server / `npx serve .`

Publicação: [gamebook-one.vercel.app](https://gamebook-one.vercel.app/) (canônica) · espelho [GitHub Pages](https://jorgeramalho.github.io/Gamebook/) · código [JorgeRamalho/Gamebook](https://github.com/JorgeRamalho/Gamebook).

## Scripts

| Comando | Uso |
|---------|-----|
| `npm run serve` | Servidor local (porta 5502) |
| `npm run lint` | Valida HTML, CSS, JS e SITE_URL |
| `npm run ci` | Mesmo que lint (GitHub Actions) |

## Checklist pré-deploy

- [ ] `npm run lint` OK
- [ ] URL canônica alinhada (`index.html`, `robots.txt`, `sitemap.xml`, `CONFIG.siteUrl`)
- [ ] WhatsApp configurado **ou** deixado vazio (botão oculto)
- [ ] `og-image.png` no ar via HTTPS
- [ ] GitHub Pages / host apontando para a raiz
- [ ] Smoke test: boot, nav mobile, cartuchos, score
- [ ] (Opcional) Preview social nos validadores Facebook/X

Guia completo: [`docs/08-engenharia.md`](docs/08-engenharia.md) + [`docs/06-seo.md`](docs/06-seo.md).

## Personalização

| O quê | Onde |
|-------|------|
| Nome do jogador | `index.html` + `js/script.js` → `CONFIG.playerName` |
| URL canônica | `index.html` + `robots.txt` + `sitemap.xml` + `CONFIG.siteUrl` |
| WhatsApp | `js/script.js` → `CONFIG.whatsappNumber` (vazio = botão oculto) |
| Textos e jogos | `index.html` |
| Cores / tokens | `css/styles.css` → `:root` |
| Interações e score | `js/script.js` |

## Recursos

- Tela de boot com nome do jogador
- Efeito CRT com scanlines
- Linha do tempo 80s / 90s / 2000s
- Cartuchos clicáveis e código Konami
- Score com high score em `localStorage`
- Sons 8-bit (Web Audio API)
- SEO: Open Graph, Twitter Cards, JSON-LD, sitemap
- Lint + CI (html-validate, stylelint, ESLint)
