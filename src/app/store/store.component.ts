import { Component, Signal } from '@angular/core';
import { ProductRepository } from '../model/product.repository';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
  /*
  products: Signal<Product[]>;
  categories: Signal<string[]>;

  constructor(private repository: ProductRepository) {
      this.products = repository.products
      this.categories = repository.categories;
  }
  */
}
