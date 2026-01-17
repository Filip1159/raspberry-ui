import { Injectable } from '@angular/core'
import { io, Socket } from 'socket.io-client'
import { Observable } from 'rxjs'
import { env } from './../environment'

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private socket: Socket

    constructor() {
        this.socket = io(env.backendApiUrl)
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
