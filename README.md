# TEST-

Catálogo de produtos com painel administrativo, Node.js HTTP server, API de produtos e layout responsivo.

## Visão geral

Este projeto serve uma loja/catalogo com banner, links sociais, painel de categorias, busca e grid de produtos. A persistência dos produtos fica em `products.js`, e o servidor Node em `server.js` serve o HTML estático e expõe `GET/POST /api/products` para leitura e escrita.

## Estrutura

- `index.html`: página principal do catálogo.
- `admin.html`: painel administrativo para criar, editar e excluir produtos.
- `styles.css`: estilos do catálogo principal e categorias.
- `admin.css`: estilos do painel administrativo.
- `server.js`: servidor HTTP Node que serve arquivos estáticos e a API de produtos.
- `products.js`: fonte dos dados do catálogo.
- `src/catalog.js`: renderização do catálogo com fetch ao endpoint JSON da API.
- `src/admin.js`: integração do admin com o endpoint da API.
- `ICONS/`: imagens do banner e ícones sociais.

## Como rodar localmente

Instale as dependências do projeto e depois inicie o servidor:

```bash
npm install
npm start
```

O projeto fica disponível por padrão em:

```text
http://localhost:3000
```

## Como abrir o catálogo

Abra o catálogo principal pelo navegador em:

```text
http://localhost:3000/index.html
```

Ou pela raiz do servidor:

```text
http://localhost:3000/
```

## Como abrir o painel administrativo

O servidor serve a página administrativa pelo endereço:

```text
http://localhost:3000/admin
```

Também é possível abrir diretamente o arquivo:

```text
http://localhost:3000/admin.html
```

## API de produtos

O servidor disponibiliza:

```text
GET /api/products
POST /api/products
```

A operação de gravação aceita `action` `create`, `update` ou `delete` com o payload necessário para a edição do catálogo em `products.js`.

## Como adicionar um produto

No arquivo `products.js`, adicione um objeto ao array `catalogProducts`:

```js
{
  name: "Nome do Produto",
  category: "utilidades-casa",
  tag: "Utilidades para casa",
  description: "Descrição do produto",
  image: "https://exemplo.com/imagem.jpg",
  price: "R$ 99,00",
  href: "#"
}
```

Categorias disponíveis:

- `utilidades-casa`
- `infantil`
- `sensoriais`
- `decoracao`
- `religioso`
- `nfc`
- `chaveiros`

## Como adicionar uma categoria

No HTML principal, dentro do painel de categorias, adicione um botão no padrão:

```html
<button type="button" class="category-item" data-category="novaCategoria">Nova Categoria</button>
```

No CSS, ajuste a cor da categoria se necessário:

```css
.category-item[data-category="novaCategoria"] {
  color: var(--blue);
}
```

## Layout responsivo

A página trabalha com duas colunas principais no desktop e com adaptação automática para tablets e celulares. A grade de produtos varia conforme a largura da tela, e o painel de categorias pode ser recolhido pelo botão presente no cabeçalho do painel.
