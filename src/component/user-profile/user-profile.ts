import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StoreService } from '../../app/store.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile {
  editMode = false;
  readonly mapModalOpen = signal(false);

  constructor(
    public store: StoreService,
    private sanitizer: DomSanitizer
  ) {}

  get deliveryAddress(): string {
    return this.store.profile().address;
  }

  get orderCount(): number {
    return this.store.orders().length;
  }

  get favoriteCount(): number {
    return this.store.favorites().length;
  }

  get cartCount(): number {
    return this.store.cartItems().length;
  }

  get totalSpent(): number {
    return this.store.orders().reduce((sum, order) => sum + order.total, 0);
  }

  get latestOrder() {
    return this.store.orders()[0] ?? null;
  }

  get profileMetrics() {
    return [
      {
        icon: 'bi bi-receipt-cutoff',
        label: 'Pedidos',
        value: `${this.orderCount}`,
        note: this.latestOrder ? `Último pedido #${this.latestOrder.id}` : 'Sin pedidos todavía'
      },
      {
        icon: 'bi bi-heart-fill',
        label: 'Favoritos',
        value: `${this.favoriteCount}`,
        note: 'Guardados para comprar después'
      },
      {
        icon: 'bi bi-bag-check',
        label: 'Carrito',
        value: `${this.cartCount}`,
        note: 'Productos distintos listos para revisar'
      },
      {
        icon: 'bi bi-cash-coin',
        label: 'Total comprado',
        value: this.formatMoney(this.totalSpent),
        note: 'Historial acumulado de pedidos'
      }
    ];
  }

  get deliverySummary(): string {
    return this.latestOrder ? `Tu última compra fue #${this.latestOrder.id} y sigue el mismo destino.` : 'Tu dirección ya quedó lista para próximas entregas.';
  }

  formatMoney(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  }

  get deliveryMapUrl(): SafeResourceUrl {
    const query = encodeURIComponent(this.deliveryAddress);
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps?q=${query}&output=embed`
    );
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  openMapModal(): void {
    this.mapModalOpen.set(true);
  }

  closeMapModal(): void {
    this.mapModalOpen.set(false);
  }
}
