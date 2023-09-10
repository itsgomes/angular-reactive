import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, shareReplay, tap } from "rxjs";
import { ILoginRequest, IUser } from "../models/authentication.model";

export const DATA_KEY: string = 'userdata_key';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private subject = new BehaviorSubject<IUser>(null!);

  public user$: Observable<IUser> = this.subject.asObservable();
  public isLoggedIn$!: Observable<boolean>;
  public isLoggedOut$!: Observable<boolean>;

  constructor(
    private http: HttpClient
  ) {
    this.isLoggedIn$ = this.user$
      .pipe(
        map(user => !!user)
      );

    this.isLoggedOut$ = this.isLoggedIn$
      .pipe(
        map(loggedIn => !loggedIn)
      );

    const user = localStorage.getItem(DATA_KEY);
    
    if (user)
      this.subject.next(JSON.parse(user));
  }

  public login(request: ILoginRequest): Observable<IUser> {
    return this.http.post<IUser>('/api/login', request)
      .pipe(
        tap(user => {
          this.subject.next(user);
          localStorage.setItem(DATA_KEY, JSON.stringify(user));
        }),
        shareReplay()
      );
  }

  public logout(): void {
    this.subject.next(null!);
    localStorage.removeItem(DATA_KEY);
  }
}