import { Component, inject, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { VideoStreamComponent } from './../video-stream/video-stream.component'
import { SocketService } from '../../service/socket.service'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, VideoStreamComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    socketService = inject(SocketService)

    message = ''
    inputMessage = ''

    ngOnInit() {
        this.socketService.listen('message').subscribe((msg: unknown) => {
            if (typeof msg === 'string') this.message = msg
        })
    }

    sendMessage() {
        this.socketService.emit('message', this.inputMessage)
    }
}
