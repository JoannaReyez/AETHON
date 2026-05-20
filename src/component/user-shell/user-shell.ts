import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { StoreService } from '../../app/store.service';

@Component({
  selector: 'app-user-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, Footer],
  templateUrl: './user-shell.html',
  styleUrl: './user-shell.scss'
})
export class UserShell {
  readonly navItems = [
    { route: 'dashboard', label: 'Dashboard', icon: 'bi-grid-1x2-fill' },
    { route: 'tienda', label: 'Tienda', icon: 'bi-shop' },
    { route: 'carrito', label: 'Carrito', icon: 'bi-bag' },
    { route: 'perfil', label: 'Perfil', icon: 'bi-person' },
    { route: 'configuracion', label: 'Configuración', icon: 'bi-sliders' }
  ];

  constructor(public store: StoreService, private router: Router) {}

  logout(): void {
    this.store.logout();
    this.router.navigate(['/web']);
  }
}
