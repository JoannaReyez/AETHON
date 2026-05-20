export interface Product {
  id: number;
  name: string;
  description: string;
  fullDescription: string;
  price: string;
  priceNum: number;
  oldPrice?: string;
  category: string;
  badge?: string;
  imageText: string;
  rating?: number;
  reviews?: number;
  status: 'Disponible' | 'Agotado';
  relatedIds?: number[];
}

export interface Order {
  id: number;
  date: string;
  total: number;
  status: 'entregado' | 'en proceso' | 'cancelado';
  items: { name: string; quantity: number; price: string }[];
}

export interface UserProfile {
  name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  memberSince: string;
  avatarText: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Producto Premium',
    description: 'Descubre nuestro producto estrella con calidad incomparable y diseño moderno.',
    fullDescription: 'Este es nuestro producto más vendido. Cuenta con materiales de primera calidad, diseño ergonómico y garantía extendida.',
    price: '$299',
    priceNum: 299,
    oldPrice: '$399',
    category: 'destacados',
    badge: 'Más Vendido',
    imageText: 'Producto Premium',
    rating: 5,
    reviews: 128,
    status: 'Disponible',
    relatedIds: [2, 3]
  },
  {
    id: 2,
    name: 'Producto Nuevo',
    description: 'La última innovación en su categoría. Disponible por tiempo limitado.',
    fullDescription: 'Lanzamiento exclusivo con tecnología de punta. Incluye accesorios adicionales y manual digital.',
    price: '$199',
    priceNum: 199,
    category: 'nuevos',
    badge: 'Nuevo',
    imageText: 'Producto Nuevo',
    rating: 4.5,
    reviews: 45,
    status: 'Disponible',
    relatedIds: [1, 7]
  },
  {
    id: 3,
    name: 'Oferta Especial',
    description: 'Aprovecha esta promoción única con descuento especial por tiempo limitado.',
    fullDescription: 'Lanzamiento especial con precio rebajado. Ideal para clientes que buscan calidad y ahorro.',
    price: '$149',
    priceNum: 149,
    oldPrice: '$249',
    category: 'ofertas',
    badge: '30% OFF',
    imageText: 'Oferta Especial',
    rating: 4.8,
    reviews: 92,
    status: 'Disponible',
    relatedIds: [1, 6]
  },
  {
    id: 4,
    name: 'Paquete VIP',
    description: 'El paquete completo con beneficios exclusivos para clientes premium.',
    fullDescription: 'Accede a beneficios exclusivos como envío prioritario, atención personalizada y regalos sorpresa.',
    price: '$499',
    priceNum: 499,
    oldPrice: '$699',
    category: 'vip',
    badge: 'VIP',
    imageText: 'Paquete VIP',
    rating: 5,
    reviews: 67,
    status: 'Disponible',
    relatedIds: [8, 1]
  },
  {
    id: 5,
    name: 'Producto Estándar',
    description: 'La opción perfecta para empezar. Calidad garantizada a un precio accesible.',
    fullDescription: 'Producto equilibrado que combina buen diseño, funcionalidad y precio accesible para cualquier cliente.',
    price: '$99',
    priceNum: 99,
    category: 'destacados',
    imageText: 'Producto Estándar',
    rating: 4.2,
    reviews: 234,
    status: 'Disponible',
    relatedIds: [3, 6]
  },
  {
    id: 6,
    name: 'Bundle Ahorro',
    description: 'Lleva 3 productos por el precio de 2. Ahorra hasta un 33%.',
    fullDescription: 'Pack especial con varios productos seleccionados para un ahorro real en tu compra.',
    price: '$199',
    priceNum: 199,
    oldPrice: '$297',
    category: 'ofertas',
    badge: '33% OFF',
    imageText: 'Bundle Ahorro',
    rating: 4.9,
    reviews: 56,
    status: 'Disponible',
    relatedIds: [3, 5]
  },
  {
    id: 7,
    name: 'Edición Limitada',
    description: 'Colección exclusiva con diseño único. Disponible solo por temporada.',
    fullDescription: 'Edición de colección con detalles premium y piezas limitadas para clientes que buscan algo especial.',
    price: '$349',
    priceNum: 349,
    category: 'nuevos',
    badge: 'Edición Limitada',
    imageText: 'Edición Limitada',
    rating: 4.7,
    reviews: 34,
    status: 'Disponible',
    relatedIds: [2, 8]
  },
  {
    id: 8,
    name: 'Servicio Premium',
    description: 'Accede a beneficios exclusivos y atención prioritaria durante todo el año.',
    fullDescription: 'Servicio mensual con beneficios especiales, soporte prioritario y acceso VIP a novedades.',
    price: '$99/mes',
    priceNum: 99,
    category: 'vip',
    badge: 'Suscripción',
    imageText: 'Servicio Premium',
    rating: 4.6,
    reviews: 178,
    status: 'Disponible',
    relatedIds: [4, 7]
  }
];

export const defaultOrders: Order[] = [
  {
    id: 1024,
    date: '15 mayo 2026',
    total: 649,
    status: 'entregado',
    items: [
      { name: 'Producto Premium', quantity: 1, price: '$299' },
      { name: 'Servicio Premium', quantity: 1, price: '$99' },
      { name: 'Producto Estándar', quantity: 2, price: '$99' }
    ]
  },
  {
    id: 1025,
    date: '10 mayo 2026',
    total: 348,
    status: 'en proceso',
    items: [
      { name: 'Paquete VIP', quantity: 1, price: '$499' }
    ]
  },
  {
    id: 1026,
    date: '03 mayo 2026',
    total: 149,
    status: 'cancelado',
    items: [
      { name: 'Oferta Especial', quantity: 1, price: '$149' }
    ]
  }
];

export const defaultProfile: UserProfile = {
  name: 'Usuario1',
  username: 'usuario1',
  email: 'usuario1@ejemplo.com',
  phone: '+52 123 456 7890',
  address: 'Av. Principal 123, Ciudad',
  memberSince: 'Enero 2024',
  avatarText: 'U1'
};
