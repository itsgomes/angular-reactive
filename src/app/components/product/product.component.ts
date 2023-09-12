import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input()
  public product: IProduct
}
