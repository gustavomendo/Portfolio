# Portfolio — Gustavo Mendo

Site pessoal de apresentação: quem sou, o que sei fazer, o que construí e como me contactar.
Construído em HTML, CSS e JavaScript puros — sem framework, sem build, sem dependências a instalar.

**Online:** https://gustavomendo.github.io/Portfolio/

## Tecnologias

| Camada | O que é usado |
|---|---|
| Marcação | HTML5 semântico, uma única página com secções ancoradas |
| Estilo | CSS3 — custom properties, grid, flexbox, `clamp()`, `prefers-color-scheme` |
| Comportamento | JavaScript sem bibliotecas — `IntersectionObserver`, `requestAnimationFrame` |
| Tipografia | Inter (texto e títulos) e JetBrains Mono (labels e números), via Google Fonts |
| Publicação | GitHub Pages, através de GitHub Actions |

## Estrutura

```
Portfolio/
├── index.html      # todo o conteúdo do site
├── styles.css      # design system + estilos de todas as secções
├── main.js         # navegação, reveal ao scroll, contadores, formulário
└── .github/
    └── workflows/
        └── static.yml   # deploy automático para GitHub Pages
```

## Como correr localmente

Não há passo de compilação. Basta servir a pasta:

```bash
python -m http.server 5051
```

E abrir http://127.0.0.1:5051. Abrir o `index.html` diretamente no browser também funciona,
mas servir por HTTP aproxima-se mais do ambiente real.

## Design

O sistema visual é monocromático com **um** acento, definido em custom properties no topo do
`styles.css`. Mudar a identidade do site é mudar essas variáveis, não os componentes.

| Variável | Papel |
|---|---|
| `--bg`, `--bg-alt`, `--surface`, `--surface-2` | fundos e superfícies |
| `--border`, `--border-strong` | hairlines e contornos |
| `--text`, `--text-muted`, `--text-dim` | hierarquia de texto |
| `--accent`, `--accent-soft` | destaque pontual: foco, badge, dot ativo, barra de progresso |

O tema claro e escuro é automático: segue o `prefers-color-scheme` do sistema. O bloco
`@media (prefers-color-scheme: dark)` só redefine as variáveis — nenhum componente tem cores
próprias fora do sistema.

## Secções

`#hero` · `#sobre` · `#skills` · `#projetos` · `#experiencia` · `#contacto`

## Como editar o conteúdo

| Para alterar | Onde |
|---|---|
| Projetos | `index.html`, blocos `.project-card` — duplicar um bloco, atualizar `.project-number`, nome, descrição, tags e links |
| Destaque de uma tag | classe `tag accent` em vez de `tag` |
| Skills e percentagens | `index.html`, atributos `data-w` (largura da barra) e `data-pct` (número), com o mesmo valor |
| Experiência | `index.html`, blocos `.timeline-item` — a entrada mais recente fica em primeiro; o dot com acento é aplicado automaticamente ao primeiro item |
| Números do hero | atributos `data-count` e `data-suffix` nos `.stat-num` |
| Faixa de tecnologias | array `STACK` no topo do `main.js` |

## Acessibilidade e desempenho

- `prefers-reduced-motion` desliga animações e transições para quem o tenha ativo.
- Foco visível em todos os elementos interativos (`:focus-visible`).
- O menu mobile usa `aria-expanded` e fecha com `Escape`.
- Zero dependências de terceiros a carregar, além dos ficheiros de fonte.

## Formulário de contacto

O formulário valida os campos e mostra confirmação, mas **não envia a mensagem** — não existe
backend. Para o tornar funcional, ligar o `submit` em `main.js` a um serviço de formulários
(Formspree, Netlify Forms) ou a um endpoint próprio. Entretanto, o email e o LinkedIn ao lado
são os canais que funcionam.

## Deploy

Qualquer `push` para `main` dispara o workflow `.github/workflows/static.yml`, que publica a
raiz do repositório no GitHub Pages. Também pode ser corrido à mão no separador *Actions*.
