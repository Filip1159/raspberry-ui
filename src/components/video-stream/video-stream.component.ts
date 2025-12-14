import { Component, signal } from '@angular/core';
import { AuthService } from '../../auth.service';
import { SocketService } from '../../socket.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleUp, faArrowsToCircle } from '@fortawesome/free-solid-svg-icons';
import { LongPressButton } from '../longpress-button/longpress-button.component';

@Component({
  selector: 'app-video-stream',
  standalone: true,
  imports: [FontAwesomeModule, LongPressButton],
  templateUrl: './video-stream.component.html',
  styleUrl: './video-stream.component.scss'
})
export class VideoStreamComponent {
    WHEP_URL = "http://10.148.104.187:8889/cam1/whep"
    faAngleUp = faAngleUp
    faArrowsToCircle = faArrowsToCircle

    cameraTurnedOn = signal(false)

    constructor(private authService: AuthService, private socket: SocketService) {}

    async cameraOn(): Promise<void> { 
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }]
        });

        pc.ontrack = (event) => {
            const video = document.querySelector('#video') as HTMLVideoElement
            video.srcObject = event.streams[0];
        };

        pc.addTransceiver('video', { direction: 'recvonly' })

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const resp = await fetch(this.WHEP_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/sdp",
                "Authorization": `Bearer ${this.authService.token()}`
            },
            body: offer.sdp
        });

        if (!resp.ok) {
            console.error("Błąd odpowiedzi WHEP:", await resp.text());
            alert("Błąd autentykacji lub odpowiedzi z MediaMTX. Sprawdź konsolę.");
            return;
        }

        const answerSdp = await resp.text();

        await pc.setRemoteDescription({
            type: "answer",
            sdp: answerSdp
        });

        this.cameraTurnedOn.set(true)
    }

    move(msg: string): void {
        this.socket.emit('message', msg)
    }
}
