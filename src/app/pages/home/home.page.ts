import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductListComponent
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  
  public lowCostProducts$!: Observable<IProduct[]>;
  public highCostProducts$!: Observable<IProduct[]>;

  constructor(
    public productService: ProductService,
    public authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts(): void {
    this.lowCostProducts$ = this.productService.getProductsByPriceRange(0, 500);
    this.highCostProducts$ = this.productService.getProductsByPriceRange(501);
  }
}
