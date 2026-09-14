const productGrid = document.getElementById('product-grid');
const categoryButtons = Array.from(document.querySelectorAll('.category-item'));
const searchInput = document.getElementById('search-input');
const categoryCollapse = document.getElementById('category-collapse');
const categoryList = document.getElementById('category-list');

let allProducts = [];
let selectedCategory = 'all';

function normalizeProduct(product) {
  return {
    name: product.name || '',
    category: product.category || '',
    tag: product.tag || '',
    description: product.description || '',
    image: product.image || '',
    price: product.price || '',
    href: product.href || '#'
  };
}

function getFilteredProducts(term = '') {
  const normalizedTerm = term.trim().toLowerCase();

  return allProducts.filter((product) => {
    const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchSearch = normalizedTerm.length === 0 || product.name.toLowerCase().includes(normalizedTerm);
    return matchCategory && matchSearch;
  });
}

function renderProducts() {
  if (!productGrid) {
    return;
  }

  const products = getFilteredProducts(searchInput ? searchInput.value : '');
  const productCards = products.map((product) => {
    return React.createElement('article', {
      className: 'product-card',
      key: product.name,
      'data-category': product.category
    }, [
      React.createElement('img', {
        key: 'image',
        src: product.image,
        alt: product.name
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
  });

  ReactDOM.createRoot(productGrid).render(
    React.createElement('div', { className: 'product-grid' }, productCards)
  );
}

async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Não foi possível carregar os produtos.');
    }

    allProducts = await response.json();
    renderProducts();
  } catch (error) {
    console.error(error);
    if (productGrid) {
      productGrid.innerHTML = '<p>Falha ao carregar o catálogo.</p>';
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
