import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { StoreService } from '../../app/store.service';

@Component({
  selector: 'app-employee-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, Footer],
  templateUrl: './employee-shell.html',
  styleUrl: './employee-shell.scss'
})
export class EmployeeShell {
  readonly navItems = [
    { route: 'dashboard-empleado', label: 'Dashboard', icon: 'bi-speedometer2' },
    { route: 'productos-empleado', label: 'Productos', icon: 'bi-box-seam' },
    { route: 'pedidos-empleado', label: 'Pedidos', icon: 'bi-receipt' },
    { route: 'clientes-empleado', label: 'Clientes', icon: 'bi-people' },
    { route: 'inventario-empleado', label: 'Inventario', icon: 'bi-stack' },
    { route: 'perfil-empleado', label: 'Perfil', icon: 'bi-person-badge' },
    { route: 'configuracion-empleado', label: 'Configuración', icon: 'bi-sliders' }
  ];

  constructor(public store: StoreService, private router: Router) {}

  logout(): void {
    this.store.logoutEmployee();
    this.router.navigate(['/web']);
  }
}
