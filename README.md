# Horizon Motors — Vitrine / Catálogo Automotivo (Protótipo)

Site moderno, responsivo e premium para **catálogo de automóveis**, com grade de
cards, abas por marca, painel de detalhes, favoritos, login simulado e
comparador. Visual dark tecnológico inspirado em telas de seleção de veículos.

> ⚠️ **Protótipo demonstrativo.** Veículos, imagens, especificações, preços e
> textos são fictícios e foram feitos para serem facilmente substituídos por
> dados reais.

## ✨ Stack

- **Next.js 14** (App Router) + **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animações)
- Sem bibliotecas pesadas: ícones são SVGs inline; estado via React Context +
  `localStorage`.

## 🚀 Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Ambiente de desenvolvimento
npm run dev
# abre em http://localhost:3000

# 3. Build de produção
npm run build
npm start
```

Requisitos: Node.js 18.18+ (recomendado 20+).

## 📁 Estrutura

```
src/
├── app/                      # Rotas (App Router)
│   ├── layout.tsx            # Layout raiz + metadata/SEO + providers
│   ├── page.tsx              # Home = tela de catálogo estilo "game" (GameCatalog)
│   ├── carros/[slug]/        # Página de detalhes (rota dinâmica)
│   ├── favoritos/            # Lista de favoritos
│   ├── login/                # Página de login (full-page)
│   ├── sobre/                # Página institucional
│   ├── contato/              # Formulário de contato
│   ├── privacidade/          # Política de Privacidade
│   ├── termos/               # Termos de Uso
│   ├── cookies/              # Política de Cookies
│   ├── sitemap.ts / robots.ts
│   └── not-found.tsx
├── components/               # Componentes reutilizáveis
│   ├── GameCatalog           # ★ tela de catálogo estilo game (home)
│   ├── AppShell              # mostra Header/Footer só fora da home
│   ├── Header, Footer, Hero
│   ├── BrandTabs, CarCard, CarGrid, CatalogClient
│   ├── CarDetailsHero, SpecTable, FinanceSimulator
│   ├── FavoriteButton, CompareButton, CompareBar
│   ├── LoginModal, SearchBar, FilterBar
│   ├── BrandIconPlaceholder, PolicyLayout, ContactForm
│   ├── CardSkeleton, TechBackground, icons.tsx
├── context/                  # Auth, Favorites, Compare, UI, Toast
├── data/                     # cars.ts e brands.ts  ← edite aqui
├── lib/                      # utils, site config, estilos de tipo
└── types/                    # Tipagem central (contrato de dados)
```

## ✅ Funcionalidades

- **Home = tela de catálogo estilo game** (inspirada em telas de seleção de
  carros): HUD no topo, abas de marca com bumpers LB/RB, **painel de detalhe à
  esquerda**, grade de cards com barra de tipo + índice de performance, seleção
  destacada e **barra de ações inferior** (Detalhes / Favoritar / Comparar /
  Ordenar / Filtrar / Menu) no lugar do rodapé. As páginas internas mantêm o
  Header/Footer normais.
- **Catálogo** com grade responsiva (2 col mobile, 3 tablet, 4 desktop).
- **Abas por marca** com scroll horizontal e contador por marca.
- **Busca** por nome, marca ou tipo (também via `?q=`).
- **Filtros** por tipo (Elétrico, Híbrido, Performance, SUV, Premium) e
  **ordenação** por preço/nome/destaque.
- **Favoritos** persistidos em `localStorage` (card, detalhes e página dedicada).
- **Login simulado** (modal + página) com nome no header e logout.
- **Comparador** de até 3 veículos com tabela lado a lado.
- **Página de detalhes** com galeria, ficha técnica, diferenciais, segurança,
  tecnologia e **simulador de financiamento** interativo.
- **Toasts** de feedback, **skeletons** com shimmer, animações de entrada/hover
  e transições entre abas.
- **SEO** básico: metadata por página, Open Graph, `sitemap.xml` e `robots.txt`.

## 🛠️ Como personalizar

### Trocar os carros, preços e textos

Edite **`src/data/cars.ts`**. Cada item segue a interface `Car`
(`src/types/index.ts`). Para imagens locais, coloque os arquivos em `/public` e
ajuste as constantes `IMG_*` no topo do arquivo (ex.: `/cars/mg-s5.webp`).

> As imagens do protótipo são carregadas do `i.postimg.cc`. Os domínios remotos
> estão liberados em `next.config.mjs` (`images.remotePatterns`). Ao migrar para
> imagens locais, você pode remover esse bloco.

### Trocar marcas e logos

Edite **`src/data/brands.ts`**. Os ícones são **placeholders** (monograma +
cor). Para usar a logo oficial, adicione o arquivo em `/public/brand` e preencha
o campo `logo` da marca — o componente `BrandIconPlaceholder` passa a usar a
imagem automaticamente.

### Marca, contatos e logo principal

Edite **`src/lib/site.ts`** (nome, slogan, e-mail, telefone, endereço e a logo
principal usada no header/footer).

### Cores e identidade visual

Ajuste a paleta (neon, electric, tons de grafite) em **`tailwind.config.ts`** e
os estilos globais em **`src/app/globals.css`**.

## 🔐 Login de demonstração

Use qualquer e-mail válido + senha com 4+ caracteres, ou clique em
**“Preencher credenciais de demonstração”**. Os dados ficam apenas no navegador.

## 📝 Licença / uso

Projeto de protótipo para fins de demonstração. Marcas citadas pertencem aos
seus titulares e são usadas apenas como placeholders substituíveis.
