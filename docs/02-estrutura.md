# Estrutura do projeto

## Árvore oficial (após reorganização)

```
Projeto-Gamebook/
├── index.html                 # Página única (entrada)
├── robots.txt                 # Diretrizes para crawlers
├── sitemap.xml                # Mapa do site
├── package.json               # Scripts npm (serve, lint, ci)
├── package-lock.json
├── eslint.config.mjs
├── .htmlvalidate.json
├── .stylelintrc.json
├── .github/workflows/ci.yml   # CI no GitHub Actions
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── scripts/
│   └── check-site-url.mjs
├── assets/
│   ├── brand/
│   ├── icons/
│   └── social/
├── docs/
├── README.md
└── .gitignore
```

## Convenções

| Tipo | Onde | Regra |
|------|------|-------|
| Página | raiz | Um `index.html` por deploy estático |
| Estilos | `css/` | Tokens em `:root`; seções comentadas |
| Scripts | `js/` | IIFE + `CONFIG` no topo |
| Marca | `assets/brand/` | Somente SVGs oficiais da identidade |
| Docs | `docs/` | Numeração `00–05` para ordem de leitura |

## Antes → depois

| Antes (raiz plana) | Depois |
|--------------------|--------|
| `styles.css` | `css/styles.css` |
| `script.js` | `js/script.js` |
| `assets/*.svg` | `assets/brand/*.svg` |
| (sem docs) | `docs/*` |

## Expansões futuras (não criar ainda)

```
assets/
  brand/          # já existe
  social/         # já existe (og-image)
  icons/          # já existe (setup)
docs/
  pesquisa/       # briefings e referências de UX/marca
```

## Como servir

A raiz do servidor local deve continuar sendo `Projeto-Gamebook/` (onde está o `index.html`):

```bash
npx serve .
# ou Live Server na pasta do projeto (porta ex.: 5502)
```
