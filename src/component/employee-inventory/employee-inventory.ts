import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../app/store.service';
import { Product } from '../../app/data/product-mock';

interface InventoryItem extends Product {
  stock: number;
}

@Component({
  selector: 'app-employee-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-inventory.html',
  styleUrl: './employee-inventory.scss'
})
export class EmployeeInventory {
  inventoryItems = signal<InventoryItem[]>([]);

  readonly lowStockItems = computed(() => this.inventoryItems().filter(item => item.stock > 0 && item.stock <= 8));
  readonly outOfStockItems = computed(() => this.inventoryItems().filter(item => item.stock === 0));
  readonly availableItems = computed(() => this.inventoryItems().filter(item => item.stock > 0));

  constructor(public store: StoreService) {
    this.inventoryItems.set(
      this.store.products.map(product => ({
        ...product,
        stock: product.status === 'Agotado' ? 0 : 10 + (product.id * 5) % 26
      }))
    );
  }

  getStockStatus(item: InventoryItem): string {
    if (item.stock === 0) return 'Agotado';
    if (item.stock <= 8) return 'Bajo stock';
    return 'Disponible';
  }

  markOutOfStock(item: InventoryItem): void {
    this.inventoryItems.update(current => current.map(product => product.id === item.id ? { ...product, stock: 0, status: 'Agotado' } : product));
  }

  replenish(item: InventoryItem): void {
    this.inventoryItems.update(current => current.map(product => product.id === item.id ? { ...product, stock: product.stock + 12, status: 'Disponible' } : product));
  }

  updateStock(item: InventoryItem): void {
    this.inventoryItems.update(current => current.map(product => product.id === item.id ? { ...product, stock: Math.max(0, product.stock - 3) } : product));
  }
}
