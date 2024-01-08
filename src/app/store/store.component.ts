import { Component, Signal } from '@angular/core';
import { ProductRepository } from '../model/product.repository';
import { Product } from '../model/product.model';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {

  products!: Signal<Product[]>;
  categories!: Signal<string[]>;

  constructor(){}
/*
  constructor(private repository: ProductRepository) {
      this.products = repository.products;
      this.categories = repository.categories;
      console.log(`In constructor: ${this.products()}`);
  } */

}
