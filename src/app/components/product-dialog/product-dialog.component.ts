import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent {

  public product: IProduct;
  public productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) product: IProduct,
    private productService: ProductService
  ) {
    this.product = product;
    this.productForm = this.fb.group({
      title: [product.title, Validators.required],
      category: [product.category, Validators.required],
      description: [product.description, Validators.required],
      price: [product.price, Validators.required],
      discountPercentage: [product.discountPercentage, Validators.required]
    });
  }

  public saveChanges(): void {
    const changes = this.productForm.value;

    this.productService.saveProduct(this.product.id, changes)
      .subscribe();

    this.dialogRef.close(changes);
  }

  public close(): void {
    this.dialogRef.close();
  }

}
