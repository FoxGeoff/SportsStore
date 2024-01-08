import { Component, Signal } from '@angular/core';
import { Product } from '../model/product.model';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { ProductRepository } from '../model/product.repository';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ModelModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {

  products!: Signal<Product[]>;
  categories!: Signal<string[]>;


  constructor(private repository: ProductRepository) {
    this.products = repository.products;
    this.categories = repository.categories;
    console.log(`In constructor: ${JSON.stringify(this.products())}`);
  }
}
