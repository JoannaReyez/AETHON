import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../app/store.service';
import { Order, Product } from '../../app/data/product-mock';

type CartSection = 'carrito' | 'mis-compras' | 'favoritos';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-cart.html',
  styleUrl: './user-cart.scss'
})
export class UserCart {
  readonly activeSection = signal<CartSection>('carrito');
  readonly sections = [
    {
      route: 'carrito' as const,
      label: 'Carrito',
      icon: 'bi-bag',
      description: 'Productos listos para finalizar tu compra.'
    },
    {
      route: 'mis-compras' as const,
      label: 'Mis Compras',
      icon: 'bi-receipt',
      description: 'Historial estático de pedidos y seguimiento.'
    },
    {
      route: 'favoritos' as const,
      label: 'Favoritos',
      icon: 'bi-heart',
      description: 'Productos guardados para volver más tarde.'
    }
  ];
  readonly favoriteProducts = computed(() =>
    this.store
      .favorites()
      .map(productId => this.store.getProductById(productId))
      .filter((product): product is Product => !!product)
  );

  constructor(public store: StoreService) {}

  get deliveryAddress(): string {
    return this.store.profile().address;
  }

  get formattedTotal(): string {
    return `$${this.store.cartTotal()}`;
  }

  get activeSectionMeta() {
    return this.sections.find(section => section.route === this.activeSection()) ?? this.sections[0];
  }

  get orderCount(): number {
    return this.store.orders().length;
  }

  get favoriteCount(): number {
    return this.store.favorites().length;
  }

  get cartItemsCount(): number {
    return this.store.cartItems().length;
  }

  getStatusLabel(status: string): string {
    return status === 'en proceso' ? 'En proceso' : status.charAt(0).toUpperCase() + status.slice(1);
  }

  getOrderUnitsCount(order: Order): number {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  }

  setActiveSection(section: CartSection): void {
    this.activeSection.set(section);
  }

  checkout(): void {
    const date = new Date();
    const orderId = Math.floor(1000 + Math.random() * 9000);
    const items = this.store.cartItems().map(item => ({ name: item.product.name, quantity: item.quantity, price: item.product.price }));
    this.store.addOrder({ id: orderId, date: date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }), total: this.store.cartTotal(), status: 'en proceso', items });
    this.store.cartItems.set([]);
  }
}
