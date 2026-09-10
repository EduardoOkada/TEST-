const categoryButtons = Array.from(document.querySelectorAll('.category-item'));
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const categoryCollapse = document.getElementById('category-collapse');
const categoryList = document.getElementById('category-list');
const products = window.catalogProducts || [];

function renderProducts(selectedCategory = 'all', term = '') {
  const normalizedTerm = term.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchSearch = normalizedTerm.length === 0 || product.name.toLowerCase().includes(normalizedTerm);

    return matchCategory && matchSearch;
  });

  productGrid.innerHTML = filteredProducts.map((product) => `
    <article class="product-card" data-category="${product.category}">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-content">
        <span class="product-tag">${product.tag}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-meta">
          <span class="product-price">${product.price || ''}</span>
          <a href="${product.href || '#'}">Comprar</a>
        </div>
      </div>
    </article>
  `).join('');
}

let selectedCategory = 'all';

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

    categoryButtons.forEach((item) => item.classList.toggle('active', item === button));

    renderProducts(selectedCategory, searchInput.value);
  });
});

if (searchInput) {
  searchInput.addEventListener('input', () => {
    renderProducts(selectedCategory, searchInput.value);
  });
}

renderProducts();
