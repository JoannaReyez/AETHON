import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../app/store.service';

@Component({
  selector: 'app-admin-store',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-store.html',
  styleUrl: './admin-store.scss'
})
export class AdminStore {
  filter = 'all';
  search = '';

  constructor(public store: StoreService) {}

  get filteredProducts() {
    const term = this.search.trim().toLowerCase();
    return this.store.products.filter(product => {
      const matchCategory = this.filter === 'all' || product.category === this.filter;
      const matchSearch = !term || product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term);
      return matchCategory && matchSearch;
    });
  }

  get categories() {
    return [
      { id: 'all', label: 'Todos' },
      { id: 'destacados', label: 'Destacados' },
      { id: 'nuevos', label: 'Nuevos' },
      { id: 'ofertas', label: 'Ofertas' },
      { id: 'vip', label: 'VIP' }
    ];
  }

  editProduct(productId: number): void {
    console.log('Editar producto:', productId);
    // Aquí implementarías la lógica de edición
  }

  deleteProduct(productId: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      console.log('Eliminar producto:', productId);
      // Aquí implementarías la lógica de eliminación
    }
  }
}