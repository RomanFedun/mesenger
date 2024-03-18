import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { User, UserConnections } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  connectedUser$ = new BehaviorSubject<User>({} as User)
  contacts$ = new BehaviorSubject<any>([])

  http = inject(HttpClient)

  getContacts(currentUserId?: number): Observable<any> {
    // let params: HttpParams = new HttpParams();
    // params = currentUserId ? params.append('userId', currentUserId) : {}
    return this.http.get(`${environment.apiUrl}/connections`)
  }

  getUserContact(userId: string): Observable<User>{
    console.log('getUserContact', userId);
    return this.http.get<User>(`${environment.apiUrl}/contact${userId}`);
  }

  addContact(userContact: UserConnections | User): Observable<UserConnections> {
    let params = new HttpParams();
    params = params.append('_id', userContact._id);
    params = params.append('userName', userContact.userName);
    console.log('addContact params', params)
    return this.http.post<UserConnections>(`${environment.apiUrl}/addcontact`, params)
  }

  // firstMessageSend(message: any): Observable<any> {
  //   let params = new HttpParams();
  //   params = params.append('message', message)
  //   return this.http.post<any>(`${environment.apiUrl}/addFirstMessage`, params);
  // }
}
