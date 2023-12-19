import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRepository } from "./product.repository";
import { StaticDataSource } from "./static.datasource";

@NgModule({
  providers: [ProductRepository, StaticDataSource],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ModelModule { }

