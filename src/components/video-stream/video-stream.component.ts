import { Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core'
import { SocketService } from '../../service/socket.service'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faAngleUp, faArrowsToCircle } from '@fortawesome/free-solid-svg-icons'
import { LongPressButton } from './longpress-button/longpress-button.component'
import { WebRTCService } from '../../service/webrtc.service'

@Component({
    selector: 'app-video-stream',
    standalone: true,
    imports: [FontAwesomeModule, LongPressButton],
    templateUrl: './video-stream.component.html',
    styleUrl: './video-stream.component.scss',
})
export class VideoStreamComponent {
    @ViewChild('video', { static: false })
    private video!: ElementRef<HTMLVideoElement>

    private socket = inject(SocketService)
    private webrtc = inject(WebRTCService)

    faAngleUp = faAngleUp
    faArrowsToCircle = faArrowsToCircle

    cameraTurnedOn = signal(false)

    constructor() {
        effect(() => {
            const stream = this.webrtc.mediaStream()
            if (stream) {
                this.video.nativeElement.srcObject = stream
            }
            this.cameraTurnedOn.set(this.webrtc.authorized())
        })
    }

    cameraOn() {
        this.webrtc.cameraOn()
    }

    move(msg: string): void {
        this.socket.emit('message', msg)
    }
}
