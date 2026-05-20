import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../app/store.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard {
  constructor(public store: StoreService) {}

  get totalRevenue(): number {
    return this.store.getAllOrders()
      .filter(order => order.status !== 'cancelado')
      .reduce((sum, order) => sum + order.total, 0);
  }

  get deliveredOrders(): number {
    return this.store.getAllOrders().filter(order => order.status === 'entregado').length;
  }

  get inProcessOrders(): number {
    return this.store.getAllOrders().filter(order => order.status === 'en proceso').length;
  }

  get cancelledOrders(): number {
    return this.store.getAllOrders().filter(order => order.status === 'cancelado').length;
  }

  get recentOrders() {
    return this.store.getAllOrders().slice(0, 3);
  }
}