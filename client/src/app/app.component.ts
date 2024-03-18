import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from "./auth/services/auth.service";
import { tap } from "rxjs";
import { SocketService } from "./services/socket.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgOptimizedImage, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'messenger';
  isLogged$ = this.authService.isLoggedIn$

  constructor(
    private authService: AuthService,
    private socketService: SocketService
  ) {
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe({
      next: user => {
        console.log('current user', user)
        this.authService.setCurrentUser(user);
        this.socketService.setUpSocketConnection(user)
      },
      error: err => {
        this.authService.setCurrentUser(null);
      }
    })
  }

  logout() {
    this.authService.logout()
  }
}
