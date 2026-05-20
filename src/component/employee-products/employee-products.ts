import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../app/store.service';
import { Product } from '../../app/data/product-mock';

@Component({
  selector: 'app-employee-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-products.html',
  styleUrls: ['./employee-products.scss']
})
export class EmployeeProducts {
  searchTerm = signal('');
  categoryFilter = signal('Todos');
  statusFilter = signal('Todos');

  productStock = signal<Record<number, number>>({});
  productStatus = signal<Record<number, 'Disponible' | 'Agotado'>>({});

  readonly categories = ['Todos', 'destacados', 'nuevos', 'ofertas', 'vip'];
  readonly statuses = ['Todos', 'Disponible', 'Agotado'];

  readonly filteredProducts = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const category = this.categoryFilter();
    const status = this.statusFilter();

    return this.store.products.filter(product => {
      const matchesTerm =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);

      const matchesCategory = category === 'Todos' || product.category === category;
      const matchesStatus = status === 'Todos' || this.productStatus()[product.id] === status;
      return matchesTerm && matchesCategory && matchesStatus;
    });
  });

  constructor(public store: StoreService) {
    this.productStock.set(
      Object.fromEntries(this.store.products.map(product => [product.id, 8 + (product.id * 3) % 20]))
    );
    this.productStatus.set(
      Object.fromEntries(this.store.products.map(product => [product.id, product.status]))
    );
  }

  getStock(product: Product): number {
    return this.productStock()[product.id] ?? 0;
  }

  getStatus(product: Product): 'Disponible' | 'Agotado' {
    return this.productStatus()[product.id] ?? product.status;
  }

  viewProduct(product: Product): void {
    window.alert(`Ver producto: ${product.name}`);
  }

  updateProduct(product: Product): void {
    const stock = this.getStock(product);
    this.productStock.update(current => ({ ...current, [product.id]: Math.max(1, stock + 5) }));
    window.alert(`Stock de ${product.name} actualizado a ${this.getStock(product)} unidades.`);
  }

  markOutOfStock(product: Product): void {
    this.productStatus.update(current => ({ ...current, [product.id]: 'Agotado' }));
    this.productStock.update(current => ({ ...current, [product.id]: 0 }));
  }
}

