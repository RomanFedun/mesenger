import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client'
import { CurrentUser } from "../auth/interfaces/current-user";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: Socket | undefined

  setUpSocketConnection(currentUser: CurrentUser) {
    this.socket = io(environment.socketUrl, {
      auth: {
        token: currentUser.token
      }
    })
  }

  disconnect() {
    if(!this.socket) throw new Error('Socket connection is not wired');

    this.socket.disconnect();
  }

  emit(eventName: string, message: any) {
    if(!this.socket) throw new Error('Socket connection is not wired');

    this.socket.emit(eventName, message)
  }

  listen<T>(eventName: string): Observable<T>{
    if(!this.socket) throw new Error('Socket connection is not wired')
    const socket = this.socket;

    return new Observable<T>((subscriber) => {
      socket.on(eventName, data => {
        subscriber.next(data);
      })
    })
  }
}
