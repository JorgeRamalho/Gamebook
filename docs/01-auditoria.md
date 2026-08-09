# Auditoria completa — GameBook

**Alvo:** `http://127.0.0.1:5502/index.html`  
**Método:** Playwright (navigate, snapshot, resize 1440×900 / 390×844, screenshots, `browser_evaluate`, console)  
**Nota geral:** 6.4 / 10 → *P1 aplicado; revalidar nota no P2 (SEO)*

## Atualização P1 (09/08/2026)

| Item | Resultado Playwright |
|------|----------------------|
| Header mobile em repouso | ~188px (antes ~272px) |
| Header mobile compacto | **93px** (meta ≤120px) |
| Header desktop compacto | **~52px** |
| Wordmark | `row`, **12px** no mobile |
| Cartuchos / Insert Coin | `<button>` com `aria-label` |
| Skip link + Pular intro | presentes |
| `prefers-reduced-motion` | CSS ativo |
| WhatsApp | oculto até número válido em `CONFIG` |

## Resumo executivo

O GameBook entrega uma identidade arcade coerente, copy nostálgica forte e interações divertidas (score, Konami, cartuchos). Os principais gaps são SEO de compartilhamento, header sticky excessivo, acessibilidade de controles e maturidade de estrutura/documentação (agora endereçada em `docs/`).

## Notas por dimensão

| Dimensão | Nota | Veredito |
|----------|------|----------|
| Identidade visual | 8.5 | Sistema de marca e tokens CSS maduros |
| Conceito / narrativa | 8.2 | Conceito “save point pessoal” claro |
| Tipografia / texto | 7.4 | Fontes temáticas; wordmark frágil no mobile |
| UI Design | 7.0 | CRT/cabine consistente; emojis no setup enfraquecem |
| UX | 6.4 | Easter eggs ótimos; boot + header + motion pesam |
| Usabilidade | 6.2 | Fluxo divertido; alvos de toque e teclado incompletos |
| Layout | 6.0 | Hero forte; chrome do header domina o 1º viewport |
| Responsividade | 5.5 | Sem overflow; densidade mobile alta |
| Estratégia de desenvolvimento | 4.8 | Vanilla simples; sem build/test/lint/CI |
| SEO | 3.8 | Title/description ok; falta OG/JSON-LD/sitemap |

## SEO

### Presente
- `lang="pt-BR"`
- `<title>` descritivo
- `meta name="description"`
- Um único `h1` (visually-hidden alinhado ao logo)
- Hierarquia H2/H3 coerente por seção
- Favicon SVG
- Landmarks: `header`, `nav`, `main`, `footer`

### Ausente (prioridade alta) — resolvido no P2
- ~~Open Graph / Twitter Cards~~
- ~~canonical, robots, theme-color~~
- ~~JSON-LD (Person / WebSite)~~
- ~~sitemap.xml / robots.txt~~
- ~~og:image de compartilhamento~~

Ver [`docs/06-seo.md`](./06-seo.md).

## Usabilidade e UX

| Achado | Impacto |
|--------|---------|
| Boot exige progresso 100% + tecla/clique | Fricção na primeira visita |
| Header sticky 254px (desktop) / 272px (mobile) | Conteúdo “afogado” ao rolar |
| Cartuchos = `div` clicável sem `role`/`tabindex` | Inacessível por teclado |
| Insert Coin = `div` | Idem |
| Sem `prefers-reduced-motion` | Scanlines/flicker podem incomodar |
| WhatsApp `5500000000000` | CTA morto / placeholder |
| Nav active via IntersectionObserver | Bom feedback de seção |
| Toast + score + sons 8-bit | Feedback claro e temático |
| Konami code | Delight de produto |

Interação validada no Playwright: clique em Mario → toast `IT'S-A ME, MARIO! +200 PTS`. Console: 0 erros / 0 warnings.

## Responsividade

### Desktop 1440×900
- Sem overflow horizontal
- Hero com mascote + logo + CTA legíveis
- Nav sem corte
- Header consome ~28% da altura útil

### Mobile 390×844
- Layout em coluna
- Brand tagline oculto (ok)
- Wordmark ~7.7px (abaixo do mínimo legível)
- Nav links ~28px de altura (ideal ≥44px)
- FAB WhatsApp 45×45 (limítrofe)

## Layout e composição

- Marca no hero está no nível certo (logo + mascote BitBook + slogan).
- Seção `#marca` funciona como brand book embutida — ótima para portfólio, opcional para visitante casual.
- Cards de eras/setup reforçam metáfora de fliperama; setup usa emojis em vez de ícones SVG da marca.
- Marquee de jogos fortalece atmosfera, mas aumenta altura do chrome sticky.

## Identidade visual

Paleta em `:root` bem nomeada (`--gb-*`), contraste AA/AAA na maioria dos pares texto/fundo:

| Par | Ratio | AA |
|-----|-------|-----|
| text-bright / ink | 16.47 | Sim |
| cyan / ink | 11.69 | Sim |
| amber / ink | 10.40 | Sim |
| lime / ink | 15.05 | Sim |
| magenta / ink | 5.26 | Sim (cuidado em texto pequeno) |
| text-dim / ink | 5.95 | Sim |

Tipografia: Press Start 2P (display) + VT323 (corpo 20px). Adequadas ao conceito; Press Start exige tamanho generoso.

## Estratégia de desenvolvimento

**Atual:** HTML/CSS/JS estático, Live Server, `CONFIG` no JS, localStorage para score.

**Lacunas:** sem `package.json`, sem lint/format, sem testes, sem CI, README antigo apontava `retro-gamer-site/`.

**Direção recomendada:** manter vanilla (encaixa no conceito) + docs + scripts npm leves (`serve`, `lint` opcional) + checklist SEO antes de publicar.
