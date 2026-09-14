const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');
const formTitle = document.getElementById('form-title');
const productIndex = document.getElementById('product-index');
const clearFormButton = document.getElementById('clear-form');
const cancelEditButton = document.getElementById('cancel-edit');

let products = [];
let editingIndex = null;
let productListRoot = null;

if (productList && ReactDOM && ReactDOM.createRoot) {
  productListRoot = ReactDOM.createRoot(productList);
}

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

async function loadProducts() {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Não foi possível carregar os produtos.');
  }

  products = await response.json();
  renderProducts();
}

function renderProducts() {
  if (!productList || !productListRoot) {
    return;
  }

  const productCards = products.map((product, index) => {
    return React.createElement('article', {
      className: 'admin-product-row',
      key: `${product.name}-${index}`
    }, [
      React.createElement('div', {
        className: 'admin-product-row__media',
        key: 'media'
      }, React.createElement('img', {
        src: product.image || '',
        alt: product.name || 'Produto'
      })),
      React.createElement('div', {
        className: 'admin-product-row__body',
        key: 'body'
      }, [
        React.createElement('div', {
          className: 'admin-product-row__name',
          key: 'name'
        }, product.name || ''),
        React.createElement('div', {
          className: 'admin-product-row__meta',
          key: 'meta'
        }, `${product.category || ''} • ${product.tag || ''}`),
        React.createElement('div', {
          className: 'admin-product-row__meta',
          key: 'description'
        }, product.description || ''),
        React.createElement('div', {
          className: 'admin-product-row__price',
          key: 'price'
        }, product.price || '')
      ]),
      React.createElement('div', {
        className: 'admin-product-row__actions',
        key: 'actions'
      }, [
        React.createElement('button', {
          type: 'button',
          key: 'edit',
          'data-edit': String(index)
        }, 'Editar'),
        React.createElement('button', {
          type: 'button',
          key: 'delete',
          className: 'row-delete',
          'data-delete': String(index)
        }, 'Excluir')
      ])
    ]);
  });

  productListRoot.render(React.createElement('div', null, productCards));
}

productList.addEventListener('click', async (event) => {
  const target = event.target;

  if (target.dataset.edit !== undefined) {
    const index = Number(target.dataset.edit);
    editingIndex = index;

    const product = products[index];
    productIndex.value = String(index);
    formTitle.textContent = 'Editar item';

    document.getElementById('name').value = product.name;
    document.getElementById('category').value = product.category;
    document.getElementById('tag').value = product.tag;
    document.getElementById('description').value = product.description;
    document.getElementById('image').value = product.image;
    document.getElementById('price').value = product.price;

    return;
  }

  if (target.dataset.delete !== undefined) {
    const index = Number(target.dataset.delete);
    const product = products[index];

    if (!confirm(`Deseja excluir "${product.name}"?`)) {
      return;
    }

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', index })
    });

    if (!response.ok) {
      alert('Erro ao excluir produto.');
      return;
    }

    products = await response.json();
    renderProducts();

    if (editingIndex === index || editingIndex === products.length) {
      resetForm();
    }
  }
});

productForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    name: document.getElementById('name').value.trim(),
    category: document.getElementById('category').value.trim(),
    tag: document.getElementById('tag').value.trim(),
    description: document.getElementById('description').value.trim(),
    image: document.getElementById('image').value.trim(),
    price: document.getElementById('price').value.trim(),
    href: '#'
  };

  if (!payload.name || !payload.category || !payload.tag || !payload.description || !payload.image || !payload.price) {
    alert('Preencha todos os campos do produto.');
    return;
  }

  const action = editingIndex === null ? 'create' : 'update';
  const sendPayload = { action, product: normalizeProduct(payload), index: editingIndex };

  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sendPayload)
  });

  if (!response.ok) {
    alert('Erro ao salvar produto.');
    return;
  }

  products = await response.json();
  renderProducts();
  resetForm();
});

function resetForm() {
  productForm.reset();
  productIndex.value = '';
  editingIndex = null;
  formTitle.textContent = 'Adicionar item';
}

clearFormButton.addEventListener('click', resetForm);
cancelEditButton.addEventListener('click', resetForm);

loadProducts().catch((error) => {
  console.error(error);
  alert('Falha ao carregar o catálogo.');
});
