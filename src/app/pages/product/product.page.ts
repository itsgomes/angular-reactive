import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable, combineLatest, map, shareReplay, startWith, tap } from "rxjs";

import { IProduct } from "src/app/models/product.model";
import { ProductService } from "src/app/services/product.service";

interface IProductData {
  product: IProduct;
  any: IProduct[];
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss']
})
export class ProductPage implements OnInit {
  public productData$: Observable<IProductData>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  public ngOnInit(): void {
    const productId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    const productReq1$ = this.productService.getProductById(productId)
      .pipe(
        startWith(null),
        shareReplay()
      );

    const productReq2$ = this.productService.getProductByIdV2(productId)
      .pipe(
        startWith([]),
        shareReplay()
      );

    this.productData$ = combineLatest([productReq1$, productReq2$])
      .pipe(
        map(([product, any]) => {
          return {
            product,
            any
          }
        })
      );
  }
}