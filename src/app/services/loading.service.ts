import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, concatMap, finalize, of, tap } from "rxjs";

@Injectable()
export class LoadingService {
  private subject = new BehaviorSubject<boolean>(false);

  public loading$: Observable<boolean> = this.subject.asObservable();

  constructor() {}

  public showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null)
      .pipe(
        tap(() => this.loading(true)),
        concatMap(() => obs$),
        finalize(() => this.loading(false))
      );
  }

  public loading(value: boolean): void {
    this.subject.next(value);
  }
}