# Identidade visual — GameBook

> **Slogan:** Onde cada save vira história  
> **Mascote:** BitBook — invader pixel abraçando um livro aberto

## Ativos

| Ativo | Arquivo |
|-------|---------|
| Marca (ícone) | `assets/brand/logo-mark.svg` |
| Logo | `assets/brand/logo-full.svg` |
| Logo + slogan | `assets/brand/logo-slogan.svg` |
| Mascote BitBook | `assets/brand/mascot.svg` |
| Favicon | `assets/brand/favicon.svg` |

## Paleta (tokens CSS)

Definidos em `css/styles.css` → `:root`:

| Nome | Hex | Uso |
|------|-----|-----|
| CRT Cyan | `#00D9FF` | Primária, glow arcade |
| Arcade Magenta | `#FF0080` | Ação, destaques |
| Cartucho Amber | `#FFAA00` | Livro, calor nostálgico |
| HUD Lime | `#66FF33` | Score, vidas |
| PS Violet | `#9945FF` | Profundidade, era PS1 |
| Página Paper | `#FFE8B8` | Páginas do livro |
| Cabinet Ink | `#0A0814` | Fundo principal |

## Tipografia

| Papel | Família | Uso |
|-------|---------|-----|
| Display / logo | Press Start 2P | Títulos, wordmark, HUD pixel |
| Corpo / slogan | VT323 | Parágrafos, taglines, UI textual |

## Conceito

Site pessoal como **save point nostálgico**: fliperama + CRT + cartuchos + eras 80s/90s/2000s. A marca une “game” (invader) e “book” (livro aberto) no BitBook.

## Diretrizes rápidas

1. Preferir SVGs da pasta `brand/` a emojis em UI permanente.
2. Manter contraste AA sobre `--gb-ink`.
3. Wordmark do header deve permanecer legível (≥12px efetivos).
4. Glow e scanlines são atmosfera — respeitar `prefers-reduced-motion` (pendente no roadmap).
