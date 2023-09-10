import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductListComponent
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  constructor(public productService: ProductService) {}
}
