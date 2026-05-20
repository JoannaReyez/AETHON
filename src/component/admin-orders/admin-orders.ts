import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../app/store.service';
import { Order } from '../../app/data/product-mock';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.scss'
})
export class AdminOrders {
  activeStatusFilter = 'all';

  statusFilters = [
    { value: 'all', label: 'Todas' },
    { value: 'entregado', label: 'Entregadas' },
    { value: 'en proceso', label: 'En Proceso' },
    { value: 'cancelado', label: 'Canceladas' }
  ];

  constructor(public store: StoreService) {}

  get filteredOrders(): Order[] {
    const allOrders = this.store.getAllOrders();
    if (this.activeStatusFilter === 'all') {
      return allOrders;
    }
    return allOrders.filter(order => order.status === this.activeStatusFilter);
  }

  ordersByStatus(status: string): number {
    return this.store.getAllOrders().filter(order => order.status === status).length;
  }

  getTotalUnits(order: Order): number {
    return order.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateOrderStatus(orderId: number, newStatus: string): void {
    this.store.updateOrderStatus(orderId, newStatus as 'entregado' | 'en proceso' | 'cancelado');
  }

  viewOrderDetails(orderId: number): void {
    console.log('Ver detalles de orden:', orderId);
  }

  deleteOrder(orderId: number): void {
    if (confirm('¿Estás seguro de eliminar esta orden?')) {
      console.log('Eliminar orden:', orderId);
    }
  }
}