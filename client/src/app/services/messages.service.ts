import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  http = inject(HttpClient)

  firstMessage(message: any, connectedUserId: string): Observable<any> {
    console.log('mess', message);
    console.log('connectedUserId', connectedUserId);
    let params = new HttpParams();
    params = params.append('message', message.message);
    params = params.append('connectedUserId', connectedUserId);
    return this.http.post<any>(`${environment.apiUrl}/firstMessage`, params)
  }

  sendMessage(message: any, connectedUserId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('message', message);
    params = params.append('connectedUserId', connectedUserId);
    return this.http.post<any>(`${environment.apiUrl}/sendMessage`, params)
  }
}
