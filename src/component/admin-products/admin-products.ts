import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../app/store.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.scss'
})
export class AdminProducts {
  constructor(public store: StoreService) {}

  get availableProducts(): number {
    return this.store.products.filter(p => p.status === 'Disponible').length;
  }

  get soldOutProducts(): number {
    return this.store.products.filter(p => p.status === 'Agotado').length;
  }

  get discountedProducts(): number {
    return this.store.products.filter(p => p.oldPrice).length;
  }

  viewProduct(productId: number): void {
    console.log('Ver producto:', productId);
  }

  editProduct(productId: number): void {
    console.log('Editar producto:', productId);
  }

  deleteProduct(productId: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      console.log('Eliminar producto:', productId);
    }
  }

  openAddProductModal(): void {
    console.log('Abrir modal de agregar producto');
  }
}