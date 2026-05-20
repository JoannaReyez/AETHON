import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { StoreService } from '../../app/store.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail {
  productId = 0;

  constructor(public store: StoreService, private route: ActivatedRoute) {
    this.productId = Number(this.route.snapshot.paramMap.get('id')) || 0;
  }

  get product() {
    return this.store.getProductById(this.productId);
  }

  get relatedProducts() {
    return this.product?.relatedIds?.map(id => this.store.getProductById(id)).filter(Boolean) as any[] || [];
  }

  toggleFavorite(): void {
    if (this.product) {
      this.store.toggleFavorite(this.product.id);
    }
  }
}
