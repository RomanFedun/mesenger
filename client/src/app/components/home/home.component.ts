import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  private authService = inject(AuthService)
  private router = inject(Router)

  isLoginSubscription = Subscription.EMPTY

  ngOnInit() {
    this.isLoginSubscription = this.authService.isLoggedIn$.subscribe(isLogged => {
      console.log(isLogged)
      isLogged && this.router.navigateByUrl('/channels')
    });
  }

  ngOnDestroy() {
    this.isLoginSubscription.unsubscribe()
  }
}
