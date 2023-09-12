import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { IProduct } from 'src/app/models/product.model';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input()
  public title: string = 'Product list';

  @Input()
  public editable: boolean = false;

  @Input()
  public products: IProduct[] = [];
  
  constructor(
    public dialog: MatDialog
  ) { }

  public identify(index: number, item: IProduct): string {
    return item.title;
  }

  public editProduct(product: IProduct): void {
    this.dialog.open(ProductDialogComponent, {
      data: product, width: '50%'
    });
  }

}
