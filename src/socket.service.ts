import { Injectable } from '@angular/core'
import { io, Socket } from 'socket.io-client'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private socket: Socket

    constructor() {
        this.socket = io('http://10.148.104.187:8080')
    }

    listen(eventName: string) {
        return new Observable(subscriber => {
            this.socket.on(eventName, data => {
                subscriber.next(data)
            })
        })
    }

    emit(eventName: string, data: string) {
        this.socket.emit(eventName, data)
    }
}
