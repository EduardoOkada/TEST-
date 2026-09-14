const productGrid = document.getElementById('product-grid');
const categoryButtons = Array.from(document.querySelectorAll('.category-item'));
const searchInput = document.getElementById('search-input');
const categoryCollapse = document.getElementById('category-collapse');
const categoryList = document.getElementById('category-list');

let catalogProducts = [];
let selectedCategory = 'all';

function fallbackProductCard(product) {
  return React.createElement('article', {
    className: 'product-card',
    key: product.name,
    'data-category': product.category
  }, [
    React.createElement('img', {
      key: 'image',
      src: product.image || '',
      alt: product.name || 'Produto'
    }),
    React.createElement('div', {
      key: 'content',
      className: 'product-content'
    }, [
      React.createElement('span', {
        key: 'tag',
        className: 'product-tag'
      }, product.tag || ''),
      React.createElement('h3', {
        key: 'name'
      }, product.name || ''),
      React.createElement('p', {
        key: 'description'
      }, product.description || ''),
      React.createElement('div', {
        key: 'meta',
        className: 'product-meta'
      }, [
        React.createElement('span', {
          key: 'price',
          className: 'product-price'
        }, product.price || ''),
        React.createElement('a', {
          key: 'link',
          href: product.href || '#'
        }, 'Comprar')
      ])
    ])
  ]);
}

function renderProducts() {
  if (!productGrid) {
    return;
  }

  const term = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const filteredProducts = catalogProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = term.length === 0 || product.name.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  const productCards = filteredProducts.map(fallbackProductCard);

  if (!productGrid.__reactRoot) {
    productGrid.__reactRoot = ReactDOM.createRoot(productGrid);
  }

  productGrid.__reactRoot.render(React.createElement('div', { className: 'product-grid' }, productCards));
}

async function loadProducts() {
  try {
    const response = await fetch('/api/products', {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar produtos');
    }

    catalogProducts = await response.json();
    renderProducts();
  } catch (error) {
    console.error(error);

    if (productGrid) {
      productGrid.innerHTML = '<p class="catalog-error">Erro ao carregar o catálogo.</p>';
    }
  }
}

if (categoryCollapse && categoryList) {
  categoryCollapse.addEventListener('click', () => {
    const willCollapse = categoryList.dataset.collapsed !== 'true';
    categoryList.dataset.collapsed = String(willCollapse);
    categoryList.style.display = willCollapse ? 'none' : 'flex';
    categoryCollapse.setAttribute('aria-expanded', String(!willCollapse));
    categoryCollapse.querySelector('.category-collapse-icon').textContent = willCollapse ? '☰' : '×';
  });
}

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.category;

    categoryButtons.forEach((item) => {
      item.classList.toggle('active', item === button);
    });

    renderProducts();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', () => {
    renderProducts();
  });
}

loadProducts();
