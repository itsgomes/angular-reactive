import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ILoginRequest } from 'src/app/models/authentication.model';
import { Router } from '@angular/router';

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
    private authenticationService: AuthenticationService
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

    this.authenticationService.login(request)
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (e) => console.error(e)
      });
  }
}
