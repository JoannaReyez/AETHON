import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../app/store.service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.scss'
})
export class UserOrders {
  constructor(public store: StoreService) {}
}
