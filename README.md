# TEST-

Catálogo estático de produtos com painel de categorias, links sociais, busca e layout responsivo.

## Estrutura

- `index.html`: página principal do catálogo.
- `styles.css`: estilos do layout, painel de categorias, links sociais, cards e responsividade.
- `products.js`: dados dos produtos em um array `catalogProducts`.
- `script.js`: renderização dos produtos, filtro por categoria, busca e recolhimento do painel de categorias.
- `ICONS/`: imagens do banner e ícones sociais.

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

## Rodando localmente

Para testar a página localmente, rode um servidor estático na pasta do projeto:

```bash
python3 -m http.server 8000
```

Depois abra a URL:

```text
http://localhost:8000
```
