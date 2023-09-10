import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, map, shareReplay, tap } from "rxjs";

import { IProduct } from "../models/product.model";
import { LoadingService } from "./loading.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private subject = new BehaviorSubject<IProduct[]>(null!);

  public products$ = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {
    this.loadAllProducts();
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