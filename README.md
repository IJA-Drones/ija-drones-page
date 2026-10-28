# IJA Drones

Landing page institucional da IJA Drones, com foco em pulverização agrícola e
software para gestão de voos. O projeto foi construído com Next.js, TypeScript e
Tailwind CSS.

## Requisitos

- Node.js 20.9 ou superior
- npm 10 ou superior

## Executar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000` no navegador.

## Comandos

```bash
npm run dev    # ambiente de desenvolvimento
npm run build  # build de produção
npm run start  # executa o build
npm run lint   # análise estática
```

## Personalização

Os textos, soluções, etapas e dados de contato ficam em `src/content/site.ts`.
Antes da publicação, confirme o e-mail comercial e revise todas as funcionalidades
descritas para que correspondam ao produto real.

As cores azul e verde foram extraídas da identidade visual fornecida. A
tipografia sans, as animações e as regras responsivas estão configuradas em
`src/app/globals.css`.

### Reconhecimento ABES

O bloco `#reconhecimento-abes` é uma seção independente entre Tecnologia
brasileira e a notícia de Itajubá. Usa os dados de
`site.abesAward` em `src/content/site.ts`. A placa enviada pela IJA comprova o
**3º lugar na categoria Saúde**, em “Soluções Mais Admiradas: Iniciativas que
Geram um Impacto Real”. A IJA confirmou que a solução premiada é o software
IJA System, aplicado à gestão das operações de combate à dengue em São Paulo.
O software aparece como protagonista da seção, com texto breve sobre o
reconhecimento e a aplicação em São Paulo, sem repetir as funções apresentadas
na seção do sistema e sem botão para conhecê-lo. A página geral da premiação
fornece contexto.

Quando a ABES publicar a notícia sobre a IJA, preencha `officialPublication` com
`title`, `url` e, se disponíveis, `publishedAt` (AAAA-MM-DD) e `summary` fiel à
matéria. Isso exibe a fonte e habilita o botão “Ler publicação da ABES”.
Somente a foto tratada da placa está habilitada em `photos`, com caminho local
em `public/images/abes-2026/`, descrição, legenda e dimensões. Com uma foto, a
seção exibe o texto à esquerda e a placa completa à direita no desktop, e
empilha os conteúdos no celular. A lista aceita outras fotos e se adapta para
uma galeria, preservando as imagens inteiras e permitindo abri-las em nova aba.
A foto do grupo aguarda confirmação antes de ser incluída. Substitua os
caminhos e as dimensões quando as fotos oficiais estiverem disponíveis. A placa
fotografada
não substitui um documento PDF: `certificateUrl` continua vazio até que um
certificado seja fornecido. A publicação e o botão de certificado só aparecem
quando os respectivos dados são preenchidos.

## Imagens

As imagens utilizadas no protótipo estão armazenadas em `public/images`, evitando
dependência de URLs externas durante a navegação. Elas vieram das referências do
Unsplash presentes no layout original e podem ser substituídas por fotos próprias
das operações da IJA Drones antes do lançamento.

## Estrutura

- `src/app`: página, layout, metadados e estilos globais
- `src/components`: marca, navegação, abas de soluções, ícones e mapa ilustrativo
- `src/content/site.ts`: conteúdo editável e dados comerciais
- `public/images`: logo e fotografias da landing page
