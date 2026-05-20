import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../app/store.service';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-profile.html',
  styleUrl: './employee-profile.scss'
})
export class EmployeeProfile {
  readonly profileSummary = computed(() => this.store.employeeProfile());
  readonly pedidoGestionados = computed(() => this.store.orders().length);
  readonly productosGestionados = computed(() => this.store.products.length);
  readonly rendimiento = computed(() => 88 + this.store.orders().length);

  constructor(public store: StoreService) {}
}
