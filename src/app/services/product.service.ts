import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, map, shareReplay, tap, throwError } from "rxjs";

import { LoadingService } from "./loading.service";
import { IProduct, sortProductByPrice } from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private subject = new BehaviorSubject<IProduct[]>(null!);

  public products$: Observable<IProduct[]> = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {
    this.loadAllProducts();
  }

  public searchProduct(query: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('/api/products', {
      params: {
        filter: query,
        pageSize: "30"
      }
    }).pipe(
      map(response => response ['payload']),
      shareReplay()
    );
  }

  /**
   * Get product by price range (min and max).
   *
   * @param min - The minimal number to filter
   * @param y - The max number to filter, as default is 9999.
   * @returns Returns an observable filtered by the range of two numbers.
   *
   */
  public getProductsByPriceRange(min: number, max: number = 9999): Observable<IProduct[]> {
    return this.products$
      .pipe(
        map(products => products
          .filter(product => product.price >= min && product.price <= max)
          .sort(sortProductByPrice)
        )
      );
  }

  public saveProduct(productId: number, changes: Partial<IProduct>): Observable<any> {
    return this.http.put(`/api/products/${productId}`, changes)
      .pipe(
        catchError(err => throwError(() => new Error(err))),
        tap(() => this.onSaveProduct(productId, changes)),
        shareReplay()
      );
  }

  private onSaveProduct(productId: number, changes: Partial<IProduct>): void {
    const products = this.subject.getValue();
    const index = products.findIndex(p => p.id == productId);

    const newProduct = {
      ...products[index],
      ...changes
    };

    const newProducts: IProduct[] = products.slice(0);

    newProducts[index] = newProduct;

    this.subject.next(newProducts);
  }

  private loadAllProducts(): void {
    const productsLoaded$ = this.http.get<IProduct[]>('/api/products')
      .pipe(
        map(response => response['payload']),
        tap(products => this.subject.next(products)),
        shareReplay()
      );

    this.loadingService.showLoaderUntilCompleted(productsLoaded$)
      .subscribe();
  }

}