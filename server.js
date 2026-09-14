const http = require('http');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const productsFile = path.join(root, 'products.js');
const indexFile = path.join(root, 'index.html');
const adminFile = path.join(root, 'admin.html');
const port = process.env.PORT || 3000;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8'
};

function readProducts() {
  const source = fs.readFileSync(productsFile, 'utf8');
  const sandbox = {
    window: {
      catalogProducts: []
    }
  };

  vm.runInNewContext(source, sandbox);
  return sandbox.window.catalogProducts;
}

function writeProducts(products) {
  const data = `const catalogProducts = ${JSON.stringify(products, null, 2)};\n\nwindow.catalogProducts = catalogProducts;\n`;
  fs.writeFileSync(productsFile, data, 'utf8');
}

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(payload));
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath);
  const type = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Arquivo não encontrado');
      return;
    }

    res.writeHead(200, { 'Content-Type': type, 'Access-Control-Allow-Origin': '*' });
    res.end(content);
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Body muito grande'));
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/api/products' && req.method === 'GET') {
    const products = readProducts();
    return sendJson(res, 200, products);
  }

  if (url.pathname === '/api/products' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const payload = JSON.parse(body);
      const products = readProducts();

      if (payload.action === 'create') {
        products.push(payload.product);
      } else if (payload.action === 'update') {
        const index = Number(payload.index);
        if (Number.isInteger(index) && index >= 0 && index < products.length) {
          products[index] = payload.product;
        } else {
          return sendJson(res, 400, { error: 'Índice de produto inválido' });
        }
      } else if (payload.action === 'delete') {
        const index = Number(payload.index);
        if (Number.isInteger(index) && index >= 0 && index < products.length) {
          products.splice(index, 1);
        } else {
          return sendJson(res, 400, { error: 'Índice de produto inválido' });
        }
      } else {
        return sendJson(res, 400, { error: 'Ação inválida' });
      }

      writeProducts(products);
      return sendJson(res, 200, products);
    } catch (error) {
      console.error(error);
      return sendJson(res, 400, { error: 'Erro ao processar o produto' });
    }
  }

  if (url.pathname === '/admin' || url.pathname === '/admin/') {
    return sendFile(res, adminFile);
  }

  const pathname = url.pathname === '/' ? '/index.html' : url.pathname;
  const requestedFile = path.normalize(path.join(root, pathname.replace(/^\/+/, '')));

  if (!requestedFile.startsWith(root)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Acesso proibido');
    return;
  }

  if (fs.existsSync(requestedFile) && fs.statSync(requestedFile).isFile()) {
    return sendFile(res, requestedFile);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Página não encontrada');
});

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
