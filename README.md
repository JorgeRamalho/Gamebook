# GameBook — Jorge · Gamer das Old School

> **Slogan:** Onde cada save vira história  
> **Mascote:** BitBook — invader pixel abraçando um livro aberto

Site retro com identidade visual arcade e a alma dos fliperamas e consoles das décadas de 80, 90 e 2000.

## Identidade visual

| Ativo | Arquivo |
|-------|---------|
| Marca (ícone) | `assets/logo-mark.svg` |
| Logo | `assets/logo-full.svg` |
| Logo + slogan | `assets/logo-slogan.svg` |
| Mascote BitBook | `assets/mascot.svg` |
| Favicon | `assets/favicon.svg` |

### Paleta

| Nome | Hex | Uso |
|------|-----|-----|
| CRT Cyan | `#00D9FF` | Primária, glow arcade |
| Arcade Magenta | `#FF0080` | Ação, destaques |
| Cartucho Amber | `#FFAA00` | Livro, calor nostálgico |
| HUD Lime | `#66FF33` | Score, vidas |
| PS Violet | `#9945FF` | Profundidade, PS1 era |
| Página Paper | `#FFE8B8` | Páginas do livro |
| Cabinet Ink | `#0A0814` | Fundo principal |

### Tipografia

- **Display / logo:** Press Start 2P
- **Corpo / slogan:** VT323

## Como abrir

Abra o arquivo `index.html` no navegador, ou use um servidor local:

```bash
# Com Python
python -m http.server 8080

# Com Node (npx)
npx serve .
```

Depois acesse: http://localhost:8080

## Personalização

| O quê | Onde editar |
|-------|-------------|
| Nome do jogador | `index.html` (HUD, boot, sobre) + `script.js` → `CONFIG.playerName` |
| Textos e jogos | `index.html` |
| Visual / cores | `styles.css` → variáveis `:root` |
| Interações e score | `script.js` |

## Recursos

- Tela de boot com nome do jogador
- Seção **SOBRE** com história do gamer raiz
- Efeito CRT com scanlines
- Linha do tempo das 3 eras (80s, 90s, 2000s)
- Cartuchos clicáveis com easter eggs
- Sistema de pontuação com high score (salvo no navegador)
- Código Konami secreto: ↑↑↓↓←→←→BA
- Sons 8-bit ao inserir moeda e clicar nos jogos

## Estrutura

```
retro-gamer-site/
├── assets/
│   ├── logo-mark.svg
│   ├── logo-full.svg
│   ├── logo-slogan.svg
│   ├── mascot.svg
│   └── favicon.svg
├── index.html
├── styles.css
├── script.js
└── README.md
```
