import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CurrentUser } from "../../interfaces/current-user";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!: FormGroup
  error: string | null = null;

  private authService = inject(AuthService)
  private router = inject(Router)

  constructor(private fb: FormBuilder) {

    this.form = fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  onSubmit() {
    console.log('submitted', this.form.value);
    this.authService.login(this.form.value).subscribe({
      next: (user: CurrentUser) => {
        this.authService.setToken(user)
        this.authService.setCurrentUser(user)
        this.form.reset();

        this.router.navigateByUrl('/')
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error['userNameOrPassword']
      }
    })
  }
}
