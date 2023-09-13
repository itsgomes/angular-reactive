import { CommonModule } from "@angular/common";
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from "@angular/core";
import { Observable, Subscription, debounceTime, fromEvent } from "rxjs";

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

import { IProduct } from "src/app/models/product.model";
import { ProductService } from "src/app/services/product.service";
import { LoadingService } from "src/app/services/loading.service";
import { ProductComponent } from "src/app/components/product/product.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ProductComponent
  ],
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements AfterViewInit, OnDestroy {
  @ViewChild('searchInput')
  public searchInput: ElementRef;

  public searchSubscription: Subscription;
  public searchResults$!: Observable<IProduct[]>;
  public activeProduct: IProduct;

  constructor(
    private productService: ProductService,
    private loadingService: LoadingService
  ) { }

  public ngAfterViewInit(): void {
    this.searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000)
      )
      .subscribe(() => this.onSearch(this.searchInput.nativeElement.value));
  }

  public ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  public onSearch(query: string): void {
    this.searchResults$ = this.loadingService.showLoaderUntilCompleted(
      this.productService.searchProduct(query)
    );
  }

  public openProductDetail(product: IProduct) {
    this.activeProduct = product;
  }

  public backToSearchState(): void {
    this.activeProduct = null;
  }
}