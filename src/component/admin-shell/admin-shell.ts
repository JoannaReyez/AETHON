import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { StoreService } from '../../app/store.service';

@Component({
  selector: 'app-admin-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, Footer],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss'
})
export class AdminShell {
  readonly navItems = [
    { route: 'dashboard', label: 'Dashboard', icon: 'bi-grid-1x2-fill' },
    { route: 'tienda', label: 'Tienda Admin', icon: 'bi-shop-window' },
    { route: 'productos', label: 'Productos', icon: 'bi-box-seam', badge: '8' },
    { route: 'ordenes', label: 'Órdenes', icon: 'bi-receipt-cutoff' },
    { route: 'usuarios', label: 'Usuarios', icon: 'bi-people' }
  ];

  constructor(public store: StoreService, private router: Router) {}

  logout(): void {
    this.store.logout();
    this.router.navigate(['/web']);
  }
}