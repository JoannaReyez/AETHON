import { Injectable, signal, computed } from '@angular/core';
import { Product, products, Order, defaultOrders, defaultProfile, UserProfile } from './data/product-mock';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class StoreService {
  products = products;
  cartItems = signal<CartItem[]>([]);
  favorites = signal<number[]>([1, 3]);
  orders = signal<Order[]>(defaultOrders);
  profile = signal<UserProfile>(defaultProfile);
  employeeProfile = signal<UserProfile>(defaultProfile);
  isLoggedIn = signal(false);
  currentUser = signal('');
  activeTheme = signal('Claro');
  notificationsEnabled = signal(true);
  userRole = signal('user');

  readonly cartCount = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0));
  readonly cartTotal = computed(() => this.cartItems().reduce((sum, item) => sum + item.product.priceNum * item.quantity, 0));
  readonly isAdmin = computed(() => this.userRole() === 'admin');
  readonly isEmployee = computed(() => this.userRole() === 'employee');
  readonly currentEmployee = computed(() => this.currentUser());
  readonly currentEmployeeProfile = computed(() => this.employeeProfile());

  login(email: string, password: string): { success: boolean; role: string } {
    const emailLower = email.trim().toLowerCase();

    // Admin login
    if (emailLower === 'admin' && password === 'admin123') {
      this.currentUser.set('Administrador');
      this.isLoggedIn.set(true);
      this.userRole.set('admin');
      this.profile.set({
        name: 'Administrador',
        username: 'admin',
        email: 'admin@sistema.com',
        phone: '+52 999 999 9999',
        address: 'Oficina Central',
        memberSince: 'Enero 2024',
        avatarText: 'AD'
      });
      return { success: true, role: 'admin' };
    }

    // User login
    if (emailLower === 'usuario1' && password === 'usuario123') {
      this.currentUser.set('Usuario1');
      this.isLoggedIn.set(true);
      this.userRole.set('user');
      this.profile.set(defaultProfile);
      this.employeeProfile.set(defaultProfile);
      return { success: true, role: 'user' };
    }

    if (emailLower === 'empleado1' && password === 'empleado123') {
      this.loginEmployee();
      return { success: true, role: 'employee' };
    }

    return { success: false, role: '' };
  }

  loginEmployee(): void {
    this.currentUser.set('Empleado1');
    this.isLoggedIn.set(true);
    this.userRole.set('employee');
    const employeeProfile: UserProfile = {
      name: 'Empleado Operativo',
      username: 'empleado1',
      email: 'empleado1@empresa.com',
      phone: '+52 777 888 5555',
      address: 'Sucursal Operativa',
      memberSince: 'Marzo 2025',
      avatarText: 'EM'
    };
    this.profile.set(employeeProfile);
    this.employeeProfile.set(employeeProfile);
  }

  logoutEmployee(): void {
    this.logout();
  }

  logout(): void {
    this.isLoggedIn.set(false);
    this.currentUser.set('');
    this.userRole.set('user');
    this.cartItems.set([]);
    this.favorites.set([1, 3]);
    this.orders.set(defaultOrders);
    this.profile.set(defaultProfile);
    this.employeeProfile.set(defaultProfile);
  }

  addToCart(product: Product): void {
    const items = [...this.cartItems()];
    const existing = items.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ product, quantity: 1 });
    }
    this.cartItems.set(items);
  }

  removeFromCart(index: number): void {
    const items = [...this.cartItems()];
    items.splice(index, 1);
    this.cartItems.set(items);
  }

  increaseQty(index: number): void {
    const items = [...this.cartItems()];
    items[index].quantity += 1;
    this.cartItems.set(items);
  }

  decreaseQty(index: number): void {
    const items = [...this.cartItems()];
    if (items[index].quantity > 1) {
      items[index].quantity -= 1;
    } else {
      items.splice(index, 1);
    }
    this.cartItems.set(items);
  }

  toggleFavorite(productId: number): void {
    const favorites = [...this.favorites()];
    const index = favorites.indexOf(productId);
    if (index >= 0) {
      favorites.splice(index, 1);
    } else {
      favorites.push(productId);
    }
    this.favorites.set(favorites);
  }

  isFavorite(productId: number): boolean {
    return this.favorites().includes(productId);
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  addOrder(order: Order): void {
    this.orders.update(current => [order, ...current]);
  }

  updateOrderStatus(orderId: number, status: 'entregado' | 'en proceso' | 'cancelado'): void {
    this.orders.update(current =>
      current.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  }

  getAllOrders(): Order[] {
    return this.orders();
  }

  toggleTheme(): void {
    this.activeTheme.set(this.activeTheme() === 'Claro' ? 'Oscuro' : 'Claro');
  }

  toggleNotifications(): void {
    this.notificationsEnabled.set(!this.notificationsEnabled());
  }
}
