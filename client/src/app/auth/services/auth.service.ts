import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, map, Observable } from "rxjs";
import { CurrentUser } from "../interfaces/current-user";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { LoginRequest, RegisterRequest } from "../interfaces/register-request";
import { User } from "../../interfaces/user";
import { SocketService } from "../../services/socket.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = new BehaviorSubject<CurrentUser | null>(null);
  isLoggedIn$ = this.currentUser$.pipe(
    filter(currentUser => currentUser !== undefined),
    map(Boolean)
  );

  constructor(
    private http: HttpClient,
    private socketService: SocketService
    ) {
  }
  getCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${environment.apiUrl}/user`).pipe(
      catchError(err => {
        throw `error in source. Details: ${err.error}`
      })
    );
  }

  register(registeredUser: RegisterRequest): Observable<CurrentUser>{
    return this.http.post<CurrentUser>(`${environment.apiUrl}/user`, registeredUser);
  }

  login(userData: LoginRequest): Observable<CurrentUser> {
    return this.http.post<CurrentUser>(`${environment.apiUrl}/user/login`, userData);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`)
  }

  setToken(currentUser: CurrentUser) {
    localStorage.setItem('token', currentUser.token);
  }

  setCurrentUser(user: CurrentUser | null): void {
    this.currentUser$.next(user);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser$.next(null);
    this.socketService.disconnect();
  }
}
