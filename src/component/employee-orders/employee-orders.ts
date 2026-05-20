import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../app/store.service';
import { Order } from '../../app/data/product-mock';

@Component({
  selector: 'app-employee-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-orders.html',
  styleUrl: './employee-orders.scss'
})
export class EmployeeOrders {
  statusFilter = signal('');
  selectedOrderId = signal<number | null>(null);

  readonly filteredOrders = computed(() => {
    const status = this.statusFilter();
    return this.store.orders().filter(order => {
      const matchesStatus = !status || order.status === status;
      return matchesStatus;
    });
  });

  constructor(public store: StoreService) {}

  toggleDetails(orderId: number): void {
    this.selectedOrderId.set(this.selectedOrderId() === orderId ? null : orderId);
  }

  updateOrderStatus(order: Order, status: 'entregado' | 'en proceso' | 'cancelado'): void {
    this.store.updateOrderStatus(order.id, status);
  }

  markDelivered(order: Order): void {
    this.store.updateOrderStatus(order.id, 'entregado');
  }
}
