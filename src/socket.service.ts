import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
    private socket: Socket;

    constructor() {
      this.socket = io('http://192.168.0.144:8080');  // Adres serwera Flask
    }

    // Nasłuchiwanie na wiadomości z serwera
    listen(eventName: string) {
        return new Observable((subscriber) => {
            this.socket.on(eventName, (data: any) => {
                subscriber.next(data);
            });
        });
    }

    // Wysyłanie wiadomości do serwera
    emit(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }
}
