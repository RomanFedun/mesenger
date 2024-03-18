import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CurrentUser } from "../../interfaces/current-user";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form!: FormGroup
  error: string | null = null;

  private authService = inject(AuthService);
  private router = inject(Router)

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  onSubmit() {
    console.log('submitted', this.form.value);

    this.authService.register(this.form.value).subscribe({
      next: (user: CurrentUser) => {
        this.authService.setToken(user);
        this.authService.setCurrentUser(user);

        this.router.navigateByUrl('/').then(() => console.log('register completed'))
      }
    })


    this.form.reset();
  }
}
