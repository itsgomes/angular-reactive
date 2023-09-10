import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { ILoginRequest } from 'src/app/models/authentication.model';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  public loginForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService
  ) {
    this.loginForm = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  public onSubmit(): void {
    const request: ILoginRequest = {
      ...this.loginForm.value
    };

    const loginLoading$ = this.authenticationService.login(request);

    this.loadingService.showLoaderUntilCompleted(loginLoading$)
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (e) => console.error(e)
      });
  }
}
