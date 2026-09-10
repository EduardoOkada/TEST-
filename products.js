const catalogProducts = [
  {
    name: 'Kit de Cozinha Premium',
    category: 'utilidades-casa',
    tag: 'Utilidades para casa',
    description: 'Kit para facilitar o dia a dia doméstico.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&w=500&q=80',
    price: 'R$ 159,00',
    href: '#'
  },
  {
    name: 'Batedeira Compacta',
    category: 'utilidades-casa',
    tag: 'Utilidades para casa',
    description: 'Aparelho prático para casa e rotina.',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&w=500&q=80',
    price: 'R$ 179,00',
    href: '#'
  },
  {
    name: 'Conjunto de Organizers',
    category: 'utilidades-casa',
    tag: 'Utilidades para casa',
    description: 'Organize armários, mesas e cozinha.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&w=500&q=80',
    price: 'R$ 139,00',
    href: '#'
  },
  {
    name: 'Jogo Infantil Criativo',
    category: 'infantil',
    tag: 'Infantil',
    description: 'Brinquedo educativo para crianças.',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e8a025c0e?auto=format&w=500&q=80',
    price: 'R$ 89,00',
    href: '#'
  },
  {
    name: 'Livro de Histórias',
    category: 'infantil',
    tag: 'Infantil',
    description: 'Histórias com ilustrações para leitura.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&w=500&q=80',
    price: 'R$ 59,00',
    href: '#'
  },
  {
    name: 'Mini Banco Infantil',
    category: 'infantil',
    tag: 'Infantil',
    description: 'Banco pequeno com desenho lúdico.',
    image: 'https://images.unsplash.com/photo-1549482199-019f1ac31b7d?auto=format&w=500&q=80',
    price: 'R$ 199,00',
    href: '#'
  },
  {
    name: 'Mini Kit Sensorial',
    category: 'sensoriais',
    tag: 'Sensoriais',
    description: 'Sensação visual e tátil para estímulo.',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&w=500&q=80',
    price: 'R$ 120,00',
    href: '#'
  },
  {
    name: 'Tapete Sensorial',
    category: 'sensoriais',
    tag: 'Sensoriais',
    description: 'Textura suave para explorar com calma.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&w=500&q=80',
    price: 'R$ 150,00',
    href: '#'
  },
  {
    name: 'Brinquedo de Textura',
    category: 'sensoriais',
    tag: 'Sensoriais',
    description: 'Peça com diferentes superfícies sensoriais.',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e8a025c0e?auto=format&w=500&q=80',
    price: 'R$ 92,00',
    href: '#'
  },
  {
    name: 'Vaso Decorativo',
    category: 'decoracao',
    tag: 'Decoração',
    description: 'Peça para compor ambientes com estilo.',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&w=500&q=80',
    price: 'R$ 110,00',
    href: '#'
  },
  {
    name: 'Luminária de Mesa',
    category: 'decoracao',
    tag: 'Decoração',
    description: 'Luz suave para ambientes elegantes.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&w=500&q=80',
    price: 'R$ 180,00',
    href: '#'
  },
  {
    name: 'Quadro Moderno',
    category: 'decoracao',
    tag: 'Decoração',
    description: 'Arte leve para dar identidade ao espaço.',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&w=500&q=80',
    price: 'R$ 140,00',
    href: '#'
  },
  {
    name: 'Mini Imagem Religiosa',
    category: 'religioso',
    tag: 'Religioso',
    description: 'Peça com tema espiritual e acolhedor.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&w=500&q=80',
    price: 'R$ 75,00',
    href: '#'
  },
  {
    name: 'Velas de Oração',
    category: 'religioso',
    tag: 'Religioso',
    description: 'Conjunto para oração e ambiente tranquilo.',
    image: 'https://images.unsplash.com/photo-1602872029708-84d970d3382b?auto=format&w=500&q=80',
    price: 'R$ 65,00',
    href: '#'
  },
  {
    name: 'Kit de Prata Devocional',
    category: 'religioso',
    tag: 'Religioso',
    description: 'Itens com visual clássico e delicado.',
    image: 'https://images.unsplash.com/photo-1519834785169-98d42f8f6e5b?auto=format&w=500&q=80',
    price: 'R$ 210,00',
    href: '#'
  },
  {
    name: 'Cartão NFC Personalizado',
    category: 'nfc',
    tag: 'NFC',
    description: 'Cartão inteligente com uso personalizado.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&w=500&q=80',
    price: 'R$ 49,00',
    href: '#'
  },
  {
    name: 'Pulseira NFC',
    category: 'nfc',
    tag: 'NFC',
    description: 'Acessório com tecnologia para identificação.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&w=500&q=80',
    price: 'R$ 95,00',
    href: '#'
  },
  {
    name: 'Tag NFC de Presentes',
    category: 'nfc',
    tag: 'NFC',
    description: 'Tag com ligação rápida para mensagens.',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&w=500&q=80',
    price: 'R$ 70,00',
    href: '#'
  }
];

window.catalogProducts = catalogProducts;
