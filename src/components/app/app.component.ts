import { Component, inject, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AlarmComponent } from './../alarm/alarm.component'
import { HeaderComponent } from './../header/header.component'
import { VideoStreamComponent } from './../video-stream/video-stream.component'
import { SocketService } from './../../socket.service'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, AlarmComponent, HeaderComponent, VideoStreamComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    socketService = inject(SocketService)

    message = ''
    inputMessage = ''

    ngOnInit() {
        // Nasłuchiwanie na wiadomości z serwera
        this.socketService.listen('message').subscribe((msg: unknown) => {
            if (typeof msg === 'string') this.message = msg
        })
    }

    sendMessage() {
        // Wysyłanie wiadomości do serwera
        this.socketService.emit('message', this.inputMessage)
    }
}
